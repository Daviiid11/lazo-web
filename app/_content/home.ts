/**
 * Contenido de la home post-pivote Divisual (rellenado en B5).
 *
 * Bloques A1-A7 + menú de 4 servicios. Tones por sección:
 *   A1, A4, A7 = crema   |   A2, A5 = crema-light   |   A3, A6 = sage.
 * Patrón rítmico: claro-claro-OSCURO-claro-claro-OSCURO-claro.
 *
 * CTA único "Agenda una llamada" vive en `site.ts`; las páginas dedicadas
 * por servicio están en `servicios.ts` y `app/servicios/<slug>/page.tsx`.
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

export type Hero = BlockBase & {
  id: "a1-hero";
  tone: "crema";
  ctaPrimario: { label: string; href: string };
  ctaSecundario?: { label: string; href: string };
};

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

export type ManifiestoPrincipio = { titulo: string; detalle: string };

export type Manifiesto = BlockBase & {
  id: "a3-manifiesto";
  tone: "sage";
  principios: readonly ManifiestoPrincipio[];
  ctaSecundario?: { label: string; href: string };
};

export type ParaQuien = BlockBase & {
  id: "a4-para-quien";
  tone: "crema" | "crema-light";
  esParaTi: readonly string[];
  noEsParaTi: readonly string[];
  ancla?: string;
};

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

export type SobreLazo = BlockBase & {
  id: "a6-sobre-lazo";
  tone: "sage";
};

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

// ---------- copy ----------

const A1_HERO: Hero = {
  id: "a1-hero",
  tone: "crema",
  eyebrow: "Implementación, no slides",
  titular: "Más clientes. Menos caos. Menos horas.",
  cuerpo:
    "Implementamos IA, automatización y marketing digital en PYMES. Sistemas que funcionan en tu operativa real, no en presentaciones bonitas.",
  ctaPrimario: { label: "Agenda una llamada", href: "https://cal.com/lazo-agency/30min" },
  ctaSecundario: { label: "Ver servicios", href: "#a2-servicios" },
};

const A2_SERVICIOS: Servicios = {
  id: "a2-servicios",
  tone: "crema-light",
  eyebrow: "Qué hacemos",
  titular: "Cuatro frentes, una sola pieza.",
  cuerpo:
    "Empezamos por el cuello que más te aprieta. Lo siguiente solo se mueve si tiene impacto medible.",
  cards: [
    {
      slug: "estrategia-ia",
      titulo: "Estrategia y consultoría IA",
      resumen:
        "Identificamos dónde la IA aporta resultado real en tu operativa y dónde sobra. Plan accionable antes de cualquier implementación.",
      href: "/servicios/estrategia-ia",
    },
    {
      slug: "funnels",
      titulo: "Funnels de venta",
      resumen:
        "Reordenamos el recorrido que ya tienes para que cada lead llegue al sitio correcto. Integramos con tu tráfico actual, no lo sustituimos.",
      href: "/servicios/funnels",
    },
    {
      slug: "control-automatizacion",
      titulo: "Control y automatización",
      resumen:
        "Centralizamos tu información (Airtable) y automatizamos procesos repetitivos con n8n y WhatsApp IA. Menos tareas manuales, menos olvidos.",
      href: "/servicios/control-automatizacion",
    },
    {
      slug: "ciberseguridad",
      titulo: "Ciberseguridad",
      resumen:
        "Acompañamiento básico de seguridad para PYMES: implementación segura, RGPD básico, hábitos del equipo. Sin pentest ni auditorías de banca.",
      href: "/servicios/ciberseguridad",
    },
  ],
};

const A3_MANIFIESTO: Manifiesto = {
  id: "a3-manifiesto",
  tone: "sage",
  eyebrow: "En qué creemos",
  titular: "Cuatro reglas antes de tocar nada en tu negocio.",
  principios: [
    {
      titulo: "Sistemas que encajan en tu operativa real.",
      detalle:
        "Si no cabe en cómo trabajas hoy, no se queda. Probamos en pequeño antes de escalar.",
    },
    {
      titulo: "Implementación honesta.",
      detalle:
        "Te decimos qué IA aporta valor real y qué es ruido del momento. Si algo no merece la pena, no lo vendemos.",
    },
    {
      titulo: "Lo que medimos, lo enseñamos.",
      detalle:
        "Cada cliente ve sus números. Si no podemos medir el impacto, lo hablamos antes de empezar.",
    },
    {
      titulo: "Nos quedamos contigo.",
      detalle:
        "Implementar es solo la mitad. Nos quedamos para que lo nuevo no se rompa la primera vez que tu equipo cambia de manos.",
    },
  ],
  ctaSecundario: { label: "Ver cómo trabajamos", href: "#a5-como-trabajamos" },
};

const A4_PARA_QUIEN: ParaQuien = {
  id: "a4-para-quien",
  tone: "crema",
  eyebrow: "Para quién",
  titular: "Lazo es para PYMES que ya tienen tracción y necesitan orden.",
  cuerpo:
    "Trabajamos mejor con empresas con operativa establecida, equipo pequeño y voluntad de no improvisar.",
  esParaTi: [
    "Facturas entre 200 k y 2 M al año",
    "Tienes entre 5 y 50 personas (incluyendo proveedores recurrentes)",
    "Tu tráfico viene de redes propias, referidos o ads que ya pagas",
    "Sabes que pierdes horas en tareas repetidas pero no tienes hueco para arreglarlo",
  ],
  noEsParaTi: [
    "Buscas captación nueva (Meta Ads, marca personal): aquí no la hacemos",
    "Necesitas pentest o auditoría de banca: nuestra ciberseguridad es conservadora",
    "Quieres delegar la estrategia entera sin participar",
    "Prefieres un proveedor que te diga que sí a todo",
  ],
  ancla: "200 k–2 M facturación · 5–50 personas",
};

const A5_COMO_TRABAJAMOS: ComoTrabajamos = {
  id: "a5-como-trabajamos",
  tone: "crema-light",
  eyebrow: "Cómo trabajamos",
  titular: "Cuatro fases. Cada una con un cierre claro.",
  fases: [
    {
      numero: 1,
      titulo: "Diagnóstico",
      detalle:
        "Una llamada de 30 min + revisión de tu operativa. Salimos con qué cuello tratamos primero y por qué.",
    },
    {
      numero: 2,
      titulo: "Plan",
      detalle:
        "Te entregamos un plan accionable: qué tocamos, qué no, en qué orden y qué medimos. Decides si sigues.",
    },
    {
      numero: 3,
      titulo: "Implementación",
      detalle:
        "Construimos lo acordado en pequeño y lo conectamos a tu operativa real. Empezamos a medir desde el día uno.",
    },
    {
      numero: 4,
      titulo: "Acompañamiento",
      detalle:
        "Nos quedamos para que el sistema no se rompa cuando cambias proveedor o entra una persona nueva. Sin permanencia.",
    },
  ],
};

const A6_SOBRE_LAZO: SobreLazo = {
  id: "a6-sobre-lazo",
  tone: "sage",
  eyebrow: "De dónde venimos",
  titular: "Llevamos años viendo cómo la IA entra mal en las PYMES.",
  cuerpo:
    "Vendieron herramientas sin cambiar la operativa, automatizaron procesos que no estaban definidos, contrataron consultoras que no se manchaban las manos. Lazo nace de la pregunta opuesta: ¿qué pasaría si alguien implementara IA, automatización y marketing en PYMES como se implementaba la electricidad — entendiendo la casa primero? David estudia en el Mastermind Juan Pe (AIMA NVL3) y en formación continua de ciberseguridad. El equipo se amplía a medida que entra cliente, no antes.",
};

const A7_FAQ: Faq = {
  id: "a7-faq",
  tone: "crema",
  eyebrow: "Preguntas que nos hacéis",
  titular: "Dudas razonables, respuestas concretas.",
  items: [
    {
      pregunta: "¿Cuánto cuesta?",
      respuesta:
        "Depende del cuello que tratemos primero. Tras la llamada de 30 min te pasamos rango y propuesta. No tenemos tarifa cerrada en web — cada PYME tiene operativa distinta.",
    },
    {
      pregunta: "¿Cuánto tarda?",
      respuesta:
        "La fase de diagnóstico + plan está en 1–2 semanas. La implementación depende del cuello: una integración simple va a 2–4 semanas; una serie de procesos automatizados puede ir a 6–10. Te decimos el plazo realista, no el que suena bien.",
    },
    {
      pregunta: "¿Qué pasa con mis datos?",
      respuesta:
        "Firmamos DPA con todos los proveedores que toquen información tuya (Airtable, n8n, Claude, 360dialog, Cal.com). RGPD básico cubierto. Si tu sector requiere algo más estricto (sanidad, financiero), lo evaluamos antes de empezar.",
    },
    {
      pregunta: "¿Hacéis Ads o marca personal?",
      respuesta:
        "No. Lazo trabaja con el tráfico que ya tienes (referidos, redes, ads externas, web). Si necesitas activar captación nueva, te derivamos a alguien que lo haga bien.",
    },
    {
      pregunta: "¿Y si no funciona?",
      respuesta:
        "Por eso empezamos por diagnóstico + plan en una fase pequeña. Si llegando a la implementación no estás convencido, paramos. Sin permanencia.",
    },
  ],
  cierreCta: { label: "Agenda una llamada", href: "https://cal.com/lazo-agency/30min" },
};

export const HOME_BLOCKS_ORDER: readonly BlockId[] = [
  "a1-hero",
  "a2-servicios",
  "a3-manifiesto",
  "a4-para-quien",
  "a5-como-trabajamos",
  "a6-sobre-lazo",
  "a7-faq",
] as const;

export const HOME_BLOCKS: readonly HomeBlock[] = [
  A1_HERO,
  A2_SERVICIOS,
  A3_MANIFIESTO,
  A4_PARA_QUIEN,
  A5_COMO_TRABAJAMOS,
  A6_SOBRE_LAZO,
  A7_FAQ,
] as const;
