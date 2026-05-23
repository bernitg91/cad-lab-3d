import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { getAllArticles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Guías",
  description: "Guías principales de Creo Parametric, SolidWorks, impresión 3D, materiales, simulación FEM, portfolio y documentación técnica.",
  path: "/guias"
});

const guideGroups = [
  { title: "Creo Parametric", href: "/categorias/creo-parametric" },
  { title: "SolidWorks", href: "/categorias/solidworks" },
  { title: "Impresión 3D", href: "/categorias/impresion-3d" },
  { title: "Materiales", href: "/categorias/materiales" },
  { title: "Simulación FEM", href: "/categorias/simulacion-fem" },
  { title: "Portfolio y documentación técnica", href: "/categorias/proyectos-universitarios" }
];

export default function GuidesPage() {
  const articles = getAllArticles();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-teal-700">Rutas de aprendizaje</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-black text-slate-950">Guías para estudiar, diseñar, fabricar y documentar con criterio</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Accesos directos a las áreas principales del proyecto para que el contenido pueda crecer de forma ordenada.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {guideGroups.map((guide) => (
          <Link key={guide.title} href={guide.href} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300">
            <h2 className="text-xl font-black text-slate-950">{guide.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Artículos, checklists y ejemplos prácticos para avanzar desde conceptos básicos hasta decisiones de proyecto.
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {categories.slice(0, 6).map((category) => {
          const categoryArticles = articles.filter((article) => article.categorySlug === category.slug).slice(0, 4);
          return (
            <section key={category.slug} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-teal-700">Guía pilar</p>
                  <h2 className="mt-1 text-xl font-black text-slate-950">{category.name}</h2>
                </div>
                <Link className="text-sm font-bold text-blue-700 hover:text-blue-900" href={`/categorias/${category.slug}`}>
                  Ver categoría
                </Link>
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                {categoryArticles.map((article) => (
                  <li key={article.slug}>
                    <Link className="font-semibold hover:text-blue-700" href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-950">Categorías disponibles</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link key={category.slug} className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700" href={`/categorias/${category.slug}`}>
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link className="rounded-lg bg-slate-950 p-5 text-white hover:bg-blue-900" href="/recursos">
          <h2 className="text-xl font-black">Recursos y plantillas</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Checklists, estructuras y guías relacionadas para trabajar con más orden.</p>
        </Link>
        <Link className="rounded-lg bg-slate-950 p-5 text-white hover:bg-blue-900" href="/casos-practicos-impresion-3d">
          <h2 className="text-xl font-black">Casos prácticos</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Piezas reales con objetivo, revisión técnica y aprendizajes de impresión FDM.</p>
        </Link>
        <Link className="rounded-lg bg-slate-950 p-5 text-white hover:bg-blue-900" href="/servicios">
          <h2 className="text-xl font-black">Servicios CAD</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Apoyo para modelado, renders, revisión y documentación técnica.</p>
        </Link>
        <Link className="rounded-lg bg-slate-950 p-5 text-white hover:bg-blue-900" href="/herramientas-recomendadas">
          <h2 className="text-xl font-black">Herramientas</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Criterios para elegir software, materiales y equipos antes de comprar.</p>
        </Link>
        <Link className="rounded-lg bg-slate-950 p-5 text-white hover:bg-blue-900" href="/glosario">
          <h2 className="text-xl font-black">Glosario técnico</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Definiciones para leer guías de CAD, FDM, materiales, FEM y documentación.</p>
        </Link>
        <Link className="rounded-lg bg-slate-950 p-5 text-white hover:bg-blue-900" href="/preguntas-frecuentes">
          <h2 className="text-xl font-black">FAQ</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Respuestas rápidas sobre servicios, archivos, límites técnicos y contacto.</p>
        </Link>
      </div>
    </section>
  );
}
