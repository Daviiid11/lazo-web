export const SITE = {
  brand: "Lazo",
  domain: "lazo.agency",
  url: "https://www.lazo.agency",
} as const;

// URL Cal.com final pendiente C2; placeholder operativo hasta entonces.
export const CTA = {
  primary: {
    label: "Agenda una llamada",
    href: "https://cal.com/lazo-agency/30min",
  },
  secondary: {
    label: "Ver servicios",
    href: "#a2-servicios",
  },
  sticky: {
    label: "Agenda 30 min",
    href: "https://cal.com/lazo-agency/30min",
  },
} as const;

export const CONTACTO = {
  email: "hola@lazo.agency",
  tagline: "IA, automatización y marketing digital en PYMES.",
} as const;

export type CtaKind = keyof typeof CTA;
