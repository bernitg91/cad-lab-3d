import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AdSenseScript } from "@/components/AdSenseScript";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.name} | CAD, diseño industrial e impresión 3D`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: "Contenido técnico para estudiantes de ingeniería, diseño industrial y fabricación digital."
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <AdSenseScript />
        <Link
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow"
        >
          Saltar al contenido
        </Link>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
