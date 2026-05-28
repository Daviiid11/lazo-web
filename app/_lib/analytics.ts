"use client";

import { track as vercelTrack } from "@vercel/analytics";

type EventName = "cta_click" | "scroll_depth" | "demo_play";

type EventPayload = {
  cta_click: { variant: "primary" | "secondary" | "sticky"; destino: string };
  scroll_depth: { acto: string; pct: 25 | 50 | 75 | 100 };
  demo_play: { tipo: "muda" | "audio" };
};

export function track<N extends EventName>(name: N, payload: EventPayload[N]): void {
  if (typeof window === "undefined") return;
  vercelTrack(name, payload);
}
