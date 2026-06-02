import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Herramientas recomendadas",
  description: "Criterios para elegir software CAD, impresoras 3D, filamentos, herramientas de medición y recursos para estudiantes.",
  path: "/herramientas-recomendadas"
});

const groups = [
  {
    title: "Software CAD",
    points: ["Historial paramétrico estable", "Exportación STEP/STL fiable", "Planos técnicos claros", "Comunidad y documentación"]
  },
  {
    title: "Impresoras 3D",
    points: ["Volumen útil real", "Nivelación y primera capa", "Repuestos disponibles", "Perfiles de laminador mantenidos"]
  },
  {
    title: "Filamentos",
    points: ["Uso previsto", "Temperatura y humedad", "Facilidad de impresión", "Repetibilidad entre bobinas"]
  },
  {
    title: "Herramientas de medición",
    points: ["Calibre digital", "Galgas o reglas", "Registro de medidas", "Comparación con tolerancias objetivo"]
  },
  {
    title: "Recursos para estudiantes",
    points: ["Plantillas editables", "Checklists", "Ejemplos de memoria", "Biblioteca de decisiones técnicas"]
  }
];

export default function RecommendedToolsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-teal-700">Criterios de selección</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-black text-slate-950">Herramientas recomendadas para CAD, impresión 3D y proyectos técnicos</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Una guía para evaluar herramientas con criterio: compatibilidad, curva de aprendizaje, coste, mantenimiento, materiales disponibles y utilidad real en proyectos técnicos.
      </p>
      <Link className="mt-6 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-blue-800" href="/calculadora-precio-impresion-3d">
        Abrir calculadora de precio 3D
      </Link>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" href="/calculadora-peso-pieza-3d">
          Calcular peso
        </Link>
        <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" href="/selector-material-impresion-3d">
          Elegir material
        </Link>
        <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" href="/checklist-impresion-3d">
          Checklist impresión
        </Link>
      </div>
      <div className="article-body mt-8 max-w-3xl">
        <h2>Cómo elegir sin comprar por impulso</h2>
        <p>
          Antes de comprar software, material o equipo, conviene separar necesidad real, presupuesto, mantenimiento y compatibilidad. Una herramienta recomendable no es la más conocida, sino la que encaja con el proyecto, se puede aprender con documentación suficiente y permite repetir resultados.
        </p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <article key={group.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">{group.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Revisa necesidades reales, formatos compatibles, repuestos, documentación disponible y límites técnicos antes de invertir tiempo o dinero.
            </p>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
              {group.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">Criterio principal: que la herramienta ayude a trabajar con más precisión, menos pruebas fallidas y mejor documentación.</p>
          </article>
        ))}
      </div>
      <section className="article-body mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2>Checklist antes de recomendar una herramienta</h2>
        <p>
          Antes de elegir software, material o equipo, responde: qué problema resuelve, qué limitaciones tiene, cuánto cuesta mantenerlo, qué formatos acepta, qué aprendizaje exige y qué alternativas gratuitas o más simples existen. Esta revisión evita decisiones impulsivas y ayuda a explicar la compra dentro de un proyecto técnico.
        </p>
        <h3>Cuándo una herramienta no merece aparecer</h3>
        <p>
          Si no aporta una mejora clara, no se puede explicar su uso o depende de una promoción puntual, es mejor no incluirla. La prioridad es que el lector aprenda a decidir, no que haga clic en una lista de productos.
        </p>
      </section>
    </section>
  );
}
