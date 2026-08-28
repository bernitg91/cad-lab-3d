import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems } from "@/lib/portfolio";
import { createPageMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Galería comentada de piezas impresas en 3D",
  description: "Piezas FDM fotografiadas y comentadas con observaciones visibles, preguntas de revisión y límites de lo que no se ha medido.",
  path: "/casos-practicos-impresion-3d"
});

export default function PracticalCasesPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Galería comentada de piezas de impresión 3D FDM",
    url: absoluteUrl("/casos-practicos-impresion-3d"),
    itemListElement: portfolioItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.title,
        description: item.description,
        image: absoluteUrl(item.image),
        url: `${absoluteUrl("/casos-practicos-impresion-3d")}#caso-${index + 1}`
      }
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: absoluteUrl("/")
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Galería comentada de piezas impresas en 3D",
        item: absoluteUrl("/casos-practicos-impresion-3d")
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([itemListJsonLd, breadcrumbJsonLd])} />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Galería comentada FDM</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Piezas impresas en 3D: qué puede observarse y qué falta por medir
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Esta página documenta fotografías propias y separa las observaciones visibles de las prestaciones que exigirían medidas o ensayos. No presenta estas piezas como casos validados cuando faltan datos de máquina, material o tolerancia.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-blue-800" href="/impresion-3d-personalizada">
                Pedir pieza personalizada
              </Link>
              <Link className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 hover:border-blue-300 hover:text-blue-700" href="/calculadora-precio-impresion-3d">
                Calcular precio FDM
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {portfolioItems.slice(0, 4).map((item) => (
              <div key={item.title} className="relative aspect-square overflow-hidden border border-slate-200 bg-slate-100">
                <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" priority={item.title === portfolioItems[0].title} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Qué se observa", "Geometría, proporción, acabado visible, accesos, apoyos y zonas que convendría revisar."],
            ["Qué no puede inferirse", "Material, tolerancia, resistencia o durabilidad no se atribuyen cuando no existe una medida o ensayo documentado."],
            ["Cómo usar la galería", "Como lista de preguntas para preparar una prueba real, no como sustituto de datos de fabricación."]
          ].map(([title, text]) => (
            <article key={title} className="border-t-2 border-slate-950 bg-white py-5">
              <h2 className="text-xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Análisis pieza a pieza</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Ocho fotografías y un registro todavía incompleto</h2>
          <div className="mt-8 grid gap-6">
            {portfolioItems.map((item, index) => (
              <article id={`caso-${index + 1}`} key={item.title} className="grid overflow-hidden border-t-2 border-slate-950 bg-white pt-3 lg:grid-cols-[0.8fr_1.2fr] lg:gap-6">
                <div className="relative min-h-[320px] bg-slate-100">
                  <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </div>
                <div className="py-6 lg:pr-6">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-800">Foto propia {String(index + 1).padStart(2, "0")} · ficha incompleta</p>
                  <h3 className="mt-2 text-2xl font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                  <div className="mt-5 grid gap-3 border-y border-slate-200 py-4 text-sm leading-6 text-slate-700 md:grid-cols-3">
                    <div>
                      <p className="font-black text-slate-950">Material registrado</p>
                      <p className="mt-1">{item.material}</p>
                    </div>
                    <div>
                      <p className="font-black text-slate-950">Uso aparente</p>
                      <p className="mt-1">{item.use}</p>
                    </div>
                    <div>
                      <p className="font-black text-slate-950">Qué revisar después</p>
                      <p className="mt-1">{item.criticalPoints.join(", ")}</p>
                    </div>
                  </div>
                  <p className="mt-5 border-l-2 border-orange-600 pl-4 text-sm leading-6 text-slate-600">
                    <span className="font-bold text-slate-950">Lo que falta:</span>{" "}
                    fecha, impresora, filamento, boquilla, altura de capa, orientación, perfil y medidas. Hasta recuperar o repetir esos datos, esta pieza se presenta como fotografía, no como caso validado.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="article-body">
          <h2>Qué diferencia esta ficha de un caso validado</h2>
          <p>
            Una ficha comentada puede señalar geometría, acabado y preguntas de revisión. Un caso validado necesita además material confirmado, impresora, perfil, cotas nominales y reales, iteraciones y resultados. Esos datos no se sustituyen con una fotografía.
          </p>
          <h2>Cómo valorar si una pieza es buena candidata para FDM</h2>
          <p>
            Una pieza es buena candidata cuando su función se puede validar con el material disponible, sus tolerancias no son imposibles para la impresora y la orientación de impresión no debilita las zonas importantes. También ayuda que el modelo tenga espesores coherentes, radios en esquinas y superficies pensadas para el acabado real del proceso.
          </p>
          <h3>Preguntas antes de imprimir</h3>
          <ul>
            <li>¿La pieza será visual, funcional, flexible, de montaje o de prueba?</li>
            <li>¿Hay zonas que trabajen a flexión, impacto, temperatura o rozamiento?</li>
            <li>¿Las medidas críticas tienen tolerancia suficiente para FDM?</li>
            <li>¿La orientación mejora la resistencia o solo reduce soportes?</li>
            <li>¿Hace falta una prueba pequeña antes de imprimir el lote completo?</li>
          </ul>
          <h2>Errores frecuentes en piezas aparentemente simples</h2>
          <p>
            Los fallos más comunes aparecen por paredes demasiado finas, superficies planas muy grandes, encajes sin holgura, radios inexistentes, exceso de soportes, mala elección de material o expectativas de acabado que no corresponden al proceso FDM. Por eso conviene revisar el diseño antes de presupuestar.
          </p>
        </div>
        <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Recursos relacionados</h2>
          <div className="mt-5 grid gap-3">
            {[
              ["Checklist antes de imprimir", "/checklist-impresion-3d"],
              ["Elegir material FDM", "/selector-material-impresion-3d"],
              ["Calcular precio de impresión", "/calculadora-precio-impresion-3d"],
              ["Servicio de impresión 3D", "/impresion-3d-personalizada"],
              ["Guía completa de impresión 3D", "/guia-impresion-3d-fdm"]
            ].map(([label, href]) => (
              <Link key={href} className="rounded-md border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" href={href}>
                {label}
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}
