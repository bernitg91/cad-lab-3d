import type { Metadata } from "next";
import Link from "next/link";
import { MaterialSelector } from "@/components/MaterialSelector";
import { createPageMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

const title = "Selector de material para impresión 3D";
const description = "Elige material FDM según temperatura, exterior, flexibilidad, impacto, facilidad de impresión y acabado. Comparador orientativo de PLA, PETG, TPU, ABS, ASA y Nylon.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/selector-material-impresion-3d"
});

export default function MaterialSelectorPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      description,
      url: absoluteUrl("/selector-material-impresion-3d"),
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
        { "@type": "ListItem", position: 2, name: title, item: absoluteUrl("/selector-material-impresion-3d") }
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
            <span className="text-slate-800">Selector de material</span>
          </nav>
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Herramienta gratuita</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl">Selector de material para impresión 3D</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Compara PLA, PETG, TPU, ABS, ASA y Nylon según uso interior, exterior, temperatura, impacto, flexibilidad, facilidad de impresión y acabado.
          </p>
        </div>
      </section>
      <MaterialSelector />
      <SeoContent />
    </>
  );
}

function SeoContent() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="article-body">
        <h2>Cómo elegir material para impresión 3D FDM</h2>
        <p>Elegir material no debería depender solo del color o del precio. Primero conviene definir función, temperatura, entorno, rigidez, flexibilidad, impacto, acabado y dificultad de impresión.</p>
        <h2>Comparativa rápida</h2>
        <table>
          <thead>
            <tr><th>Material</th><th>Punto fuerte</th><th>Limitación habitual</th></tr>
          </thead>
          <tbody>
            <tr><td>PLA</td><td>Fácil, económico y buen acabado</td><td>Calor y uso exterior prolongado</td></tr>
            <tr><td>PETG</td><td>Buen equilibrio funcional</td><td>Puede generar hilos y marcas</td></tr>
            <tr><td>TPU</td><td>Flexibilidad</td><td>Más lento y exigente</td></tr>
            <tr><td>ABS</td><td>Temperatura y uso técnico</td><td>Warping y necesidad de cerramiento</td></tr>
            <tr><td>ASA</td><td>Exterior y UV</td><td>Más exigente que PLA o PETG</td></tr>
            <tr><td>Nylon</td><td>Tenacidad y piezas técnicas</td><td>Absorbe humedad y requiere control</td></tr>
          </tbody>
        </table>
        <h2>Preguntas que debes responder</h2>
        <ul>
          <li>¿La pieza estará al sol o en exterior?</li>
          <li>¿Habrá calor, impacto o carga repetida?</li>
          <li>¿Necesita flexar o mantenerse rígida?</li>
          <li>¿Priorizas facilidad de impresión o propiedad técnica?</li>
        </ul>
        <p>Si ya sabes el material y quieres estimar consumo, usa la <Link href="/calculadora-peso-pieza-3d">calculadora de peso de pieza 3D</Link>.</p>
      </div>
    </section>
  );
}
