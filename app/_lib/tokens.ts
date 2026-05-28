export const COLOR = {
  crema:         "var(--crema)",
  cremaLight:    "var(--crema-light)",
  carbon:        "var(--carbon)",
  charcoal700:   "var(--charcoal-700)",
  charcoal500:   "var(--charcoal-500)",
  charcoal300:   "var(--charcoal-300)",
  sage:          "var(--sage)",
  sageDark:      "var(--sage-dark)",
  sageOn:        "var(--sage-on)",
  terracota:     "var(--terracota)",
  terracotaDark: "var(--terracota-dark)",
  terracotaOn:   "var(--terracota-on)",
  focusRing:     "var(--focus-ring)",
} as const;

export const FONT_SIZE = {
  h1:    "var(--fs-h1)",
  h2:    "var(--fs-h2)",
  h3:    "var(--fs-h3)",
  body:  "var(--fs-body)",
  small: "var(--fs-small)",
} as const;

export const LINE_HEIGHT = {
  tight:  "var(--lh-tight)",
  normal: "var(--lh-normal)",
} as const;

export const FONT_WEIGHT = {
  regular: "var(--fw-regular)",
  medium:  "var(--fw-medium)",
} as const;

export const RADIUS = {
  sm:   "var(--radius-sm)",
  md:   "var(--radius-md)",
  lg:   "var(--radius-lg)",
  full: "var(--radius-full)",
} as const;

export const SHADOW = {
  sm:  "var(--shadow-sm)",
  md:  "var(--shadow-md)",
  lg:  "var(--shadow-lg)",
  cta: "var(--shadow-cta)",
} as const;

export const MOTION = {
  easeCalm: "var(--ease-calm)",
  durFast:  "var(--dur-fast)",
  durSlow:  "var(--dur-slow)",
} as const;

export type ColorToken      = keyof typeof COLOR;
export type FontSizeToken   = keyof typeof FONT_SIZE;
export type LineHeightToken = keyof typeof LINE_HEIGHT;
export type FontWeightToken = keyof typeof FONT_WEIGHT;
export type RadiusToken     = keyof typeof RADIUS;
export type ShadowToken     = keyof typeof SHADOW;
export type MotionToken     = keyof typeof MOTION;
