import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./_components/SmoothScroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://lazo.agency";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Lazo — Automatización con IA para clínicas",
  description:
    "Tu clínica pierde pacientes que nunca llegas a ver: llamadas sin devolver, WhatsApp que se enfría, citas sin confirmar. Medimos cuánto te cuesta con el Diagnóstico de Fuga — antes de tocar nada.",
  keywords: [
    "automatización IA clínicas",
    "agencia IA España",
    "WhatsApp automatización clínicas",
    "no-show clínicas",
    "recuperar leads clínica",
    "agenda clínica automática",
    "n8n",
    "Claude",
  ],
  authors: [{ name: "Lazo" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lazo — Atamos los cabos sueltos de tu clínica",
    description:
      "Cada llamada sin devolver y cada cita sin confirmar es un cabo suelto. Te decimos cuánto te cuesta antes de tocar nada.",
    url: SITE_URL,
    siteName: "Lazo",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lazo — Atamos los cabos sueltos de tu clínica",
    description:
      "Automatización con IA para clínicas. Empezamos por el Diagnóstico de Fuga.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans bg-cream text-charcoal antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
