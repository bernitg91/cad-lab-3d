import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Servicios",
  description: "Servicios técnicos de modelado CAD, optimización para impresión 3D, renders y documentación de proyectos.",
  path: "/servicios"
});

const services = [
  "Modelado CAD de piezas y conceptos",
  "Optimización de piezas para impresión 3D",
  "Renders técnicos para portfolio o presentación",
  "Documentación técnica de proyectos",
  "Preparación de archivos para fabricación"
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
          <article key={service} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-teal-700">Servicio</p>
            <h2 className="mt-2 text-xl font-black text-slate-950">{service}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Enfoque práctico para estudiantes, prototipos y proyectos técnicos que necesitan archivos ordenados, criterios de fabricación y una presentación limpia.
            </p>
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
        <Link className="mt-5 inline-flex rounded-md bg-teal-500 px-5 py-3 text-sm font-black text-slate-950 hover:bg-teal-300" href="/contacto">
          Ir a contacto
        </Link>
      </div>
    </section>
  );
}
