"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
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

// Eyebrow editorial: número de estación + filete terracota + etiqueta.
// Da sensación de recorrido cuidado (lo "moderno" que pedía David) a
// coste 0 — sin colores nuevos, marca cerrada.
function Eyebrow({
  index,
  children,
}: {
  index: string;
  children: ReactNode;
}) {
  return (
    <p className="flex items-center gap-3 font-sans text-sm uppercase tracking-widest text-sage/90 mb-6">
      <span className="text-terracotta tabular-nums">{index}</span>
      <span className="h-px w-8 bg-terracotta/60" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/**
 * "El recorrido del cabo". Cada estación se entiende fuga→diagnóstico→CTA
 * SOLO deslizando, sin explorar nada (regla M-B Parte 2). El 3D es
 * atmósfera detrás del copy HTML. Si prefers-reduced-motion: no se monta
 * el 3D, Lenis/Reveal no se activan (cortan solos) y queda la v2 lineal
 * completa — nunca una página vacía.
 */
export default function WorldPrototype() {
  const [enabled, setEnabled] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

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

  // Un solo listener: oculta la pista "desliza" y mueve la barra de
  // progreso de forma IMPERATIVA (sin re-render → no roza el perf 88).
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setScrolled(true);
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <SmoothScroll>
      <main className="relative bg-cream text-charcoal">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>

        {/* Barra de progreso del recorrido */}
        <div
          className="fixed top-0 left-0 right-0 z-30 h-[3px]"
          aria-hidden
        >
          <div
            ref={barRef}
            className="h-full bg-terracotta origin-left scale-x-0"
          />
        </div>

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
                <Eyebrow index="01">
                  Automatización con IA · Clínicas
                </Eyebrow>
                <h1 className="font-display text-sage text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tighter2 mb-8">
                  Tu clínica pierde pacientes
                  <br />
                  <span className="text-terracotta">
                    que nunca llegas a ver.
                  </span>
                </h1>
                <p className="font-sans text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed">
                  Cada cabo suelto es una fuga de pacientes. Vamos a
                  atarlos.
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
                <Eyebrow index="02">La fuga</Eyebrow>
                <h2 className="font-display text-sage text-3xl sm:text-4xl md:text-5xl tracking-tighter2 leading-[1.1] mb-6">
                  La llamada que entró en plena consulta. El presupuesto
                  que nadie siguió. El hueco que quedó vacío.
                </h2>
                <p className="text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed">
                  Cada cabo suelto es un paciente que se va — y no aparece
                  en ningún informe, porque nunca llegó a ser una cita.
                </p>
              </Reveal>
            </div>
          </section>

          {/* 3 — El diagnóstico */}
          <section className="min-h-screen flex items-center">
            <div className="px-6 md:px-10 max-w-4xl mx-auto w-full">
              <Reveal>
                <Eyebrow index="03">El diagnóstico</Eyebrow>
                <h2 className="font-display text-sage text-4xl sm:text-5xl md:text-6xl tracking-tighter2 leading-[1.1] mb-6">
                  No tapes la fuga a ciegas. Empieza por el Diagnóstico de
                  Fuga.
                </h2>
                <p className="text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed">
                  Medimos por dónde pierde pacientes tu clínica con tus
                  datos reales, no con medias del sector. Sabrás cuánto se
                  escapa antes de cambiar nada.
                </p>
              </Reveal>
            </div>
          </section>

          {/* 4 — La automatización */}
          <section className="min-h-screen flex items-center">
            <div className="px-6 md:px-10 max-w-4xl mx-auto w-full">
              <Reveal>
                <Eyebrow index="04">La automatización</Eyebrow>
                <h2 className="font-display text-sage text-3xl sm:text-4xl md:text-5xl tracking-tighter2 leading-[1.1] mb-6">
                  Después atamos cada cabo, uno a uno.
                </h2>
                <p className="text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed">
                  Confirmación de citas, recuperación de huecos, respuesta
                  inmediata fuera de horario. Con IA, sobre las
                  herramientas que ya usas — sin cambiar cómo trabaja tu
                  equipo.
                </p>
              </Reveal>
            </div>
          </section>

          {/* 5 — La prueba */}
          <section className="min-h-screen flex items-center">
            <div className="px-6 md:px-10 max-w-4xl mx-auto w-full">
              <Reveal>
                <Eyebrow index="05">La prueba</Eyebrow>
                <h2 className="font-display text-sage text-4xl sm:text-5xl md:text-6xl tracking-tighter2 leading-[1.1] mb-6">
                  ¿Sabemos hacerlo? Estás dentro de un ejemplo.
                </h2>
                <p className="text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed">
                  Esta web la hemos construido nosotros, de cero. La
                  capacidad no se cuenta: se enseña. Lo siguiente que te
                  enseñamos es tu propia fuga.
                </p>
              </Reveal>
            </div>
          </section>

          {/* 6 — El cierre */}
          <section className="min-h-screen flex flex-col justify-center">
            <div className="px-6 md:px-10 max-w-4xl mx-auto w-full">
              <Reveal>
                <Eyebrow index="06">El cierre</Eyebrow>
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
                <p className="mt-6 font-sans text-sm text-charcoal/70">
                  30 minutos · sin compromiso · te vas con tu cifra de
                  fuga.
                </p>
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
