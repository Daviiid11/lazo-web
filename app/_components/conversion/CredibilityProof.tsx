import type { ActoPasos } from "../../_content/actos";

export default function CredibilityProof({ pasos }: { pasos: ActoPasos["pasos"] }) {
  return (
    <ol className="grid gap-8 md:grid-cols-3 mt-10">
      {pasos.map((p, i) => (
        <li key={p.titulo} className="border-t border-sage/15 pt-5">
          <span className="font-display text-terracotta text-3xl block leading-none">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl text-sage mt-3 mb-3">
            {p.titulo}
          </h3>
          <p className="text-charcoal/80 leading-relaxed">{p.detalle}</p>
        </li>
      ))}
    </ol>
  );
}
