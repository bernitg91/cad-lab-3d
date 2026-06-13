import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Guía básica de simulación FEM para estudiantes",
  description: "Aprende a definir objetivos, simplificar geometría, aplicar cargas y restricciones, revisar la malla e interpretar resultados FEM con criterio.",
  path: "/guia-simulacion-fem"
});

export default function FemGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Guía básica de simulación FEM para estudiantes",
    description: metadata.description,
    author: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/sobre-mi") },
    publisher: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    mainEntityOfPage: absoluteUrl("/guia-simulacion-fem"),
    inLanguage: "es-ES"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Guías", href: "/guias" }, { label: "Simulación FEM" }]} />
          <p className="mt-6 text-sm font-black uppercase tracking-wide text-teal-700">Simulación con alcance definido</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">Simulación FEM: del problema físico a una conclusión defendible</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Un mapa de colores no valida una pieza. Esta guía explica cómo formular la pregunta, construir una idealización razonable y comprobar si el resultado ayuda de verdad a tomar una decisión.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="article-body">
          <h2>Empieza por una pregunta concreta</h2>
          <p>
            “Simular el soporte” es demasiado amplio. “Comparar qué versión se deforma menos bajo la misma carga” o “localizar la transición que concentra tensión” sí define una tarea. La pregunta determina qué geometría conservar, qué resultados observar y qué nivel de precisión necesita el modelo.
          </p>

          <h2>Geometría e idealización</h2>
          <p>
            Elimina detalles que encarecen la malla sin afectar a la respuesta buscada: textos, redondeos decorativos, roscas completas o taladros alejados. Conserva cambios de sección, agujeros, radios y contactos que sí puedan alterar el camino de carga. Simplificar no significa borrar indiscriminadamente; significa representar el fenómeno con menos elementos.
          </p>
          <p>
            Decide también si el problema puede representarse con simetría, elementos de placa, vigas o un sólido completo. En trabajos básicos, justificar por qué se usa un sólido lineal ya aporta más valor que ejecutar un análisis complejo sin explicar sus supuestos.
          </p>

          <h2>Material, cargas y restricciones</h2>
          <p>
            Registra de dónde sale cada valor. El material necesita al menos las propiedades que exige el tipo de análisis. La carga debe representar magnitud, dirección y zona de aplicación. Las restricciones deben imitar cómo se apoya o conecta la pieza, no simplemente impedir que el solver muestre movimiento rígido.
          </p>
          <p>
            Bloquear una cara completa puede endurecer el modelo de forma artificial. Aplicar una fuerza puntual puede crear una concentración que no existe en la realidad. Cuando una unión es incierta, analiza dos condiciones razonables y observa cuánto cambia la conclusión.
          </p>

          <h2>Malla y convergencia</h2>
          <p>
            Empieza con una malla suficiente para revisar el planteamiento. Refina después en cambios de sección, agujeros, contactos y zonas donde el gradiente sea alto. Compara desplazamiento y tensión en una región, no solo el máximo de un nodo. Si un resultado estable cambia poco al refinar, hay más base para interpretarlo.
          </p>
          <p>
            Una tensión que crece indefinidamente junto a una esquina perfecta o una restricción puede ser una singularidad. Documenta la zona y evita convertir ese único valor en un factor de seguridad sin análisis adicional.
          </p>

          <h2>Caso de estudio: dos soportes con la misma masa</h2>
          <p>
            Imagina dos soportes que fijan la misma carga a una pared. Uno utiliza una sección gruesa uniforme; el otro reduce material y añade un nervio. Mantén material, tornillos, apoyo y carga. Compara masa, desplazamiento en el punto de aplicación y distribución de tensión lejos de singularidades.
          </p>
          <p>
            Si el diseño nervado reduce desplazamiento sin trasladar una concentración grave a la unión, el FEM aporta una decisión. Si solo se muestra que ambos tienen zonas azules y rojas, el análisis no ha respondido a la pregunta. La guía <Link href="/blog/que-es-analisis-fem-cuando-usarlo">qué es FEM y cuándo usarlo</Link> explica los conceptos iniciales; <Link href="/blog/documentar-analisis-fem-basico">cómo documentar un análisis FEM</Link> ayuda a preparar el informe.
          </p>

          <h2>Comprobaciones antes de aceptar resultados</h2>
          <ul>
            <li>La deformada tiene dirección y forma físicamente razonables.</li>
            <li>La suma de reacciones es compatible con las cargas aplicadas.</li>
            <li>Las unidades y el orden de magnitud tienen sentido.</li>
            <li>El resultado principal no cambia de forma drástica al refinar la malla.</li>
            <li>Las conclusiones no exceden el tipo de análisis realizado.</li>
          </ul>

          <h2>Límites importantes en piezas impresas</h2>
          <p>
            Representar una pieza FDM como material isotrópico homogéneo es una simplificación fuerte. La orientación de capas, vacíos, perímetros, relleno y parámetros de impresión alteran la respuesta. Un FEM básico puede comparar geometrías, pero no certifica por sí solo una pieza sometida a carga, impacto, fatiga o temperatura.
          </p>

          <h2>Referencias y lectura crítica</h2>
          <p>
            NASA mantiene recursos sobre modelado por elementos finitos y ha publicado advertencias sobre gráficos visualmente convincentes que no son necesariamente precisos. Se enlazan desde <Link href="/fuentes">fuentes técnicas</Link>. Utiliza además la documentación del solver concreto para confirmar formulaciones, contactos y criterios de convergencia.
          </p>

          <h2>Conclusión práctica</h2>
          <p>
            Un análisis defendible deja claro qué pregunta responde, qué realidad simplifica y qué no puede demostrar. Si cargas, apoyos y material no están justificados, refinar la malla no solucionará el problema principal.
          </p>
        </div>
      </main>
    </>
  );
}
