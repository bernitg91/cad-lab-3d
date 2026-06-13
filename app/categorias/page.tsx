import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Categorías y rutas de aprendizaje",
  description: "Rutas organizadas sobre CAD paramétrico, impresión 3D FDM, materiales, simulación FEM y documentación técnica.",
  path: "/categorias"
});

const topicRoutes = [
  {
    title: "Impresión 3D FDM",
    text: "Diseño para fabricación, orientación, tolerancias, laminado, calibración y control antes de imprimir.",
    href: "/guia-impresion-3d-fdm",
    start: "Empieza por el flujo completo"
  },
  {
    title: "Materiales FDM",
    text: "Selección de PLA, PETG, TPU, ABS, ASA y Nylon según entorno, carga y capacidad de impresión.",
    href: "/guia-materiales-fdm",
    start: "Compara por condiciones de uso"
  },
  {
    title: "CAD paramétrico",
    text: "Croquis, referencias, árbol de operaciones, ensamblajes, planos y formatos de intercambio.",
    href: "/guia-cad-parametrico",
    start: "Construye modelos modificables"
  },
  {
    title: "Simulación FEM",
    text: "Objetivos, simplificación, cargas, restricciones, malla, comprobaciones y límites del análisis.",
    href: "/guia-simulacion-fem",
    start: "Formula primero la pregunta"
  },
  {
    title: "Documentación técnica",
    text: "Requisitos, decisiones, prototipos, planos, renders, memoria y presentación del proyecto.",
    href: "/guia-documentacion-tecnica",
    start: "Conecta decisión y evidencia"
  },
  {
    title: "Recursos y herramientas",
    text: "Calculadoras, selector de material, checklist y plantillas descargables para aplicar las guías.",
    href: "/recursos",
    start: "Pasa de la lectura a la práctica"
  }
];

export default function CategoriesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-teal-700">Biblioteca técnica</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950">Categorías y rutas de aprendizaje</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        Elige la ruta según la decisión que necesitas tomar. Cada guía reúne conceptos, ejemplos, artículos relacionados y herramientas aplicables al mismo flujo de trabajo.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {topicRoutes.map((route) => (
          <Link key={route.href} href={route.href} className="group border-t-4 border-slate-950 bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:border-teal-500 hover:ring-blue-200">
            <p className="text-xs font-black uppercase tracking-wide text-teal-700">{route.start}</p>
            <h2 className="mt-3 text-2xl font-black text-slate-950 group-hover:text-blue-700">{route.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{route.text}</p>
          </Link>
        ))}
      </div>

      <section className="mt-12 grid gap-6 border-y border-slate-200 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-black text-slate-950">Si estás diseñando una pieza</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Combina CAD paramétrico, materiales y FDM. Valida la interfaz crítica antes de fabricar el conjunto completo.</p>
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-950">Si estás preparando una entrega</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Empieza por documentación técnica y utiliza los recursos para ordenar requisitos, imágenes y conclusiones.</p>
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-950">Si necesitas comprobar resistencia</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Define primero la carga y el modo de fallo. Utiliza FEM para comparar hipótesis y una prueba física cuando el uso lo exija.</p>
        </div>
      </section>
    </main>
  );
}
