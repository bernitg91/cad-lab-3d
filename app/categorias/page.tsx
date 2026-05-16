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
    </section>
  );
}
