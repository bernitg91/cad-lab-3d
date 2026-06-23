import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { ArticleCard } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";
import { getAllArticles, getFeaturedArticles } from "@/lib/articles";
import { portfolioItems } from "@/lib/portfolio";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/"
});

export default function HomePage() {
  const articles = getAllArticles();
  const featuredArticles = getFeaturedArticles();
  const latestArticles = articles.slice(0, 6);
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
              <Link className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 hover:border-blue-300 hover:text-blue-700" href="/guia-impresion-3d-fdm">
                Guía FDM
              </Link>
              <Link className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 hover:border-blue-300 hover:text-blue-700" href="/servicios">
                Servicios técnicos
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-slate-100">
              <Image
                src="/images/impresion-3d-personalizada/pieza-decorativa-azul-fdm.jpg"
                alt="Pieza azul impresa en 3D con geometría por capas"
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Ejemplo de pieza FDM con geometría por capas, útil para observar acabado, contornos y continuidad de impresión.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-teal-700">Herramientas prácticas</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">Calculadoras y checklists para trabajar mejor</h2>
            </div>
            <Link className="text-sm font-bold text-blue-700 hover:text-blue-900" href="/recursos">
              Ver recursos
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Calculadora de precio 3D", "Calcula precio por pieza y lote con material, electricidad, desgaste, mano de obra, margen e IVA.", "/calculadora-precio-impresion-3d"],
              ["Calculadora de peso", "Estima gramos con volumen, densidad, relleno, paredes, soportes y cantidad.", "/calculadora-peso-pieza-3d"],
              ["Selector de material FDM", "Compara PLA, PETG, TPU, ABS, ASA y Nylon según uso real.", "/selector-material-impresion-3d"],
              ["Checklist de impresión", "Revisa archivo, orientación, material, cama, filamento y control final.", "/checklist-impresion-3d"]
            ].map(([title, text, href]) => (
              <Link key={href} href={href} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300">
                <h3 className="text-xl font-black text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </Link>
            ))}
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
              <p className="text-sm font-black uppercase tracking-wide text-teal-700">Casos prácticos</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">Piezas reales con criterio técnico</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Ejemplos de piezas impresas con notas sobre objetivo, diseño, revisión y aspectos que conviene comprobar antes de fabricar.
              </p>
            </div>
            <Link className="text-sm font-bold text-blue-700 hover:text-blue-900" href="/casos-practicos-impresion-3d">
              Ver casos
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {portfolioItems.slice(0, 3).map((item) => (
              <Link
                key={item.title}
                href={item.slug ? `/casos-practicos-impresion-3d/${item.slug}` : "/casos-practicos-impresion-3d"}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:border-blue-300"
              >
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image src={item.image} alt={item.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
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
            {[
              { title: "Modelado y revisión CAD", href: "/servicios" },
              { title: "Impresión 3D personalizada", href: "/impresion-3d-personalizada" },
              { title: "Renders y documentación técnica", href: "/servicios" }
            ].map((item) => (
              <Link key={item.title} href={item.href} className="rounded-lg border border-slate-200 p-5 hover:border-blue-300 hover:shadow-sm">
                <h3 className="font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Apoyo puntual para ordenar archivos, revisar decisiones técnicas y mejorar entregas de proyecto.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Rutas de aprendizaje</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Empieza por una guía completa</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Cada ruta reúne decisiones relacionadas para que no tengas que reconstruir el proceso saltando entre entradas aisladas.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Impresión 3D FDM", "Diseño, laminado y control final.", "/guia-impresion-3d-fdm"],
              ["Materiales FDM", "Selección por uso y fabricación.", "/guia-materiales-fdm"],
              ["CAD paramétrico", "Modelos que admiten cambios.", "/guia-cad-parametrico"],
              ["Simulación FEM", "Hipótesis, malla y resultados.", "/guia-simulacion-fem"],
              ["Documentación", "Decisiones, pruebas y memoria.", "/guia-documentacion-tecnica"]
            ].map(([title, description, href]) => (
              <Link key={href} href={href} className="border-t-4 border-slate-950 bg-white p-5 shadow-sm ring-1 ring-slate-200 hover:border-teal-500 hover:ring-blue-200">
                <h3 className="font-black text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Nuevas guías</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Últimas guías publicadas</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Artículos recientes sobre impresión 3D, CAD, materiales, FEM y documentación técnica.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {latestArticles.map((article) => (
              <Link key={article.slug} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-300" href={`/blog/${article.slug}`}>
                <p className="text-xs font-black uppercase tracking-wide text-teal-700">{article.category}</p>
                <h3 className="mt-1 font-black text-slate-950">{article.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{article.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300" href="/guias">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Rutas de lectura</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Guías por tema</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Accesos ordenados para aprender CAD, impresión 3D, materiales y documentación.</p>
          </Link>
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300" href="/servicios">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Consultas técnicas</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Servicios CAD</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Consultas sobre modelado, revisión, renders y archivos de fabricación para proyectos técnicos.</p>
          </Link>
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300" href="/fuentes">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Referencias</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Fuentes técnicas</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Documentación oficial utilizada para contrastar software, materiales y simulación.</p>
          </Link>
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300" href="/calculadora-precio-impresion-3d">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Presupuestos FDM</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Calculadora 3D</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Calcula precio por pieza y lote con material, electricidad, desgaste, mano de obra, margen e IVA.</p>
          </Link>
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300" href="/selector-material-impresion-3d">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Materiales FDM</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Selector material</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Elige material según calor, exterior, impacto, flexibilidad, facilidad y acabado.</p>
          </Link>
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300" href="/casos-practicos-impresion-3d">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Piezas reales</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Casos prácticos</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Ejemplos de impresión 3D con objetivo, revisión técnica y aprendizaje de diseño.</p>
          </Link>
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300" href="/glosario">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Referencia</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Glosario técnico</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Definiciones de CAD, FDM, materiales, tolerancias, FEM y documentación.</p>
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <Newsletter />
        <div className="grid gap-4">
          <Link className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300" href="/contacto">
            <h2 className="text-xl font-black text-slate-950">¿Tienes un proyecto técnico?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Envía tu consulta sobre modelado, revisión, documentación o preparación de archivos.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
