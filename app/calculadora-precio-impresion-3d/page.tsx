import type { Metadata } from "next";
import Link from "next/link";
import { PrintCostCalculator } from "@/components/PrintCostCalculator";
import { createPageMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageTitle = "Calculadora de precio de impresión 3D gratis";
const pageDescription =
  "Calcula el precio de una impresión 3D según material, gramos, tiempo de impresión, electricidad, mano de obra, fallos, margen e IVA. Herramienta gratuita para presupuestar piezas 3D.";

const faqs = [
  {
    question: "¿Cuánto cuesta imprimir una pieza en 3D?",
    answer:
      "Depende del material, peso, tiempo de impresión, complejidad, soportes, postprocesado y margen. Una pieza pequeña puede costar pocos euros, pero una pieza técnica con muchas horas de máquina puede subir bastante."
  },
  {
    question: "¿Cómo se calcula el precio de una impresión 3D?",
    answer:
      "Se suman material, electricidad, coste de máquina, mano de obra y riesgo de fallo. Después se añade el margen comercial y, si corresponde, el IVA."
  },
  {
    question: "¿Cuánto se cobra por hora de impresión 3D?",
    answer:
      "No hay una tarifa única. La hora de impresión suele cubrir desgaste, uso de máquina y riesgo, pero conviene separarla de la mano de obra humana y del material."
  },
  {
    question: "¿Qué material es más barato para imprimir en 3D?",
    answer:
      "PLA suele ser el material más económico y fácil de imprimir. PETG, ABS, ASA, TPU o Nylon pueden ser más caros, pero aportan propiedades distintas."
  },
  {
    question: "¿Debo cobrar el tiempo de diseño CAD?",
    answer:
      "Sí, si el cliente necesita modelado, reparación de archivo, adaptación o preparación técnica. Ese trabajo no debería quedar oculto dentro del precio de impresión."
  },
  {
    question: "¿Cómo calcular el precio de un lote de piezas?",
    answer:
      "Calcula primero el precio unitario y multiplícalo por la cantidad. En lotes grandes puedes revisar preparación, postprocesado y margen, pero no conviene ignorar fallos o control de calidad."
  },
  {
    question: "¿La electricidad influye mucho en el precio?",
    answer:
      "Normalmente pesa menos que el material, el tiempo de máquina o la mano de obra, pero en impresiones largas y con cama caliente puede tener un impacto apreciable."
  },
  {
    question: "¿Qué margen debería aplicar?",
    answer:
      "Depende de tu coste real, mercado y nivel de servicio. Un margen orientativo puede empezar alrededor del 20-40 %, pero debe ajustarse al riesgo, la calidad exigida y el tipo de cliente."
  }
];

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/calculadora-precio-impresion-3d"
});

export default function PrintPriceCalculatorPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: pageTitle,
      description: pageDescription,
      url: absoluteUrl("/calculadora-precio-impresion-3d"),
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "es",
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: absoluteUrl("/")
      }
    },
    {
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
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: absoluteUrl("/")
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Calculadora de precio de impresión 3D",
          item: absoluteUrl("/calculadora-precio-impresion-3d")
        }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm font-semibold text-slate-500">
            <Link className="hover:text-blue-700" href="/">Inicio</Link>
            <span className="px-2">/</span>
            <span className="text-slate-800">Calculadora 3D</span>
          </nav>
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Herramienta gratuita</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl">
            Calculadora de precio de impresión 3D
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Calcula el coste real de una pieza impresa en 3D teniendo en cuenta material, tiempo de máquina, electricidad, mano de obra, desgaste, fallos, margen comercial e IVA.
          </p>
          <p className="mt-4 max-w-3xl rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
            Pensada para impresión 3D FDM con PLA, PETG, TPU, ABS, ASA, Nylon u otros materiales. Los valores iniciales son orientativos y puedes adaptarlos a tu impresora, taller o presupuesto.
          </p>
        </div>
      </section>

      <PrintCostCalculator />
      <SeoContent />
    </>
  );
}

function SeoContent() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="article-body">
        <h2>Cómo calcular el precio de una impresión 3D</h2>
        <p>
          El precio de una impresión 3D no depende solo de los gramos de filamento. Para presupuestar con criterio hay que considerar material, tiempo de máquina, electricidad, mano de obra, desgaste, fallos, margen comercial e impuestos cuando correspondan.
        </p>
        <p>
          Esta calculadora está orientada a FDM y ayuda a separar cada concepto para no cobrar una pieza por debajo de su coste real. También resulta útil para comparar materiales, estimar lotes y explicar un presupuesto a un cliente.
        </p>

        <h2>Fórmula para calcular el coste de una pieza impresa en 3D</h2>
        <p>Una fórmula práctica para empezar es:</p>
        <p>
          <strong>Precio = material + electricidad + máquina + mano de obra + riesgo de fallo + margen + IVA</strong>
        </p>
        <p>
          La fórmula no sustituye el criterio técnico, pero evita el error habitual de cobrar solo el filamento. En piezas complejas, el tiempo de preparación y postprocesado puede pesar tanto como el material.
        </p>

        <h2>Qué factores influyen en el precio de impresión 3D</h2>
        <h3>Tipo de material</h3>
        <p>PLA suele ser económico y fácil de imprimir. PETG, TPU, ABS, ASA y Nylon pueden costar más, exigir ajustes específicos o aumentar el riesgo de fallo.</p>
        <h3>Peso de la pieza</h3>
        <p>El peso debe incluir soportes, brim, purgas o material desperdiciado si forma parte del trabajo real.</p>
        <h3>Tiempo de impresión</h3>
        <p>Una pieza ligera puede ser cara si tarda muchas horas. El tiempo bloquea la máquina y aumenta desgaste, riesgo y electricidad.</p>
        <h3>Altura de capa</h3>
        <p>Una altura de capa baja mejora detalle, pero normalmente aumenta el tiempo de impresión. Conviene ajustarla a la función de la pieza.</p>
        <h3>Soportes</h3>
        <p>Los soportes consumen material, aumentan tiempo y pueden requerir postprocesado. En piezas funcionales también pueden afectar al acabado de caras importantes.</p>
        <h3>Complejidad del modelo</h3>
        <p>Geometrías con tolerancias, encajes, roscas, paredes finas o varias orientaciones posibles requieren más revisión antes de imprimir.</p>
        <h3>Postprocesado</h3>
        <p>Lijado, retirada de soportes, montaje, inserts, limpieza, embalaje o control dimensional son tiempo humano y deben presupuestarse.</p>
        <h3>Riesgo de fallo</h3>
        <p>Warping, mala adhesión, atascos, tolerancias incorrectas o errores de orientación pueden obligar a repetir la pieza. Un porcentaje de riesgo ayuda a cubrir esa incertidumbre.</p>
        <h3>Cantidad de piezas</h3>
        <p>Un lote puede repartir mejor la preparación, pero también multiplica el control de calidad y el riesgo acumulado.</p>

        <h2>Precios orientativos por material</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Precio orientativo €/kg</th>
                <th>Uso habitual</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PLA</td>
                <td>18-25 €/kg</td>
                <td>Prototipos, decoración, piezas sencillas</td>
              </tr>
              <tr>
                <td>PETG</td>
                <td>22-30 €/kg</td>
                <td>Piezas funcionales, resistencia media</td>
              </tr>
              <tr>
                <td>TPU</td>
                <td>30-45 €/kg</td>
                <td>Piezas flexibles</td>
              </tr>
              <tr>
                <td>ABS</td>
                <td>22-35 €/kg</td>
                <td>Piezas técnicas con resistencia térmica</td>
              </tr>
              <tr>
                <td>ASA</td>
                <td>28-45 €/kg</td>
                <td>Exterior, UV, automoción</td>
              </tr>
              <tr>
                <td>Nylon</td>
                <td>45-80 €/kg</td>
                <td>Piezas técnicas resistentes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Ejemplo de cálculo</h2>
        <p>
          Imagina una pieza de PLA de 80 g con 5 horas de impresión, 10 minutos de preparación, mano de obra a 15 €/h, 10 % de riesgo de fallo y 30 % de margen. Con un filamento de 20 €/kg, electricidad a 0,25 €/kWh, impresora de 150 W y desgaste de 1 €/h, el coste aproximado sería:
        </p>
        <ul>
          <li>Material: 1,60 €</li>
          <li>Electricidad: 0,19 €</li>
          <li>Máquina/desgaste: 5,00 €</li>
          <li>Mano de obra: 2,50 €</li>
          <li>Riesgo de fallo aproximado: 0,93 €</li>
          <li>Margen aproximado: 3,06 €</li>
        </ul>
        <p>
          El precio sin IVA estaría alrededor de 13,28 €. Con IVA del 21 %, el precio orientativo sería aproximadamente 16,07 € por unidad.
        </p>

        <h2>Errores comunes al presupuestar impresiones 3D</h2>
        <ul>
          <li>Cobrar solo el filamento.</li>
          <li>No contar el tiempo de preparación.</li>
          <li>No añadir margen por fallos.</li>
          <li>No considerar desgaste de máquina.</li>
          <li>No diferenciar materiales.</li>
          <li>No cobrar postprocesado.</li>
          <li>No aplicar IVA cuando corresponde.</li>
        </ul>

        <h2>Preguntas frecuentes</h2>
        {faqs.map((faq) => (
          <section key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </section>
        ))}

        <p>
          Esta calculadora ofrece una estimación orientativa. El precio final puede variar según la impresora, el material, la complejidad del modelo, los soportes, la calidad exigida y el postprocesado.
        </p>
      </div>
    </section>
  );
}
