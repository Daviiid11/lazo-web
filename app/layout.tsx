import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Lazo — Atamos los cabos sueltos de tu negocio",
  description:
    "Automatización con IA para clínicas, despachos e inmobiliarias. Conectamos lo que tu negocio ya tiene — sin migrar de herramientas. En 30 días, funcionando.",
  keywords: [
    "automatización IA",
    "agencia IA España",
    "WhatsApp automatización",
    "clínicas estética",
    "despachos abogados",
    "inmobiliarias",
    "n8n",
    "Claude",
  ],
  authors: [{ name: "Lazo" }],
  openGraph: {
    title: "Lazo — Atamos los cabos sueltos de tu negocio",
    description:
      "Automatización con IA para clínicas, despachos e inmobiliarias. En 30 días, funcionando.",
    url: SITE_URL,
    siteName: "Lazo",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lazo — Atamos los cabos sueltos de tu negocio",
    description:
      "Automatización con IA para clínicas, despachos e inmobiliarias.",
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
        {children}
      </body>
    </html>
  );
}
