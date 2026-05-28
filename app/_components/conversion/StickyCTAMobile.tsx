"use client";

import { useEffect, useState } from "react";
import { CTA } from "../../_content/site";
import { track } from "../../_lib/analytics";

export default function StickyCTAMobile({
  showAfter = 480,
}: {
  showAfter?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setVisible(window.scrollY > showAfter);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [showAfter]);

  return (
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 bg-gradient-to-t from-cream via-cream/95 to-cream/0 transition-opacity ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transitionDuration: "var(--dur-slow)", transitionTimingFunction: "var(--ease-calm)" }}
    >
      <a
        href={CTA.sticky.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          track("cta_click", { variant: "sticky", destino: CTA.sticky.href })
        }
        className="flex items-center justify-center gap-2 w-full rounded-full bg-sage text-cream font-medium min-h-[48px] px-6 shadow-[0_8px_24px_-12px_rgba(31,31,31,0.25)] hover:bg-terracotta hover:text-charcoal transition-colors"
      >
        {CTA.sticky.label}
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
