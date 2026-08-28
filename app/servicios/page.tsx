import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Servicios",
  description: "Servicios técnicos de modelado CAD, optimización para impresión 3D, renders y documentación de proyectos.",
  path: "/servicios"
});

const services = [
  {
    title: "Modelado CAD de piezas y conceptos",
    href: "/contacto",
    text: "Piezas sencillas, soportes, carcasas, adaptadores y conceptos iniciales preparados con medidas claras y geometría ordenada."
  },
  {
    title: "Impresión 3D personalizada",
    href: "/impresion-3d-personalizada",
    text: "Valoración de archivos STL o STEP, orientación de impresión, selección de material FDM y presupuesto por pieza o lote."
  },
  {
    title: "Optimización de piezas para impresión 3D",
    href: "/impresion-3d-personalizada",
    text: "Revisión de espesores, radios, tolerancias, encajes, soportes y zonas débiles antes de fabricar."
  },
  {
    title: "Renders técnicos para portfolio o presentación",
    href: "/contacto",
    text: "Vistas limpias, detalles de unión, materiales coherentes y composición visual para explicar el proyecto sin ocultar la pieza."
  },
  {
    title: "Documentación técnica de proyectos",
    href: "/contacto",
    text: "Estructura de memoria, fichas técnicas, capturas CAD, planos básicos, criterios de revisión y explicación de decisiones."
  },
  {
    title: "Preparación de archivos para fabricación",
    href: "/contacto",
    text: "Revisión de unidades, escala, formatos STL/STEP, versiones de archivo, geometría cerrada y requisitos mínimos de entrega."
  }
];

const process = [
  {
    title: "Entender el encargo",
    text: "Reviso el uso, las medidas, el formato disponible, el plazo y aquello que no puede fallar."
  },
  {
    title: "Delimitar el trabajo",
    text: "Se concreta qué archivo se prepara, qué comprobaciones entran y qué datos debe aportar quien encarga la pieza."
  },
  {
    title: "Preparar y enseñar",
    text: "Trabajo sobre el modelo o documento y comparto una entrega que permita revisar geometría, formato y decisiones."
  },
  {
    title: "Corregir lo acordado",
    text: "Los ajustes se aplican sobre observaciones concretas; una ampliación de alcance se valora aparte antes de continuar."
  }
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-teal-700">Servicios técnicos</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-black text-slate-950">Apoyo CAD para convertir una idea en archivos claros, fabricables y presentables</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Soporte puntual para modelado, fabricación digital y documentación técnica. Cada consulta se valora según alcance, formato disponible y nivel de revisión necesario.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-teal-700">Servicio</p>
            <h2 className="mt-2 text-xl font-black text-slate-950">{service.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {service.text}
            </p>
            <Link className="mt-4 inline-flex text-sm font-bold text-blue-700 hover:text-blue-900" href={service.href}>
              Ver detalle
            </Link>
          </article>
        ))}
      </div>
      <section className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-950">Proceso de trabajo</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {process.map((step, index) => (
            <div key={step.title} className="border-t-2 border-slate-950 py-4">
              <p className="text-xs font-black uppercase tracking-wide text-teal-700">Paso {index + 1}</p>
              <h3 className="mt-2 font-black text-slate-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="article-body mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2>Alcance de los servicios</h2>
        <p>
          El trabajo se orienta a proyectos académicos, prototipos, piezas FDM no críticas, documentación técnica y preparación de archivos. Antes de presupuestar, se revisa si el objetivo es viable con impresión 3D FDM o si conviene ajustar geometría, material, orientación o tolerancias.
        </p>
        <h3>Información necesaria para valorar un encargo</h3>
        <ul>
          <li>Archivo STL, STEP o descripción con medidas si todavía no existe modelo.</li>
          <li>Uso previsto de la pieza: visual, funcional, montaje, soporte, carcasa o maqueta.</li>
          <li>Cantidad, plazo aproximado, color, material deseado y nivel de acabado esperado.</li>
          <li>Restricciones importantes: temperatura, encaje, esfuerzos, exterior, desmontaje o mantenimiento.</li>
        </ul>
        <h3>Límites técnicos</h3>
        <p>
          No se prometen resistencias certificadas ni se aceptan piezas de seguridad crítica. En componentes sometidos a carga, calor o responsabilidad funcional, el resultado debe validarse con pruebas reales y criterios profesionales.
        </p>
      </section>
      <div className="mt-10 rounded-lg bg-slate-950 p-6 text-white md:p-8">
        <h2 className="text-2xl font-black">¿Tienes una pieza, informe o portfolio que mejorar?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
          Envía una descripción del objetivo, software usado, formato disponible y fecha aproximada para revisar la mejor forma de abordarlo.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="rounded-md bg-teal-500 px-5 py-3 text-sm font-black text-slate-950 hover:bg-teal-300" href="/contacto">
            Ir a contacto
          </Link>
          <Link className="rounded-md border border-white/20 px-5 py-3 text-sm font-bold text-white hover:bg-white/10" href="/casos-practicos-impresion-3d">
            Ver galería comentada
          </Link>
        </div>
      </div>
    </section>
  );
}
