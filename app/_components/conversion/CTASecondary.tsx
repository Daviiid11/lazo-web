"use client";

import { CTA } from "../../_content/site";
import { track } from "../../_lib/analytics";

export default function CTASecondary({
  label,
  href,
  tone = "sage",
  className = "",
}: {
  label?: string;
  href?: string;
  tone?: "sage" | "cream";
  className?: string;
}) {
  const destino = href ?? CTA.secondary.href;
  const isExternal = destino.startsWith("http");
  const tones =
    tone === "cream"
      ? "text-cream border-cream/30 hover:border-cream"
      : "text-sage border-sage/20 hover:border-sage";
  return (
    <a
      href={destino}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={() =>
        track("cta_click", { variant: "secondary", destino })
      }
      className={`inline-flex items-center gap-2 px-7 py-4 min-h-[48px] rounded-full font-medium border-2 transition-colors ${tones} ${className}`}
    >
      {label ?? CTA.secondary.label}
    </a>
  );
}
