import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Fuentes y referencias técnicas",
  description: "Fuentes oficiales utilizadas para contrastar contenidos sobre Creo, SolidWorks, materiales FDM, impresión 3D y simulación FEM.",
  path: "/fuentes"
});

const sources = [
  {
    area: "Creo Parametric",
    name: "Tutoriales oficiales de Creo Parametric",
    href: "https://support.ptc.com/help/creo/creo_pma/r12/usascii/tutorials_pma/tutorials_overview.html",
    use: "Referencia para flujo de piezas, ensamblajes, planos y nombres de herramientas."
  },
  {
    area: "SolidWorks",
    name: "SOLIDWORKS Design Help",
    href: "https://help.solidworks.com/2026/english/SolidWorks/sldworks/r_help_fundamentals.htm",
    use: "Conceptos básicos, documentos de pieza y ensamblaje, dibujos y comportamiento de funciones."
  },
  {
    area: "Materiales FDM",
    name: "Prusa Filament Material Guide",
    href: "https://help.prusa3d.com/filament-material-guide",
    use: "Comparación orientativa de impresión, hardware y características de familias de filamento."
  },
  {
    area: "Diseño para FDM",
    name: "Prusa: modelar pensando en impresión 3D",
    href: "https://help.prusa3d.com/article/modeling-with-3d-printing-in-mind_164135",
    use: "Criterios sobre sólidos, mallas, geometría imprimible y preparación de modelos."
  },
  {
    area: "Calibración FDM",
    name: "Prusa: calibración de la primera capa",
    href: "https://help.prusa3d.com/article/first-layer-calibration-i3_112364",
    use: "Referencia visual para revisar la distancia de la boquilla y la adhesión inicial."
  },
  {
    area: "Archivos 3D",
    name: "Prusa: modelos dañados para impresión",
    href: "https://help.prusa3d.com/article/corrupted-3d-models-for-printing_2205",
    use: "Identificación y reparación de problemas frecuentes en mallas destinadas al laminador."
  },
  {
    area: "Simulación FEM",
    name: "NASA FEMCI",
    href: "https://etd.gsfc.nasa.gov/capabilities/capabilities-listing/femci/",
    use: "Recursos sobre análisis estructural, modelado y prácticas de elementos finitos."
  },
  {
    area: "Lectura crítica de FEM",
    name: "NASA: no todos los mapas de colores son precisos",
    href: "https://www.nasa.gov/centers-and-facilities/nesc/finite-element-analyses-not-all-beautiful-color-plots-are-precise-or-accurate/",
    use: "Advertencias sobre idealización, verificación e interpretación de resultados visuales."
  }
];

export default function SourcesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Fuentes" }]} />
      <p className="mt-6 text-sm font-black uppercase tracking-wide text-teal-700">Referencias verificables</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950">Fuentes y referencias técnicas</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        CAD Lab 3D utiliza documentación oficial para comprobar conceptos, límites y nombres de herramientas. Las fuentes no sustituyen las pruebas propias ni la ficha del fabricante concreto.
      </p>

      <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
        {sources.map((source) => (
          <article key={source.href} className="grid gap-3 py-6 md:grid-cols-[180px_1fr]">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">{source.area}</p>
            <div>
              <h2 className="text-xl font-black text-slate-950">
                <a className="text-blue-700 hover:text-blue-900" href={source.href} target="_blank" rel="noreferrer">{source.name}</a>
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{source.use}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="article-body mt-10">
        <h2>Cómo se utilizan estas referencias</h2>
        <p>
          Las páginas oficiales sirven para contrastar funcionamiento, terminología y recomendaciones generales. Los valores de proceso se presentan como puntos de partida cuando dependen de impresora, formulación, geometría o versión del software. Para una decisión crítica, consulta siempre documentación del fabricante y realiza una validación específica.
        </p>
        <p>
          Si detectas una fuente desactualizada o una afirmación que necesita corrección, puedes escribir a través de <Link href="/contacto">contacto</Link>. La forma de revisar y actualizar el contenido se explica en la <Link href="/metodologia">metodología editorial</Link>.
        </p>
      </section>
    </main>
  );
}
