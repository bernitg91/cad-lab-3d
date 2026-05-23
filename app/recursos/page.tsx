import type { Metadata } from "next";
import Link from "next/link";
import { Newsletter } from "@/components/Newsletter";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Recursos",
  description: "Plantillas y checklists para informes técnicos, impresión 3D, materiales y proyectos CAD.",
  path: "/recursos"
});

const resources = [
  {
    title: "Plantilla de informe técnico",
    description: "Estructura editable para objetivos, requisitos, metodología, resultados, conclusiones y anexos.",
    href: "/blog/preparar-informe-tecnico-universitario",
    cta: "Ver guía relacionada"
  },
  {
    title: "Checklist de impresión 3D",
    description: "Lista previa para revisar escala, tolerancias, soportes, material, orientación y parámetros del laminador.",
    href: "/blog/checklist-mandar-pieza-imprimir-3d",
    cta: "Leer checklist"
  },
  {
    title: "Guía de selección de materiales",
    description: "Comparativa práctica para elegir entre PLA, PETG, ABS, Nylon y materiales funcionales.",
    href: "/blog/diferencias-pla-petg-abs-nylon",
    cta: "Comparar materiales"
  },
  {
    title: "Plantilla para documentar proyectos CAD",
    description: "Guion para registrar versiones, decisiones, capturas, planos, renders y cambios de diseño.",
    href: "/blog/documentar-proyecto-diseno-industrial",
    cta: "Ver estructura"
  },
  {
    title: "Checklist para portfolio de diseño industrial",
    description: "Revisión de renders, storytelling, planos, detalles, proceso y presentación final.",
    href: "/blog/checklist-portfolio-diseno-industrial",
    cta: "Revisar portfolio"
  },
  {
    title: "Calculadora de precio de impresión 3D",
    description: "Herramienta gratuita para estimar material, horas de máquina, electricidad, mano de obra, riesgo, margen e IVA.",
    href: "/calculadora-precio-impresion-3d",
    cta: "Calcular presupuesto"
  },
  {
    title: "Servicio de impresión 3D personalizada",
    description: "Página para solicitar presupuesto de piezas FDM, prototipos, soportes, carcasas y revisión de archivos.",
    href: "/impresion-3d-personalizada",
    cta: "Pedir valoración"
  },
  {
    title: "Calculadora de peso de pieza 3D",
    description: "Estima gramos de filamento con volumen CAD, densidad, relleno, paredes, soportes y cantidad.",
    href: "/calculadora-peso-pieza-3d",
    cta: "Estimar peso"
  },
  {
    title: "Selector de material FDM",
    description: "Compara PLA, PETG, TPU, ABS, ASA y Nylon según uso exterior, calor, impacto, flexibilidad y acabado.",
    href: "/selector-material-impresion-3d",
    cta: "Elegir material"
  },
  {
    title: "Checklist interactiva de impresión 3D",
    description: "Revisa archivo, orientación, material, parámetros, cama, filamento y control final antes de imprimir.",
    href: "/checklist-impresion-3d",
    cta: "Abrir checklist"
  }
];

export default function ResourcesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-wide text-teal-700">Recursos técnicos</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">Recursos para trabajar mejor</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Accede a guías, checklists y estructuras de trabajo para preparar informes, piezas FDM, materiales, portfolio y documentación CAD.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <article key={resource.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 h-24 rounded-md bg-gradient-to-br from-slate-900 via-blue-900 to-teal-700" />
              <p className="mb-2 inline-flex rounded bg-teal-50 px-2.5 py-1 text-xs font-black uppercase tracking-wide text-teal-700">Guía disponible</p>
              <h2 className="text-xl font-black text-slate-950">{resource.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{resource.description}</p>
              <Link className="mt-5 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" href={resource.href}>
                {resource.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <Newsletter />
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">¿Necesitas adaptar un recurso?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Si necesitas revisar un informe, una pieza CAD o una presentación técnica, puedes enviar una consulta con el objetivo y el formato disponible.
          </p>
          <div className="mt-5 grid gap-3">
            <Link className="rounded-md bg-slate-950 px-4 py-2 text-center text-sm font-black text-white hover:bg-blue-800" href="/contacto">
              Contactar
            </Link>
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-center text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" href="/servicios">
              Ver servicios
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
