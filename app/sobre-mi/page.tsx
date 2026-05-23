import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre mí",
  description: "Sobre CAD Lab 3D: CAD, impresión 3D, simulación y desarrollo de producto.",
  path: "/sobre-mi"
});

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-teal-700">Sobre el proyecto</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950">Sobre CAD Lab 3D</h1>
      <div className="mt-8 space-y-5 text-lg leading-8 text-slate-600">
        <p>
          CAD Lab 3D nace como un espacio de aprendizaje para estudiantes de ingeniería en diseño industrial, fabricación digital, simulación básica y desarrollo de producto.
        </p>
        <p>
          La idea es documentar procesos reales: modelar piezas con criterio, preparar archivos para impresión 3D, comparar materiales, entender simulaciones básicas y presentar proyectos técnicos con claridad.
        </p>
        <p>
          El objetivo es crear una biblioteca práctica de contenidos que ayude a pasar de una idea o entrega académica a un resultado más claro, fabricable y defendible.
        </p>
        <p>
          No se publican datos personales concretos porque el proyecto está planteado como una marca editorial técnica. El foco está en el método: explicar decisiones, documentar pruebas, comparar materiales y convertir errores habituales en guías reutilizables.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Qué encontrarás en esta web</h2>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
            <li>Tutoriales de CAD, piezas FDM y documentación técnica.</li>
            <li>Guías sobre materiales, tolerancias, renders y portfolios.</li>
            <li>Recursos para informes, checklists y proyectos CAD.</li>
            <li>Servicios de apoyo en modelado y presentación técnica.</li>
          </ul>
        </section>
        <section className="rounded-lg bg-slate-950 p-6 text-white">
          <h2 className="text-2xl font-black">Empieza por las guías</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Si llegas por primera vez, las guías agrupan los contenidos por flujo de trabajo y evitan saltar entre temas sin contexto.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="rounded-md bg-teal-500 px-4 py-2 text-sm font-black text-slate-950 hover:bg-teal-300" href="/guias">Ver guías</a>
            <a className="rounded-md border border-white/20 px-4 py-2 text-sm font-bold text-white hover:bg-white/10" href="/contacto">Contacto</a>
          </div>
        </section>
      </div>
      <section className="article-body mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2>Cómo se trabaja el contenido</h2>
        <p>
          Cada artículo intenta responder a una situación frecuente: preparar un STL, elegir tolerancias, justificar una decisión en una memoria o estimar el coste de una pieza. Por eso las guías incluyen ejemplos aplicados, errores frecuentes, criterios de revisión y enlaces a recursos relacionados.
        </p>
        <p>
          Si una recomendación depende de material, impresora, escala, software o nivel de exigencia, se indica como orientación y no como regla absoluta. En proyectos críticos siempre conviene validar con pruebas, documentación técnica o revisión profesional.
        </p>
        <p>
          Puedes consultar la <Link href="/metodologia">metodología editorial</Link> para entender cómo se revisan las guías y qué límites tiene el contenido.
        </p>
      </section>
    </section>
  );
}
