import Link from "next/link";
import Reveal from "./_components/Reveal";
import HeroBackdrop from "./_components/HeroBackdrop";

const CAL_URL = "https://cal.eu/lazo-agency/15min";

const fugas = [
  {
    n: "01",
    titulo: "Llamadas perdidas",
    detalle:
      "Las que entran fuera de horario, o mientras tu recepción atiende a otro paciente. Casi ninguna se devuelve. Ese paciente ya está llamando a la clínica de al lado.",
  },
  {
    n: "02",
    titulo: "WhatsApp sin responder",
    detalle:
      "El primer mensaje llega con ganas. Si tarda horas en contestarse, llega frío. Si llega al día siguiente, ya no llega.",
  },
  {
    n: "03",
    titulo: "Citas sin confirmar",
    detalle:
      "Huecos que no se recuperan, recordatorios que no salen, pacientes que no avisan. Cada no-show es una hora de agenda que ya no vuelve.",
  },
  {
    n: "04",
    titulo: "Leads de campañas sin seguir",
    detalle:
      "Pagas por que te encuentren y luego el formulario o el anuncio se queda sin respuesta. Pagaste dos veces: el anuncio y el paciente que no entró.",
  },
];

function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="-65 -35 130 70"
      className={className}
      fill="none"
      stroke="#C97B5A"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M -55,0 C -55,-28 -18,-28 0,0 C 18,28 55,28 55,0 C 55,-28 18,-28 0,0 C -18,28 -55,28 -55,0" />
    </svg>
  );
}

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-sage tracking-tighter2 ${className}`}>
      lazo<span className="text-terracotta">.</span>
    </span>
  );
}

function CtaButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-7 py-4 font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-terracotta text-cream hover:bg-sage"
      : "text-sage border-2 border-sage/20 hover:border-sage";
  return (
    <a
      href={CAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Nav — CTA único persistente */}
      <header className="sticky top-0 z-50 bg-cream/85 backdrop-blur-sm border-b border-sage/10">
        <div className="px-6 md:px-10 py-4 flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-3" aria-label="Lazo, inicio">
            <LogoMark className="h-6 w-11" />
            <Wordmark className="text-xl" />
          </Link>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium rounded-full bg-sage text-cream px-5 py-2.5 hover:bg-terracotta transition-colors"
          >
            Reservar diagnóstico
          </a>
        </div>
      </header>

      {/* 00 — Hero */}
      <section className="relative overflow-hidden">
        {/* Fondo: fallback estático SSR (no-JS / reduced-motion) + lienzo 3D encima */}
        <div aria-hidden className="absolute inset-0 z-0">
          <LogoMark className="absolute -right-24 top-1/2 -translate-y-1/2 h-[26rem] w-auto opacity-[0.06]" />
          <HeroBackdrop />
        </div>
        <div className="relative z-10 px-6 md:px-10 pt-16 md:pt-28 pb-24 md:pb-36 max-w-5xl mx-auto">
          <p className="font-sans text-sm uppercase tracking-widest text-sage/70 mb-6">
            Automatización con IA · Clínicas
          </p>
        <h1 className="font-display text-sage text-5xl md:text-7xl leading-[1.05] tracking-tighter2 mb-8">
          Tu clínica pierde pacientes
          <br />
          <span className="text-terracotta">que nunca llegas a ver.</span>
        </h1>
        <p className="font-sans text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed mb-10">
          Cada llamada que no se devuelve, cada WhatsApp que se enfría, cada cita
          que no se confirma es un cabo suelto. No te damos la media del sector:
          medimos los tuyos y te decimos{" "}
          <em className="not-italic underline decoration-terracotta decoration-2 underline-offset-4">
            cuánto te cuestan
          </em>{" "}
          — antes de tocar nada.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <CtaButton>Reservar diagnóstico de fuga</CtaButton>
          <a
            href="#fuga"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-medium text-sage border-2 border-sage/20 hover:border-sage transition-colors"
          >
            Ver de qué hablamos
          </a>
        </div>
          <p className="mt-6 text-sm text-charcoal/60">
            15 minutos. Sin presentación corporativa. Sin compromiso de contratar nada.
          </p>
        </div>
      </section>

      {/* 01 — La fuga */}
      <section id="fuga" className="bg-cream-light py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-sans text-sm uppercase tracking-widest text-sage/70 mb-4">
              El problema
            </p>
            <h2 className="font-display text-sage text-3xl md:text-5xl tracking-tighter2 mb-6 max-w-3xl">
              La fuga no aparece en ninguna hoja de cálculo.
            </h2>
            <p className="text-charcoal/70 max-w-2xl mb-14 leading-relaxed">
              No es un agujero, son cuatro grietas pequeñas que nadie suma. Cada
              una parece tolerable. Juntas, son la facturación de un mes.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {fugas.map((f, i) => (
              <Reveal
                key={f.n}
                delay={i * 0.08}
                className="border-t border-sage/15 pt-5"
              >
                <span className="font-display text-terracotta text-3xl">
                  {f.n}
                </span>
                <h3 className="font-display text-2xl text-sage mt-2 mb-3">
                  {f.titulo}
                </h3>
                <p className="text-charcoal/80 leading-relaxed">{f.detalle}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — El diagnóstico (la cuña) */}
      <section className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-sans text-sm uppercase tracking-widest text-sage/70 mb-4">
              El primer paso
            </p>
            <h2 className="font-display text-sage text-3xl md:text-5xl tracking-tighter2 mb-6 max-w-3xl">
              No lo tapes a ciegas. Primero, el Diagnóstico de Fuga.
            </h2>
            <p className="text-lg text-charcoal/80 max-w-2xl mb-10 leading-relaxed">
              Medimos tus cuatro fugas con datos reales de tu clínica — no con
              medias del sector. Te entregamos cuánto pierdes al mes, qué grieta
              cuesta más y por dónde se tapa primero. En un documento, en una
              llamada de 20 minutos.
            </p>
            <ul className="space-y-4 mb-12 text-charcoal/85 max-w-2xl">
              <li className="flex items-start gap-3">
                <span className="text-terracotta font-display text-xl leading-none mt-1">
                  ·
                </span>
                <span>
                  Lo medimos nosotros: probamos tu clínica como lo haría un
                  paciente y revisamos tu operativa contigo.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-terracotta font-display text-xl leading-none mt-1">
                  ·
                </span>
                <span>
                  Te llevas el diagnóstico aunque no contrates nada después. Es
                  tuyo.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-terracotta font-display text-xl leading-none mt-1">
                  ·
                </span>
                <span>Precio cerrado. Sin propuesta de 40 páginas.</span>
              </li>
            </ul>
            <CtaButton>Reservar mi diagnóstico</CtaButton>
          </Reveal>
        </div>
      </section>

      {/* 03 — La automatización */}
      <section className="bg-sage text-cream py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-sans text-sm uppercase tracking-widest text-cream/60 mb-4">
              Y luego
            </p>
            <h2 className="font-display text-3xl md:text-5xl tracking-tighter2 mb-6 max-w-3xl">
              Atamos cada cabo, uno a uno.
            </h2>
            <p className="text-cream/85 max-w-2xl mb-12 leading-relaxed text-lg">
              Cuando sabes dónde pierdes, taparlo deja de ser una corazonada.
              Montamos solo lo que el diagnóstico justifica — integrado con lo
              que ya usas, sin migrar de software.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                t: "Atención que no duerme",
                d: "WhatsApp y llamadas atendidas 24/7. Lo que la IA no resuelve, te llega con el contexto ya hecho.",
              },
              {
                t: "Agenda que se llena sola",
                d: "Confirmaciones, recordatorios y recuperación de huecos según tu proceso real, no plantillas genéricas.",
              },
              {
                t: "Ningún lead se cae",
                d: "Cada conversación queda registrada y seguida en el software que ya tienes. Nada vive en una libreta.",
              },
            ].map((c, i) => (
              <Reveal
                key={c.t}
                delay={i * 0.08}
                className="border-t border-cream/20 pt-5"
              >
                <h3 className="font-display text-xl mb-2">{c.t}</h3>
                <p className="text-cream/80 text-sm leading-relaxed">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — La prueba */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-sans text-sm uppercase tracking-widest text-sage/70 mb-4">
              Por qué creernos
            </p>
            <h2 className="font-display text-sage text-3xl md:text-5xl tracking-tighter2 mb-6 max-w-3xl">
              Esta web es la demostración.
            </h2>
            <p className="text-charcoal/80 max-w-2xl mb-12 leading-relaxed text-lg">
              Lo que ves —cómo se mueve, cómo está construido— lo hacemos
              nosotros. Si así cuidamos nuestra propia casa, hazte una idea de
              cómo cuidaremos tu sistema.
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-charcoal/55 font-display text-xl md:text-2xl mb-6">
              <span>Claude</span>
              <span className="text-terracotta">·</span>
              <span>n8n</span>
              <span className="text-terracotta">·</span>
              <span>360dialog</span>
              <span className="text-terracotta">·</span>
              <span>Cal.com</span>
              <span className="text-terracotta">·</span>
              <span>Tu software</span>
            </div>
            <p className="text-sm text-charcoal/60 max-w-2xl">
              Datos en servidores europeos. Tu software no se toca: nos
              integramos por API. Sin lock-in: si te vas, te llevas tus datos.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 05 — Cierre / CTA */}
      <section className="bg-cream-light py-24 md:py-36 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-display text-sage text-4xl md:text-6xl tracking-tighter2 mb-6">
              ¿Cuánto pierde tu clínica ahora mismo?
            </h2>
            <p className="text-lg text-charcoal/80 mb-10 leading-relaxed">
              No lo adivines. En 15 minutos te lo decimos y ponemos en marcha tu
              diagnóstico. Si no encaja, te lo decimos en la misma llamada.
            </p>
            <CtaButton className="text-lg px-8">Reservar diagnóstico</CtaButton>
            <p className="mt-6 text-sm text-charcoal/60">
              o escribe a{" "}
              <a
                href="mailto:hola@lazo.agency"
                className="underline decoration-terracotta underline-offset-4 hover:text-sage"
              >
                hola@lazo.agency
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-10 border-t border-sage/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <LogoMark className="h-6 w-10" />
            <Wordmark className="text-xl" />
            <span className="text-sm text-charcoal/60 ml-3">
              Atamos los cabos sueltos de tu negocio.
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal/70">
            <a href="mailto:hola@lazo.agency" className="hover:text-sage">
              hola@lazo.agency
            </a>
            <Link href="/legal" className="hover:text-sage">
              Aviso legal y privacidad
            </Link>
            <span className="text-charcoal/40">
              © {new Date().getFullYear()} Lazo
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
