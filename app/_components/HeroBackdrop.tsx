"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lazy + sin SSR: el peso de three.js queda en un chunk aparte,
// fuera del First Load JS de la ruta, cargado tras la hidratación.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/**
 * Monta el lienzo 3D solo si el usuario NO pide reduced-motion.
 * Si no se monta, el fallback estático del hero (SVG SSR) queda visible.
 */
export default function HeroBackdrop() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    // Esperamos a que el hilo principal esté ocioso: el coste de three.js
    // no compite con la hidratación ni con el LCP del hero.
    const ric =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 800));
    const id = ric(() => setEnabled(true));
    return () => {
      (window.cancelIdleCallback ?? window.clearTimeout)(id as number);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 opacity-70" aria-hidden>
      <HeroCanvas />
    </div>
  );
}
