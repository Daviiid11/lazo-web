import type { Metadata } from "next";
import WorldPrototype from "../_components/world/WorldPrototype";

// Ruta experimental v3-lab. NO indexable: es un prototipo de medición (M-C),
// no reemplaza a `/` (v2) hasta pasar todos los gates.
export const metadata: Metadata = {
  title: "Lazo — recorrido (lab)",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return <WorldPrototype />;
}
