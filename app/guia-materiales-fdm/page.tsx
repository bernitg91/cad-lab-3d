import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Guía de materiales FDM: PLA, PETG, TPU, ABS, ASA y Nylon",
  description: "Compara materiales de impresión 3D FDM por temperatura, exterior, impacto, flexibilidad, humedad y dificultad de impresión.",
  path: "/guia-materiales-fdm"
});

const materials = [
  ["PLA", "Prototipos visuales, maquetas y piezas rígidas de interior", "Fácil de imprimir; vigilar calor e impacto"],
  ["PETG", "Soportes, carcasas y piezas funcionales generales", "Buena adhesión entre capas; controlar hilos y ajuste"],
  ["TPU", "Topes, protectores, juntas y piezas flexibles", "Velocidad baja y recorrido de filamento controlado"],
  ["ABS", "Piezas técnicas con más exigencia térmica", "Necesita controlar alabeo, ventilación y ambiente"],
  ["ASA", "Carcasas y piezas expuestas al exterior", "Interesante frente a UV; requiere condiciones estables"],
  ["Nylon", "Guías, bisagras y piezas tenaces o sometidas a roce", "Muy sensible a humedad; secado y tolerancias son críticos"]
];

export default function FdmMaterialsGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Guía de materiales FDM: PLA, PETG, TPU, ABS, ASA y Nylon",
    description: metadata.description,
    author: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/sobre-mi") },
    publisher: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    mainEntityOfPage: absoluteUrl("/guia-materiales-fdm"),
    inLanguage: "es-ES"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Guías", href: "/guias" }, { label: "Materiales FDM" }]} />
          <p className="mt-6 text-sm font-black uppercase tracking-wide text-teal-700">Selección de material</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">Materiales FDM: elegir por uso, no por una tabla aislada</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            El material adecuado depende del entorno, la carga, la geometría y la capacidad real de la impresora. Esta guía organiza la decisión antes de comprar una bobina o rediseñar una pieza.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-950 text-white"><tr><th className="p-4">Material</th><th className="p-4">Uso orientativo</th><th className="p-4">Atención principal</th></tr></thead>
            <tbody>{materials.map(([name, use, note]) => <tr key={name} className="border-t border-slate-200"><th className="p-4 font-black text-slate-950">{name}</th><td className="p-4 text-slate-600">{use}</td><td className="p-4 text-slate-600">{note}</td></tr>)}</tbody>
          </table>
        </section>

        <div className="article-body mt-10">
          <h2>Primero define las condiciones de uso</h2>
          <p>
            Anota temperatura, exposición solar, humedad, contacto químico, tipo de carga, golpes, flexión y duración esperada. Después añade requisitos de fabricación: tamaño de la pieza, tolerancias, acabado y si puedes usar cerramiento o secar el filamento. Este filtro elimina opciones antes de entrar en comparaciones de ficha técnica.
          </p>

          <h2>Rigidez, tenacidad y temperatura no son lo mismo</h2>
          <p>
            Una pieza rígida se deforma poco, pero no necesariamente resiste mejor un impacto. Una pieza tenaz puede flexar antes de romper. La resistencia térmica tampoco garantiza una buena pieza si aparecen alabeo o mala unión entre capas. En FDM, el resultado combina material, orientación, perímetros, humedad y geometría.
          </p>
          <p>
            Por eso no conviene copiar una cifra de resistencia y asumir que la pieza impresa la alcanzará en cualquier dirección. Las fichas permiten comparar tendencias; la validación del proyecto necesita muestras impresas en condiciones similares a la pieza final.
          </p>

          <h2>Decisiones frecuentes</h2>
          <h3>Prototipo visual o dimensional</h3>
          <p>
            PLA suele ser suficiente cuando importa comprobar forma, montaje básico o presentación y no habrá calor relevante. Su facilidad permite iterar rápido y detectar errores de CAD antes de pasar a un material más exigente.
          </p>
          <h3>Pieza funcional de uso general</h3>
          <p>
            PETG es un punto de partida habitual para soportes y carcasas por su combinación de facilidad, adhesión entre capas y comportamiento menos frágil. Aun así, necesita calibración: el exceso de material puede cerrar agujeros y el encordado puede afectar superficies de ajuste.
          </p>
          <h3>Exterior o temperatura</h3>
          <p>
            ASA puede encajar mejor en exterior; ABS puede ser útil cuando se necesita más margen térmico. Ambos requieren controlar corrientes de aire y contracción. La ventilación del espacio y las recomendaciones del fabricante deben formar parte de la preparación, no ser una nota posterior.
          </p>
          <h3>Flexión o roce</h3>
          <p>
            TPU permite piezas flexibles, pero la dureza concreta cambia mucho la respuesta. Nylon resulta interesante para piezas tenaces o sometidas a roce, aunque absorbe humedad con facilidad. Una bobina húmeda puede producir superficie irregular, burbujas y propiedades inconsistentes.
          </p>

          <h2>Prueba comparativa que sí aporta información</h2>
          <p>
            Imprime la misma zona crítica con dos materiales: un clip, una unión atornillada o una guía. Mantén orientación, perímetros y altura de capa. Registra masa, tiempo, ajuste, deformación y modo de fallo. No necesitas convertirlo en un ensayo de laboratorio para obtener una comparación útil dentro del proyecto.
          </p>
          <p>
            Puedes comenzar con <Link href="/blog/elegir-filamento-piezas-funcionales">cómo elegir filamento para piezas funcionales</Link> y ampliar la comparación en <Link href="/blog/diferencias-pla-petg-abs-nylon">PLA, PETG, ABS y Nylon</Link>. El <Link href="/selector-material-impresion-3d">selector de material</Link> sirve para ordenar requisitos, no para sustituir la ficha del fabricante.
          </p>

          <h2>Errores que invalidan una comparación</h2>
          <ul>
            <li>Comparar piezas con orientación o número de perímetros diferentes.</li>
            <li>Usar filamento húmedo y atribuir el fallo únicamente al material.</li>
            <li>Elegir por temperatura de boquilla en lugar de por condiciones de uso.</li>
            <li>Aplicar la misma holgura a materiales con contracción y flexibilidad distintas.</li>
            <li>Presentar una recomendación universal sin indicar impresora, geometría o límite.</li>
          </ul>

          <h2>Fuentes y límites</h2>
          <p>
            La guía de materiales de Prusa permite contrastar tendencias de impresión y requisitos de hardware. Para valores de ingeniería, utiliza siempre la ficha técnica de la bobina concreta. En <Link href="/fuentes">fuentes técnicas</Link> se enlazan las referencias utilizadas y se explica su alcance.
          </p>

          <h2>Conclusión práctica</h2>
          <p>
            Elige primero una familia de material por entorno y función. Después confirma que tu equipo puede imprimirla con estabilidad y valida la zona crítica en pequeño. Una decisión bien documentada vale más que una lista de materiales ordenada de “peor” a “mejor”.
          </p>
        </div>
      </main>
    </>
  );
}
