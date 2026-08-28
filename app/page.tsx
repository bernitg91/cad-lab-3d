import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { getAllArticles } from "@/lib/articles";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/"
});

const entryPoints = [
  {
    number: "01",
    title: "Modelar",
    text: "Croquis, referencias y operaciones que soporten cambios sin rehacer el modelo.",
    href: "/guia-cad-parametrico",
    link: "Abrir la guía de CAD"
  },
  {
    number: "02",
    title: "Imprimir",
    text: "Orientación, paredes, material y tolerancias pensadas desde la pieza real.",
    href: "/guia-impresion-3d-fdm",
    link: "Abrir la guía FDM"
  },
  {
    number: "03",
    title: "Documentar",
    text: "Planos, capturas y decisiones ordenadas para que otra persona entienda el proyecto.",
    href: "/guia-documentacion-tecnica",
    link: "Abrir la guía de documentación"
  }
];

const tools = [
  ["Precio de impresión", "Estima tiempo, material, preparación, margen e IVA.", "/calculadora-precio-impresion-3d", "€"],
  ["Peso aproximado", "Parte del volumen, densidad, relleno, soportes y unidades.", "/calculadora-peso-pieza-3d", "g"],
  ["Selector de material", "Compara seis familias según el uso que esperas de la pieza.", "/selector-material-impresion-3d", "M"],
  ["Checklist FDM", "Una última revisión de archivo, máquina, material y acabado.", "/checklist-impresion-3d", "REV"]
];

const benchPieces = [
  {
    number: "01",
    title: "Adaptador de pequeño formato",
    note: "Se ve la abertura y el acabado; no se conserva una tolerancia medida.",
    href: "/casos-practicos-impresion-3d#caso-5"
  },
  {
    number: "02",
    title: "Panel con relieves",
    note: "Permite observar superficies y relieves, no atribuir rigidez o resistencia.",
    href: "/casos-practicos-impresion-3d#caso-6"
  },
  {
    number: "03",
    title: "Soporte para relojes",
    note: "La forma y los apoyos quedan registrados; faltan los datos del perfil de impresión.",
    href: "/casos-practicos-impresion-3d#caso-1"
  },
  {
    number: "04",
    title: "Patrón decorativo por capas",
    note: "El patrón FDM es visible; no hay medidas dimensionales asociadas.",
    href: "/casos-practicos-impresion-3d#caso-8"
  }
];

export default function HomePage() {
  const articles = getAllArticles();
  const leadStory = articles.find((article) => article.slug === "disenar-encajes-clips-impresion-3d") ?? articles[0];
  const latestArticles = articles.filter((article) => article.slug !== leadStory.slug).slice(0, 5);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/brand/cadlab3d-mark.png"),
      description: siteConfig.description
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      description: siteConfig.description
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:px-8 lg:py-16">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-800">Cuaderno de CAD e impresión 3D</p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-black leading-[0.92] text-slate-950 sm:text-6xl lg:text-7xl">
              Lo que voy aprendiendo entre el CAD y la pieza impresa.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Soy estudiante de Ingeniería en Diseño Industrial. Uso esta web para ordenar problemas concretos: un encaje que debe ceder, una pieza que se deforma o una memoria que necesita explicar mejor una decisión.
            </p>
            <p className="mt-5 flex max-w-xl gap-3 border-l-2 border-orange-600 pl-4 text-sm leading-6 text-slate-600">
              Si una medida, un material o un ensayo no están documentados, lo indico. Observar ayuda a describir; no convierte una pieza en un caso validado.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="focus-ring bg-[#123f7a] px-5 py-3 text-sm font-black text-white hover:bg-blue-800" href="/guias">Elegir una ruta</Link>
              <Link className="focus-ring border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:border-blue-400 hover:text-blue-800" href="/blog" prefetch={false}>Buscar un artículo</Link>
            </div>
          </div>

          <aside aria-label="Ficha del método de trabajo" className="border border-slate-300 bg-[#091625] text-white">
            <div className="flex items-center justify-between border-b border-white/20 px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300 sm:px-7">
              <span>Ficha 00 · método</span>
              <span className="text-slate-400">Revisión abierta</span>
            </div>
            <div className="p-5 sm:p-7 lg:p-8">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-300">Escala de evidencia</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl font-black leading-[0.94] sm:text-5xl">Observar no es lo mismo que validar.</h2>
              <ol className="mt-7 border-y border-white/20">
                <li className="grid grid-cols-[42px_1fr] gap-4 border-b border-white/20 py-4">
                  <span className="font-mono text-sm font-semibold text-orange-300">01</span>
                  <div><h3 className="font-display text-2xl font-black leading-none">Observar</h3><p className="mt-2 text-sm leading-6 text-slate-300">Describir geometría, acabado y fallo visible sin completar los huecos.</p></div>
                </li>
                <li className="grid grid-cols-[42px_1fr] gap-4 border-b border-white/20 py-4">
                  <span className="font-mono text-sm font-semibold text-orange-300">02</span>
                  <div><h3 className="font-display text-2xl font-black leading-none">Medir</h3><p className="mt-2 text-sm leading-6 text-slate-300">Anotar unidad, instrumento y condiciones para que el dato tenga contexto.</p></div>
                </li>
                <li className="grid grid-cols-[42px_1fr] gap-4 py-4">
                  <span className="font-mono text-sm font-semibold text-orange-300">03</span>
                  <div><h3 className="font-display text-2xl font-black leading-none">Validar</h3><p className="mt-2 text-sm leading-6 text-slate-300">Repetir, comparar y declarar el límite de la conclusión.</p></div>
                </li>
              </ol>
              <p className="mt-6 border-l-2 border-orange-500 pl-4 text-sm leading-6 text-slate-300">
                <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white">Regla de publicación</span>
                Si un dato no se conserva, se escribe «no consta».
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-teal-800">Tres puertas de entrada</p>
          <h2 className="mt-3 font-display text-4xl font-black leading-none text-slate-950 sm:text-5xl">Empieza por la parte del trabajo que tienes delante</h2>
        </div>
        <div className="mt-8 grid border-y border-slate-300 md:grid-cols-3 md:divide-x md:divide-slate-300">
          {entryPoints.map((entry) => (
            <article key={entry.number} className="border-b border-slate-300 px-1 py-6 last:border-b-0 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0">
              <p className="font-mono text-xs font-semibold text-orange-700">{entry.number}</p>
              <h3 className="mt-3 font-display text-3xl font-black text-slate-950">{entry.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{entry.text}</p>
              <Link className="mt-5 inline-flex border-b border-blue-700 pb-0.5 text-sm font-bold text-blue-800 hover:text-blue-950" href={entry.href}>{entry.link} →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 border-b border-slate-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-teal-800">Del cuaderno</p>
              <h2 className="mt-2 font-display text-4xl font-black leading-none text-slate-950 sm:text-5xl">Una guía para empezar y cinco notas recientes</h2>
            </div>
            <Link className="text-sm font-bold text-blue-800 hover:text-blue-950" href="/blog">Ver todos los artículos →</Link>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <article className="border-t-2 border-slate-950 pt-5">
              <div className="grid gap-5 sm:grid-cols-[72px_1fr] sm:gap-7">
                <div className="border-b border-slate-300 pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-5">
                  <p className="font-mono text-3xl font-semibold leading-none text-orange-700">01</p>
                  <p className="mt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">Lectura principal</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-teal-800">{leadStory.category}</p>
                  <h3 className="mt-3 max-w-3xl font-display text-4xl font-black leading-[0.98] text-slate-950 sm:text-5xl">
                    <Link href={`/blog/${leadStory.slug}`} className="hover:text-blue-800">{leadStory.title}</Link>
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">{leadStory.description}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-200 pt-4">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Problema concreto · límites explícitos</span>
                    <Link className="inline-flex border-b-2 border-blue-700 pb-1 text-sm font-black text-blue-800" href={`/blog/${leadStory.slug}`}>Leer la guía →</Link>
                  </div>
                </div>
              </div>
            </article>

            <div className="border-t-2 border-slate-950">
              {latestArticles.map((article, index) => (
                <article key={article.slug} className="grid grid-cols-[28px_1fr] gap-3 border-b border-slate-200 py-4">
                  <span className="font-mono text-[10px] font-semibold text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-teal-800">{article.category}</p>
                    <h3 className="mt-1 font-display text-2xl font-black leading-tight text-slate-950">
                      <Link className="hover:text-blue-800" href={`/blog/${article.slug}`}>{article.title}</Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AdSlot
        clientId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}
        slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_FEED_SLOT}
        className="mx-auto max-w-5xl"
      />

      <section className="bg-[#10233f] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-300">Herramientas</p>
              <h2 className="mt-3 font-display text-4xl font-black leading-none sm:text-5xl">Cuentas rápidas antes de fabricar</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">Sirven para preparar una decisión, no para sustituir el laminador, la ficha del material ni una prueba física.</p>
            </div>
            <div className="grid border border-white/20 sm:grid-cols-2">
              {tools.map(([title, text, href, mark], index) => (
                <Link key={href} href={href} className={`group grid grid-cols-[42px_1fr] gap-4 p-5 hover:bg-white/5 ${index % 2 === 0 ? "sm:border-r sm:border-white/20" : ""} ${index < 2 ? "border-b border-white/20" : index === 2 ? "border-b border-white/20 sm:border-b-0" : ""}`}>
                  <span className="font-mono text-lg font-semibold text-orange-300">{mark}</span>
                  <span>
                    <span className="block font-display text-2xl font-black leading-none text-white group-hover:text-cyan-200">{title}</span>
                    <span className="mt-2 block text-sm leading-5 text-slate-300">{text}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-teal-800">Casos de la mesa de trabajo</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-none text-slate-950 sm:text-5xl">Lo visible y lo que todavía falta anotar</h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">Cada ficha separa la observación disponible de aquello que exigiría medidas, condiciones de impresión o una prueba repetible.</p>
            <Link className="mt-6 inline-flex border-b-2 border-blue-700 pb-1 text-sm font-black text-blue-800" href="/casos-practicos-impresion-3d">Abrir todos los casos →</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {benchPieces.map((piece) => (
              <Link key={piece.href} href={piece.href} className="group grid min-h-48 grid-cols-[48px_1fr] gap-4 border-t-2 border-slate-950 py-4">
                <span className="font-mono text-xl font-semibold text-orange-700">{piece.number}</span>
                <span className="flex flex-col">
                  <span className="font-display text-2xl font-black leading-none text-slate-950 group-hover:text-blue-800">{piece.title}</span>
                  <span className="mt-3 block text-sm leading-6 text-slate-600">{piece.note}</span>
                  <span className="mt-auto pt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-800">Abrir ficha →</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#eef2f6] py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-teal-800">Sobre este proyecto</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-black leading-none text-slate-950 sm:text-5xl">No es una revista ni un laboratorio comercial</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Es un cuaderno público de aprendizaje. Las guías ordenan lo que ya se puede explicar; las fichas separan lo observado de lo medido; los huecos de información se dejan visibles para no convertir una suposición en un resultado.</p>
          </div>
          <div className="border-l-2 border-orange-600 pl-6">
            <p className="font-bold text-slate-950">¿Has encontrado un error o falta contexto?</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Las correcciones forman parte del trabajo. Puedes revisar cómo preparo el contenido o escribirme directamente.</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold text-blue-800">
              <Link href="/sobre-mi">Quién escribe →</Link>
              <Link href="/metodologia">Cómo reviso →</Link>
              <Link href="/contacto">Contacto →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
