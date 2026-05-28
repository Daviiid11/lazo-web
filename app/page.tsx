import Reveal from "./_components/Reveal";
import Section from "./_components/layout/Section";
import Footer from "./_components/layout/Footer";
import Container from "./_components/ui/Container";
import Eyebrow from "./_components/ui/Eyebrow";
import Titular from "./_components/ui/Titular";
import ServicioCard from "./_components/ui/ServicioCard";
import PrincipiosList from "./_components/ui/PrincipiosList";
import ParaQuienGrid from "./_components/ui/ParaQuienGrid";
import FasesTrabajo from "./_components/ui/FasesTrabajo";
import FaqAccordion from "./_components/ui/FaqAccordion";
import CTAPrimary from "./_components/conversion/CTAPrimary";
import CTASecondary from "./_components/conversion/CTASecondary";
import { HOME_BLOCKS, type HomeBlock } from "./_content/home";

function renderBlock(block: HomeBlock) {
  switch (block.id) {
    case "a1-hero": {
      return (
        <section
          key={block.id}
          id={block.id}
          className="relative overflow-hidden min-h-[92vh] flex items-center bg-cream text-charcoal"
        >
          <Container className="relative z-10 pt-28 md:pt-32 pb-24 md:pb-32">
            <div id="contenido" className="max-w-3xl">
              {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
              <Titular as="h1" size="h1" className="mt-6 mb-6">
                {block.titular}
              </Titular>
              {block.cuerpo && (
                <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-2xl">
                  {block.cuerpo}
                </p>
              )}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <CTAPrimary label={block.ctaPrimario.label} />
                {block.ctaSecundario && (
                  <CTASecondary
                    label={block.ctaSecundario.label}
                    href={block.ctaSecundario.href}
                  />
                )}
              </div>
            </div>
          </Container>
        </section>
      );
    }

    case "a2-servicios": {
      return (
        <Section key={block.id} id={block.id} tone={block.tone}>
          <Reveal>
            {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
            <Titular className="mt-6 mb-4 max-w-3xl">{block.titular}</Titular>
            {block.cuerpo && (
              <p className="font-sans text-lg text-charcoal/80 leading-relaxed max-w-2xl">
                {block.cuerpo}
              </p>
            )}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {block.cards.map((card) => (
                <ServicioCard key={card.slug} card={card} />
              ))}
            </div>
          </Reveal>
        </Section>
      );
    }

    case "a3-manifiesto": {
      return (
        <Section key={block.id} id={block.id} tone="sage">
          <Reveal>
            {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
            <Titular tone="cream" className="mt-6 mb-2 max-w-3xl">
              {block.titular}
            </Titular>
            <PrincipiosList principios={block.principios} />
            {block.ctaSecundario && (
              <div className="mt-12">
                <CTASecondary
                  label={block.ctaSecundario.label}
                  href={block.ctaSecundario.href}
                  tone="cream"
                />
              </div>
            )}
          </Reveal>
        </Section>
      );
    }

    case "a4-para-quien": {
      return (
        <Section key={block.id} id={block.id} tone={block.tone}>
          <Reveal>
            {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
            <Titular className="mt-6 mb-4 max-w-3xl">{block.titular}</Titular>
            {block.cuerpo && (
              <p className="font-sans text-lg text-charcoal/80 leading-relaxed max-w-2xl">
                {block.cuerpo}
              </p>
            )}
            <ParaQuienGrid
              esParaTi={block.esParaTi}
              noEsParaTi={block.noEsParaTi}
              ancla={block.ancla}
            />
          </Reveal>
        </Section>
      );
    }

    case "a5-como-trabajamos": {
      return (
        <Section key={block.id} id={block.id} tone={block.tone}>
          <Reveal>
            {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
            <Titular className="mt-6 mb-4 max-w-3xl">{block.titular}</Titular>
            <FasesTrabajo fases={block.fases} />
          </Reveal>
        </Section>
      );
    }

    case "a6-sobre-lazo": {
      return (
        <Section key={block.id} id={block.id} tone="sage" width="narrow">
          <Reveal>
            {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
            <Titular tone="cream" className="mt-6 mb-6">
              {block.titular}
            </Titular>
            {block.cuerpo && (
              <p className="font-sans text-lg text-cream/85 leading-relaxed">
                {block.cuerpo}
              </p>
            )}
          </Reveal>
        </Section>
      );
    }

    case "a7-faq": {
      return (
        <Section key={block.id} id={block.id} tone={block.tone}>
          <Reveal>
            {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
            <Titular className="mt-6 mb-2 max-w-3xl">{block.titular}</Titular>
            <FaqAccordion items={block.items} />
            {block.cierreCta && (
              <div className="mt-12 flex justify-center">
                <CTAPrimary label={block.cierreCta.label} size="large" />
              </div>
            )}
          </Reveal>
        </Section>
      );
    }
  }
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      {HOME_BLOCKS.map(renderBlock)}
      <Footer />
    </main>
  );
}
