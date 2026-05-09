import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/34688949417?text=" +
  encodeURIComponent(
    "Hola David, vengo de la web de Lazo. Quiero ver cómo automatizaríais mi negocio."
  );

const CUPOS_TOTALES = 9;

const verticales = [
  {
    nombre: "Clínicas y centros estéticos",
    leak: "Consultas fuera de horario que llegan al día siguiente y el lead ya se enfrió.",
    promesa: "Atención 24/7 en WhatsApp + agenda integrada con Doctoralia o el software que ya uses.",
    setup: "1.325 €",
    retainer: "375 €/mes",
    setupEstandar: "2.650 €",
  },
  {
    nombre: "Despachos de abogados",
    leak: "Llamadas y emails sin filtrar que comen horas del junior antes de saber si hay caso.",
    promesa: "Cribado de consultas (urgente / no urgente / fuera de ámbito) y enrutamiento al abogado correcto.",
    setup: "1.750 €",
    retainer: "550 €/mes",
    setupEstandar: "3.500 €",
  },
  {
    nombre: "Inmobiliarias",
    leak: "Leads de Idealista o Fotocasa sin cualificar, repartidos a mano y a destiempo.",
    promesa: "Cualificación automática (zona, presupuesto, urgencia) y reparto al agente correcto.",
    setup: "1.500 €",
    retainer: "475 €/mes",
    setupEstandar: "3.000 €",
  },
];

const proceso = [
  { fase: "Auditoría", dias: "Días 1-3", detalle: "Mapeo de tu operativa, accesos a tu CRM y a WhatsApp." },
  { fase: "Construcción", dias: "Días 4-10", detalle: "Flujos en n8n, prompts adaptados y pruebas con datos reales." },
  { fase: "Despliegue", dias: "Días 11-21", detalle: "Go-live con monitorización y formación de tu equipo." },
  { fase: "Medición", dias: "Días 22-30", detalle: "Datos reales, ajustes y primer reporting." },
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

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <header className="px-6 md:px-10 py-6 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-3" aria-label="Lazo, inicio">
          <LogoMark className="h-7 w-12" />
          <Wordmark className="text-2xl" />
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-sage hover:text-terracotta transition-colors"
        >
          Hablar con el equipo →
        </a>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-12 md:pt-24 pb-20 md:pb-32 max-w-5xl mx-auto">
        <p className="font-sans text-sm uppercase tracking-widest text-sage/70 mb-6">
          Agencia de automatización IA · Clínicas · Despachos · Inmobiliarias
        </p>
        <h1 className="font-display text-sage text-5xl md:text-7xl leading-[1.05] tracking-tighter2 mb-8">
          Atamos los cabos sueltos<br />
          <span className="text-terracotta">de tu negocio.</span>
        </h1>
        <p className="font-sans text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed mb-10">
          Hay tiempo que tu negocio pierde en tareas que ni siquiera ves: contestar el mismo WhatsApp,
          picar facturas, recordar emails que se quedaron sin respuesta. Unimos esos hilos sueltos con IA
          y los atamos a las herramientas que <em className="not-italic underline decoration-terracotta decoration-2 underline-offset-4">ya usas</em>.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-sage text-cream px-7 py-4 rounded-full font-medium hover:bg-terracotta transition-colors"
          >
            Hablar con el equipo por WhatsApp
            <span aria-hidden>→</span>
          </a>
          <a
            href="#oferta"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-medium text-sage border-2 border-sage/20 hover:border-sage transition-colors"
          >
            Ver oferta de lanzamiento
          </a>
        </div>
        <p className="mt-6 text-sm text-charcoal/60">
          Sin migrar de herramientas. En 30 días funcionando.
        </p>
      </section>

      {/* Qué hace Lazo */}
      <section className="bg-cream-light py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-sage text-3xl md:text-5xl tracking-tighter2 mb-12 max-w-3xl">
            No te vendemos un chatbot. Te montamos el sistema que tu negocio ya debería tener.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="text-terracotta font-display text-4xl mb-3">01</div>
              <h3 className="font-display text-2xl text-sage mb-3">Atención 24/7</h3>
              <p className="text-charcoal/80 leading-relaxed">
                Un asistente IA contesta consultas repetidas en WhatsApp. Lo que no sabe, te lo escala con
                contexto ya preparado.
              </p>
            </div>
            <div>
              <div className="text-terracotta font-display text-4xl mb-3">02</div>
              <h3 className="font-display text-2xl text-sage mb-3">Captura de leads</h3>
              <p className="text-charcoal/80 leading-relaxed">
                Cada conversación queda registrada con datos limpios en tu CRM. Nada se pierde por estar en
                otra app.
              </p>
            </div>
            <div>
              <div className="text-terracotta font-display text-4xl mb-3">03</div>
              <h3 className="font-display text-2xl text-sage mb-3">Seguimiento automático</h3>
              <p className="text-charcoal/80 leading-relaxed">
                Recordatorios, confirmaciones y mensajes de "¿sigues interesado?" según tu proceso real, no
                plantillas genéricas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verticales */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-sm uppercase tracking-widest text-sage/70 mb-4">
            Tres verticales. Nada más.
          </p>
          <h2 className="font-display text-sage text-3xl md:text-5xl tracking-tighter2 mb-4 max-w-3xl">
            Trabajamos solo donde el 80% de los problemas ya los hemos visto.
          </h2>
          <p className="text-charcoal/70 max-w-2xl mb-12">
            Si tu negocio no encaja en uno de estos tres, te lo decimos en la primera llamada.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {verticales.map((v) => (
              <article
                key={v.nombre}
                className="bg-cream-light rounded-2xl p-7 flex flex-col gap-4 border border-sage/10"
              >
                <h3 className="font-display text-2xl text-sage leading-tight">{v.nombre}</h3>
                <p className="text-sm text-charcoal/70 italic">"{v.leak}"</p>
                <p className="text-charcoal/85 leading-relaxed flex-1">{v.promesa}</p>
                <div className="pt-4 border-t border-sage/10">
                  <p className="text-xs uppercase tracking-widest text-sage/60 mb-1">Oferta lanzamiento</p>
                  <p className="font-display text-2xl text-sage">
                    {v.setup} <span className="text-base text-charcoal/60">setup</span>
                  </p>
                  <p className="text-sm text-charcoal/70">
                    + {v.retainer}
                    <span className="block text-xs text-charcoal/50 mt-1">
                      Estándar: {v.setupEstandar} · 50% off setup primeros 3 cupos
                    </span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso 30 días */}
      <section className="bg-sage text-cream py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-sm uppercase tracking-widest text-cream/60 mb-4">
            Cómo funciona
          </p>
          <h2 className="font-display text-3xl md:text-5xl tracking-tighter2 mb-12 max-w-3xl">
            En 30 días pasamos de auditoría a sistema vivo en tu negocio.
          </h2>
          <ol className="grid md:grid-cols-4 gap-6">
            {proceso.map((p, i) => (
              <li key={p.fase} className="border-t border-cream/20 pt-5">
                <p className="text-terracotta font-display text-3xl mb-2">0{i + 1}</p>
                <p className="text-xs uppercase tracking-widest text-cream/60 mb-1">{p.dias}</p>
                <h3 className="font-display text-xl mb-2">{p.fase}</h3>
                <p className="text-cream/80 text-sm leading-relaxed">{p.detalle}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Oferta lanzamiento */}
      <section id="oferta" className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-cream-light border-2 border-terracotta/30 rounded-3xl p-8 md:p-14">
            <p className="font-sans text-sm uppercase tracking-widest text-terracotta mb-4">
              Oferta de lanzamiento · {CUPOS_TOTALES} cupos totales
            </p>
            <h2 className="font-display text-sage text-3xl md:text-5xl tracking-tighter2 mb-6">
              Los primeros 3 clientes de cada vertical pagan la mitad del setup.
            </h2>
            <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
              A cambio te pedimos un testimonio en vídeo a los 60 días, un caso de éxito documentado y
              permiso para usar tu logo. Si en 60 días los resultados no justifican el testimonio, no lo
              grabamos. Sin penalización.
            </p>
            <ul className="space-y-3 mb-10 text-charcoal/85">
              <li className="flex items-start gap-3">
                <span className="text-terracotta font-display text-xl leading-none mt-1">·</span>
                <span>50% off solo en el setup. El retainer mensual se mantiene.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-terracotta font-display text-xl leading-none mt-1">·</span>
                <span>Compromiso de retainer de 6 meses (paga el resto si cancelas antes).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-terracotta font-display text-xl leading-none mt-1">·</span>
                <span>Cupo se reserva al firmar, no antes. Sin lista de espera ficticia.</span>
              </li>
            </ul>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-terracotta text-cream px-7 py-4 rounded-full font-medium hover:bg-sage transition-colors"
            >
              Reservar 20 min con el equipo
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stack / confianza */}
      <section className="py-16 md:py-20 px-6 md:px-10 border-t border-sage/10">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-sm uppercase tracking-widest text-sage/70 mb-6 text-center">
            Cómo lo construimos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-charcoal/60 font-display text-xl md:text-2xl">
            <span>Claude</span>
            <span className="text-terracotta">·</span>
            <span>n8n</span>
            <span className="text-terracotta">·</span>
            <span>360dialog</span>
            <span className="text-terracotta">·</span>
            <span>Cal.com</span>
            <span className="text-terracotta">·</span>
            <span>Tu CRM</span>
          </div>
          <p className="text-center text-sm text-charcoal/60 mt-6 max-w-2xl mx-auto">
            Datos en servidores europeos. Tu CRM no se toca: nos integramos vía API. Sin lock-in: si te vas,
            te llevas tus datos.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-sage text-4xl md:text-6xl tracking-tighter2 mb-6">
            ¿Hablamos 20 minutos?
          </h2>
          <p className="text-lg text-charcoal/80 mb-10 leading-relaxed">
            Sin presentación corporativa. Te pregunto qué se te escapa hoy y, si encaja, te montamos un
            piloto. Si no encaja, te lo digo en la misma llamada.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-sage text-cream px-8 py-4 rounded-full font-medium hover:bg-terracotta transition-colors text-lg"
          >
            Escribir por WhatsApp
            <span aria-hidden>→</span>
          </a>
          <p className="mt-6 text-sm text-charcoal/60">
            o escribe a{" "}
            <a
              href="mailto:hola@lazo.agency"
              className="underline decoration-terracotta underline-offset-4 hover:text-sage"
            >
              hola@lazo.agency
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cream-light px-6 md:px-10 py-10 border-t border-sage/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <LogoMark className="h-6 w-10" />
            <Wordmark className="text-xl" />
            <span className="text-sm text-charcoal/60 ml-3">
              Atamos los cabos sueltos de tu negocio.
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal/70">
            <a href="mailto:hola@lazo.agency" className="hover:text-sage">hola@lazo.agency</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-sage">
              WhatsApp
            </a>
            <span className="text-charcoal/40">© {new Date().getFullYear()} Lazo</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
