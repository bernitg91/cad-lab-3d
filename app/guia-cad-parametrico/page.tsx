import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Guía de CAD paramétrico para proyectos técnicos",
  description: "Aprende a organizar croquis, operaciones, referencias, ensamblajes, planos y exportaciones en Creo Parametric y SolidWorks.",
  path: "/guia-cad-parametrico"
});

export default function ParametricCadGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Guía de CAD paramétrico para proyectos técnicos",
    description: metadata.description,
    author: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/sobre-mi") },
    publisher: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    mainEntityOfPage: absoluteUrl("/guia-cad-parametrico"),
    inLanguage: "es-ES"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Guías", href: "/guias" }, { label: "CAD paramétrico" }]} />
          <p className="mt-6 text-sm font-black uppercase tracking-wide text-teal-700">Guía pilar de CAD</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">CAD paramétrico: cómo construir modelos que admiten cambios</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Modelar una forma es solo la primera mitad del trabajo. Un modelo técnico también debe conservar referencias, aceptar modificaciones, generar planos coherentes y poder compartirse sin perder información importante.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="article-body">
          <h2>Qué significa realmente modelar de forma paramétrica</h2>
          <p>
            En un modelo paramétrico, las dimensiones y relaciones expresan intención. Un agujero centrado debe depender del plano medio o de una simetría, no de una distancia elegida a ojo. Un patrón debe indicar cantidad y separación. Una tapa debe relacionarse con la carcasa mediante una interfaz controlada. Cuando cambia el requisito, el árbol de operaciones debería actualizarse sin reconstruir la pieza.
          </p>
          <p>
            Creo Parametric y SolidWorks resuelven este trabajo con interfaces distintas, pero comparten fundamentos: croquis restringidos, operaciones ordenadas, referencias estables, ensamblajes con grados de libertad controlados y planos vinculados al modelo.
          </p>

          <h2>Flujo recomendado para una pieza</h2>
          <h3>1. Define función y parámetros principales</h3>
          <p>
            Antes del primer croquis, identifica qué medidas gobiernan el producto. En un soporte pueden ser distancia entre fijaciones, altura útil, espesor y diámetro de los tornillos. Esas cotas deberían ser fáciles de localizar y modificar.
          </p>
          <h3>2. Elige referencias que sobrevivan</h3>
          <p>
            Los planos principales, ejes y geometría de croquis suelen ser referencias más estables que una arista creada por un redondeo. Referenciar detalles tardíos puede provocar fallos cuando se cambia una operación anterior. Reserva redondeos, chaflanes y acabados para el final cuando no controlen la función principal.
          </p>
          <h3>3. Comprueba el cambio, no solo la forma</h3>
          <p>
            Después de terminar la primera versión, modifica deliberadamente dos o tres parámetros. Si el modelo falla, corrige las dependencias antes de seguir. Esta prueba es especialmente útil en proyectos universitarios, donde una decisión del profesor o una medida nueva puede obligar a rehacer parte del diseño.
          </p>

          <h2>Ejercicio completo: soporte con patrón y nervio</h2>
          <p>
            Crea una base rectangular, un brazo vertical y un nervio central. Sitúa dos agujeros simétricos respecto al plano medio. Genera un plano con vista principal, lateral, sección y cotas funcionales. Después cambia el ancho de la base, la separación de los agujeros y el espesor.
          </p>
          <p>
            La evaluación no consiste en comparar cuántos clics requiere cada programa. Revisa si el árbol se regenera, si el plano actualiza las vistas y si las cotas siguen describiendo la intención. Puedes repetir el ejercicio con la guía de <Link href="/blog/solidworks-vs-creo-estudiantes">SolidWorks frente a Creo para estudiantes</Link> y con la introducción a <Link href="/blog/como-empezar-creo-parametric-desde-cero">Creo Parametric desde cero</Link>.
          </p>

          <h2>Ensamblajes: relaciones suficientes, no excesivas</h2>
          <p>
            Un ensamblaje necesita restricciones que representen cómo se monta el producto. Bloquear cada componente por comodidad puede ocultar interferencias o movimientos necesarios. Comprueba grados de libertad, contactos, recorridos y orden de montaje. Si una pieza puede colocarse de dos maneras por error, el diseño todavía necesita una referencia o una característica que evite el montaje incorrecto.
          </p>

          <h2>Planos y archivos de intercambio</h2>
          <p>
            El plano no debe repetir todas las cotas del modelo. Incluye las necesarias para fabricar, inspeccionar o montar: dimensiones funcionales, tolerancias relevantes, material, acabado, escala, unidades y revisión. Para compartir geometría editable entre programas, STEP suele conservar mejor los sólidos que STL. El STL está pensado para describir una malla y es adecuado para laminar, no para mantener intención paramétrica.
          </p>
          <p>
            Antes de entregar, abre el archivo exportado en una sesión limpia. Comprueba escala, cuerpos, orientación y nombres. Si el receptor necesita modificar la pieza, acompaña el formato neutro con un PDF de plano o una nota de interfaces críticas.
          </p>

          <h2>Errores que vuelven frágil un modelo</h2>
          <ul>
            <li>Dejar croquis con grados de libertad sin entender qué puede moverse.</li>
            <li>Referenciar aristas de redondeos o detalles que cambian con frecuencia.</li>
            <li>Acumular operaciones sin nombres ni grupos en un árbol largo.</li>
            <li>Crear geometría duplicada en lugar de usar simetrías, patrones o relaciones.</li>
            <li>Enviar solo STL cuando el proyecto necesita revisión de ingeniería.</li>
          </ul>

          <h2>Fuentes y comprobación</h2>
          <p>
            Los comandos concretos dependen de la versión. Para confirmar herramientas, formatos y comportamiento, consulta los tutoriales oficiales de PTC y la ayuda oficial de SOLIDWORKS desde la página de <Link href="/fuentes">fuentes técnicas</Link>. La práctica de esta guía se centra en principios transferibles entre programas.
          </p>

          <h2>Siguiente paso</h2>
          <p>
            Elige una pieza propia y prepara tres entregables: modelo que admita cambios, plano de fabricación y exportación revisada. Si además va a imprimirse, continúa con la <Link href="/guia-impresion-3d-fdm">guía completa de FDM</Link> para adaptar espesores, orientación y tolerancias al proceso real.
          </p>
        </div>
      </main>
    </>
  );
}
