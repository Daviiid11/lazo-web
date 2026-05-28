export default function ParaQuienGrid({
  esParaTi,
  noEsParaTi,
  ancla,
}: {
  esParaTi: readonly string[];
  noEsParaTi: readonly string[];
  ancla?: string;
}) {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <h3 className="font-display text-xl text-sage mb-4">Sí, es para ti si</h3>
          <ul className="space-y-3">
            {esParaTi.map((item) => (
              <li
                key={item}
                className="font-sans text-base text-charcoal/85 leading-relaxed grid grid-cols-[auto_1fr] gap-3 items-start"
              >
                <span aria-hidden className="text-terracotta pt-1">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-xl text-charcoal-700 mb-4">No es para ti si</h3>
          <ul className="space-y-3">
            {noEsParaTi.map((item) => (
              <li
                key={item}
                className="font-sans text-base text-charcoal-500 leading-relaxed grid grid-cols-[auto_1fr] gap-3 items-start"
              >
                <span aria-hidden className="text-charcoal-300 pt-1">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {ancla && (
        <p className="mt-10 font-sans text-sm uppercase tracking-widest text-sage/80 border-t border-sage/15 pt-6">
          Ancla numérica: {ancla}
        </p>
      )}
    </div>
  );
}
