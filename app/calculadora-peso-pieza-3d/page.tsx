import type { Metadata } from "next";
import Link from "next/link";
import { WeightEstimator } from "@/components/WeightEstimator";
import { createPageMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

const title = "Calculadora de peso de pieza 3D";
const description = "Estima el peso de una pieza impresa en 3D según volumen, material, densidad, relleno, paredes, soportes y cantidad. Herramienta gratuita para FDM.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/calculadora-peso-pieza-3d"
});

export default function WeightCalculatorPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      description,
      url: absoluteUrl("/calculadora-peso-pieza-3d"),
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
        { "@type": "ListItem", position: 2, name: title, item: absoluteUrl("/calculadora-peso-pieza-3d") }
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
            <span className="text-slate-800">Calculadora de peso 3D</span>
          </nav>
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Herramienta gratuita</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl">Calculadora de peso de pieza 3D</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Estima el peso de una pieza FDM a partir del volumen del modelo, densidad del material, relleno, paredes, soportes y cantidad de piezas.
          </p>
        </div>
      </section>
      <WeightEstimator />
      <SeoContent />
    </>
  );
}

function SeoContent() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="article-body">
        <h2>Cómo calcular el peso de una pieza impresa en 3D</h2>
        <p>El peso final no depende solo del volumen CAD. En FDM influyen el material, el porcentaje de relleno, el número de paredes, las tapas, los soportes y el margen de purga o brim.</p>
        <h2>Fórmula orientativa</h2>
        <p><strong>Peso estimado = volumen x densidad x factor de relleno y paredes x margen de soportes</strong></p>
        <p>El laminador suele dar el dato más fiable, pero esta herramienta ayuda a estimar antes de preparar el archivo completo.</p>
        <h2>Densidades orientativas</h2>
        <table>
          <thead>
            <tr><th>Material</th><th>Densidad orientativa</th><th>Uso habitual</th></tr>
          </thead>
          <tbody>
            <tr><td>PLA</td><td>1,24 g/cm3</td><td>Prototipos, piezas visuales y uso interior</td></tr>
            <tr><td>PETG</td><td>1,27 g/cm3</td><td>Piezas funcionales y resistencia media</td></tr>
            <tr><td>TPU</td><td>1,21 g/cm3</td><td>Piezas flexibles</td></tr>
            <tr><td>ABS</td><td>1,04 g/cm3</td><td>Piezas técnicas con más temperatura</td></tr>
            <tr><td>ASA</td><td>1,07 g/cm3</td><td>Exterior y resistencia UV</td></tr>
            <tr><td>Nylon</td><td>1,14 g/cm3</td><td>Piezas técnicas resistentes</td></tr>
          </tbody>
        </table>
        <h2>Errores frecuentes</h2>
        <ul>
          <li>Usar el volumen macizo del CAD como si la pieza fuera sólida.</li>
          <li>No contar soportes, brim o purgas.</li>
          <li>Olvidar que paredes y tapas pueden pesar mucho en piezas pequeñas.</li>
          <li>No comparar el peso estimado con el peso real después de imprimir.</li>
        </ul>
        <p>Para convertir esta estimación en presupuesto, usa también la <Link href="/calculadora-precio-impresion-3d">calculadora de precio de impresión 3D</Link>.</p>
      </div>
    </section>
  );
}
