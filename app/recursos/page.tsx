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
    title: "Guía completa de impresión 3D FDM",
    description: "Ruta práctica para revisar diseño, material, laminador, costes, errores frecuentes y checklist antes de imprimir.",
    href: "/guia-impresion-3d-fdm",
    cta: "Leer guía"
  },
  {
    title: "Plantilla de informe técnico",
    description: "Estructura editable para objetivos, requisitos, metodología, resultados, conclusiones y anexos.",
    href: "/guia-documentacion-tecnica",
    downloadHref: "/descargas/plantilla-informe-tecnico-cadlab3d.txt",
    cta: "Ver guía relacionada"
  },
  {
    title: "Checklist de impresión 3D",
    description: "Lista previa para revisar escala, tolerancias, soportes, material, orientación y parámetros del laminador.",
    href: "/checklist-impresion-3d",
    downloadHref: "/descargas/checklist-impresion-3d-cadlab3d.txt",
    cta: "Leer checklist"
  },
  {
    title: "Guía de selección de materiales",
    description: "Comparativa práctica para elegir entre PLA, PETG, ABS, Nylon y materiales funcionales.",
    href: "/guia-materiales-fdm",
    downloadHref: "/descargas/guia-materiales-fdm-cadlab3d.txt",
    cta: "Comparar materiales"
  },
  {
    title: "Plantilla para documentar proyectos CAD",
    description: "Guion para registrar versiones, decisiones, capturas, planos, renders y cambios de diseño.",
    href: "/guia-documentacion-tecnica",
    downloadHref: "/descargas/plantilla-documentacion-cad-cadlab3d.txt",
    cta: "Ver estructura"
  },
  {
    title: "Checklist para portfolio de diseño industrial",
    description: "Revisión de renders, storytelling, planos, detalles, proceso y presentación final.",
    href: "/guia-documentacion-tecnica",
    downloadHref: "/descargas/checklist-portfolio-diseno-industrial-cadlab3d.txt",
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
    title: "Casos prácticos de impresión 3D",
    description: "Ejemplos reales de piezas impresas con objetivo de diseño, revisión técnica y aprendizaje útil.",
    href: "/casos-practicos-impresion-3d",
    cta: "Ver casos"
  },
  {
    title: "Glosario de CAD e impresión 3D",
    description: "Definiciones rápidas para entender tolerancias, materiales, FEM, laminado y documentación técnica.",
    href: "/glosario",
    cta: "Consultar glosario"
  },
  {
    title: "Preguntas frecuentes",
    description: "Respuestas sobre servicios, archivos, materiales, límites técnicos, contenido y contacto.",
    href: "/preguntas-frecuentes",
    cta: "Leer FAQ"
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
              <div className="mb-5 flex h-16 items-center border-l-4 border-teal-500 bg-slate-950 px-4 text-xs font-black uppercase tracking-wide text-slate-300">Recurso CAD Lab 3D</div>
              <p className="mb-2 inline-flex rounded bg-teal-50 px-2.5 py-1 text-xs font-black uppercase tracking-wide text-teal-700">Guía disponible</p>
              <h2 className="text-xl font-black text-slate-950">{resource.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{resource.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link className="inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" href={resource.href}>
                  {resource.cta}
                </Link>
                {"downloadHref" in resource ? (
                  <a className="inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white hover:bg-blue-800" href={resource.downloadHref} download>
                    Descargar
                  </a>
                ) : null}
              </div>
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
