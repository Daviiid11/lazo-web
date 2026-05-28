"use client";

import type { ActoCoste } from "../../_content/actos";
import CounterAnim from "../motion/CounterAnim";

export default function CosteCounter({ acto }: { acto: ActoCoste }) {
  if (acto.modo === "euros") {
    const cifra = Number.parseInt(acto.numero.replace(/[^\d]/g, ""), 10) || 0;
    return (
      <div className="my-10 md:my-14">
        <span className="block font-display text-sage text-[clamp(4rem,14vw,9rem)] leading-none tracking-tighter2">
          <CounterAnim to={cifra} prefix="" suffix=" €" />
        </span>
        {acto.unidad && (
          <span className="block mt-3 font-sans text-base md:text-lg text-charcoal/70">
            {acto.unidad}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="my-10 md:my-14 max-w-3xl">
      <p className="font-display text-sage text-[clamp(2rem,5.2vw,3.75rem)] leading-[1.1] tracking-tighter2">
        {acto.numero}
      </p>
      {acto.unidad && (
        <p className="mt-4 font-sans text-base md:text-lg text-charcoal/70">
          {acto.unidad}
        </p>
      )}
    </div>
  );
}
