import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Cómo preparo el contenido",
  description: "Cómo preparo y reviso los apuntes de CAD Lab 3D sobre CAD, impresión 3D, materiales, FEM y documentación técnica.",
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
    text: "Cada recomendación importante debe indicar su contexto, la decisión a la que ayuda y, cuando procede, una fuente oficial o una prueba relacionada."
  },
  {
    title: "Evidencia propia",
    text: "Cuando se muestran servicios o ejemplos de impresión 3D, las piezas reales se distinguen de las recreaciones conceptuales. Estas últimas nunca se cuentan como evidencia propia ni como ensayos realizados."
  },
  {
    title: "Revisión editorial",
    text: "Se corrigen repeticiones, enlaces rotos, explicaciones vagas y ejemplos que no aportan una decisión técnica clara."
  }
];

export default function MethodologyPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-teal-800">Detrás de cada apunte</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-black leading-none text-slate-950">Cómo preparo el contenido de CAD Lab 3D</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        Escribo para estudiantes, perfiles junior y personas que trabajan con CAD, impresión 3D FDM, materiales, simulación básica y documentación. Esta página explica qué intento comprobar y dónde están los límites del cuaderno.
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
          Las guías principales se organizan alrededor de un flujo completo: definir el problema, tomar decisiones, comprobarlas y documentar el resultado. Los artículos del blog resuelven dudas más concretas y se mantienen publicados solo cuando añaden una explicación distinta a la guía pilar.
        </p>
        <h2>Qué límites tiene el contenido</h2>
        <p>
          Las recomendaciones son informativas. En piezas sometidas a cargas críticas, seguridad, normativa, fatiga, temperatura alta o uso profesional exigente, conviene validar con ensayos, documentación del fabricante o revisión técnica especializada.
        </p>
        <h2>Actualización y mejora</h2>
        <p>
          El contenido se revisa cuando se detectan errores, cambia una herramienta o una página se solapa con otra. En ese último caso se consolida en una guía más completa en lugar de mantener varias versiones casi iguales. Los enlaces y descargas se comprueban durante la revisión del sitio.
        </p>
        <h2>Selección y consolidación</h2>
        <p>
          Las publicaciones que repetían la misma intención se han retirado de los listados y redirigen a la guía, herramienta o artículo más útil. El objetivo no es aumentar un contador de páginas, sino conservar una respuesta clara para cada tarea.
        </p>
        <h2>Niveles de evidencia</h2>
        <p>
          Una fuente oficial sirve para contrastar funciones, terminología o recomendaciones generales. Una fotografía documental permite observar geometría y acabado, pero no demuestra por sí sola material, tolerancia, resistencia o durabilidad. Una recreación editorial tampoco demuestra que la escena, la pieza o la prueba hayan existido. Solo se considera un caso validado cuando existen datos de proceso, medidas o ensayos documentados.
        </p>
        <h2>Fotografías e ilustraciones</h2>
        <p>
          Las fotografías documentales se reservan para piezas o referencias que realmente existen y conservan su crédito. Las cuatro recreaciones editoriales fotorrealistas están asistidas por IA y se identifican expresamente como escenas conceptuales: aportan contexto, pero no son fotografías de pruebas reales, capturas de procesos ejecutados, prototipos documentados ni resultados calculados.
        </p>
        <p>
          Antes de publicarlas se revisan manualmente la geometría, el número y la posición de los elementos, los materiales, el proceso representado, las luces, las sombras y los posibles artefactos generativos. La revisión reduce errores visuales, pero no convierte una recreación en evidencia. Cada una mantiene además una lámina vectorial rotulada que explica el concepto sin fingir datos medidos. La clasificación y la procedencia de todos estos recursos están resumidas en <Link href="/licencias-imagenes">licencias y créditos de imágenes</Link>.
        </p>
        <h2>Uso de ejemplos prácticos</h2>
        <p>
          La galería muestra piezas impresas reales para aportar contexto visual. Sus fichas se mantienen prudentes: explican qué puede observarse y qué comprobación faltaría, sin presentarlas como ensayos o casos validados cuando esos datos no existen.
        </p>
        <h2>Fuentes externas</h2>
        <p>
          Para funciones de software se prioriza documentación del fabricante. Para materiales se combinan guías de impresión y fichas del filamento concreto. Para FEM se utilizan recursos técnicos que insisten en idealización, verificación y límites. Las referencias principales están reunidas en <Link href="/fuentes">fuentes técnicas</Link>.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link className="rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-blue-800" href="/guias">
          Ver guías
        </Link>
        <Link className="rounded-md border border-slate-300 px-5 py-3 text-sm font-black text-slate-800 hover:border-blue-300 hover:text-blue-700" href="/casos-practicos-impresion-3d">
          Ver galería comentada
        </Link>
        <Link className="rounded-md border border-slate-300 px-5 py-3 text-sm font-black text-slate-800 hover:border-blue-300 hover:text-blue-700" href="/contacto">
          Enviar corrección o sugerencia
        </Link>
      </div>
    </section>
  );
}
