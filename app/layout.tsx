import type { Metadata } from "next";
import Link from "next/link";
import { Space_Grotesk, IBM_Plex_Mono, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AdSenseScript } from "@/components/AdSenseScript";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getAllArticles } from "@/lib/articles";
import { getSiteUrl, isPreviewDeployment, isProductionDeployment, siteConfig } from "@/lib/site";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const utilityFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-utility",
  preload: false,
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.name} | CAD, diseño industrial e impresión 3D`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.authorName, url: `${siteConfig.defaultUrl}/sobre-mi` }],
  robots: isPreviewDeployment() ? { index: false, follow: false } : { googleBot: { "max-image-preview": "large" } },
  other: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT ? { "google-adsense-account": process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT } : undefined,
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
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const monetizableArticlePaths = getAllArticles().map(
    (article) => `/blog/${article.slug}`
  );

  return (
    <html lang="es" className={`${bodyFont.variable} ${displayFont.variable} ${utilityFont.variable}`}>
      <head>{isProductionDeployment() && <link rel="preconnect" href="https://fundingchoicesmessages.google.com" />}</head>
      <body>
        <AdSenseScript
          enabled={isProductionDeployment()}
          articlePaths={monetizableArticlePaths}
        />
        <Link
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow"
        >
          Saltar al contenido
        </Link>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        {isProductionDeployment() ? <Analytics /> : null}
      </body>
    </html>
  );
}
