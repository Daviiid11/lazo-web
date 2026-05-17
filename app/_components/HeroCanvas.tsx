"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Una "cuerda" (cabo suelto): tubo a lo largo de una curva suave que ondula. */
function Cord({
  color,
  phase,
  z,
}: {
  color: string;
  phase: number;
  z: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const { curve, base } = useMemo(() => {
    const base = Array.from({ length: 6 }, (_, i) => {
      const t = i / 5;
      return new THREE.Vector3(
        (t - 0.5) * 9,
        Math.sin(t * Math.PI * 2 + phase) * 1.4,
        z
      );
    });
    const curve = new THREE.CatmullRomCurve3(
      base.map((v) => v.clone())
    );
    return { curve, base };
  }, [phase, z]);

  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 80, 0.05, 8, false),
    [curve]
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < base.length; i++) {
      curve.points[i].y =
        base[i].y + Math.sin(t * 0.5 + i * 0.6 + phase) * 0.5;
    }
    const next = new THREE.TubeGeometry(curve, 80, 0.05, 8, false);
    if (meshRef.current) {
      meshRef.current.geometry.dispose();
      meshRef.current.geometry = next;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z =
        Math.sin(state.clock.getElapsedTime() * 0.1) * 0.12;
    }
  });
  return (
    <group ref={groupRef}>
      <Cord color="#C97B5A" phase={0} z={0} />
      <Cord color="#3F5648" phase={2.1} z={-1.2} />
      <Cord color="#C97B5A" phase={4.0} z={-2.4} />
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      frameloop="always"
    >
      <Scene />
    </Canvas>
  );
}
