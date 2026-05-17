"use client";

import { useEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Un cabo: tubo ESTÁTICO a lo largo de una curva. La geometría se construye
 * una sola vez (sin rebuild por frame) — clave para el TBT del gate M-C.
 */
function Cord({
  color,
  ox,
  oy,
  oz,
}: {
  color: string;
  ox: number;
  oy: number;
  oz: number;
}) {
  const geometry = useMemo(() => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const t = i / 5;
      return new THREE.Vector3(
        (t - 0.5) * 14 + ox,
        Math.sin(t * Math.PI * 2) * 1.6 + oy,
        oz + Math.cos(t * Math.PI) * 1.2
      );
    });
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(pts),
      64,
      0.06,
      6,
      false
    );
  }, [ox, oy, oz]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
}

/**
 * La cámara viaja por una curva según el scroll. Render ON-DEMAND:
 * solo se dibuja al hacer scroll (invalidate), no en bucle continuo.
 */
function Rig() {
  const { camera, invalidate } = useThree();

  const path = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 9),
        new THREE.Vector3(2, 1, 4),
        new THREE.Vector3(-2, -1, -1),
        new THREE.Vector3(1, 0.5, -6),
      ]),
    []
  );

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const p =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const pos = path.getPointAt(p);
      camera.position.copy(pos);
      camera.lookAt(0, 0, -6);
      invalidate();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [camera, invalidate, path]);

  return null;
}

export default function WorldCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      frameloop="demand"
      camera={{ position: [0, 0, 9], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <Cord color="#C97B5A" ox={0} oy={0} oz={0} />
      <Cord color="#3F5648" ox={0} oy={-0.6} oz={-2} />
      <Cord color="#C97B5A" ox={0} oy={0.8} oz={-4} />
      <Rig />
    </Canvas>
  );
}
