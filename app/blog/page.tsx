import type { Metadata } from "next";
import { ArticleExplorer } from "@/components/ArticleExplorer";
import { getAllArticles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description: "Artículos sobre CAD, SolidWorks, Creo Parametric, impresión 3D, materiales, FEM y proyectos universitarios.",
  path: "/blog"
});

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Biblioteca técnica</p>
          <h1 className="mt-3 text-4xl font-black text-slate-950">Blog de CAD Lab 3D</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Tutoriales y guías para resolver dudas reales de modelado, fabricación digital, materiales y documentación de proyectos.
          </p>
        </div>
      </section>
      <ArticleExplorer articles={articles} />
    </>
  );
}
