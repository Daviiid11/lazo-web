import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import SmoothScroll from "./_components/SmoothScroll";
import Wordmark from "./_components/layout/Wordmark";
import ProgressBar from "./_components/layout/ProgressBar";
import StickyCTAMobile from "./_components/conversion/StickyCTAMobile";

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
  title: "Lazo — Atamos el teléfono de tu taller",
  description:
    "Cada llamada que no atiendes es un coche que no entra. Medimos cuántas pierdes y cuánto te cuestan — antes de tocar nada. Sin permanencia, sin tarifa por mirar.",
  keywords: [
    "atención telefónica taller",
    "IA llamadas taller mecánico",
    "automatización taller",
    "WhatsApp taller",
    "agenda taller",
    "leads taller",
    "n8n",
    "Claude",
  ],
  authors: [{ name: "Lazo" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lazo — Atamos el teléfono de tu taller",
    description:
      "Cada llamada perdida es un coche que no entra esta semana. Medimos cuántas y cuánto te cuestan, antes de tocar nada.",
    url: SITE_URL,
    siteName: "Lazo",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lazo — Atamos el teléfono de tu taller",
    description:
      "Diagnóstico de fuga primero. Decides después. Sin permanencia.",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans bg-cream text-charcoal antialiased">
        <ProgressBar />
        <div className="fixed top-5 left-4 md:left-6 z-40">
          <Wordmark className="text-lg md:text-xl" />
        </div>
        <SmoothScroll>{children}</SmoothScroll>
        <StickyCTAMobile />
        <Analytics />
      </body>
    </html>
  );
}
