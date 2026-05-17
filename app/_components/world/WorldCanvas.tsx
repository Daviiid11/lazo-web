"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";

// El punto donde los cabos se "atan" (el nudo). La cámara termina mirándolo:
// la metáfora "atamos los cabos sueltos" se ve, no se explica.
const KNOT = new THREE.Vector3(0, 0, -16);

/**
 * Un cabo: tubo ESTÁTICO. Empieza disperso y, según recorre la curva (t→1),
 * sus puntos tiran hacia el nudo — cabo suelto que se ata. La geometría se
 * construye una sola vez (useMemo): cero rebuild por frame, clave para el TBT
 * del gate Lighthouse.
 */
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
      const loose = new THREE.Vector3(
        (t - 0.5) * 16 + ox,
        Math.sin(t * Math.PI * 2 + seed) * 2 + oy,
        oz + Math.cos(t * Math.PI + seed) * 2
      );
      // Ease cuadrático: el tramo final del cabo converge al nudo.
      return loose.lerp(KNOT, Math.pow(t, 2.2));
    });
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(pts),
      80,
      0.055,
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

/**
 * La cámara recorre las 6 estaciones según el scroll. Render ON-DEMAND:
 * solo se dibuja al hacer scroll (invalidate), nunca en bucle continuo.
 * Lenis suaviza el scroll nativo → la cámara hereda ese suavizado gratis.
 * Además gira el nudo según el progreso (vida sutil, sin bucle continuo).
 */
function Rig({ knotRef }: { knotRef: React.RefObject<THREE.Mesh> }) {
  const { camera, invalidate } = useThree();

  const path = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 11), // 1 hero — cabos dispersos
        new THREE.Vector3(4, 1.5, 6), // 2 la fuga
        new THREE.Vector3(-4, -1, 1), // 3 el diagnóstico
        new THREE.Vector3(3, 1, -4), // 4 la automatización
        new THREE.Vector3(-2, -0.5, -9), // 5 la prueba
        new THREE.Vector3(0, 0, -13), // 6 el cierre — frente al nudo
      ]),
    []
  );

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const p =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      camera.position.copy(path.getPointAt(p));
      camera.lookAt(KNOT);
      if (knotRef.current) {
        knotRef.current.rotation.y = p * Math.PI * 1.4;
        knotRef.current.rotation.x = p * Math.PI * 0.6;
      }
      invalidate();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [camera, invalidate, path, knotRef]);

  return null;
}

// Paleta CERRADA: solo terracota y sage. Sin tercer color, sin estética
// cinemática genérica.
const CORDS = [
  { color: "#C97B5A", seed: 0.12, opacity: 0.55 },
  { color: "#3F5648", seed: 0.41, opacity: 0.5 },
  { color: "#C97B5A", seed: 0.68, opacity: 0.45 },
  { color: "#3F5648", seed: 0.83, opacity: 0.5 },
  { color: "#C97B5A", seed: 1.27, opacity: 0.4 },
  { color: "#3F5648", seed: 1.55, opacity: 0.45 },
];

function Scene() {
  const knotRef = useRef<THREE.Mesh>(null);
  return (
    <>
      {/* Niebla crema = color de la página: los cabos lejanos se disuelven
          en el fondo → profundidad sin coste (basic material respeta fog). */}
      <fog attach="fog" args={["#F4ECE0", 9, 28]} />

      {CORDS.map((c, i) => (
        <Cord
          key={i}
          color={c.color}
          seed={c.seed}
          opacity={c.opacity}
        />
      ))}

      {/* El nudo: clímax visual del cierre. Lejos al inicio (la niebla lo
          oculta), nítido al llegar — recompensa de "atar los cabos". */}
      <mesh ref={knotRef} position={KNOT}>
        <torusKnotGeometry args={[0.5, 0.17, 96, 10]} />
        <meshBasicMaterial color="#C97B5A" transparent opacity={0.85} />
      </mesh>

      <Rig knotRef={knotRef} />
    </>
  );
}

export default function WorldCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      frameloop="demand"
      camera={{ position: [0, 0, 11], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}
