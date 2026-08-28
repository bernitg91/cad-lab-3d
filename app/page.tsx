import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { ExploreMore } from "@/components/Newsletter";
import { getAllArticles, getFeaturedArticles } from "@/lib/articles";
import { getArticleSupport } from "@/lib/article-support";
import { portfolioItems } from "@/lib/portfolio";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
  image: "/images/editorial/documentacion-prototipo-evidencias.webp"
});

const topics = [
  {
    label: "Diseño CAD",
    title: "Modelos preparados para cambiar",
    text: "Referencias estables, intención de diseño y entregas que otra persona puede abrir.",
    href: "/guia-cad-parametrico",
    image: "/images/editorial/cad-parametrico-estudio.webp",
    alt: "Diseñador revisando un modelo CAD paramétrico"
  },
  {
    label: "Impresión 3D",
    title: "Del laminador a una pieza útil",
    text: "Orientación, paredes, tolerancias y control de fallos antes de repetir.",
    href: "/guia-impresion-3d-fdm",
    image: "/images/editorial/impresion-fdm-taller.webp",
    alt: "Impresora FDM fabricando una pieza funcional"
  },
  {
    label: "Materiales",
    title: "Elegir por condiciones reales",
    text: "Calor, impacto, exterior, flexibilidad y capacidad de la máquina.",
    href: "/guia-materiales-fdm",
    image: "/images/editorial/materiales-fdm-comparativa.webp",
    alt: "Comparación de materiales y probetas FDM"
  },
  {
    label: "Validación FEM",
    title: "Simular para responder una pregunta",
    text: "Hipótesis, apoyos, malla y comprobaciones antes de confiar en los colores.",
    href: "/guia-simulacion-fem",
    image: "/images/editorial/analisis-fem-validacion.webp",
    alt: "Comparación entre simulación FEM y una pieza física"
  },
  {
    label: "Documentación",
    title: "Explicar decisiones con evidencia",
    text: "Planos, medidas, prototipos y límites ordenados para que el proyecto se entienda.",
    href: "/guia-documentacion-tecnica",
    image: "/images/editorial/documentacion-prototipo-evidencias.webp",
    alt: "Ilustración de un proyecto con prototipo, planos y calibre"
  }
];

const tools = [
  ["Precio de impresión", "Coste, tiempo, preparación, margen e IVA.", "/calculadora-precio-impresion-3d", "€"],
  ["Peso aproximado", "Volumen, densidad, relleno, soportes y lote.", "/calculadora-peso-pieza-3d", "g"],
  ["Selector de material", "Compara seis familias según el uso previsto.", "/selector-material-impresion-3d", "M"],
  ["Checklist FDM", "Archivo, máquina, material y control final.", "/checklist-impresion-3d", "✓"]
];

export default function HomePage() {
  const articles = getAllArticles();
  const featured = getFeaturedArticles();
  const featurePool = [...featured, ...articles.filter((article) => !featured.some((item) => item.slug === article.slug))].slice(0, 3);
  const leadStory = featurePool[0];
  const leadSupport = getArticleSupport(leadStory.slug);
  const latestArticles = articles.slice(0, 6);
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
      description: siteConfig.description,
      potentialAction: {
        "@type": "SearchAction",
        target: `${absoluteUrl("/blog")}?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />

      <section className="blueprint-grid overflow-hidden border-b border-slate-800 bg-[#091625] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:px-8 lg:py-20">
          <div className="relative z-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Publicación técnica en español</p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-black uppercase leading-[0.88] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl xl:text-[5.45rem]">
              Diseñar es decidir. <span className="text-cyan-300">Comprobar</span> es lo que lo hace útil.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Guías para pasar del CAD a una pieza, simulación o memoria que resista preguntas: qué cambiar, qué medir y qué límite declarar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="focus-ring rounded-md bg-teal-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-cyan-300" href="/guias">Empezar por una guía</Link>
              <Link className="focus-ring rounded-md border border-white/20 px-5 py-3 text-sm font-bold text-white hover:border-cyan-300 hover:bg-white/5" href="/blog" prefetch={false}>Explorar {articles.length} artículos</Link>
            </div>
          </div>

          <figure className="calibration-rail relative pl-5">
            <div className="image-scanline relative aspect-[4/3] overflow-hidden border border-cyan-200/25 bg-slate-900 shadow-2xl shadow-black/40 sm:aspect-[16/10]">
              <Image
                src="/images/editorial/documentacion-prototipo-evidencias.webp"
                alt="Ilustración editorial de un proyecto CAD documentado con prototipo, planos y medidas"
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#091625] via-[#091625]/75 to-transparent p-5 pt-16 sm:p-7">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">Pieza · plano · medida · decisión</p>
                <p className="mt-2 max-w-lg font-display text-2xl font-bold leading-none text-white sm:text-3xl">La evidencia debe aparecer junto a la decisión que sostiene.</p>
              </div>
            </div>
            <div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
              <span>X 000.00</span><span>Y 000.00</span><span>Z 000.00</span>
            </div>
          </figure>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-200 border-x border-slate-200 sm:grid-cols-4 sm:divide-y-0">
          {[
            [String(articles.length), "artículos revisados"],
            ["5", "rutas temáticas"],
            ["4", "herramientas abiertas"],
            [String(portfolioItems.length), "piezas comentadas"]
          ].map(([value, label]) => (
            <div key={label} className="px-4 py-5 text-center sm:px-6">
              <p className="font-display text-3xl font-black text-slate-950">{value}</p>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="flex flex-col gap-4 border-b border-slate-300 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-teal-800">Selección editorial</p>
            <h2 className="mt-2 font-display text-4xl font-black uppercase leading-none text-slate-950 sm:text-5xl">Empieza por una decisión real</h2>
          </div>
          <Link className="text-sm font-bold text-blue-800 hover:text-blue-950" href="/blog">Ver toda la biblioteca →</Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.45fr_0.75fr]">
          <Link href={`/blog/${leadStory.slug}`} className="group grid overflow-hidden border border-slate-200 bg-white shadow-sm lg:grid-rows-[auto_1fr]">
            <div className="image-scanline relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Image src={leadSupport.evidence.image} alt={leadSupport.evidence.alt} fill sizes="(min-width: 1024px) 68vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
              <span className="absolute left-4 top-4 bg-[#091625] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-300">Guía destacada</span>
            </div>
            <div className="p-6 sm:p-8">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-800">{leadStory.category} · {leadStory.readingTime}</p>
              <h3 className="mt-3 max-w-3xl font-display text-4xl font-black leading-[0.98] text-slate-950 group-hover:text-blue-800 sm:text-5xl">{leadStory.title}</h3>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{leadStory.description}</p>
            </div>
          </Link>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {featurePool.slice(1).map((article) => {
              const support = getArticleSupport(article.slug);
              return (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="lift-on-hover group grid grid-cols-[118px_1fr] overflow-hidden border border-slate-200 bg-white shadow-sm sm:grid-cols-1 lg:grid-cols-[148px_1fr]">
                  <div className="relative min-h-36 overflow-hidden bg-slate-100 sm:aspect-[16/9] lg:aspect-auto">
                    <Image src={support.evidence.image} alt={support.evidence.alt} fill sizes="(min-width: 1024px) 148px, (min-width: 640px) 50vw, 118px" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-teal-800">{article.category}</p>
                    <h3 className="mt-2 font-display text-2xl font-black leading-[1.02] text-slate-950 group-hover:text-blue-800">{article.title}</h3>
                    <p className="mt-3 hidden text-sm leading-6 text-slate-600 lg:block">{article.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <AdSlot
        clientId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}
        slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_FEED_SLOT}
        className="mx-auto max-w-5xl"
      />

      <section className="border-y border-slate-200 bg-white py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-teal-800">Explora por objetivo</p>
            <h2 className="mt-2 font-display text-4xl font-black uppercase leading-none text-slate-950 sm:text-5xl">No estudies temas sueltos. Resuelve un flujo.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {topics.map((topic, index) => (
              <Link key={topic.href} href={topic.href} className={`group relative min-h-[290px] overflow-hidden bg-slate-900 ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}>
                <Image src={topic.image} alt={topic.alt} fill sizes={index < 2 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"} className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.035] group-hover:opacity-65" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091625] via-[#091625]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300">{topic.label}</p>
                  <h3 className="mt-2 font-display text-3xl font-black leading-none text-white">{topic.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">{topic.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#10233f] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300">Banco de trabajo</p>
              <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none sm:text-5xl">Calcula antes de imprimir</h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300">Herramientas abiertas para estimar, comparar y revisar. El resultado es un punto de partida; la pieza real manda.</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2">
              {tools.map(([title, text, href, mark]) => (
                <Link key={href} href={href} className="group grid grid-cols-[48px_1fr] gap-4 bg-[#10233f] p-5 hover:bg-[#163b70]">
                  <span className="flex h-12 w-12 items-center justify-center border border-cyan-300/35 font-mono text-lg font-semibold text-cyan-300">{mark}</span>
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

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="flex flex-col gap-4 border-b border-slate-300 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-teal-800">Biblioteca revisada</p>
            <h2 className="mt-2 font-display text-4xl font-black uppercase leading-none text-slate-950 sm:text-5xl">Artículos con una tarea concreta</h2>
          </div>
          <Link className="text-sm font-bold text-blue-800 hover:text-blue-950" href="/blog">Buscar por tema →</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-teal-800">Fotografía propia</p>
              <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none text-slate-950 sm:text-5xl">Piezas fotografiadas, límites claros</h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">Las fotografías permiten observar geometría, acabado y uso. No atribuimos resistencia, material o precisión si no están medidos.</p>
              <Link className="mt-6 inline-flex border-b-2 border-blue-700 pb-1 text-sm font-black text-blue-800" href="/casos-practicos-impresion-3d">Ver la galería comentada →</Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {portfolioItems.slice(0, 4).map((item, index) => (
                <Link key={item.title} href={`/casos-practicos-impresion-3d#caso-${index + 1}`} className={`group overflow-hidden border border-slate-200 bg-slate-50 ${index === 0 ? "sm:col-span-2" : ""}`}>
                  <div className={`relative overflow-hidden bg-slate-100 ${index === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
                    <Image src={item.image} alt={item.alt} fill sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 640px) 50vw, 100vw"} className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl font-black leading-none text-slate-950 group-hover:text-blue-800">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_330px] lg:px-8 lg:py-18">
        <ExploreMore />
        <aside className="border border-slate-200 bg-white p-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-800">Por qué confiar</p>
          <h2 className="mt-3 font-display text-3xl font-black leading-none text-slate-950">Método, fuentes y límites visibles</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">Explicamos cómo se prepara cada guía y distinguimos una ilustración de una prueba física.</p>
          <div className="mt-5 grid gap-2 text-sm font-bold text-blue-800">
            <Link href="/metodologia">Metodología editorial →</Link>
            <Link href="/fuentes">Fuentes técnicas →</Link>
            <Link href="/sobre-mi">Sobre CAD Lab 3D →</Link>
          </div>
        </aside>
      </section>
    </>
  );
}
