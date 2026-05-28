/**
 * Esquema de contenido de la home post-pivote Divisual.
 *
 * Define los 7 bloques A1-A7 + el menú de 4 servicios. El copy real se
 * rellena en B5 (ver memoria [[project_lazo_pivote_divisual]] y wireframe
 * §12 de PROJECT_RULES.md).
 *
 * Tones por sección (decisión B4): A1, A2, A4, A5, A7 = crema; A3, A6 = sage.
 */

export type BlockTone = "crema" | "crema-light" | "sage";

export type BlockId =
  | "a1-hero"
  | "a2-servicios"
  | "a3-manifiesto"
  | "a4-para-quien"
  | "a5-como-trabajamos"
  | "a6-sobre-lazo"
  | "a7-faq";

export type BlockBase = {
  id: BlockId;
  tone: BlockTone;
  eyebrow?: string;
  titular: string;
  cuerpo?: string;
};

// A1 — Hero
export type Hero = BlockBase & {
  id: "a1-hero";
  tone: "crema";
  ctaPrimario: { label: string; href: string };
  ctaSecundario?: { label: string; href: string };
};

// A2 — Menú de servicios (tarjetas con link a /servicios/<slug>)
export type ServicioSlug =
  | "estrategia-ia"
  | "funnels"
  | "control-automatizacion"
  | "ciberseguridad";

export type ServicioCard = {
  slug: ServicioSlug;
  titulo: string;
  resumen: string;
  href: string;
};

export type Servicios = BlockBase & {
  id: "a2-servicios";
  tone: "crema" | "crema-light";
  cards: readonly ServicioCard[];
};

// A3 — Manifiesto (inversión sage)
export type ManifiestoPrincipio = { titulo: string; detalle: string };

export type Manifiesto = BlockBase & {
  id: "a3-manifiesto";
  tone: "sage";
  principios: readonly ManifiestoPrincipio[];
  ctaSecundario?: { label: string; href: string };
};

// A4 — Para quién es Lazo (filtro SMB)
export type ParaQuien = BlockBase & {
  id: "a4-para-quien";
  tone: "crema" | "crema-light";
  esParaTi: readonly string[];
  noEsParaTi: readonly string[];
  ancla?: string;
};

// A5 — Cómo trabajamos (4 fases)
export type FaseTrabajo = {
  numero: 1 | 2 | 3 | 4;
  titulo: string;
  detalle: string;
};

export type ComoTrabajamos = BlockBase & {
  id: "a5-como-trabajamos";
  tone: "crema" | "crema-light";
  fases: readonly [FaseTrabajo, FaseTrabajo, FaseTrabajo, FaseTrabajo];
};

// A6 — Sobre Lazo (inversión sage)
export type SobreLazo = BlockBase & {
  id: "a6-sobre-lazo";
  tone: "sage";
};

// A7 — FAQ
export type FaqItem = { pregunta: string; respuesta: string };

export type Faq = BlockBase & {
  id: "a7-faq";
  tone: "crema" | "crema-light";
  items: readonly FaqItem[];
  cierreCta?: { label: string; href: string };
};

export type HomeBlock =
  | Hero
  | Servicios
  | Manifiesto
  | ParaQuien
  | ComoTrabajamos
  | SobreLazo
  | Faq;

/**
 * Orden canónico de los bloques en la home.
 * B5 rellena este array con el contenido real validado en sesión 2026-05-28.
 */
export const HOME_BLOCKS_ORDER: readonly BlockId[] = [
  "a1-hero",
  "a2-servicios",
  "a3-manifiesto",
  "a4-para-quien",
  "a5-como-trabajamos",
  "a6-sobre-lazo",
  "a7-faq",
] as const;

/** Pendiente B5: rellenar copy real. Hasta entonces, vacío. */
export const HOME_BLOCKS: readonly HomeBlock[] = [] as const;
