import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { getAllArticles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Categorías",
  description: "Explora artículos por categorías de CAD, impresión 3D, materiales, FEM, recursos y proyectos universitarios.",
  path: "/categorias"
});

export default function CategoriesPage() {
  const articles = getAllArticles();
  const routes = [
    {
      title: "Ruta FDM funcional",
      text: "Empieza por errores comunes, material, orientación, tolerancias y cálculo de precio.",
      href: "/categorias/impresion-3d"
    },
    {
      title: "Ruta documentación técnica",
      text: "Prepara informes, memorias, fichas técnicas, portfolios y presentación de proyectos.",
      href: "/categorias/proyectos-universitarios"
    },
    {
      title: "Ruta materiales",
      text: "Compara PLA, PETG, TPU, ABS, ASA, Nylon y criterios de selección por uso.",
      href: "/categorias/materiales"
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-slate-950">Categorías</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Accede a cada área del blog y encuentra contenido organizado por herramientas, materiales y procesos de trabajo.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const count = articles.filter((article) => article.categorySlug === category.slug).length;
          return (
            <Link key={category.slug} href={`/categorias/${category.slug}`} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300">
              <p className="text-xs font-black uppercase tracking-wide text-teal-700">{count} artículos</p>
              <h2 className="mt-2 text-xl font-black text-slate-950">{category.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
            </Link>
          );
        })}
      </div>
      <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-wide text-teal-700">Por dónde empezar</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Rutas recomendadas por intención</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {routes.map((route) => (
            <Link key={route.title} href={route.href} className="rounded-md bg-slate-50 p-4 hover:bg-blue-50">
              <h3 className="font-black text-slate-950">{route.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{route.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
