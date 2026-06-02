import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Metodología editorial",
  description: "Cómo se revisan y estructuran los contenidos de CAD Lab 3D sobre CAD, impresión 3D, materiales, FEM y documentación técnica.",
  path: "/metodologia"
});

const criteria = [
  {
    title: "Utilidad práctica",
    text: "Cada guía debe ayudar a tomar una decisión concreta: elegir material, preparar un archivo, revisar una pieza, documentar un proyecto o calcular un coste."
  },
  {
    title: "Contexto técnico",
    text: "Las recomendaciones se explican con límites: proceso FDM, materiales habituales, escala de prototipo, entorno académico o piezas funcionales no críticas."
  },
  {
    title: "Trazabilidad",
    text: "Se priorizan listas de revisión, ejemplos aplicados, criterios de validación y enlaces internos para que el lector pueda seguir un flujo completo."
  },
  {
    title: "Evidencia propia",
    text: "Cuando se muestran servicios o ejemplos de impresión 3D, se usan piezas reales y se explica qué se aprende de ellas sin inventar ensayos ni testimonios."
  },
  {
    title: "Revisión editorial",
    text: "Se corrigen repeticiones, enlaces rotos, explicaciones vagas y ejemplos que no aportan una decisión técnica clara."
  }
];

export default function MethodologyPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-teal-700">Calidad editorial</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-black text-slate-950">Metodología editorial de CAD Lab 3D</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        CAD Lab 3D publica contenido técnico para estudiantes, perfiles junior y personas que trabajan con CAD, impresión 3D FDM, materiales, simulación básica y documentación de proyectos. Esta página explica cómo se organiza y revisa el contenido para mantenerlo útil.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {criteria.map((item) => (
          <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="article-body mt-10">
        <h2>Cómo se estructura una guía</h2>
        <p>
          Las guías combinan explicación, ejemplo aplicado, errores frecuentes, criterios de revisión y una recomendación práctica final. El objetivo no es sustituir manuales oficiales de software ni normas técnicas, sino ayudar a preparar mejor trabajos universitarios, prototipos y piezas FDM habituales.
        </p>
        <h2>Qué límites tiene el contenido</h2>
        <p>
          Las recomendaciones son informativas. En piezas sometidas a cargas críticas, seguridad, normativa, fatiga, temperatura alta o uso profesional exigente, conviene validar con ensayos, documentación del fabricante o revisión técnica especializada.
        </p>
        <h2>Actualización y mejora</h2>
        <p>
          El contenido se revisa cuando se detectan errores, cuando cambia una herramienta o cuando una guía necesita más ejemplos. Las páginas de herramientas y recursos se mantienen con enlaces funcionales, explicaciones completas y rutas claras hacia guías relacionadas.
        </p>
        <h2>Uso de ejemplos prácticos</h2>
        <p>
          Las páginas de servicios y casos prácticos muestran piezas impresas reales para aportar contexto técnico. Las descripciones se mantienen prudentes: explican objetivo, revisión y aprendizaje, pero no prometen resistencias, certificaciones o resultados que no se hayan validado.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link className="rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-blue-800" href="/guias">
          Ver guías
        </Link>
        <Link className="rounded-md border border-slate-300 px-5 py-3 text-sm font-black text-slate-800 hover:border-blue-300 hover:text-blue-700" href="/casos-practicos-impresion-3d">
          Ver casos prácticos
        </Link>
        <Link className="rounded-md border border-slate-300 px-5 py-3 text-sm font-black text-slate-800 hover:border-blue-300 hover:text-blue-700" href="/contacto">
          Enviar corrección o sugerencia
        </Link>
      </div>
    </section>
  );
}
