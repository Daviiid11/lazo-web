import type { ManifiestoPrincipio } from "../../_content/home";

export default function PrincipiosList({
  principios,
}: {
  principios: readonly ManifiestoPrincipio[];
}) {
  return (
    <ol className="mt-10 space-y-8 md:space-y-10 list-none counter-reset-[principio]">
      {principios.map((p, i) => (
        <li key={p.titulo} className="grid grid-cols-[auto_1fr] gap-x-5 md:gap-x-7 items-start">
          <span
            aria-hidden
            className="font-display text-2xl md:text-3xl text-terracotta leading-none pt-1 tabular-nums"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-display text-xl md:text-2xl text-cream mb-2">
              {p.titulo}
            </h3>
            <p className="font-sans text-base md:text-lg text-cream/85 leading-relaxed">
              {p.detalle}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
