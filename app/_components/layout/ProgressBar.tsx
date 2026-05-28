"use client";

import { useEffect, useState } from "react";

export default function ProgressBar({ total = 6 }: { total?: number }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const next = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
        setPct(next);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activos = Math.max(1, Math.round(pct * total));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={activos}
      aria-label={`Progreso del recorrido, acto ${activos} de ${total}`}
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
    >
      <div className="px-6 md:px-10 pt-3">
        <div
          className="mx-auto max-w-6xl grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className="h-[2px] rounded-full bg-sage/15 overflow-hidden"
            >
              <span
                className="block h-full bg-terracotta origin-left"
                style={{
                  transform: `scaleX(${i < activos ? 1 : 0})`,
                  transition: "transform var(--dur-slow) var(--ease-calm)",
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
