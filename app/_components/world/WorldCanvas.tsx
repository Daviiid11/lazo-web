"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ---------------------------------------------------------------------
   Campo de hebras abstracto. Cada hebra interpola entre TEJIDO (banda
   ordenada, c=1) y DISPERSO (vaga suelta, c=0). c lo da la coreografía
   `tieAt` según el scroll.

   FLUIDEZ: se precomputan FRAMES fotogramas y, en cada scroll, se
   INTERPOLA el buffer de posiciones entre los dos contiguos (lerp
   plano del Float32Array — NO se reconstruye TubeGeometry, que era lo
   caro). Movimiento continuo de verdad, coste de scroll mínimo.
--------------------------------------------------------------------- */

const N = 5; // nº de hebras
const FRAMES = 14; // fotogramas clave (se tweenean → bastan pocos)
const SAMPLES = 14; // puntos de control por hebra
const SPAN = 15; // longitud que cruza la escena
const TUBE_SEG = 24;
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
  frames,
  lives,
}: {
  frames: THREE.TubeGeometry[][];
  lives: THREE.BufferGeometry[];
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

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      camera.position.copy(path.getPointAt(p));
      camera.lookAt(0, 0, -4);

      // Interpolación CONTINUA entre los dos fotogramas contiguos.
      const s = tieAt(p) * (FRAMES - 1);
      const lo = Math.floor(s);
      const hi = Math.min(lo + 1, FRAMES - 1);
      const f = s - lo;
      for (let i = 0; i < lives.length; i++) {
        const a = frames[i][lo].attributes.position
          .array as Float32Array;
        const b = frames[i][hi].attributes.position
          .array as Float32Array;
        const out = lives[i].attributes.position
          .array as Float32Array;
        for (let k = 0; k < out.length; k++) {
          out[k] = a[k] + (b[k] - a[k]) * f;
        }
        lives[i].attributes.position.needsUpdate = true;
      }
      invalidate();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [camera, invalidate, path, frames, lives]);

  return null;
}

function FlowField() {
  const frames = useMemo(
    () => Array.from({ length: N }, (_, i) => buildCord(i)),
    []
  );
  // Geometría "viva" por hebra: arranca en TEJIDO (hero) y se muta por
  // lerp en cada scroll. Topología idéntica entre fotogramas → basta
  // interpolar el atributo position (basic material ignora normales).
  const lives = useMemo(
    () => frames.map((f) => f[FRAMES - 1].clone()),
    [frames]
  );
  // Paleta CERRADA: solo terracota y sage, alternadas.
  const colors = ["#C97B5A", "#3F5648"];

  return (
    <>
      {/* Niebla crema = color de la página: el fondo se disuelve, da
          profundidad sin coste (basic material respeta fog). */}
      <fog attach="fog" args={["#F4ECE0", 7, 24]} />

      {lives.map((g, i) => (
        <mesh key={i} geometry={g} frustumCulled={false}>
          <meshBasicMaterial
            color={colors[i % 2]}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}

      <Rig frames={frames} lives={lives} />
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
