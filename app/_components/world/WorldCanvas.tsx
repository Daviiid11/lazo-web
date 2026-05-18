"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ---------------------------------------------------------------------
   Campo de hebras abstracto (no un lazo literal — eso parecía amateur,
   Causa 4). Cada hebra interpola entre TEJIDO (banda ordenada, c=1) y
   DISPERSO (vaga suelta, c=0). c lo da la coreografía `tieAt` según el
   scroll. Generativo = intencionado; lo abstracto esconde la baja
   fidelidad. Precomputado + swap por índice → coste de scroll ≈ 0.
--------------------------------------------------------------------- */

const N = 5; // nº de hebras
const FRAMES = 20; // fotogramas de coherencia (0→1): + = más fluido
const SAMPLES = 14; // puntos de control por hebra (curva larga y suave)
const SPAN = 15; // longitud que cruza la escena
const TUBE_SEG = 20; // bajado para financiar más FRAMES sin tocar el gate
const RADIAL = 5;
const PI = Math.PI;

// Punto de la hebra i en t∈[0,1], con coherencia c (1=tejido, 0=disperso).
function cordPoint(i: number, t: number, c: number) {
  const x = (t - 0.5) * SPAN;
  // Tejido: banda apretada, fases casi comunes → orden, calma.
  const wy = Math.sin(t * PI * 3 + i * 0.6) * 0.4;
  const wz = Math.cos(t * PI * 2 + i * 0.6) * 0.3 - 1.6;
  // Disperso: cada hebra su carril, amplitud grande → suelto, fuga.
  const lane = (i - (N - 1) / 2) * 0.7;
  const sy = Math.sin(t * PI * 1.4 + i * 1.7) * (1.5 + i * 0.15) + lane;
  const sz = Math.cos(t * PI * 1.1 + i * 1.3) * 1.5 - 2.4;
  return new THREE.Vector3(
    x,
    wy * c + sy * (1 - c),
    wz * c + sz * (1 - c)
  );
}

function buildCord(i: number) {
  return Array.from({ length: FRAMES }, (_, j) => {
    const c = j / (FRAMES - 1);
    const pts = Array.from({ length: SAMPLES }, (_, k) =>
      cordPoint(i, k / (SAMPLES - 1), c)
    );
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(pts),
      TUBE_SEG,
      0.05,
      RADIAL,
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
  const rise = smoothstep(Math.min(1, f / 0.65));
  return Math.min(1, (i + rise) / steps);
}

// Coreografía atada al relato (6 estaciones en p = 0 .2 .4 .6 .8 1):
//  Hero: tejido · La fuga→Diagnóstico: se dispersa (el problema aflora) ·
//  Automatización→Prueba: se RE-TEJE POR PASOS (vamos solucionando e
//  instalando el servicio) · Cierre: tejido y asentado.
function tieAt(p: number) {
  if (p <= 0.06) return 1;
  if (p < 0.4) return 1 - smoothstep((p - 0.06) / 0.34);
  if (p < 0.92) return stepped((p - 0.4) / 0.52, 4);
  return 1;
}

function Rig({
  meshes,
  frames,
}: {
  meshes: React.MutableRefObject<THREE.Mesh[]>;
  frames: THREE.TubeGeometry[][];
}) {
  const { camera, invalidate } = useThree();

  const path = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.6, 7),
        new THREE.Vector3(1.3, 0, 5.6),
        new THREE.Vector3(-1.3, 0.4, 4.6),
        new THREE.Vector3(0.6, -0.3, 4),
      ]),
    []
  );
  const last = useRef(-1);

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      camera.position.copy(path.getPointAt(p));
      camera.lookAt(0, 0, -4);
      const idx = Math.round(tieAt(p) * (FRAMES - 1));
      if (idx !== last.current) {
        last.current = idx;
        for (let i = 0; i < meshes.current.length; i++) {
          const m = meshes.current[i];
          if (m) m.geometry = frames[i][idx];
        }
      }
      invalidate();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [camera, invalidate, path, meshes, frames]);

  return null;
}

function FlowField() {
  const meshes = useRef<THREE.Mesh[]>([]);
  const frames = useMemo(
    () => Array.from({ length: N }, (_, i) => buildCord(i)),
    []
  );
  // Paleta CERRADA: solo terracota y sage, alternadas.
  const colors = ["#C97B5A", "#3F5648"];

  return (
    <>
      {/* Niebla crema = color de la página: el fondo se disuelve, da
          profundidad sin coste (basic material respeta fog). */}
      <fog attach="fog" args={["#F4ECE0", 7, 24]} />

      {frames.map((f, i) => (
        <mesh
          key={i}
          ref={(m) => {
            if (m) meshes.current[i] = m;
          }}
          geometry={f[FRAMES - 1]}
        >
          <meshBasicMaterial
            color={colors[i % 2]}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}

      <Rig meshes={meshes} frames={frames} />
    </>
  );
}

export default function WorldCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      frameloop="demand"
      camera={{ position: [0, 0.6, 7], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <FlowField />
    </Canvas>
  );
}
