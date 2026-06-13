import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre mí",
  description: "Sobre CAD Lab 3D: CAD, impresión 3D, simulación y desarrollo de producto.",
  path: "/sobre-mi"
});

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-teal-700">Quién prepara el contenido</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950">Sobre CAD Lab 3D</h1>
      <div className="mt-8 space-y-5 text-lg leading-8 text-slate-600">
        <p>
          CAD Lab 3D está a cargo de un estudiante de ingeniería en diseño industrial interesado en CAD, impresión 3D FDM, simulación y desarrollo de producto. La web reúne apuntes de trabajo, pruebas, recursos y explicaciones que resultan útiles al preparar piezas y proyectos técnicos.
        </p>
        <p>
          El contenido parte de problemas concretos: una pieza que no encaja, un STL mal exportado, una orientación débil, una memoria sin trazabilidad o un análisis FEM que necesita explicar mejor sus supuestos. Cuando se muestran piezas impresas, se utilizan fotografías propias y se separa lo observado de lo que todavía requeriría ensayo.
        </p>
        <p>
          No se publican certificaciones, testimonios ni resultados de resistencia que no puedan respaldarse. Las cifras de proceso se presentan como orientaciones y se contrastan con documentación oficial, porque una misma recomendación puede cambiar con material, impresora, geometría o versión del software.
        </p>
        <p>
          Para correcciones, dudas o propuestas relacionadas con el proyecto puedes escribir a <a className="font-bold text-blue-700 hover:text-blue-900" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Qué encontrarás en esta web</h2>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
            <li>Tutoriales de CAD, piezas FDM y documentación técnica.</li>
            <li>Guías sobre materiales, tolerancias, renders y portfolios.</li>
            <li>Recursos para informes, checklists y proyectos CAD.</li>
            <li>Casos prácticos con piezas impresas reales y aprendizajes técnicos.</li>
            <li>Fuentes oficiales para ampliar y comprobar la información.</li>
          </ul>
        </section>
        <section className="rounded-lg bg-slate-950 p-6 text-white">
          <h2 className="text-2xl font-black">Empieza por las guías</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Si llegas por primera vez, las guías agrupan los contenidos por flujo de trabajo y evitan saltar entre temas sin contexto.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="rounded-md bg-teal-500 px-4 py-2 text-sm font-black text-slate-950 hover:bg-teal-300" href="/guias">Ver guías</a>
            <a className="rounded-md border border-white/20 px-4 py-2 text-sm font-bold text-white hover:bg-white/10" href="/casos-practicos-impresion-3d">Casos prácticos</a>
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
          Puedes consultar la <Link href="/metodologia">metodología editorial</Link> para entender cómo se revisan las guías, y la página de <Link href="/fuentes">fuentes técnicas</Link> para comprobar las referencias principales.
        </p>
      </section>
    </section>
  );
}
