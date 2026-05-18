"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import SmoothScroll from "../SmoothScroll";
import Reveal from "../Reveal";

// Lienzo 3D lazy + sin SSR: el peso de three.js queda fuera del First Load JS.
const WorldCanvas = dynamic(() => import("./WorldCanvas"), { ssr: false });

const CAL_URL = "https://cal.eu/lazo-agency/15min";

// Si el 3D peta (WebGL ausente, fallo de three), no tumba la página: el
// copy en z-10 sigue legible = la v2 lineal. Hardening L4 (Causa 6).
class CanvasBoundary extends Component<
  { children: ReactNode },
  { fail: boolean }
> {
  state = { fail: false };
  static getDerivedStateFromError() {
    return { fail: true };
  }
  render() {
    return this.state.fail ? null : this.props.children;
  }
}

// Marca cerrada: el punto de "lazo." en terracota es el sello de la v2.
function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display tracking-tighter2 text-sage ${className}`}
    >
      lazo<span className="text-terracotta">.</span>
    </span>
  );
}

/**
 * "El recorrido del cabo" — L3: marca + pulido sobre las 6 estaciones de L2.
 * Cada estación se entiende fuga→diagnóstico→CTA SOLO deslizando, sin
 * explorar nada (regla M-B Parte 2). El 3D es atmósfera detrás del copy HTML.
 * Si prefers-reduced-motion: no se monta el 3D, Lenis/Reveal no se activan
 * (cortan solos) y queda la v2 lineal completa — nunca una página vacía.
 */
export default function WorldPrototype() {
  const [enabled, setEnabled] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // Oculta la pista "desliza" en cuanto el usuario se mueve.
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <SmoothScroll>
      <main className="relative bg-cream text-charcoal">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>

        {/* Marca fija — sin esto /lab parece una demo, no Lazo */}
        <header className="fixed top-0 left-0 z-20 px-6 md:px-10 py-6">
          <Wordmark className="text-2xl" />
        </header>

        {enabled && (
          <div className="fixed inset-0 z-0" aria-hidden>
            <CanvasBoundary>
              <WorldCanvas />
            </CanvasBoundary>
          </div>
        )}

        <div className="relative z-10">
          {/* 1 — Hero */}
          <section
            id="contenido"
            className="min-h-screen flex items-center"
          >
            <div className="px-6 md:px-10 max-w-4xl mx-auto w-full">
              <Reveal>
                <p className="font-sans text-sm uppercase tracking-widest text-sage/90 mb-6">
                  Automatización con IA · Clínicas
                </p>
                <h1 className="font-display text-sage text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tighter2 mb-8">
                  Tu clínica pierde pacientes
                  <br />
                  <span className="text-terracotta">
                    que nunca llegas a ver.
                  </span>
                </h1>
                <p className="font-sans text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed">
                  Desliza: cada cabo suelto es una fuga. Vamos a atarlos.
                </p>
              </Reveal>
            </div>

            {/* Pista de scroll — clave para M-B P2: si no, no saben deslizar */}
            <div
              className={`absolute bottom-10 left-0 right-0 flex justify-center transition-opacity duration-500 ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
              aria-hidden
            >
              <span className="font-sans text-xs uppercase tracking-widest text-sage/90">
                Desliza ↓
              </span>
            </div>
          </section>

          {/* 2 — La fuga */}
          <section className="min-h-screen flex items-center">
            <div className="px-6 md:px-10 max-w-4xl mx-auto w-full">
              <Reveal>
                <p className="font-sans text-sm uppercase tracking-widest text-sage/90 mb-6">
                  La fuga
                </p>
                <h2 className="font-display text-sage text-3xl sm:text-4xl md:text-5xl tracking-tighter2 leading-[1.1] mb-6">
                  Llamadas sin contestar. Recordatorios que no salen. Huecos
                  que nadie rellena.
                </h2>
                <p className="text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed">
                  Cada cabo suelto es un paciente que se va sin aparecer en
                  ninguna métrica. No lo ves porque nunca llegó a entrar.
                </p>
              </Reveal>
            </div>
          </section>

          {/* 3 — El diagnóstico */}
          <section className="min-h-screen flex items-center">
            <div className="px-6 md:px-10 max-w-4xl mx-auto w-full">
              <Reveal>
                <p className="font-sans text-sm uppercase tracking-widest text-sage/90 mb-6">
                  El diagnóstico
                </p>
                <h2 className="font-display text-sage text-4xl sm:text-5xl md:text-6xl tracking-tighter2 leading-[1.1] mb-6">
                  No lo tapes a ciegas. Primero, el Diagnóstico de Fuga.
                </h2>
                <p className="text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed">
                  Medimos tus fugas con datos reales de tu clínica — no con
                  medias del sector. Sabrás cuánto pierdes antes de tocar nada.
                </p>
              </Reveal>
            </div>
          </section>

          {/* 4 — La automatización */}
          <section className="min-h-screen flex items-center">
            <div className="px-6 md:px-10 max-w-4xl mx-auto w-full">
              <Reveal>
                <p className="font-sans text-sm uppercase tracking-widest text-sage/90 mb-6">
                  La automatización
                </p>
                <h2 className="font-display text-sage text-3xl sm:text-4xl md:text-5xl tracking-tighter2 leading-[1.1] mb-6">
                  Después, atamos los cabos uno a uno.
                </h2>
                <p className="text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed">
                  Recordatorios, recuperación de huecos, respuesta a primera
                  hora — con IA, integrado con lo que ya usas. Sin cambiar tu
                  forma de trabajar.
                </p>
              </Reveal>
            </div>
          </section>

          {/* 5 — La prueba */}
          <section className="min-h-screen flex items-center">
            <div className="px-6 md:px-10 max-w-4xl mx-auto w-full">
              <Reveal>
                <p className="font-sans text-sm uppercase tracking-widest text-sage/90 mb-6">
                  La prueba
                </p>
                <h2 className="font-display text-sage text-4xl sm:text-5xl md:text-6xl tracking-tighter2 leading-[1.1] mb-6">
                  Esta web es la demostración.
                </h2>
                <p className="text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed">
                  Si dudas de que sepamos automatizar, mira dónde estás leyendo
                  esto. La capacidad se enseña, no se cuenta.
                </p>
              </Reveal>
            </div>
          </section>

          {/* 6 — El cierre */}
          <section className="min-h-screen flex flex-col justify-center">
            <div className="px-6 md:px-10 max-w-4xl mx-auto w-full">
              <Reveal>
                <p className="font-sans text-sm uppercase tracking-widest text-sage/90 mb-6">
                  El cierre
                </p>
                <h2 className="font-display text-sage text-4xl sm:text-5xl md:text-7xl tracking-tighter2 leading-[1.05] mb-8">
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
              </Reveal>
            </div>

            <footer className="px-6 md:px-10 max-w-4xl mx-auto w-full mt-24 flex items-center justify-between text-sm text-charcoal/70">
              <Wordmark className="text-lg" />
              <span>
                © 2026 Lazo ·{" "}
                <a href="/legal" className="underline hover:text-charcoal">
                  Aviso legal
                </a>
              </span>
            </footer>
          </section>
        </div>
      </main>
    </SmoothScroll>
  );
}
