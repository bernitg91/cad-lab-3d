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
    href: "/servicios"
  },
  {
    title: "Impresión 3D personalizada",
    href: "/impresion-3d-personalizada"
  },
  {
    title: "Optimización de piezas para impresión 3D",
    href: "/impresion-3d-personalizada"
  },
  {
    title: "Renders técnicos para portfolio o presentación",
    href: "/servicios"
  },
  {
    title: "Documentación técnica de proyectos",
    href: "/servicios"
  },
  {
    title: "Preparación de archivos para fabricación",
    href: "/servicios"
  }
];

const process = ["Brief", "Modelado o revisión", "Entrega", "Ajustes"];

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
              Enfoque práctico para estudiantes, prototipos y proyectos técnicos que necesitan archivos ordenados, criterios de fabricación y una presentación limpia.
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
            <div key={step} className="rounded-md bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-teal-700">Paso {index + 1}</p>
              <h3 className="mt-2 font-black text-slate-950">{step}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Flujo simple para entender alcance, trabajar sobre archivos claros y revisar el resultado con criterio.
              </p>
            </div>
          ))}
        </div>
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
            Ver casos prácticos
          </Link>
        </div>
      </div>
    </section>
  );
}
