import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Preguntas frecuentes",
  description: "Preguntas frecuentes sobre CAD Lab 3D, impresión 3D personalizada, contenido técnico, materiales, archivos, servicios y contacto.",
  path: "/preguntas-frecuentes"
});

const faqs = [
  {
    question: "¿Qué es CAD Lab 3D?",
    answer:
      "CAD Lab 3D es una web técnica sobre CAD, diseño industrial, impresión 3D FDM, materiales, simulación básica y documentación de proyectos. El objetivo es ayudar a estudiar, diseñar, fabricar y explicar mejor piezas y proyectos técnicos."
  },
  {
    question: "¿El contenido sustituye una revisión profesional?",
    answer:
      "No. El contenido es informativo y educativo. En piezas críticas, productos comerciales, seguridad, cargas importantes o requisitos normativos, conviene validar con ensayos, documentación del fabricante o revisión profesional."
  },
  {
    question: "¿Puedo pedir una impresión 3D personalizada?",
    answer:
      "Sí. Puedes enviar una consulta desde la página de impresión 3D personalizada o desde contacto. Es útil incluir archivo STL o STEP, dimensiones, cantidad, uso previsto, material deseado y plazo orientativo."
  },
  {
    question: "¿Qué archivos sirven para presupuestar?",
    answer:
      "Lo más cómodo es un STL para imprimir o un STEP para revisar geometría CAD. Si aún no tienes modelo, también puedes explicar la idea con medidas, boceto o foto de referencia para valorar si hace falta modelado previo."
  },
  {
    question: "¿Qué materiales se trabajan en FDM?",
    answer:
      "La web se centra especialmente en PLA, PETG, TPU, ABS, ASA y Nylon. La elección depende del uso, temperatura, flexibilidad, resistencia, acabado y dificultad de impresión."
  },
  {
    question: "¿Se aceptan piezas peligrosas o de seguridad crítica?",
    answer:
      "No. No se aceptan piezas destinadas a usos peligrosos, armas, elementos de seguridad crítica o componentes que requieran certificación. Las piezas FDM tienen límites y deben usarse con criterio."
  },
  {
    question: "¿Hay enlaces de afiliado?",
    answer:
      "Actualmente no hay enlaces de afiliado activos. Si se incorporan en el futuro, se marcarán de forma visible y se mantendrán criterios de recomendación claros."
  },
  {
    question: "¿Cómo se actualizan los artículos?",
    answer:
      "Los artículos se revisan cuando se detectan errores, cuando una guía necesita más ejemplos o cuando una herramienta cambia. La metodología editorial explica cómo se estructura y mejora el contenido."
  }
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: absoluteUrl("/")
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Preguntas frecuentes",
        item: absoluteUrl("/preguntas-frecuentes")
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([faqJsonLd, breadcrumbJsonLd])} />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-wide text-teal-700">Ayuda rápida</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">Preguntas frecuentes</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Respuestas claras sobre el contenido, los servicios, la impresión 3D personalizada, materiales, archivos y límites técnicos del proyecto.
        </p>

        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">{faq.question}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-lg bg-slate-950 p-6 text-white">
          <h2 className="text-2xl font-black">¿No aparece tu duda?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Puedes escribir con una descripción del proyecto, archivo disponible, material deseado o duda concreta. Cuanto más claro sea el contexto, mejor se puede orientar la respuesta.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link className="rounded-md bg-teal-500 px-4 py-2 text-sm font-black text-slate-950 hover:bg-teal-300" href="/contacto">
              Contactar
            </Link>
            <Link className="rounded-md border border-white/20 px-4 py-2 text-sm font-bold text-white hover:bg-white/10" href="/metodologia">
              Ver metodología
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
