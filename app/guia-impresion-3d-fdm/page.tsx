import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems } from "@/lib/portfolio";
import { createPageMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Guía completa de impresión 3D FDM",
  description:
    "Guía práctica de impresión 3D FDM: materiales, orientación, soportes, tolerancias, paredes, relleno, costes, errores frecuentes y checklist antes de imprimir.",
  path: "/guia-impresion-3d-fdm"
});

const materialRows = [
  ["PLA", "Prototipos, maquetas, piezas visuales", "Fácil de imprimir, buen acabado", "Evitar calor y piezas sometidas a carga prolongada"],
  ["PETG", "Soportes, carcasas y piezas funcionales generales", "Tenaz y útil para uso diario", "Controlar hilos, ventilación y primera capa"],
  ["TPU", "Protectores, apoyos y piezas flexibles", "Flexibilidad y absorción de impacto", "Imprimir lento y revisar extrusor"],
  ["ABS", "Piezas técnicas con más temperatura", "Más resistencia térmica que PLA", "Puede deformarse; requiere entorno controlado"],
  ["ASA", "Exterior, UV y piezas expuestas", "Mejor opción exterior que ABS en muchos casos", "Requiere control térmico y ventilación"],
  ["Nylon", "Piezas tenaces o con desgaste", "Muy útil en piezas técnicas", "Secado obligatorio y ajuste exigente"]
];

const checklist = [
  "Archivo correcto, última versión y escala revisada.",
  "Orientación elegida según resistencia, acabado y soportes.",
  "Material coherente con uso, temperatura, impacto y flexibilidad.",
  "Paredes, tapas y relleno ajustados al objetivo de la pieza.",
  "Tolerancias comprobadas si hay encajes, ejes, clips o tornillos.",
  "Vista por capas revisada en el laminador antes de imprimir.",
  "Primera capa observada durante los primeros minutos.",
  "Medidas críticas revisadas después de imprimir."
];

const faq = [
  {
    question: "¿Qué es la impresión 3D FDM?",
    answer:
      "La impresión 3D FDM fabrica piezas depositando filamento fundido por capas. Es útil para prototipos, piezas a medida, soportes, carcasas, útiles y maquetas, siempre teniendo en cuenta límites de material, tolerancia y orientación."
  },
  {
    question: "¿Qué material conviene elegir para empezar?",
    answer:
      "PLA suele ser la opción más sencilla para prototipos y piezas visuales. Para piezas más funcionales suele interesar PETG. TPU, ABS, ASA y Nylon requieren más control y se eligen cuando el uso lo justifica."
  },
  {
    question: "¿Por qué una pieza FDM se rompe entre capas?",
    answer:
      "Normalmente ocurre porque la carga trabaja contra la unión entre capas, porque la temperatura no favorece buena adhesión o porque la geometría concentra esfuerzos. La orientación de impresión es una decisión de diseño."
  },
  {
    question: "¿Cuándo hay que imprimir una prueba pequeña?",
    answer:
      "Conviene imprimir una prueba cuando hay encajes, clips, tolerancias ajustadas, muchas horas de impresión, material nuevo o una zona funcional que puede fallar."
  },
  {
    question: "¿Cómo se calcula el precio de una pieza FDM?",
    answer:
      "El precio no depende solo de los gramos. Hay que sumar material, tiempo de máquina, electricidad, mano de obra, preparación, desgaste, riesgo de fallo, margen e IVA si corresponde."
  }
];

export default function FdmGuidePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
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
        name: "Guía completa de impresión 3D FDM",
        item: absoluteUrl("/guia-impresion-3d-fdm")
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([faqJsonLd, breadcrumbJsonLd])} />
      <section className="technical-grid border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Guía pilar FDM</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Guía completa de impresión 3D FDM para diseñar, laminar y revisar piezas
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Una guía práctica para pasar de un archivo CAD a una pieza impresa con criterio: material, orientación, paredes, relleno, tolerancias, soportes, costes y revisión final.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-blue-800" href="/checklist-impresion-3d">
                Abrir checklist
              </Link>
              <Link className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 hover:border-blue-300 hover:text-blue-700" href="/calculadora-precio-impresion-3d">
                Calcular precio
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-slate-100">
              <Image
                src="/images/impresion-3d-personalizada/pieza-decorativa-azul-fdm.jpg"
                alt="Pieza azul impresa en FDM con patrón por capas"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              El acabado por capas no es solo una limitación: también permite leer orientación, continuidad de perímetros y estabilidad de impresión.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <aside className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28 lg:h-fit">
          <h2 className="text-xl font-black text-slate-950">Resumen de la guía</h2>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
            <li><a className="font-bold hover:text-blue-700" href="#proceso">Proceso FDM</a></li>
            <li><a className="font-bold hover:text-blue-700" href="#materiales">Materiales</a></li>
            <li><a className="font-bold hover:text-blue-700" href="#diseno">Diseño de pieza</a></li>
            <li><a className="font-bold hover:text-blue-700" href="#laminador">Laminador</a></li>
            <li><a className="font-bold hover:text-blue-700" href="#costes">Costes</a></li>
            <li><a className="font-bold hover:text-blue-700" href="#errores">Errores frecuentes</a></li>
            <li><a className="font-bold hover:text-blue-700" href="#faq">Preguntas frecuentes</a></li>
          </ul>
        </aside>

        <div className="article-body min-w-0">
          <h2 id="proceso">Cómo funciona una impresión 3D FDM</h2>
          <p>
            FDM significa que la impresora deposita filamento fundido capa a capa. El resultado depende de tres decisiones conectadas: cómo está diseñada la pieza, cómo se orienta en la cama y cómo se configura el laminador. Si una de las tres falla, la pieza puede salir débil, deformada, con mal acabado o fuera de medida.
          </p>
          <p>
            El error habitual es pensar que la impresión empieza al pulsar imprimir. En realidad empieza en CAD: espesores, radios, agujeros, encajes y superficies funcionales condicionan la fabricación. Después, el laminador traduce la pieza en trayectorias, paredes, relleno, soportes y temperaturas. La impresora solo ejecuta esa decisión.
          </p>

          <h3>Flujo recomendado</h3>
          <ol>
            <li>Define el uso real de la pieza: visual, funcional, montaje, prueba o pieza flexible.</li>
            <li>Revisa geometría CAD: unidades, escala, espesores, agujeros, radios y zonas críticas.</li>
            <li>Elige material según uso, temperatura, impacto, flexibilidad y acabado.</li>
            <li>Orienta la pieza según resistencia, soportes y superficie visible.</li>
            <li>Revisa la vista por capas antes de imprimir.</li>
            <li>Comprueba primera capa y registra parámetros para repetir o mejorar.</li>
          </ol>

          <h2 id="materiales">Materiales FDM: cuál elegir y cuándo</h2>
          <p>
            No existe un material universal. PLA puede ser perfecto para una maqueta y mala elección para una pieza cerca de calor. PETG puede funcionar bien en una carcasa, pero exigir más ajuste de retracciones. TPU sirve para flexibles, pero no conviene tratarlo como si fuera PLA. La elección debe partir del uso, no de la bobina disponible.
          </p>
          <div className="not-prose my-6 overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="p-3 font-black">Material</th>
                  <th className="p-3 font-black">Uso habitual</th>
                  <th className="p-3 font-black">Ventaja</th>
                  <th className="p-3 font-black">Revisión clave</th>
                </tr>
              </thead>
              <tbody>
                {materialRows.map(([material, use, advantage, check]) => (
                  <tr key={material} className="border-t border-slate-200">
                    <td className="p-3 font-black text-slate-950">{material}</td>
                    <td className="p-3 leading-6 text-slate-600">{use}</td>
                    <td className="p-3 leading-6 text-slate-600">{advantage}</td>
                    <td className="p-3 leading-6 text-slate-600">{check}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Si la pieza es funcional, conviene imprimir primero una muestra pequeña con el mismo material. Una prueba de encaje, una tira de flexión o una placa de tolerancias puede ahorrar horas de impresión.
          </p>

          <h2 id="diseno">Diseño de piezas para FDM</h2>
          <p>
            Diseñar para FDM significa aceptar que la pieza se construye por capas. Las capas tienen dirección, los voladizos necesitan soporte y las paredes finas pueden desaparecer si no tienen anchura suficiente para la boquilla. Una pieza que se ve correcta en CAD puede no ser imprimible si ignora esos límites.
          </p>
          <h3>Decisiones de CAD que más afectan</h3>
          <ul>
            <li><strong>Espesores:</strong> evita paredes extremadamente finas; deben ser compatibles con boquilla y número de perímetros.</li>
            <li><strong>Radios:</strong> reducen concentraciones de tensión y mejoran transición entre zonas.</li>
            <li><strong>Agujeros:</strong> suelen necesitar holgura o repaso si tienen función de encaje.</li>
            <li><strong>Clips:</strong> funcionan mejor con material y orientación adecuados; no todos los filamentos flexan igual.</li>
            <li><strong>Superficies planas grandes:</strong> pueden provocar warping o marcas visibles si no se controla primera capa.</li>
          </ul>

          <h2 id="laminador">Qué revisar en el laminador</h2>
          <p>
            El laminador permite detectar problemas antes de gastar material. No basta con mirar tiempo y gramos. Hay que revisar capa a capa las zonas de encaje, paredes que desaparecen, soportes sobre caras funcionales, puentes, primeras capas y trayectorias extrañas.
          </p>
          <h3>Parámetros que conviene documentar</h3>
          <ul>
            <li>Material y marca de filamento.</li>
            <li>Boquilla, altura de capa, temperatura y ventilación.</li>
            <li>Número de paredes, capas superiores/inferiores y relleno.</li>
            <li>Orientación de impresión y soportes usados.</li>
            <li>Tiempo estimado, gramos y observaciones del resultado.</li>
          </ul>

          <h2 id="costes">Coste real de una impresión 3D</h2>
          <p>
            Cobrar solo el filamento suele ser un error. Una pieza FDM consume material, horas de máquina, electricidad, revisión del archivo, preparación, postprocesado, desgaste y riesgo de fallo. Un lote puede abaratar preparación por unidad, pero también aumenta el coste si una configuración falla tarde.
          </p>
          <p>
            Para presupuestar con más criterio, usa la <Link href="/calculadora-precio-impresion-3d">calculadora de precio de impresión 3D</Link>. Si aún no sabes los gramos, puedes estimarlos con la <Link href="/calculadora-peso-pieza-3d">calculadora de peso de pieza 3D</Link>.
          </p>

          <h2 id="errores">Errores frecuentes en impresión 3D FDM</h2>
          <ul>
            <li>Elegir orientación solo para reducir soportes y no para mejorar resistencia.</li>
            <li>Usar PLA en piezas que estarán cerca de calor.</li>
            <li>Diseñar clips sin probar material, espesor y dirección de capas.</li>
            <li>No revisar tolerancias antes de imprimir varias unidades.</li>
            <li>No guardar parámetros, lo que impide repetir una pieza correcta.</li>
            <li>Enviar un STL sin comprobar escala, normales o versión de archivo.</li>
            <li>Confundir prototipo visual con pieza funcional validada.</li>
          </ul>

          <h2>Checklist antes de imprimir</h2>
          <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <div key={item} className="rounded-md border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>

          <h2>Ejemplo práctico: soporte a medida</h2>
          <p>
            Un soporte para escritorio parece una pieza sencilla, pero obliga a decidir base, altura, radios, acabado visible, tolerancia si encaja con otro objeto y orientación de impresión. Si la base es demasiado fina, puede flexar. Si las esquinas son vivas, pueden marcarse o partir. Si la superficie visible queda sobre soportes, el acabado empeora.
          </p>
          <p>
            En una pieza de este tipo, el flujo correcto sería medir el objeto que debe apoyar, diseñar con margen, imprimir una muestra de la zona de encaje y después fabricar la pieza completa. La documentación mínima debería incluir material, gramos, tiempo, orientación y una foto del resultado.
          </p>

          <div className="not-prose my-8 grid gap-5 sm:grid-cols-2">
            {portfolioItems.slice(0, 2).map((item) => (
              <Link key={item.title} href="/casos-practicos-impresion-3d" className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:border-blue-300">
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image src={item.image} alt={item.alt} fill sizes="(min-width: 768px) 36vw, 100vw" className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <h2 id="faq">Preguntas frecuentes</h2>
          {faq.map((item) => (
            <section key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </section>
          ))}

          <h2>Conclusión</h2>
          <p>
            Una buena impresión FDM no depende de un único parámetro. Sale de conectar diseño, material, orientación, laminador, prueba y documentación. Si revisas esas decisiones antes de imprimir, reduces fallos y consigues piezas más útiles.
          </p>
        </div>
      </section>
    </>
  );
}
