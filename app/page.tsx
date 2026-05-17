import Link from "next/link";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { categories } from "@/lib/categories";
import { getFeaturedArticles } from "@/lib/articles";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/"
});

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      description: siteConfig.description
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      description: siteConfig.description,
      potentialAction: {
        "@type": "SearchAction",
        target: `${absoluteUrl("/blog")}?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <section className="technical-grid border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">CAD, diseño industrial, FEM e impresión 3D</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              Guías técnicas para diseñar, imprimir, simular y documentar mejores proyectos.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              CAD Lab 3D ayuda a estudiantes y perfiles junior a tomar mejores decisiones en CAD, FDM, materiales, portfolio y memorias técnicas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-blue-800" href="/blog">
                Leer el blog
              </Link>
              <Link className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 hover:border-blue-300 hover:text-blue-700" href="/recursos">
                Ver recursos
              </Link>
              <Link className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 hover:border-blue-300 hover:text-blue-700" href="/servicios">
                Servicios técnicos
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl">
            <div className="aspect-[4/3] rounded-md bg-slate-950 p-5 text-white">
              <div className="grid h-full grid-cols-6 grid-rows-5 gap-2">
                <div className="col-span-4 row-span-3 rounded border border-teal-300/60 bg-slate-900 p-4">
                  <div className="h-3 w-28 rounded bg-teal-300" />
                  <div className="mt-7 grid grid-cols-3 gap-3">
                    <div className="aspect-square rounded border border-blue-300/60" />
                    <div className="aspect-square rounded border border-blue-300/60 bg-blue-400/20" />
                    <div className="aspect-square rounded border border-blue-300/60" />
                  </div>
                </div>
                <div className="col-span-2 row-span-5 rounded border border-slate-600 bg-slate-900 p-4">
                  <div className="mb-3 h-2 w-16 rounded bg-blue-400" />
                  <div className="grid gap-2">
                    <div className="h-2 rounded bg-slate-700" />
                    <div className="h-2 rounded bg-slate-700" />
                    <div className="h-2 rounded bg-slate-700" />
                    <div className="h-20 rounded border border-teal-400/50" />
                  </div>
                </div>
                <div className="col-span-4 row-span-2 rounded border border-slate-600 bg-slate-900 p-4">
                  <div className="h-full rounded bg-gradient-to-r from-teal-400/30 via-blue-400/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Destacados</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Guías para empezar con criterio</h2>
          </div>
          <Link className="text-sm font-bold text-blue-700 hover:text-blue-900" href="/blog">
            Ver todos los artículos
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-teal-700">Servicios</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">Apoyo puntual para proyectos CAD</h2>
            </div>
            <Link className="text-sm font-bold text-blue-700 hover:text-blue-900" href="/servicios">
              Ver servicios
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Modelado y revisión CAD", "Optimización para impresión 3D", "Renders y documentación técnica"].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 p-5">
                <h3 className="font-black text-slate-950">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Apoyo puntual para ordenar archivos, revisar decisiones técnicas y mejorar entregas de proyecto.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-950">Categorías principales</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.slug} href={`/categorias/${category.slug}`} className="rounded-lg border border-slate-200 p-5 hover:border-teal-300 hover:shadow-sm">
                <h3 className="font-black text-slate-950">{category.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300" href="/guias">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Rutas de lectura</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Guías por tema</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Accesos ordenados para aprender CAD, impresión 3D, materiales y documentación.</p>
          </Link>
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300" href="/servicios">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Conversión</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Servicios CAD</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Consultas sobre modelado, revisión, renders y archivos de fabricación para proyectos técnicos.</p>
          </Link>
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300" href="/herramientas-recomendadas">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Criterios de compra</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Herramientas</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Criterios para elegir software, filamentos, medición y recursos sin comprar a ciegas.</p>
          </Link>
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300" href="/calculadora-precio-impresion-3d">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Presupuestos FDM</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Calculadora 3D</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Calcula precio por pieza y lote con material, electricidad, desgaste, mano de obra, margen e IVA.</p>
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <Newsletter />
        <div className="grid gap-4">
          <AdPlaceholder />
          <Link className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300" href="/contacto">
            <h2 className="text-xl font-black text-slate-950">¿Tienes un proyecto técnico?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Envía tu consulta sobre modelado, revisión, documentación o preparación de archivos.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
