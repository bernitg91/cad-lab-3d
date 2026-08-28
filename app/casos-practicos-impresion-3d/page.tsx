import type { Metadata } from "next";
import Link from "next/link";
import { portfolioItems } from "@/lib/portfolio";
import { createPageMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Registro comentado de piezas impresas en 3D",
  description: "Fichas de piezas FDM con observaciones visibles, preguntas de revisión y límites de lo que todavía no se ha medido.",
  path: "/casos-practicos-impresion-3d"
});

export default function PracticalCasesPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Registro comentado de piezas de impresión 3D FDM",
    url: absoluteUrl("/casos-practicos-impresion-3d"),
    itemListElement: portfolioItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.title,
        description: item.description,
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
        name: "Registro comentado de piezas impresas en 3D",
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
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Registro comentado FDM</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Ocho piezas, ocho preguntas de fabricación
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Este índice separa lo que puede observarse de las prestaciones que exigirían medidas o ensayos. Las fotografías no se duplican aquí: cada recurso visual queda reservado a una sola publicación.
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
          <div className="border border-slate-300 bg-[#091625] p-5 text-white sm:p-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300">Protocolo de lectura · sin miniaturas repetidas</p>
            <div className="mt-5 divide-y divide-white/15 border-y border-white/15">
              {[
                ["01", "Observar", "Geometría y acabado visible"],
                ["02", "Separar", "Hechos, hipótesis y ausencias"],
                ["03", "Comprobar", "Medida o ensayo pendiente"]
              ].map(([number, title, text]) => (
                <div key={number} className="grid grid-cols-[42px_90px_1fr] gap-3 py-4 text-sm">
                  <span className="font-mono font-bold text-orange-300">{number}</span>
                  <span className="font-black text-white">{title}</span>
                  <span className="text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Qué se observa", "Geometría, proporción, acabado visible, accesos, apoyos y zonas que convendría revisar."],
            ["Qué no puede inferirse", "Material, tolerancia, resistencia o durabilidad no se atribuyen cuando no existe una medida o ensayo documentado."],
            ["Cómo usar el registro", "Como lista de preguntas para preparar una prueba real, no como sustituto de datos de fabricación."]
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
          <h2 className="mt-2 text-3xl font-black text-slate-950">Ocho fichas y un registro todavía incompleto</h2>
          <div className="mt-8 grid gap-6">
            {portfolioItems.map((item, index) => (
              <article id={`caso-${index + 1}`} key={item.title} className="grid overflow-hidden border-t-2 border-slate-950 bg-white lg:grid-cols-[150px_1fr]">
                <div className="border-b border-slate-200 bg-[#eef2f6] p-5 lg:border-b-0 lg:border-r">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-teal-800">Ficha de pieza</p>
                  <p className="mt-2 font-display text-6xl font-black leading-none text-slate-950">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-4 border-t border-slate-300 pt-3 font-mono text-[9px] uppercase leading-5 text-slate-600">{item.material}</p>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-800">Registro técnico · ficha incompleta</p>
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
                    fecha, impresora, filamento, boquilla, altura de capa, orientación, perfil y medidas. Las observaciones proceden del archivo visual original, pero no se presentan como un caso validado.
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
