import type { ReactNode } from "react";

type Gap = "tight" | "default" | "loose";

const gaps: Record<Gap, string> = {
  tight: "space-y-3",
  default: "space-y-6",
  loose: "space-y-10",
};

export default function Stack({
  children,
  gap = "default",
  className = "",
}: {
  children: ReactNode;
  gap?: Gap;
  className?: string;
}) {
  return <div className={`${gaps[gap]} ${className}`}>{children}</div>;
}
