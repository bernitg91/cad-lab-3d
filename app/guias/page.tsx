import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Guías técnicas de CAD, FDM, materiales y FEM",
  description: "Guías completas para modelar, imprimir, seleccionar materiales, simular y documentar proyectos técnicos.",
  path: "/guias"
});

const guides = [
  { title: "Impresión 3D FDM", href: "/guia-impresion-3d-fdm", text: "Desde el diseño y el STL hasta orientación, laminado, calibración, coste y control final." },
  { title: "Materiales FDM", href: "/guia-materiales-fdm", text: "Decide entre PLA, PETG, TPU, ABS, ASA y Nylon con criterios de uso y fabricación." },
  { title: "CAD paramétrico", href: "/guia-cad-parametrico", text: "Organiza croquis, referencias, árbol, ensamblajes, planos y exportaciones fiables." },
  { title: "Simulación FEM", href: "/guia-simulacion-fem", text: "Plantea el problema, simplifica la geometría y revisa malla, resultados y límites." },
  { title: "Documentación técnica", href: "/guia-documentacion-tecnica", text: "Conecta requisitos, decisiones, prototipos, planos, renders y conclusiones." }
];

export default function GuidesPage() {
  const articles = getAllArticles();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-teal-700">Rutas de aprendizaje</p>
      <h1 className="mt-3 max-w-4xl text-4xl font-black text-slate-950">Guías para estudiar, diseñar, fabricar y documentar con criterio</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        Las guías principales reúnen el contexto que suele faltar al leer artículos sueltos. Empieza por una ruta completa y utiliza las entradas del blog para resolver dudas concretas.
      </p>

      <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
        {guides.map((guide, index) => (
          <Link key={guide.href} href={guide.href} className="group grid gap-3 py-7 md:grid-cols-[80px_280px_1fr] md:items-center">
            <span className="text-sm font-black text-teal-700">0{index + 1}</span>
            <h2 className="text-2xl font-black text-slate-950 group-hover:text-blue-700">{guide.title}</h2>
            <p className="text-sm leading-6 text-slate-600">{guide.text}</p>
          </Link>
        ))}
      </div>

      <section className="mt-14">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Lecturas específicas</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Artículos seleccionados y revisados</h2>
          </div>
          <Link className="text-sm font-bold text-blue-700 hover:text-blue-900" href="/blog">Ver el blog</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 6).map((article) => <ArticleCard key={article.slug} article={article} />)}
        </div>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-3">
        <Link className="border-l-4 border-teal-500 bg-slate-950 p-6 text-white" href="/recursos"><h2 className="text-xl font-black">Recursos aplicables</h2><p className="mt-2 text-sm leading-6 text-slate-300">Calculadoras, checklist y plantillas para trabajar sobre un proyecto real.</p></Link>
        <Link className="border-l-4 border-teal-500 bg-slate-950 p-6 text-white" href="/casos-practicos-impresion-3d"><h2 className="text-xl font-black">Casos prácticos</h2><p className="mt-2 text-sm leading-6 text-slate-300">Fotografías propias y observaciones de piezas impresas.</p></Link>
        <Link className="border-l-4 border-teal-500 bg-slate-950 p-6 text-white" href="/fuentes"><h2 className="text-xl font-black">Fuentes técnicas</h2><p className="mt-2 text-sm leading-6 text-slate-300">Documentación oficial utilizada para contrastar las guías.</p></Link>
      </section>
    </main>
  );
}
