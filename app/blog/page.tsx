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
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-800">
            Artículos y notas de trabajo
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl font-black leading-[0.94] text-slate-950 sm:text-6xl">Problemas concretos entre el modelo, la impresora y la entrega</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Busca por problema, material o fase del proyecto. Algunos textos parten de una pieza fotografiada; otros ordenan documentación técnica y dejan claro qué faltaría comprobar en la práctica.
          </p>
        </div>
      </section>
      <ArticleExplorer articles={articles} />
    </>
  );
}
