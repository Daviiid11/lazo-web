import type { Metadata } from "next";
import { SERVICIOS } from "../../_content/servicios";
import ServicioDetalle from "../../_components/ui/ServicioDetalle";

const servicio = SERVICIOS["ciberseguridad"];

export const metadata: Metadata = {
  title: `${servicio.titulo} — Lazo`,
  description: servicio.promesa,
  alternates: { canonical: "/servicios/ciberseguridad" },
};

export default function Page() {
  return <ServicioDetalle servicio={servicio} />;
}
