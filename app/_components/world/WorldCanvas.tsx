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

// 3 poses por hebra. La cola va primero, recorre la lazada y vuelve al
// centro: así el desatado se lee (la lazada se abre antes de soltarse).

// ATADO — hebra naranja: lazada izquierda nítida + cola derecha colgando.
const TIED_A = [
  V(1.55, -2.35, 0.0), // fin de cola
  V(1.35, -1.45, -0.05),
  V(0.85, -0.55, 0.1),
  V(-0.15, -0.05, 0.0), // centro (nudo)
  V(-0.8, 0.95, 0.15), // sube a la lazada
  V(-1.85, 0.55, -0.1), // exterior de la lazada
  V(-1.55, -0.7, 0.1), // base de la lazada
  V(-0.1, 0.0, 0.0), // cierra la lazada en el centro
];
// ATADO — hebra verde: espejo (lazada derecha + cola izquierda).
const TIED_B = [
  V(-1.55, -2.35, 0.0),
  V(-1.35, -1.45, 0.05),
  V(-0.85, -0.55, -0.1),
  V(0.15, -0.05, 0.0),
  V(0.8, 0.95, -0.15),
  V(1.85, 0.55, 0.1),
  V(1.55, -0.7, -0.1),
  V(0.1, 0.0, 0.0),
];
// MID — lazada abierta y elevada, aún cruzada: el instante de "soltarse".
const MID_A = [
  V(2.2, -2.5, -0.15),
  V(1.8, -1.6, -0.2),
  V(0.95, -0.7, -0.25),
  V(-0.35, -0.1, -0.25),
  V(-1.1, 1.35, -0.3),
  V(-2.55, 0.75, -0.25),
  V(-2.05, -0.95, -0.2),
  V(-0.4, -0.1, -0.25),
];
const MID_B = [
  V(-2.2, -2.5, 0.15),
  V(-1.8, -1.6, 0.2),
  V(-0.95, -0.7, 0.25),
  V(0.35, -0.1, 0.25),
  V(1.1, 1.35, 0.3),
  V(2.55, 0.75, 0.25),
  V(2.05, -0.95, 0.2),
  V(0.4, -0.1, 0.25),
];
// TIRÓN — la cola se mete por el nudo y "pasa a través" antes de que la
// lazada ceda: el instante físico de tirar de un cabo para desatar.
const PULL_A = [
  V(-0.9, 0.3, 0.2),
  V(-0.5, -0.2, 0.1),
  V(-0.25, -0.15, 0.05),
  V(-0.15, -0.05, 0.0),
  V(-0.85, 0.85, 0.15),
  V(-1.7, 0.45, -0.1),
  V(-1.45, -0.6, 0.1),
  V(-0.1, 0.0, 0.0),
];
const PULL_B = [
  V(0.9, 0.3, -0.2),
  V(0.5, -0.2, -0.1),
  V(0.25, -0.15, -0.05),
  V(0.15, -0.05, 0.0),
  V(0.85, 0.85, -0.15),
  V(1.7, 0.45, 0.1),
  V(1.45, -0.6, -0.1),
  V(0.1, 0.0, 0.0),
];
// DESATADO — sin lazada: dos hebras sueltas a lados opuestos (cabos).
const UNTIED_A = [
  V(1.3, -0.2, -0.95),
  V(0.45, 0.45, -1.0),
  V(-0.55, -0.1, -1.0),
  V(-1.45, 0.55, -0.95),
  V(-2.25, -0.05, -0.9),
  V(-2.95, 0.45, -0.85),
  V(-3.55, -0.15, -0.8),
  V(-4.05, 0.1, -0.8),
];
const UNTIED_B = [
  V(-1.3, -0.2, 0.95),
  V(-0.45, 0.45, 1.0),
  V(0.55, -0.1, 1.0),
  V(1.45, 0.55, 0.95),
  V(2.25, -0.05, 0.9),
  V(2.95, 0.45, 0.85),
  V(3.55, -0.15, 0.8),
  V(4.05, 0.1, 0.8),
];

// 22 fotogramas sobre 3 poses (atado→lazada abierta→desatado): morph
// legible sin reconstruir geometría en scroll. Queda margen Lighthouse.
const FRAMES = 22;

// SPREAD: cuánto se escalona el movimiento a lo largo de la hebra. La
// transición "viaja" por la cuerda (no todo a la vez) → se lee como
// tirar de un cabo, no como una deformación en bloque.
const SPREAD = 0.6;

// Interpola from→to con un retardo por punto. El índice 0 es el extremo
// libre de la cola. leadFromTail: la cola se mueve primero y la lazada
// después (tirar para desatar); si no, al revés (rehacer y tensar).
function phased(
  from: THREE.Vector3[],
  to: THREE.Vector3[],
  u: number,
  leadFromTail: boolean
) {
  const N = from.length;
  return from.map((f, i) => {
    const idx = leadFromTail ? i : N - 1 - i;
    const phase = (idx / (N - 1)) * SPREAD;
    const local = smoothstep(
      Math.min(1, Math.max(0, u * (1 + SPREAD) - phase))
    );
    return new THREE.Vector3().lerpVectors(f, to[i], local);
  });
}

// t: 1 atado · 0.75 tirón · 0.5 lazada abierta · 0 desatado.
function poseAt(
  untied: THREE.Vector3[],
  pull: THREE.Vector3[],
  mid: THREE.Vector3[],
  tied: THREE.Vector3[],
  t: number
) {
  if (t >= 0.75) {
    // ATADO ↔ TIRÓN: la cola recorre el nudo (se "tira" de ella).
    return phased(pull, tied, (t - 0.75) / 0.25, false);
  }
  if (t >= 0.5) {
    // TIRÓN ↔ MID: la lazada cede y se abre.
    return phased(mid, pull, (t - 0.5) / 0.25, false);
  }
  // MID ↔ DESATADO: la cola sale del todo, las hebras se separan.
  return phased(mid, untied, 1 - t / 0.5, true);
}

function buildFrames(
  untied: THREE.Vector3[],
  pull: THREE.Vector3[],
  mid: THREE.Vector3[],
  tied: THREE.Vector3[]
) {
  return Array.from({ length: FRAMES }, (_, j) => {
    const t = j / (FRAMES - 1); // 0 = desatado · 1 = atado
    const pts = poseAt(untied, pull, mid, tied, t);
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

// Rampa 0→1 en `steps` peldaños: sube y se asienta, sube y se asienta.
// Cada peldaño se lee como "un problema resuelto / un trozo instalado".
function stepped(x: number, steps: number) {
  const c = Math.min(1, Math.max(0, x));
  const s = c * steps;
  const i = Math.floor(s);
  const f = s - i;
  // 65% del tramo = subida suave, 35% = meseta (el paso "se asienta").
  const rise = smoothstep(Math.min(1, f / 0.65));
  return Math.min(1, (i + rise) / steps);
}

// Coreografía atada al relato (6 estaciones en p = 0 .2 .4 .6 .8 1):
//  Hero: atado · La fuga→Diagnóstico: se deshace (el problema aflora) ·
//  Automatización→Prueba: se RE-ATA POR PASOS (vamos solucionando e
//  instalando el servicio) · Cierre: atado y asentado.
function tieAt(p: number) {
  if (p <= 0.06) return 1; // Hero: atado
  if (p < 0.4) return 1 - smoothstep((p - 0.06) / 0.34); // 1 → 0
  if (p < 0.92) return stepped((p - 0.4) / 0.52, 4); // 0 → 1 por pasos
  return 1; // Cierre: atado
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
  const framesA = useMemo(
    () => buildFrames(UNTIED_A, PULL_A, MID_A, TIED_A),
    []
  );
  const framesB = useMemo(
    () => buildFrames(UNTIED_B, PULL_B, MID_B, TIED_B),
    []
  );

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
            opacity={0.4}
          />
        </mesh>
        <mesh ref={bRef} geometry={framesB[FRAMES - 1]}>
          <meshBasicMaterial
            color="#3F5648"
            transparent
            opacity={0.4}
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
