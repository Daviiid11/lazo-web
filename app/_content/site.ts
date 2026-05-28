export const SITE = {
  brand: "Lazo",
  domain: "lazo.agency",
  url: "https://www.lazo.agency",
} as const;

export const CTA = {
  primary: {
    label: "Reservar diagnóstico (15 min)",
    href: "https://cal.eu/lazo-agency/15min",
  },
  secondary: {
    label: "Ver cómo funciona",
    href: "#acto-04",
  },
  sticky: {
    label: "Reservar 15 min",
    href: "https://cal.eu/lazo-agency/15min",
  },
} as const;

export const CONTACTO = {
  email: "hola@lazo.agency",
  tagline: "Atamos los cabos sueltos de tu taller.",
} as const;

export type CtaKind = keyof typeof CTA;
