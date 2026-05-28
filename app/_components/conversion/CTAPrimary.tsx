"use client";

import { CTA } from "../../_content/site";
import { track } from "../../_lib/analytics";

export default function CTAPrimary({
  label,
  size = "default",
  className = "",
}: {
  label?: string;
  size?: "default" | "large";
  className?: string;
}) {
  const sizeCx =
    size === "large" ? "text-lg px-8 py-4 min-h-[52px]" : "px-7 py-4 min-h-[48px]";
  return (
    <a
      href={CTA.primary.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        track("cta_click", { variant: "primary", destino: CTA.primary.href })
      }
      className={`inline-flex items-center gap-2 rounded-full bg-terracotta text-charcoal font-medium hover:bg-sage hover:text-cream transition-colors ${sizeCx} ${className}`}
    >
      {label ?? CTA.primary.label}
      <span aria-hidden>→</span>
    </a>
  );
}
