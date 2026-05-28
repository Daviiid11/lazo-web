import Reveal from "./_components/Reveal";
import Acto from "./_components/layout/Acto";
import Footer from "./_components/layout/Footer";
import Container from "./_components/ui/Container";
import Eyebrow from "./_components/ui/Eyebrow";
import Titular from "./_components/ui/Titular";
import CTAPrimary from "./_components/conversion/CTAPrimary";
import CTASecondary from "./_components/conversion/CTASecondary";
import { ACTO_01, ACTO_02, ACTO_03, ACTO_04, ACTO_05, ACTO_06 } from "./_content/actos";

export default function Page() {
  return (
    <main className="min-h-screen">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>

      {/* 01 — Reconocimiento (hero) */}
      <section
        id="acto-01"
        className="relative overflow-hidden min-h-[92vh] flex items-center"
      >
        <Container className="relative z-10 pt-28 md:pt-32 pb-24 md:pb-32">
          <div id="contenido" className="max-w-3xl">
            <Eyebrow>{ACTO_01.eyebrow}</Eyebrow>
            <Titular as="h1" size="h1" className="mt-6 mb-6">
              {ACTO_01.titular}
            </Titular>
            <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-2xl">
              {ACTO_01.cuerpo}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CTAPrimary />
              <CTASecondary label="Ver el coste" href="#acto-02" />
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — Cuantificación */}
      <Acto id="acto-02" tone="crema-light" width="default">
        <Reveal>
          <Eyebrow>{ACTO_02.eyebrow}</Eyebrow>
          <Titular className="mt-6 mb-2 max-w-3xl">{ACTO_02.titular}</Titular>
          {ACTO_02.cuerpo && (
            <p className="font-sans text-lg text-charcoal/80 leading-relaxed max-w-2xl">
              {ACTO_02.cuerpo}
            </p>
          )}
          {ACTO_02.nota && (
            <p className="mt-4 font-sans text-sm text-charcoal/60 max-w-2xl">
              {ACTO_02.nota}
            </p>
          )}
          <div className="mt-10">
            <CTASecondary label="Cómo lo medimos" href="#acto-04" />
          </div>
        </Reveal>
      </Acto>

      {/* 03 — Alivio (inversión de paleta para abrir aire) */}
      <Acto id="acto-03" tone="sage" width="default">
        <Reveal>
          <Eyebrow>{ACTO_03.eyebrow}</Eyebrow>
          <Titular tone="cream" className="mt-6 mb-6 max-w-3xl">
            {ACTO_03.titular}
          </Titular>
          <p className="font-sans text-lg text-cream/85 leading-relaxed max-w-2xl">
            {ACTO_03.cuerpo}
          </p>
        </Reveal>
      </Acto>

      {/* 04 — Credibilidad */}
      <Acto id="acto-04" tone="crema" width="default">
        <Reveal>
          <Eyebrow>{ACTO_04.eyebrow}</Eyebrow>
          <Titular className="mt-6 mb-6 max-w-3xl">{ACTO_04.titular}</Titular>
          {ACTO_04.cuerpo && (
            <p className="font-sans text-lg text-charcoal/80 leading-relaxed max-w-2xl">
              {ACTO_04.cuerpo}
            </p>
          )}
        </Reveal>
      </Acto>

      {/* 05 — Seguridad */}
      <Acto id="acto-05" tone="crema-light" width="default">
        <Reveal>
          <Eyebrow>{ACTO_05.eyebrow}</Eyebrow>
          <Titular className="mt-6 mb-6 max-w-3xl">{ACTO_05.titular}</Titular>
          <p className="font-sans text-lg text-charcoal/80 leading-relaxed max-w-2xl">
            {ACTO_05.cuerpo}
          </p>
        </Reveal>
      </Acto>

      {/* 06 — Acción (cierre con CTA primario) */}
      <Acto id="acto-06" tone="sage" width="narrow" className="text-center">
        <Reveal>
          <div className="flex justify-center">
            <Eyebrow>{ACTO_06.eyebrow}</Eyebrow>
          </div>
          <Titular tone="cream" size="h1" className="mt-6 mb-6">
            {ACTO_06.titular}
          </Titular>
          <p className="font-sans text-lg text-cream/85 leading-relaxed mb-10 max-w-xl mx-auto">
            {ACTO_06.cuerpo}
          </p>
          <CTAPrimary size="large" />
        </Reveal>
      </Acto>

      <Footer />
    </main>
  );
}
