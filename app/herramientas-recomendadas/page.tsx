import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Herramientas recomendadas",
  description: "Criterios para elegir software CAD, impresoras 3D, filamentos, herramientas de medición y recursos para estudiantes.",
  path: "/herramientas-recomendadas"
});

const groups = [
  "Software CAD",
  "Impresoras 3D",
  "Filamentos",
  "Herramientas de medición",
  "Recursos para estudiantes"
];

export default function RecommendedToolsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-teal-700">Criterios de selección</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-black text-slate-950">Herramientas recomendadas para CAD, impresión 3D y proyectos técnicos</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Una guía para evaluar herramientas con criterio: compatibilidad, curva de aprendizaje, coste, mantenimiento, materiales disponibles y utilidad real en proyectos técnicos.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <article key={group} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">{group}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Revisa necesidades reales, formatos compatibles, repuestos, documentación disponible y límites técnicos antes de invertir tiempo o dinero.
            </p>
            <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">Sin enlaces comerciales activos. Las recomendaciones afiliadas se marcarán de forma transparente si se incorporan.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
