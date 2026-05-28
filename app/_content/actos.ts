export type ActoId = "01" | "02" | "03" | "04" | "05" | "06";

export type CosteModo = "euros" | "cualitativo";

export type ActoBase = {
  id: ActoId;
  eyebrow: string;
  titular: string;
  cuerpo?: string;
};

export type ActoCoste = ActoBase & {
  id: "02";
  modo: CosteModo;
  numero: string;
  unidad?: string;
  nota?: string;
};

export type ActoPasos = ActoBase & {
  id: "04";
  pasos: readonly { titulo: string; detalle: string }[];
};

export type Acto = ActoBase | ActoCoste | ActoPasos;

export const ACTO_01: ActoBase = {
  id: "01",
  eyebrow: "01 · Lo que ya vives",
  titular: "Suena el teléfono. Tienes las manos llenas de grasa.",
  cuerpo:
    "Y mientras decides si lo coges, ese cliente ya está marcando otro taller.",
};

export const ACTO_02: ActoCoste = {
  id: "02",
  eyebrow: "02 · El coste oculto",
  titular: "Cada llamada perdida no es una llamada.",
  modo: "cualitativo",
  numero: "Es un coche que no entra esta semana.",
  unidad: "Y no aparece en ninguna factura.",
  nota: "Lo medimos por ti — observado, no estimado.",
  cuerpo:
    "Pasa fuera de horario, mientras estás bajo un puente o atendiendo al mostrador. Nadie lo apunta. Pero la facturación del mes ya está decidida ahí.",
};

export const ACTO_03: ActoBase = {
  id: "03",
  eyebrow: "03 · El orden recuperado",
  titular: "Alguien que descuelga siempre. Sin ser tú.",
  cuerpo:
    "Pide nombre, matrícula y motivo. Te lo deja anotado para cuando puedas. Sin scripts robóticos, sin transferencias eternas. La conversación suena a taller, no a centralita.",
};

export const ACTO_04: ActoPasos = {
  id: "04",
  eyebrow: "04 · Cómo funciona",
  titular: "Tres pasos. Cero promesas vacías.",
  cuerpo:
    "Antes de tocar nada en tu taller, medimos. Antes de cobrarte, te enseñamos la cifra.",
  pasos: [
    {
      titulo: "Diagnóstico de fuga",
      detalle:
        "Probamos tu taller como cliente y revisamos tu operativa contigo. Salimos con cuántas llamadas pierdes y cuáles.",
    },
    {
      titulo: "El dinero exacto",
      detalle:
        "Te enseñamos lo que se va por esa grieta en euros tuyos, no medias del sector. Tuyo aunque no contrates nada después.",
    },
    {
      titulo: "Decides tú",
      detalle:
        "Si compensa, lo tapamos. Si no, te llevas el diagnóstico. Sin tarifa por mirar.",
    },
  ],
};

export const ACTO_05: ActoBase = {
  id: "05",
  eyebrow: "05 · Lo que otros no te van a decir",
  titular: "Sin permanencia. Sin tarifa antes del diagnóstico.",
  cuerpo:
    "Primero medimos. Te enseñamos la cifra. Decides después. Si en el primer mes no recuperas lo que cuesta, no sigues. Es así de simple porque puede serlo: solo cobramos cuando ya hemos enseñado el dinero.",
};

export const ACTO_06: ActoBase = {
  id: "06",
  eyebrow: "06 · El paso pequeño",
  titular: "Quince minutos. No tienes que vender nada.",
  cuerpo:
    "Solo decir cuántos teléfonos suenan y cuántos no se atienden. Salimos con la cifra real, te la mandamos. Lo demás lo decides tú.",
};

export const ACTOS: readonly Acto[] = [
  ACTO_01,
  ACTO_02,
  ACTO_03,
  ACTO_04,
  ACTO_05,
  ACTO_06,
] as const;
