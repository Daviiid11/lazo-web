export const COLOR = {
  crema: "var(--crema)",
  cremaLight: "var(--crema-light)",
  sage: "var(--sage)",
  terracota: "var(--terracota)",
  carbon: "var(--carbon)",
} as const;

export const MOTION = {
  easeCalm: "var(--ease-calm)",
  durFast: "var(--dur-fast)",
  durSlow: "var(--dur-slow)",
} as const;

export type ColorToken = keyof typeof COLOR;
export type MotionToken = keyof typeof MOTION;
