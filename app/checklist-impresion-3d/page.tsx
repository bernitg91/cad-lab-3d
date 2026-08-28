import type { Metadata } from "next";
import Link from "next/link";
import { PrintChecklist } from "@/components/PrintChecklist";
import { createPageMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

const title = "Checklist de impresión 3D antes de imprimir";
const description = "Checklist interactiva para revisar archivo, geometría, orientación, material, parámetros, cama, filamento y control final antes de imprimir una pieza 3D.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/checklist-impresion-3d"
});

export default function ChecklistPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      description,
      url: absoluteUrl("/checklist-impresion-3d"),
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "es",
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: absoluteUrl("/")
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: title, item: absoluteUrl("/checklist-impresion-3d") }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm font-semibold text-slate-500">
            <Link className="hover:text-blue-700" href="/">Inicio</Link>
            <span className="px-2">/</span>
            <span className="text-slate-800">Checklist impresión 3D</span>
          </nav>
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Herramienta gratuita</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl">Checklist de impresión 3D antes de imprimir</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Revisa archivo, geometría, orientación, material, parámetros, cama, filamento y control final antes de gastar horas de impresión.
          </p>
        </div>
      </section>
      <PrintChecklist />
      <SeoContent />
    </>
  );
}

function SeoContent() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="article-body">
        <h2>Por qué usar una checklist antes de imprimir en 3D</h2>
        <p>Una revisión de dos minutos puede evitar horas perdidas. Los fallos más comunes aparecen por escala incorrecta, mala orientación, tolerancias sin probar, material inadecuado o cama mal preparada.</p>
        <h2>Qué revisar antes de mandar una pieza a imprimir</h2>
        <ul>
          <li>Archivo correcto, versión clara y unidades reales.</li>
          <li>Orientación coherente con resistencia, soportes y acabado.</li>
          <li>Material elegido según uso, temperatura y entorno.</li>
          <li>Parámetros del laminador guardados para repetir.</li>
          <li>Revisión posterior con medidas y notas de mejora.</li>
        </ul>
        <h2>Cómo usarla en proyectos universitarios</h2>
        <p>Guarda la checklist completada como evidencia de proceso. En una memoria técnica puede servir para justificar decisiones de fabricación y control de calidad.</p>
        <p>Si tu pieza tiene encajes, combina esta revisión con las <Link href="/blog/pruebas-tolerancia-fdm">pruebas de tolerancia FDM</Link>.</p>
      </div>
    </section>
  );
}
