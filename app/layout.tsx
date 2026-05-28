import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import SmoothScroll from "./_components/SmoothScroll";
import Wordmark from "./_components/layout/Wordmark";
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
  title: "Lazo — IA, automatización y marketing digital en PYMES",
  description:
    "Implementamos IA, automatización y marketing digital en PYMES españolas. Sistemas que funcionan en tu operativa real, no en presentaciones bonitas.",
  keywords: [
    "agencia IA PYMES",
    "automatización PYMES España",
    "consultoría IA empresas",
    "funnels de venta",
    "WhatsApp IA",
    "Airtable",
    "n8n",
    "ciberseguridad PYMES",
  ],
  authors: [{ name: "Lazo" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lazo — IA, automatización y marketing digital en PYMES",
    description:
      "Más clientes. Menos caos. Menos horas. Implementamos sistemas que funcionan en tu operativa real.",
    url: SITE_URL,
    siteName: "Lazo",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lazo — IA, automatización y marketing digital en PYMES",
    description:
      "Sistemas que funcionan en tu operativa real, no en presentaciones bonitas.",
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
