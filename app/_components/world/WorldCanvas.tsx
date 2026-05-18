"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

// Punto lejano donde los cabos de fondo se reúnen (profundidad, en niebla).
const CORD_GATHER = V(0, 0, -16);
// Centro del lazo protagonista (la cámara siempre lo mira).
const LAZO_C = V(0, 0, -2);

/* ---------- Cabos de fondo (atmósfera, geometría estática) ---------- */
function Cord({
  color,
  seed,
  opacity,
}: {
  color: string;
  seed: number;
  opacity: number;
}) {
  const geometry = useMemo(() => {
    const ox = Math.sin(seed * 12.9898) * 6;
    const oy = Math.cos(seed * 78.233) * 3;
    const oz = (seed % 1) * -10;
    const pts = Array.from({ length: 10 }, (_, i) => {
      const t = i / 9;
      const loose = V(
        (t - 0.5) * 16 + ox,
        Math.sin(t * Math.PI * 2 + seed) * 2 + oy,
        oz + Math.cos(t * Math.PI + seed) * 2
      );
      return loose.lerp(CORD_GATHER, Math.pow(t, 2.2));
    });
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(pts),
      48,
      0.05,
      6,
      false
    );
  }, [seed]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

// Atenuados: el lazo es el protagonista, esto es solo profundidad detrás.
const CORDS = [
  { color: "#C97B5A", seed: 0.12, opacity: 0.32 },
  { color: "#3F5648", seed: 0.41, opacity: 0.3 },
  { color: "#C97B5A", seed: 0.68, opacity: 0.26 },
  { color: "#3F5648", seed: 0.83, opacity: 0.3 },
  { color: "#C97B5A", seed: 1.27, opacity: 0.24 },
  { color: "#3F5648", seed: 1.55, opacity: 0.26 },
];

/* ---------- El lazo: 2 hebras que se atan / desatan / atan ----------
   Narrativa (David, 2026-05-17): ATADO (hero) → se DESATA en 'la fuga'
   (el problema) → se RE-ATA limpio en el cierre ('atamos tus cabos').
   Técnica: NO se reconstruye geometría en scroll (eso hundía Lighthouse).
   Se precomputan FRAMES fotogramas (desatado→atado) UNA vez y se
   intercambia la geometría por índice → coste de scroll ≈ 0. */

// Hebra naranja: lazada izquierda + cola derecha.
const TIED_A = [
  V(0, -0.05, 0),
  V(-1.5, 0.95, 0.25),
  V(-2.15, 0.05, -0.2),
  V(-1.4, -0.85, 0.25),
  V(-0.05, 0, 0),
  V(0.6, -0.85, 0.2),
  V(1.0, -1.7, -0.05),
  V(1.15, -2.5, 0),
];
// Hebra verde: espejo (lazada derecha + cola izquierda).
const TIED_B = [
  V(0, -0.05, 0),
  V(1.5, 0.95, -0.25),
  V(2.15, 0.05, 0.2),
  V(1.4, -0.85, -0.25),
  V(0.05, 0, 0),
  V(-0.6, -0.85, -0.2),
  V(-1.0, -1.7, 0.05),
  V(-1.15, -2.5, 0),
];
// Desatado: dos hebras sueltas, onduladas, separadas a lados opuestos.
const UNTIED_A = [
  V(1.2, -0.3, -0.9),
  V(0.4, 0.4, -0.95),
  V(-0.5, -0.2, -1.0),
  V(-1.3, 0.5, -0.95),
  V(-2.0, -0.1, -0.9),
  V(-2.6, 0.4, -0.85),
  V(-3.0, -0.2, -0.8),
  V(-3.4, 0.1, -0.8),
];
const UNTIED_B = [
  V(-1.2, -0.3, 0.9),
  V(-0.4, 0.4, 0.95),
  V(0.5, -0.2, 1.0),
  V(1.3, 0.5, 0.95),
  V(2.0, -0.1, 0.9),
  V(2.6, 0.4, 0.85),
  V(3.0, -0.2, 0.8),
  V(3.4, 0.1, 0.8),
];

// 16 fotogramas: suficiente para leer el atado/desatado y la mitad de
// trabajo en el montaje que con 28 → recupera margen de Lighthouse.
const FRAMES = 16;

function buildFrames(untied: THREE.Vector3[], tied: THREE.Vector3[]) {
  return Array.from({ length: FRAMES }, (_, j) => {
    const k = j / (FRAMES - 1); // 0 = desatado · 1 = atado
    const pts = untied.map((u, i) =>
      new THREE.Vector3().lerpVectors(u, tied[i], k)
    );
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(pts),
      32,
      0.06,
      6,
      false
    );
  });
}

function smoothstep(t: number) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

// 1 (atado, hero) → 0 (desatado, 'la fuga') → 1 (re-atado, cierre).
function tieAt(p: number) {
  if (p <= 0.3) return 1 - smoothstep(p / 0.3);
  if (p < 0.68) return 0;
  return smoothstep((p - 0.68) / 0.32);
}

function Rig({
  aRef,
  bRef,
  framesA,
  framesB,
}: {
  aRef: React.RefObject<THREE.Mesh>;
  bRef: React.RefObject<THREE.Mesh>;
  framesA: THREE.TubeGeometry[];
  framesB: THREE.TubeGeometry[];
}) {
  const { camera, invalidate } = useThree();

  const path = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        V(0, 1.0, 5.0), // 1 hero — lazo atado
        V(5.5, -0.8, 2.0), // 2 la fuga — se desata
        V(-5.5, 1.2, 1.5), // 3 el diagnóstico
        V(4.5, 2.0, -1.0), // 4 la automatización
        V(-4.0, -1.2, -3.5), // 5 la prueba
        V(0, 0, 3.2), // 6 el cierre — re-atado, de frente
      ]),
    []
  );
  const last = useRef(-1);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const p =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      camera.position.copy(path.getPointAt(p));
      camera.lookAt(LAZO_C);
      const idx = Math.round(tieAt(p) * (FRAMES - 1));
      if (idx !== last.current) {
        last.current = idx;
        if (aRef.current) aRef.current.geometry = framesA[idx];
        if (bRef.current) bRef.current.geometry = framesB[idx];
      }
      invalidate();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [camera, invalidate, path, aRef, bRef, framesA, framesB]);

  return null;
}

function Scene() {
  const aRef = useRef<THREE.Mesh>(null);
  const bRef = useRef<THREE.Mesh>(null);
  const framesA = useMemo(() => buildFrames(UNTIED_A, TIED_A), []);
  const framesB = useMemo(() => buildFrames(UNTIED_B, TIED_B), []);

  return (
    <>
      {/* Niebla crema = color de la página: el fondo se disuelve sin
          coste (basic material respeta fog). */}
      <fog attach="fog" args={["#F4ECE0", 9, 28]} />

      {CORDS.map((c, i) => (
        <Cord
          key={i}
          color={c.color}
          seed={c.seed}
          opacity={c.opacity}
        />
      ))}

      {/* El lazo. Geometría inicial = atado (hero). */}
      <group position={LAZO_C.toArray()}>
        <mesh ref={aRef} geometry={framesA[FRAMES - 1]}>
          <meshBasicMaterial
            color="#C97B5A"
            transparent
            opacity={0.88}
          />
        </mesh>
        <mesh ref={bRef} geometry={framesB[FRAMES - 1]}>
          <meshBasicMaterial
            color="#3F5648"
            transparent
            opacity={0.88}
          />
        </mesh>
      </group>

      <Rig
        aRef={aRef}
        bRef={bRef}
        framesA={framesA}
        framesB={framesB}
      />
    </>
  );
}

export default function WorldCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      frameloop="demand"
      camera={{ position: [0, 1, 5], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}
