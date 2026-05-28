import Link from "next/link";
import type { ServicioCard as ServicioCardType } from "../../_content/home";

export default function ServicioCard({ card }: { card: ServicioCardType }) {
  return (
    <Link
      href={card.href}
      className="group block rounded-[var(--radius-lg)] border border-sage/15 bg-cream-light p-6 md:p-8 transition-colors hover:border-sage/40"
    >
      <h3 className="font-display text-2xl md:text-[1.75rem] tracking-tighter2 text-sage mb-3">
        {card.titulo}
      </h3>
      <p className="font-sans text-base text-charcoal/80 leading-relaxed mb-5">
        {card.resumen}
      </p>
      <span className="font-sans text-sm font-medium text-terracotta inline-flex items-center gap-2">
        Ver detalle
        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
