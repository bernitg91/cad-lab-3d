import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { portfolioItems } from "@/lib/portfolio";
import { createPageMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Impresión 3D personalizada",
  description: "Servicio de impresión 3D personalizada para prototipos, piezas funcionales, soportes, carcasas, recambios no críticos y proyectos técnicos.",
  path: "/impresion-3d-personalizada"
});

const services = [
  {
    title: "Prototipos y pruebas de diseño",
    text: "Piezas para validar volumen, ergonomía, montaje, encajes o presentación antes de fabricar una versión final."
  },
  {
    title: "Piezas funcionales FDM",
    text: "Soportes, útiles, adaptadores, tapas, carcasas sencillas y piezas de uso no crítico con revisión previa de material y orientación."
  },
  {
    title: "Optimización antes de imprimir",
    text: "Revisión de STL, orientación, soportes, espesores, tolerancias y zonas débiles para reducir fallos de impresión."
  },
  {
    title: "Preparación de archivos",
    text: "Ayuda para pasar de una idea, boceto o archivo CAD a un modelo imprimible con medidas y requisitos claros."
  }
];

const materials = [
  ["PLA", "Prototipos visuales, maquetas, piezas rígidas sencillas y pruebas de forma."],
  ["PETG", "Piezas funcionales generales con algo más de tenacidad y resistencia al uso diario."],
  ["TPU", "Piezas flexibles, protectores, apoyos blandos y elementos que necesiten deformarse."],
  ["ABS / ASA", "Piezas técnicas donde pueda interesar más temperatura o exterior, siempre revisando viabilidad."],
  ["Nylon", "Piezas resistentes al desgaste o uso técnico, cuando el diseño y el secado del material lo permitan."]
];

const process = [
  {
    title: "1. Envío de la idea o archivo",
    text: "Puedes enviar STL, STEP, medidas, boceto, foto de referencia o explicación del problema. Cuanto más claro sea el uso, mejor se puede valorar."
  },
  {
    title: "2. Revisión técnica",
    text: "Se revisan escala, material, orientación, tiempo aproximado, soportes, tolerancias y riesgos de fallo antes de aceptar la impresión."
  },
  {
    title: "3. Presupuesto orientativo",
    text: "El precio se calcula teniendo en cuenta material, gramos, horas de máquina, preparación, riesgo de fallo y posible postprocesado."
  },
  {
    title: "4. Impresión y comprobación",
    text: "La pieza se imprime con parámetros acordes al uso y se revisa visualmente antes de preparar la entrega."
  }
];

const examples = [
  "Soportes a medida para escritorio, taller o proyectos universitarios.",
  "Carcasas sencillas para prototipos electrónicos o pruebas de montaje.",
  "Adaptadores, separadores, guías, topes y útiles de posicionamiento.",
  "Piezas de prueba para validar tolerancias, encajes, clips o espesores.",
  "Maquetas funcionales para explicar una idea en una presentación técnica.",
  "Recambios no críticos cuando la geometría sea imprimible y el uso sea razonable."
];

export default function Custom3DPrintingPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Impresión 3D personalizada",
    serviceType: "Impresión 3D FDM y preparación de piezas",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/")
    },
    areaServed: "España",
    url: absoluteUrl("/impresion-3d-personalizada"),
    description:
      "Servicio de impresión 3D personalizada para prototipos, piezas funcionales, soportes, carcasas, recambios no críticos y proyectos técnicos."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceJsonLd)} />
      <section className="technical-grid border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Servicio FDM bajo presupuesto</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Impresión 3D personalizada para prototipos, piezas útiles y proyectos técnicos
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Servicio para convertir una idea, archivo STL/STEP o necesidad concreta en una pieza impresa en 3D con revisión de material, orientación, tolerancias y acabado esperado.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-blue-800" href="#presupuesto">
                Pedir presupuesto
              </Link>
              <Link className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 hover:border-blue-300 hover:text-blue-700" href="/calculadora-precio-impresion-3d">
                Estimar precio
              </Link>
            </div>
          </div>
          <div className="border border-slate-300 bg-[#091625] p-5 text-white shadow-xl sm:p-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300">Brief mínimo antes de fabricar</p>
            <div className="mt-5 divide-y divide-white/15 border-y border-white/15">
              {[
                ["Entrada", "Archivo o medidas", "STL · STEP · croquis"],
                ["Revisión", "Uso y restricciones", "Carga · calor · montaje"],
                ["Prueba", "Riesgo principal", "Encaje · pared · orientación"],
                ["Salida", "Pieza documentada", "Material · perfil · versión"]
              ].map(([stage, title, detail], index) => (
                <div key={stage} className="grid grid-cols-[28px_74px_1fr] gap-3 py-4">
                  <span className="font-mono text-[10px] font-bold text-orange-300">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">{stage}</span>
                  <span>
                    <span className="block text-sm font-black text-white">{title}</span>
                    <span className="mt-1 block text-xs text-slate-300">{detail}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-400">Cada fotografía se reserva para una sola publicación; esta página explica el servicio mediante el proceso.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Piezas documentadas</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Ejemplos de encargos y prototipos FDM</h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              El registro reúne soportes, objetos funcionales, prototipos, pruebas de forma y piezas decorativas. Para evitar fotografías repetidas, aquí se resume el tipo de trabajo; la observación visual completa queda en su única publicación asignada.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {portfolioItems.map((item, index) => (
              <article key={item.title} className="border-t-2 border-slate-950 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-mono text-[9px] font-bold uppercase tracking-[0.12em]">
                  <span className="text-teal-800">Tipo de pieza</span>
                  <span className="text-orange-700">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="pt-4">
                  <h3 className="font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  <p className="mt-4 font-mono text-[9px] uppercase leading-5 text-slate-500">Revisar: {item.criticalPoints.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Viabilidad de piezas</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Qué tipo de piezas encajan bien</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              La impresión 3D FDM funciona muy bien para prototipos, útiles, piezas a medida y comprobaciones de diseño. No todas las piezas son adecuadas: se revisan dimensiones, esfuerzos, temperatura, precisión y uso previsto antes de presupuestar.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {examples.map((example) => (
              <div key={example} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">
                {example}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Materiales habituales</h2>
            <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="p-3 font-black">Material</th>
                    <th className="p-3 font-black">Uso orientativo</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map(([material, use]) => (
                    <tr key={material} className="border-t border-slate-200">
                      <td className="p-3 font-black text-slate-950">{material}</td>
                      <td className="p-3 leading-6 text-slate-600">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Los materiales se eligen según uso, temperatura, rigidez, flexibilidad, acabado, presupuesto y probabilidad de fallo. Si tienes dudas, puedes revisar el{" "}
              <Link className="font-bold text-blue-700 hover:text-blue-900" href="/selector-material-impresion-3d">
                selector de material para impresión 3D
              </Link>
              .
            </p>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Qué necesito para presupuestar</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-700">
              <li>Archivo STL, STEP o medidas principales de la pieza.</li>
              <li>Uso previsto: visual, montaje, soporte, carcasa, prueba funcional o pieza flexible.</li>
              <li>Dimensiones aproximadas y cantidad de unidades.</li>
              <li>Material deseado o condiciones de uso: interior, exterior, calor, golpes, humedad o flexión.</li>
              <li>Fecha orientativa y si necesitas postprocesado, montaje o revisión CAD.</li>
            </ul>
            <div className="mt-6 rounded-md bg-teal-50 p-4 text-sm leading-6 text-teal-900">
              Para una estimación rápida antes de escribir, puedes usar la{" "}
              <Link className="font-black underline" href="/calculadora-precio-impresion-3d">
                calculadora de precio de impresión 3D
              </Link>
              .
            </div>
          </section>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-950">Proceso de trabajo</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {process.map((step) => (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-black text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8" id="presupuesto">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Presupuesto personalizado</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Pide una valoración de tu pieza</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Describe la pieza, adjunta o menciona el archivo disponible y explica para qué se usará. Si todavía no tienes modelo 3D, también se puede valorar la preparación CAD antes de imprimir.
          </p>
          <div className="article-body mt-6">
            <h3>Límites importantes</h3>
            <p>
              No se aceptan piezas destinadas a usos peligrosos, armas, elementos de seguridad crítica o componentes que requieran certificación. Las piezas FDM pueden tener marcas de capa, tolerancias variables y comportamiento distinto según orientación y material.
            </p>
          </div>
        </div>
        <ContactForm contactEmail={siteConfig.contactEmail} defaultReason="Impresión 3D personalizada" />
      </section>
    </>
  );
}
