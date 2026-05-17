"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lienzo 3D lazy + sin SSR: el peso de three.js queda fuera del First Load JS.
const WorldCanvas = dynamic(() => import("./WorldCanvas"), { ssr: false });

const CAL_URL = "https://cal.eu/lazo-agency/15min";

/**
 * "El recorrido del cabo" — L2: recorrido completo, 6 estaciones.
 * Cada estación se entiende fuga→diagnóstico→CTA SOLO deslizando, sin
 * explorar nada (regla M-B Parte 2). El 3D es atmósfera detrás del copy HTML.
 * Si prefers-reduced-motion: no se monta el 3D y el copy queda intacto
 * (fallback = la v2 lineal completa, nunca una página vacía).
 */
export default function WorldPrototype() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;
    const ric =
      window.requestIdleCallback ??
      ((cb: () => void) => window.setTimeout(cb, 600));
    const id = ric(() => setEnabled(true));
    return () => {
      (window.cancelIdleCallback ?? window.clearTimeout)(id as number);
    };
  }, []);

  return (
    <main className="relative bg-cream text-charcoal">
      {enabled && (
        <div className="fixed inset-0 z-0" aria-hidden>
          <WorldCanvas />
        </div>
      )}

      <div className="relative z-10">
        {/* 1 — Hero */}
        <section className="min-h-screen flex items-center">
          <div className="px-6 md:px-10 max-w-4xl mx-auto">
            <p className="font-sans text-sm uppercase tracking-widest text-sage/90 mb-6">
              Automatización con IA · Clínicas
            </p>
            <h1 className="font-display text-sage text-5xl md:text-7xl leading-[1.05] tracking-tighter2 mb-8">
              Tu clínica pierde pacientes
              <br />
              <span className="text-terracotta">que nunca llegas a ver.</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed">
              Desliza: cada cabo suelto es una fuga. Vamos a atarlos.
            </p>
          </div>
        </section>

        {/* 2 — La fuga */}
        <section className="min-h-screen flex items-center">
          <div className="px-6 md:px-10 max-w-4xl mx-auto">
            <p className="font-sans text-sm uppercase tracking-widest text-sage/90 mb-6">
              La fuga
            </p>
            <h2 className="font-display text-sage text-4xl md:text-6xl tracking-tighter2 mb-6">
              Llamadas sin contestar. Recordatorios que no salen. Huecos que
              nadie rellena.
            </h2>
            <p className="text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed">
              Cada cabo suelto es un paciente que se va sin aparecer en ninguna
              métrica. No lo ves porque nunca llegó a entrar.
            </p>
          </div>
        </section>

        {/* 3 — El diagnóstico */}
        <section className="min-h-screen flex items-center">
          <div className="px-6 md:px-10 max-w-4xl mx-auto">
            <p className="font-sans text-sm uppercase tracking-widest text-sage/90 mb-6">
              El diagnóstico
            </p>
            <h2 className="font-display text-sage text-3xl md:text-5xl tracking-tighter2 mb-6">
              No lo tapes a ciegas. Primero, el Diagnóstico de Fuga.
            </h2>
            <p className="text-lg text-charcoal/80 max-w-2xl leading-relaxed">
              Medimos tus fugas con datos reales de tu clínica — no con medias
              del sector. Sabrás cuánto pierdes antes de tocar nada.
            </p>
          </div>
        </section>

        {/* 4 — La automatización */}
        <section className="min-h-screen flex items-center">
          <div className="px-6 md:px-10 max-w-4xl mx-auto">
            <p className="font-sans text-sm uppercase tracking-widest text-sage/90 mb-6">
              La automatización
            </p>
            <h2 className="font-display text-sage text-4xl md:text-6xl tracking-tighter2 mb-6">
              Después, atamos los cabos uno a uno.
            </h2>
            <p className="text-lg text-charcoal/80 max-w-2xl leading-relaxed">
              Recordatorios, recuperación de huecos, respuesta a primera hora —
              con IA, integrado con lo que ya usas. Sin cambiar tu forma de
              trabajar.
            </p>
          </div>
        </section>

        {/* 5 — La prueba */}
        <section className="min-h-screen flex items-center">
          <div className="px-6 md:px-10 max-w-4xl mx-auto">
            <p className="font-sans text-sm uppercase tracking-widest text-sage/90 mb-6">
              La prueba
            </p>
            <h2 className="font-display text-sage text-4xl md:text-6xl tracking-tighter2 mb-6">
              Esta web es la demostración.
            </h2>
            <p className="text-lg text-charcoal/80 max-w-2xl leading-relaxed">
              Si dudas de que sepamos automatizar, mira dónde estás leyendo
              esto. La capacidad se enseña, no se cuenta.
            </p>
          </div>
        </section>

        {/* 6 — El cierre */}
        <section className="min-h-screen flex items-center">
          <div className="px-6 md:px-10 max-w-4xl mx-auto">
            <p className="font-sans text-sm uppercase tracking-widest text-sage/90 mb-6">
              El cierre
            </p>
            <h2 className="font-display text-sage text-4xl md:text-6xl tracking-tighter2 mb-8">
              ¿Cuánto pierde tu clínica ahora mismo?
            </h2>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium bg-terracotta text-charcoal hover:bg-sage hover:text-cream transition-colors"
            >
              Reservar diagnóstico de fuga
              <span aria-hidden>→</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
