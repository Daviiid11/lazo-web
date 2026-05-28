import type { ReactNode } from "react";
import Container from "../ui/Container";

type Tone = "crema" | "crema-light" | "sage";

const tones: Record<Tone, string> = {
  crema: "bg-cream text-charcoal",
  "crema-light": "bg-cream-light text-charcoal",
  sage: "bg-sage text-cream",
};

export default function Acto({
  id,
  tone = "crema",
  width = "default",
  children,
  className = "",
}: {
  id: string;
  tone?: Tone;
  width?: "narrow" | "default" | "wide";
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative py-20 md:py-28 ${tones[tone]} ${className}`}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}
