import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Guía de documentación técnica para proyectos de diseño",
  description: "Organiza requisitos, decisiones, CAD, prototipos, ensayos, planos, renders y conclusiones en una memoria técnica clara y verificable.",
  path: "/guia-documentacion-tecnica"
});

export default function TechnicalDocumentationGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Guía de documentación técnica para proyectos de diseño",
    description: metadata.description,
    author: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/sobre-mi") },
    publisher: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    mainEntityOfPage: absoluteUrl("/guia-documentacion-tecnica"),
    inLanguage: "es-ES"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Guías", href: "/guias" }, { label: "Documentación técnica" }]} />
          <p className="mt-6 text-sm font-black uppercase tracking-wide text-teal-700">Memoria, planos y portfolio</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">Documentación técnica: cómo explicar un proyecto sin rellenar páginas</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Una memoria útil conecta el problema con los requisitos, las decisiones y las pruebas. El objetivo no es guardar todo el proceso, sino conservar las evidencias que permiten entenderlo y repetirlo.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="article-body">
          <h2>La estructura nace de las preguntas del proyecto</h2>
          <p>
            Una memoria técnica debe responder qué problema se aborda, para quién, con qué requisitos, qué alternativas se consideraron, qué solución se desarrolló y cómo se comprobó. La estructura de una asignatura tiene prioridad, pero estas preguntas ayudan a detectar apartados decorativos o conclusiones que no responden al objetivo inicial.
          </p>

          <h2>Requisitos que se pueden rastrear</h2>
          <p>
            Convierte necesidades generales en criterios observables. “Debe ser cómodo” puede dividirse en dimensiones de agarre, masa, zona de contacto y prueba con usuarios. “Debe ser resistente” necesita carga, duración y modo de uso. Cada requisito debe enlazar con una decisión y con una evidencia.
          </p>
          <p>
            Una tabla sencilla con identificador, requisito, decisión y verificación facilita la revisión. Si no existe una forma razonable de comprobar un requisito, quizá todavía está redactado de manera demasiado vaga.
          </p>

          <h2>Documentar decisiones, no una cronología de clics</h2>
          <p>
            No hace falta describir cada operación del CAD. Explica las decisiones que podrían haberse resuelto de otra forma: material, arquitectura, unión, espesor, orientación de impresión o criterio de simulación. Incluye la alternativa descartada cuando ayude a entender el cambio.
          </p>
          <p>
            Una comparación breve suele ser suficiente: opción, ventaja, límite y motivo de selección. Esa estructura demuestra razonamiento sin convertir la memoria en un diario interminable.
          </p>

          <h2>Imágenes que aportan evidencia</h2>
          <ul>
            <li>Croquis de alternativas con una anotación clara.</li>
            <li>Capturas del CAD que muestren una interfaz o cambio importante.</li>
            <li>Plano o sección cuando la forma exterior no explica la función.</li>
            <li>Fotografía del prototipo en uso, no solo aislado sobre una mesa.</li>
            <li>Detalle de un fallo y de la modificación que produjo.</li>
          </ul>
          <p>
            Las imágenes propias de la <Link href="/casos-practicos-impresion-3d">galería comentada de impresión 3D</Link> muestran acabado, escala, geometría y uniones visibles. Se describen como observaciones fotográficas, no como ensayos medidos. Una fotografía imperfecta puede ser más útil que un render si documenta un problema real.
          </p>

          <h2>Planos, renders y archivos finales</h2>
          <p>
            El plano comunica fabricación e inspección; el render comunica forma, material y uso; el prototipo comunica comportamiento. No son sustitutos. Usa cada recurso para la pregunta que resuelve. En portfolio, una secuencia equilibrada puede incluir vista general, detalle técnico, plano simplificado y fotografía del prototipo.
          </p>
          <p>
            La <Link href="/casos-practicos-impresion-3d">galería comentada</Link> muestra cómo documentar una pieza sin atribuirle propiedades no medidas. Para estructurar planos, renders e informes, consulta la <Link href="/guia-documentacion-tecnica">guía de documentación técnica</Link>.
          </p>

          <h2>Control de versiones sencillo</h2>
          <p>
            Separa CAD editable, exportaciones, planos, imágenes y entregas. Usa nombres con pieza y revisión. Una carpeta `rev03` debe contener archivos compatibles entre sí; mezclar un plano nuevo con un STL antiguo puede provocar más problemas que una explicación incompleta.
          </p>
          <p>
            Antes de entregar, abre los archivos desde otra carpeta o dispositivo. Comprueba vínculos, fuentes, escala, calidad de imagen y que las versiones indicadas coincidan. Guarda una copia inalterable de la entrega final.
          </p>

          <h2>Ejemplo: soporte impreso para un objeto existente</h2>
          <p>
            El documento debería incluir medidas del objeto, requisitos de apoyo, alternativas de geometría, selección de material, tolerancia del encaje, orientación de impresión y una prueba. Si la primera versión marca el objeto o queda suelta, fotografía el fallo, modifica la interfaz y registra la diferencia. Esa secuencia demuestra desarrollo de producto.
          </p>

          <h2>Errores que reducen credibilidad</h2>
          <ul>
            <li>Presentar solo el resultado final y ocultar cómo se validó.</li>
            <li>Usar adjetivos como “óptimo” o “resistente” sin criterio medible.</li>
            <li>Incluir capturas sin leyenda, unidades o relación con el texto.</li>
            <li>Cambiar objetivos en la conclusión para que coincidan con el resultado.</li>
            <li>Confundir un prototipo visual con una validación funcional.</li>
          </ul>

          <h2>Recursos y siguiente paso</h2>
          <p>
            En <Link href="/recursos">recursos</Link> puedes descargar plantillas de informe, documentación CAD y checklist de portfolio. Adáptalas al proyecto y elimina apartados que no aporten. Una plantilla es un punto de partida, no una garantía de calidad.
          </p>
        </div>
      </main>
    </>
  );
}
