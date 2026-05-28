import type { ReactNode } from "react";

type Size = "h1" | "h2" | "h3";
type Tone = "sage" | "cream";

const sizes: Record<Size, string> = {
  h1: "text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05]",
  h2: "text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.1]",
  h3: "text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15]",
};

const tones: Record<Tone, string> = {
  sage: "text-sage",
  cream: "text-cream",
};

export default function Titular({
  children,
  as = "h2",
  size = "h2",
  tone = "sage",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: Size;
  tone?: Tone;
  className?: string;
}) {
  const Tag = as;
  return (
    <Tag
      className={`font-display tracking-tighter2 ${sizes[size]} ${tones[tone]} ${className}`}
    >
      {children}
    </Tag>
  );
}
