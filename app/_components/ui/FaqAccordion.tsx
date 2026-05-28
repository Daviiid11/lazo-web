import type { FaqItem } from "../../_content/home";

export default function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="mt-10 space-y-3">
      {items.map((item) => (
        <details
          key={item.pregunta}
          className="group rounded-[var(--radius-md)] border border-sage/15 bg-cream-light open:bg-cream open:border-sage/30 transition-colors"
        >
          <summary className="cursor-pointer list-none px-5 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4 font-display text-lg md:text-xl text-sage">
            <span>{item.pregunta}</span>
            <span
              aria-hidden
              className="text-terracotta text-2xl leading-none transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="px-5 md:px-6 pb-5 md:pb-6 font-sans text-base text-charcoal/85 leading-relaxed">
            {item.respuesta}
          </div>
        </details>
      ))}
    </div>
  );
}
