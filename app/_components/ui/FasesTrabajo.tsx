import type { FaseTrabajo } from "../../_content/home";

export default function FasesTrabajo({
  fases,
}: {
  fases: readonly FaseTrabajo[];
}) {
  return (
    <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 list-none">
      {fases.map((fase) => (
        <li
          key={fase.numero}
          className="grid grid-cols-[auto_1fr] gap-x-5 md:gap-x-6 items-start"
        >
          <span
            aria-hidden
            className="font-display text-3xl md:text-4xl text-terracotta leading-none pt-1 tabular-nums"
          >
            {String(fase.numero).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-display text-xl md:text-2xl text-sage mb-2">
              {fase.titulo}
            </h3>
            <p className="font-sans text-base text-charcoal/80 leading-relaxed">
              {fase.detalle}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
