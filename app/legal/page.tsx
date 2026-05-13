import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal y privacidad — Lazo",
  description:
    "Información legal, política de privacidad y uso de cookies en lazo.agency.",
  robots: { index: false, follow: true },
};

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

const ULTIMA_ACTUALIZACION = "13 de mayo de 2026";

export default function LegalPage() {
  return (
    <main className="min-h-screen">
      <header className="px-6 md:px-10 py-6 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-3" aria-label="Lazo, inicio">
          <LogoMark className="h-7 w-12" />
          <Wordmark className="text-2xl" />
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-sage hover:text-terracotta transition-colors"
        >
          ← Volver al inicio
        </Link>
      </header>

      <article className="px-6 md:px-10 py-12 md:py-20 max-w-3xl mx-auto">
        <p className="font-sans text-sm uppercase tracking-widest text-sage/70 mb-4">
          Información legal
        </p>
        <h1 className="font-display text-sage text-4xl md:text-6xl tracking-tighter2 leading-[1.05] mb-6">
          Aviso legal,
          <br />
          <span className="text-terracotta">privacidad y cookies.</span>
        </h1>
        <p className="text-charcoal/70 mb-12">
          Última actualización: {ULTIMA_ACTUALIZACION}.
        </p>

        {/* TOC */}
        <nav
          aria-label="Índice"
          className="mb-16 p-6 border-l-4 border-terracotta bg-cream-light rounded-r-lg"
        >
          <p className="font-display text-lg text-sage mb-3">Contenido</p>
          <ol className="space-y-1 text-charcoal/85 text-sm">
            <li>
              1. <a href="#identidad" className="underline decoration-terracotta hover:text-sage">Identidad del prestador (LSSI art. 10)</a>
            </li>
            <li>
              2. <a href="#privacidad" className="underline decoration-terracotta hover:text-sage">Política de privacidad (RGPD / LOPDGDD)</a>
            </li>
            <li>
              3. <a href="#cookies" className="underline decoration-terracotta hover:text-sage">Política de cookies</a>
            </li>
            <li>
              4. <a href="#derechos" className="underline decoration-terracotta hover:text-sage">Ejercicio de derechos</a>
            </li>
            <li>
              5. <a href="#cambios" className="underline decoration-terracotta hover:text-sage">Cambios en este aviso</a>
            </li>
          </ol>
        </nav>

        {/* 1. Identidad */}
        <section id="identidad" className="mb-16 scroll-mt-12">
          <h2 className="font-display text-sage text-2xl md:text-4xl tracking-tighter2 mb-6">
            1. Identidad del prestador
          </h2>
          <p className="text-charcoal/85 leading-relaxed mb-4">
            En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad
            de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos
            identificativos del responsable del sitio web{" "}
            <a href="https://lazo.agency" className="underline decoration-terracotta">
              lazo.agency
            </a>
            :
          </p>
          <dl className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-x-6 gap-y-3 bg-cream-light p-6 rounded-lg border border-sage/10">
            <dt className="font-medium text-sage">Titular</dt>
            <dd className="text-charcoal/85">David Cristóbal García</dd>

            <dt className="font-medium text-sage">Actividad</dt>
            <dd className="text-charcoal/85">
              Lazo — Agencia de automatización con inteligencia artificial para clínicas,
              despachos e inmobiliarias.
            </dd>

            <dt className="font-medium text-sage">NIF</dt>
            <dd className="text-charcoal/85 italic">[Pendiente de alta como autónomo]</dd>

            <dt className="font-medium text-sage">Domicilio</dt>
            <dd className="text-charcoal/85">Zaragoza, España</dd>

            <dt className="font-medium text-sage">Contacto</dt>
            <dd className="text-charcoal/85">
              <a href="mailto:info@lazo.agency" className="underline decoration-terracotta">
                info@lazo.agency
              </a>
            </dd>

            <dt className="font-medium text-sage">Web</dt>
            <dd className="text-charcoal/85">
              <a href="https://lazo.agency" className="underline decoration-terracotta">
                https://lazo.agency
              </a>
            </dd>
          </dl>
          <p className="text-sm text-charcoal/60 mt-4 italic">
            La identificación fiscal completa se actualizará al formalizar el alta en
            el Régimen Especial de Trabajadores Autónomos. Mientras tanto, el canal de
            contacto válido para cualquier comunicación oficial es{" "}
            <a href="mailto:info@lazo.agency" className="underline decoration-terracotta">
              info@lazo.agency
            </a>
            .
          </p>
        </section>

        {/* 2. Privacidad */}
        <section id="privacidad" className="mb-16 scroll-mt-12">
          <h2 className="font-display text-sage text-2xl md:text-4xl tracking-tighter2 mb-6">
            2. Política de privacidad
          </h2>

          <h3 className="font-display text-xl text-sage mt-8 mb-3">
            Responsable del tratamiento
          </h3>
          <p className="text-charcoal/85 leading-relaxed">
            El responsable del tratamiento de los datos personales recogidos a través
            de este sitio web es David Cristóbal García (Lazo), con los datos de contacto
            indicados en el apartado 1.
          </p>

          <h3 className="font-display text-xl text-sage mt-8 mb-3">
            Datos que tratamos
          </h3>
          <ul className="list-disc pl-6 text-charcoal/85 space-y-2">
            <li>
              <strong>Visitantes del sitio web:</strong> dirección IP, tipo de dispositivo
              y navegador, páginas visitadas. Recogidos por nuestra infraestructura
              (Vercel) con finalidad técnica y de seguridad.
            </li>
            <li>
              <strong>Personas que nos contactan:</strong> nombre, email, teléfono
              y contenido del mensaje, cuando inicias una conversación por WhatsApp
              (<a href="https://wa.me/34688949417" className="underline decoration-terracotta">+34 688 949 417</a>),
              por email a <a href="mailto:info@lazo.agency" className="underline decoration-terracotta">info@lazo.agency</a>
              o reservas una llamada en{" "}
              <a href="https://cal.eu/lazo-agency/15min" className="underline decoration-terracotta">
                cal.eu/lazo-agency/15min
              </a>
              .
            </li>
          </ul>

          <h3 className="font-display text-xl text-sage mt-8 mb-3">
            Finalidades y base legal
          </h3>
          <ul className="list-disc pl-6 text-charcoal/85 space-y-2">
            <li>
              <strong>Atender tu consulta y mantener la conversación comercial</strong> —
              base legal: tu consentimiento al iniciar el contacto y la ejecución de
              medidas precontractuales (art. 6.1.a y 6.1.b RGPD).
            </li>
            <li>
              <strong>Mantener el sitio web operativo y seguro</strong> — base legal:
              interés legítimo de Lazo en proteger su infraestructura (art. 6.1.f
              RGPD).
            </li>
            <li>
              <strong>Cumplir obligaciones legales</strong> (fiscales, contables) si llegamos
              a formalizar una relación contractual — base legal: cumplimiento de
              obligación legal (art. 6.1.c RGPD).
            </li>
          </ul>

          <h3 className="font-display text-xl text-sage mt-8 mb-3">
            Plazos de conservación
          </h3>
          <p className="text-charcoal/85 leading-relaxed">
            Conservamos los datos de contactos comerciales mientras dure la conversación
            y, si no llegas a ser cliente, hasta 12 meses después del último contacto.
            Si llegas a ser cliente, los datos se conservan durante la duración del
            contrato y los plazos legales aplicables (6 años a efectos mercantiles, hasta
            10 para obligaciones contables).
          </p>

          <h3 className="font-display text-xl text-sage mt-8 mb-3">
            Destinatarios y encargados del tratamiento
          </h3>
          <p className="text-charcoal/85 leading-relaxed mb-3">
            Para prestar el servicio, ciertos datos se tratan a través de proveedores
            que actúan como encargados del tratamiento. Todos ellos cuentan con
            garantías de cumplimiento RGPD (cláusulas contractuales tipo o residencia
            en el Espacio Económico Europeo):
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 space-y-1">
            <li>
              <strong>Vercel Inc.</strong> — hosting de la web (servidores en UE).
            </li>
            <li>
              <strong>Google LLC</strong> — Google Workspace (correo info@lazo.agency)
              y fuentes web (Google Fonts).
            </li>
            <li>
              <strong>Meta Platforms Ireland Ltd.</strong> — WhatsApp Business (cuando
              nos escribes por WhatsApp).
            </li>
            <li>
              <strong>Cal.com Inc.</strong> — agenda de llamadas (versión cal.eu, UE).
            </li>
            <li>
              <strong>Hostinger International Ltd.</strong> — registrador del dominio.
            </li>
          </ul>
          <p className="text-charcoal/85 leading-relaxed mt-4">
            No vendemos ni cedemos tus datos a terceros con fines comerciales.
          </p>

          <h3 className="font-display text-xl text-sage mt-8 mb-3">
            Transferencias internacionales
          </h3>
          <p className="text-charcoal/85 leading-relaxed">
            Algunos proveedores (Vercel, Google, Meta) pueden tratar datos en Estados
            Unidos. Dichas transferencias se amparan en decisiones de adecuación de la
            Comisión Europea (EU-US Data Privacy Framework) o, en su defecto, en
            cláusulas contractuales tipo aprobadas por la UE.
          </p>

          <h3 className="font-display text-xl text-sage mt-8 mb-3">
            Seguridad
          </h3>
          <p className="text-charcoal/85 leading-relaxed">
            Aplicamos medidas técnicas y organizativas razonables para proteger los
            datos frente a accesos no autorizados, pérdida o alteración. Si llegamos
            a tratar datos en nombre de un cliente (encargo de tratamiento), firmamos
            el correspondiente Acuerdo de Encargo conforme al art. 28 RGPD.
          </p>
        </section>

        {/* 3. Cookies */}
        <section id="cookies" className="mb-16 scroll-mt-12">
          <h2 className="font-display text-sage text-2xl md:text-4xl tracking-tighter2 mb-6">
            3. Política de cookies
          </h2>
          <p className="text-charcoal/85 leading-relaxed mb-4">
            Este sitio web es una landing estática alojada en Vercel. <strong>No
            utilizamos cookies de seguimiento publicitario, analítica ni
            personalización.</strong> Tampoco implementamos píxeles de redes sociales.
          </p>
          <p className="text-charcoal/85 leading-relaxed mb-4">
            La infraestructura puede generar cookies estrictamente necesarias para
            el funcionamiento del sitio (sesión técnica, prevención de abuso). Estas
            cookies están exentas del deber de consentimiento conforme a la Guía
            sobre uso de cookies de la AEPD (julio 2023).
          </p>
          <p className="text-charcoal/85 leading-relaxed">
            Si en el futuro incorporamos herramientas de analítica o marketing, esta
            política se actualizará y se mostrará un banner de consentimiento
            previo conforme al artículo 22.2 LSSI.
          </p>
        </section>

        {/* 4. Derechos */}
        <section id="derechos" className="mb-16 scroll-mt-12">
          <h2 className="font-display text-sage text-2xl md:text-4xl tracking-tighter2 mb-6">
            4. Ejercicio de derechos
          </h2>
          <p className="text-charcoal/85 leading-relaxed mb-4">
            Puedes ejercer en cualquier momento los siguientes derechos sobre tus
            datos personales:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 space-y-1">
            <li><strong>Acceso</strong> a tus datos.</li>
            <li><strong>Rectificación</strong> de datos inexactos.</li>
            <li><strong>Supresión</strong> ("derecho al olvido").</li>
            <li><strong>Oposición</strong> al tratamiento.</li>
            <li><strong>Limitación</strong> del tratamiento.</li>
            <li><strong>Portabilidad</strong> de tus datos.</li>
            <li><strong>Retirada del consentimiento</strong> en cualquier momento.</li>
          </ul>
          <p className="text-charcoal/85 leading-relaxed mt-4">
            Para ejercerlos, envía un email a{" "}
            <a href="mailto:info@lazo.agency" className="underline decoration-terracotta">
              info@lazo.agency
            </a>{" "}
            indicando el derecho que deseas ejercer. Responderemos en un plazo máximo
            de un mes.
          </p>
          <p className="text-charcoal/85 leading-relaxed mt-4">
            Si consideras que el tratamiento de tus datos no se ajusta a la normativa,
            puedes presentar reclamación ante la{" "}
            <a
              href="https://www.aepd.es"
              className="underline decoration-terracotta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agencia Española de Protección de Datos (aepd.es)
            </a>
            .
          </p>
        </section>

        {/* 5. Cambios */}
        <section id="cambios" className="mb-16 scroll-mt-12">
          <h2 className="font-display text-sage text-2xl md:text-4xl tracking-tighter2 mb-6">
            5. Cambios en este aviso
          </h2>
          <p className="text-charcoal/85 leading-relaxed">
            Podemos actualizar este documento para reflejar cambios en nuestras
            prácticas, en los servicios contratados o en la normativa aplicable.
            La fecha de "última actualización" en la parte superior indica la
            versión vigente. Si los cambios son sustanciales, lo comunicaremos por
            email a quienes nos hayan facilitado datos de contacto.
          </p>
        </section>

        <hr className="border-sage/20 my-12" />

        <p className="text-sm text-charcoal/60 italic">
          Este documento se rige por la legislación española (LSSI-CE, RGPD,
          LOPDGDD). Para cualquier controversia, los juzgados competentes serán
          los del domicilio del prestador.
        </p>
      </article>

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
            <Link href="/" className="hover:text-sage">Inicio</Link>
            <a href="mailto:info@lazo.agency" className="hover:text-sage">info@lazo.agency</a>
            <span className="text-charcoal/40">© {new Date().getFullYear()} Lazo</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
