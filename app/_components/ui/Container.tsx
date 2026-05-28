import type { ReactNode } from "react";

type Width = "narrow" | "default" | "wide";

const widths: Record<Width, string> = {
  narrow: "max-w-3xl",
  default: "max-w-5xl",
  wide: "max-w-6xl",
};

export default function Container({
  children,
  width = "default",
  className = "",
}: {
  children: ReactNode;
  width?: Width;
  className?: string;
}) {
  return (
    <div className={`${widths[width]} mx-auto px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}
