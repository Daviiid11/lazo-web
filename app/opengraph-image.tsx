import { ImageResponse } from "next/og";

// Edge: @vercel/og se sirve en el edge (igual que en Vercel) y evita el
// bug de prerender en Node/Windows (fileURLToPath sobre el asset WASM).
export const runtime = "edge";

// Imagen social (Open Graph / Twitter). Sin fuentes externas: usa la
// serif del sistema para no añadir peso ni red.
export const alt = "Lazo — Automatización con IA para clínicas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4ECE0",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 44,
            color: "#3F5648",
            letterSpacing: "-0.02em",
          }}
        >
          lazo<span style={{ color: "#C97B5A" }}>.</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 68,
            lineHeight: 1.1,
            color: "#3F5648",
            letterSpacing: "-0.02em",
          }}
        >
          <span>Tu clínica pierde pacientes</span>
          <span style={{ color: "#C97B5A" }}>que nunca llegas a ver.</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#1F1F1F",
            opacity: 0.7,
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          Automatización con IA · Empezamos por el Diagnóstico de Fuga
        </div>
      </div>
    ),
    { ...size }
  );
}
