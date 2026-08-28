import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Glosario de CAD e impresión 3D",
  description: "Glosario técnico de CAD, impresión 3D FDM, materiales, simulación FEM, tolerancias, laminado y documentación de proyectos.",
  path: "/glosario"
});

const groups = [
  {
    title: "CAD y modelado",
    terms: [
      ["Boceto", "Dibujo 2D usado como base para crear operaciones como extrusiones, revoluciones o cortes."],
      ["Restricción", "Relación geométrica o dimensional que controla el comportamiento de un boceto o ensamblaje."],
      ["Historial paramétrico", "Secuencia de operaciones editables que permite modificar una pieza sin reconstruirla desde cero."],
      ["Operación", "Acción de modelado como extruir, cortar, redondear, vaciar, hacer patrón o crear un taladro."],
      ["Ensamblaje", "Conjunto de piezas relacionadas mediante restricciones o mates para comprobar montaje y movimiento."],
      ["STEP", "Formato habitual para intercambiar geometría CAD sólida entre distintos programas."],
      ["STL", "Formato de malla usado para impresión 3D. No guarda historial paramétrico ni unidades de forma tan rica como un CAD nativo."]
    ]
  },
  {
    title: "Impresión 3D FDM",
    terms: [
      ["Laminador", "Software que convierte el modelo 3D en instrucciones de impresión capa a capa."],
      ["Altura de capa", "Espesor de cada capa impresa. Afecta al acabado, tiempo y detalle vertical."],
      ["Perímetros", "Líneas exteriores de cada capa. Influyen mucho en rigidez, estanqueidad y calidad visual."],
      ["Relleno", "Estructura interior de la pieza. No sustituye a un buen diseño de paredes y orientación."],
      ["Soportes", "Estructuras temporales para imprimir zonas en voladizo. Aumentan tiempo, material y postprocesado."],
      ["Warping", "Deformación por contracción térmica, frecuente en piezas grandes o materiales sensibles."],
      ["Brim", "Borde auxiliar de primera capa para mejorar adhesión sin rodear toda la pieza como una balsa completa."],
      ["Retracción", "Movimiento del filamento para reducir hilos al desplazarse sin imprimir."]
    ]
  },
  {
    title: "Materiales",
    terms: [
      ["PLA", "Material fácil de imprimir, útil para prototipos, piezas visuales y objetos no sometidos a alta temperatura."],
      ["PETG", "Material equilibrado para piezas funcionales generales con más tenacidad que PLA en muchos usos."],
      ["TPU", "Filamento flexible para protectores, apoyos blandos, juntas simples o piezas deformables."],
      ["ABS", "Material técnico con más resistencia térmica que PLA, pero más exigente por contracción y emisiones."],
      ["ASA", "Alternativa técnica usada cuando interesa resistencia exterior y UV, con requisitos de impresión similares a ABS."],
      ["Nylon", "Material resistente y tenaz, sensible a humedad y más exigente de imprimir correctamente."],
      ["Densidad", "Relación entre masa y volumen. Sirve para estimar peso, coste y comportamiento básico de una pieza."]
    ]
  },
  {
    title: "Diseño para fabricación",
    terms: [
      ["Tolerancia", "Variación admisible de una medida. En FDM debe adaptarse a impresora, material y orientación."],
      ["Holgura", "Espacio añadido entre piezas que deben encajar o moverse sin quedarse bloqueadas."],
      ["Espesor mínimo", "Grosor mínimo recomendable para que una pared sea imprimible y suficientemente resistente."],
      ["Orientación", "Posición de la pieza en la cama. Afecta a resistencia, acabado, soportes y tiempo de impresión."],
      ["Chaflán", "Bisel plano en una arista. Puede ayudar a montaje, primera capa o reducción de aristas vivas."],
      ["Radio", "Redondeo de una arista. Mejora tacto, reparto de esfuerzos y aspecto visual."],
      ["Prototipo funcional", "Pieza pensada para probar uso, montaje o resistencia aproximada, no solo apariencia."]
    ]
  },
  {
    title: "Simulación y documentación",
    terms: [
      ["FEM", "Método de elementos finitos para estimar tensiones, deformaciones o comportamiento de una pieza bajo condiciones definidas."],
      ["Malla", "División del modelo en elementos pequeños para resolver un análisis FEM."],
      ["Condición de contorno", "Restricción o carga aplicada al modelo, como apoyo fijo, fuerza, presión o simetría."],
      ["Tensión", "Magnitud que ayuda a evaluar cómo se distribuyen los esfuerzos internos de una pieza."],
      ["Factor de seguridad", "Relación orientativa entre resistencia disponible y solicitación prevista, siempre dependiente del caso real."],
      ["Memoria técnica", "Documento que explica requisitos, decisiones, cálculos, resultados, planos y conclusiones de un proyecto."],
      ["Ficha técnica", "Resumen estructurado de características, material, dimensiones, uso, restricciones y observaciones de un producto."]
    ]
  }
];

export default function GlossaryPage() {
  const definedTermsJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glosario de CAD e impresión 3D",
    url: absoluteUrl("/glosario"),
    hasDefinedTerm: groups.flatMap((group) =>
      group.terms.map(([name, description]) => ({
        "@type": "DefinedTerm",
        name,
        description,
        inDefinedTermSet: group.title
      }))
    )
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(definedTermsJsonLd)} />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Referencia rápida</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black text-slate-950">Glosario de CAD, impresión 3D y diseño técnico</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Definiciones claras para entender artículos, preparar proyectos y evitar confusiones entre CAD, FDM, materiales, tolerancias, FEM y documentación técnica.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-5">
          {groups.map((group) => (
            <a key={group.title} className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-black text-slate-800 shadow-sm hover:border-blue-300 hover:text-blue-700" href={`#${group.title.toLowerCase().replace(/\s+/g, "-")}`}>
              {group.title}
            </a>
          ))}
        </div>

        <div className="mt-10 grid gap-8">
          {groups.map((group) => (
            <section key={group.title} id={group.title.toLowerCase().replace(/\s+/g, "-")} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-slate-950">{group.title}</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {group.terms.map(([term, definition]) => (
                  <article key={term} className="rounded-md bg-slate-50 p-4">
                    <h3 className="font-black text-slate-950">{term}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{definition}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-lg bg-slate-950 p-6 text-white">
          <h2 className="text-2xl font-black">Convierte el glosario en práctica</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            Si ya conoces los conceptos básicos, el siguiente paso es aplicarlos: revisar piezas, elegir material, calcular coste y preparar documentación clara.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link className="rounded-md bg-teal-500 px-4 py-2 text-sm font-black text-slate-950 hover:bg-teal-300" href="/guias">
              Ver guías
            </Link>
            <Link className="rounded-md border border-white/20 px-4 py-2 text-sm font-bold text-white hover:bg-white/10" href="/casos-practicos-impresion-3d">
              Ver galería comentada
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
