import type { Metadata } from "next";
import { guideArticles } from "@/lib/guide-articles";
import { ArticleExplorer } from "@/components/ArticleExplorer";
import { getAllArticles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description: "Guías de modelado CAD, Blender, KeyShot, impresoras de filamento, resina, polvo y metal, productos para vender y resolución de fallos.",
  path: "/blog"
});

export default function BlogPage() {
  const articles = [...guideArticles, ...getAllArticles()];

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-800">
            Artículos y notas de trabajo
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold leading-[1.08] tracking-tight text-slate-950 sm:text-6xl">Diseñar mejor empieza<br />con una buena pregunta.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Busca por problema, material o fase del proyecto. Encontrarás comparativas de CAD y renderizado, tecnologías de impresión, productos para vender, materiales y documentación, con fuentes y ejemplos para llevarlos a tu trabajo.
          </p>
        </div>
      </section>
      <ArticleExplorer articles={articles} />
    </>
  );
}
