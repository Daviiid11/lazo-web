import Link from "next/link";
import type { ServicioDetallado } from "../../_content/servicios";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import Titular from "./Titular";
import Section from "../layout/Section";
import FaqAccordion from "./FaqAccordion";
import CTAPrimary from "../conversion/CTAPrimary";

export default function ServicioDetalle({ servicio }: { servicio: ServicioDetallado }) {
  return (
    <main className="min-h-screen">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>

      {/* Hero del servicio */}
      <section
        id="servicio-hero"
        className="relative bg-cream text-charcoal pt-28 md:pt-32 pb-16 md:pb-20"
      >
        <Container width="default">
          <div id="contenido" className="max-w-3xl">
            <Link
              href="/#a2-servicios"
              className="font-sans text-sm text-sage/80 hover:text-sage inline-flex items-center gap-2"
            >
              <span aria-hidden>←</span> Volver a servicios
            </Link>
            <Eyebrow>Servicio</Eyebrow>
            <Titular as="h1" size="h1" className="mt-6 mb-6">
              {servicio.titulo}
            </Titular>
            <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-2xl">
              {servicio.promesa}
            </p>
            <div className="mt-10">
              <CTAPrimary />
            </div>
          </div>
        </Container>
      </section>

      {/* Detalle */}
      <Section id="servicio-detalle" tone="crema-light" width="narrow">
        <Eyebrow>En qué consiste</Eyebrow>
        <div className="mt-8 space-y-6">
          {servicio.detalle.map((parrafo, i) => (
            <p
              key={i}
              className="font-sans text-base md:text-lg text-charcoal/85 leading-relaxed"
            >
              {parrafo}
            </p>
          ))}
        </div>
      </Section>

      {/* Incluye / no incluye */}
      <Section id="servicio-alcance" tone="crema">
        <Eyebrow>Alcance</Eyebrow>
        <Titular size="h3" className="mt-6 mb-8">
          Qué entra y qué no.
        </Titular>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="font-display text-xl text-sage mb-4">Incluye</h3>
            <ul className="space-y-3">
              {servicio.incluye.map((item) => (
                <li
                  key={item}
                  className="font-sans text-base text-charcoal/85 leading-relaxed grid grid-cols-[auto_1fr] gap-3 items-start"
                >
                  <span aria-hidden className="text-terracotta pt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl text-charcoal-700 mb-4">No incluye</h3>
            <ul className="space-y-3">
              {servicio.noIncluye.map((item) => (
                <li
                  key={item}
                  className="font-sans text-base text-charcoal-500 leading-relaxed grid grid-cols-[auto_1fr] gap-3 items-start"
                >
                  <span aria-hidden className="text-charcoal-300 pt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ propio del servicio */}
      <Section id="servicio-faq" tone="crema-light">
        <Eyebrow>Preguntas frecuentes</Eyebrow>
        <Titular size="h3" className="mt-6 mb-2">
          Lo que más nos preguntan sobre este servicio.
        </Titular>
        <FaqAccordion items={servicio.faq} />
      </Section>

      {/* Cierre con CTA */}
      <Section id="servicio-cierre" tone="sage" width="narrow" className="text-center">
        <Eyebrow>Siguiente paso</Eyebrow>
        <Titular tone="cream" size="h2" className="mt-6 mb-6">
          Cuéntanos qué cuello necesitas tratar primero.
        </Titular>
        <p className="font-sans text-lg text-cream/85 leading-relaxed mb-10 max-w-xl mx-auto">
          30 minutos. Sin compromiso. Salimos con qué es lo siguiente.
        </p>
        <div className="flex justify-center">
          <CTAPrimary size="large" />
        </div>
      </Section>
    </main>
  );
}
