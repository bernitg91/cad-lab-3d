import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { ArticleIllustration } from "@/components/ArticleIllustration";
import { ArticlePhoto } from "@/components/ArticlePhoto";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { TableOfContents } from "@/components/TableOfContents";
import { formatDate, getAllArticleSlugs, getArchivedArticleRedirect, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { getArticleSupport } from "@/lib/article-support";
import { getArticleIllustration, isLicensedReferenceMedia } from "@/lib/article-illustrations";
import { getArticlePhoto, isDocumentaryArticlePhoto } from "@/lib/article-photos";
import { MarkdownContent } from "@/lib/markdown";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";
import type { CategorySlug } from "@/types/article";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getArticlePresentation(title: string) {
  if (/\bvs\b|diferencias|elegir (?:el mejor )?filamento/i.test(title)) {
    return { kind: "comparativa", summaryLabel: "Criterio principal" };
  }
  if (/errores|evitar|calibrar/i.test(title)) {
    return { kind: "diagnóstico", summaryLabel: "Primer diagnóstico" };
  }
  if (/pruebas? de tolerancia/i.test(title)) {
    return { kind: "prueba guiada", summaryLabel: "Antes de medir" };
  }
  if (/^Qué es/i.test(title)) {
    return { kind: "concepto", summaryLabel: "Idea clave" };
  }
  if (/empezar/i.test(title)) {
    return { kind: "guía de inicio", summaryLabel: "Por dónde empezar" };
  }
  return { kind: "guía práctica", summaryLabel: "En pocas palabras" };
}

const editorialNotes: Record<CategorySlug, string> = {
  "creo-parametric": "En las notas de Creo separo las operaciones que conviene practicar, las referencias que merece la pena conservar y aquello que solo puede verse como un esquema, no como una captura de un ejercicio terminado.",
  solidworks: "Cuando comparo herramientas CAD, me centro en hábitos transferibles —croquis, referencias, historial y comprobación— y evito convertir una preferencia personal en una regla general.",
  "impresion-3d": "En las notas de impresión distingo los ajustes que dependen de máquina, material y orientación de los principios que sí pueden servir como punto de partida. Una medida solo se presenta como resultado cuando existe una prueba documentada.",
  materiales: "Al hablar de materiales separo los criterios de selección de los datos medidos. Las propiedades concretas deben comprobarse en la ficha del fabricante y, para una pieza crítica, mediante una prueba representativa.",
  "diseno-industrial": "En las notas de diseño ordeno la decisión, las restricciones y las comprobaciones pendientes. El objetivo es que se vea por qué se elige una solución y qué falta validar, no presentar el proceso como cerrado.",
  "simulacion-fem": "En simulación separo hipótesis, condiciones de contorno, malla, resultado y validación. Una imagen de colores no se trata como evidencia si faltan unidades, escala o una comprobación independiente.",
  "proyectos-universitarios": "En documentación de proyectos priorizo la trazabilidad: qué decisión se tomó, con qué referencia y qué evidencia la sostiene. Las plantillas sirven para ordenar, no para sustituir el razonamiento propio.",
  recursos: "En los recursos de intercambio y revisión anoto el formato, las unidades y las comprobaciones que cambian según el destino. La lista ayuda a no olvidar pasos, pero no sustituye abrir y revisar el archivo entregado."
};

const editorialNotesBySlug: Record<string, string> = {
  "calibrar-impresora-3d-piezas-funcionales": "La secuencia va de la primera capa a una pieza de control para no cambiar varios parámetros a la vez. La fotografía solo permite observar la zona de deposición; no corresponde a mi impresora ni acredita una calibración propia.",
  "como-empezar-creo-parametric-desde-cero": "El recorrido usa una escuadra sencilla para practicar croquis, extrusión, taladros y redondeos con un historial legible. La lámina muestra la lógica de regeneración; no pretende imitar una captura real de Creo.",
  "documentar-analisis-fem-basico": "Esta nota nace de un fallo frecuente en las memorias: enseñar el contorno de colores y omitir las condiciones que lo producen. Por eso la lámina separa entrada, malla, salida y verificación, con valores expresamente didácticos.",
  "elegir-filamento-piezas-funcionales": "La elección parte del uso de la pieza —temperatura, impacto, humedad y repetición—, no del color de la bobina. La foto documenta el formato del filamento, pero no permite identificar el polímero ni sus propiedades.",
  "errores-exportar-archivos-cad": "Aquí distingo tres entregables que suelen mezclarse: sólido para seguir editando, malla para fabricar y plano para comunicar. Cada rama de la lámina tiene controles distintos porque un archivo que abre no necesariamente conserva escala o geometría.",
  "evitar-warping-impresion-3d": "El diagnóstico se ordena por mecanismo térmico, adhesión y geometría antes de proponer cambios de perfil. La figura científica sirve para observar el fenómeno en ABS; no se presenta como una prueba realizada para este cuaderno.",
  "pruebas-tolerancia-fdm": "La ficha propone imprimir una serie corta bajo condiciones registradas y clasificarla solo después del montaje. Los cinco diámetros son ejemplos de preparación: todos permanecen sin ensayar y no se publican como compensaciones válidas.",
  "disenar-encajes-clips-impresion-3d": "La foto permite ver un adaptador pequeño y su abertura, pero no conserva una medición de holgura. La guía se centra por eso en cómo preparar una probeta y repetir el encaje antes de trasladarlo a una pieza mayor.",
  "disenar-pieza-resistente-fdm": "La resistencia se explica siguiendo la trayectoria de carga y la continuidad entre capas, paredes y nervios. El panel fotografiado aporta contexto geométrico; sin material, orientación y ensayo registrados no se usa como prueba mecánica.",
  "errores-diseno-piezas-impresion-3d": "Los errores se agrupan por lo que puede revisarse antes de laminar: escala, paredes, apoyos, puentes y orientación. La imagen externa muestra piezas de prueba reales, pero no aporta los parámetros con los que fueron fabricadas.",
  "material-carcasa-impresa-3d": "Para una carcasa separo rigidez, cierre, acceso, temperatura y acabado porque rara vez un solo material resuelve todo. La pieza fotografiada ayuda a leer la forma; no identifica la resina o el filamento ni certifica su servicio.",
  "materiales-prototipos-funcionales": "Cada prototipo debe representar la propiedad que se quiere comprobar: volumen, montaje, flexión, calor o repetición. La fotografía muestra útiles reales, mientras que los datos de material siguen dependiendo de ficha técnica y ensayo.",
  "orientar-pieza-impresion-3d-resistente": "La orientación se decide comparando carga, continuidad de contornos, soportes y acabado, no buscando una postura universal. En la pieza azul pueden verse las capas; su resistencia no fue medida y no se deduce de la imagen.",
  "paredes-perimetros-tapas-fdm": "La nota separa paredes, tapas y relleno porque aumentar un porcentaje no refuerza todas las zonas por igual. La bandeja roja deja ver bordes y base, pero faltan el perfil y las medidas para tratarla como ensayo.",
  "preparar-archivo-stl-impresion-3d": "La revisión del STL sigue unidades, resolución, normales y estanqueidad antes de abrir el laminador. La superficie curva fotografiada ilustra por qué una malla demasiado gruesa se nota, aunque no conserva el archivo de origen.",
  "que-es-analisis-fem-cuando-usarlo": "La simulación se plantea como respuesta a una pregunta mecánica concreta, no como una imagen final del proyecto. La fotografía del laboratorio es contextual y no atribuye a CAD Lab 3D equipos, ensayos ni resultados ajenos.",
  "solidworks-vs-creo-estudiantes": "La comparación se limita al aprendizaje de modelado robusto, referencias e historial; no intenta declarar un ganador universal. La impresora de la fotografía recuerda que el criterio final es poder revisar y fabricar la geometría, no el logotipo del programa."
};

function getEditorialNote(slug: string, categorySlug: CategorySlug) {
  return editorialNotesBySlug[slug] ?? editorialNotes[categorySlug];
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const archivedRedirect = getArchivedArticleRedirect(slug);
  if (!article && archivedRedirect) {
    return {
      robots: { index: false, follow: true },
      alternates: { canonical: absoluteUrl(archivedRedirect) }
    };
  }
  if (!article) return {};
  const photo = getArticlePhoto(article.slug);
  const illustration = getArticleIllustration(article.slug);
  const socialVisual = isDocumentaryArticlePhoto(photo)
    ? photo
    : illustration && isLicensedReferenceMedia(illustration)
      ? illustration
      : undefined;

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    type: "article",
    publishedTime: article.date,
    authors: [siteConfig.authorName],
    image: socialVisual?.image,
    imageAlt: socialVisual?.alt,
    imageWidth: socialVisual?.width,
    imageHeight: socialVisual?.height
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const archivedRedirect = getArchivedArticleRedirect(slug);
  if (archivedRedirect) permanentRedirect(archivedRedirect);
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = getRelatedArticles(article);
  const support = getArticleSupport(article.slug);
  const photo = getArticlePhoto(article.slug);
  const showPhoto = isDocumentaryArticlePhoto(photo);
  const illustration = getArticleIllustration(article.slug);
  const presentation = getArticlePresentation(article.title);
  const visibleAuthor = siteConfig.authorName === siteConfig.name
    ? "Cuaderno personal de aprendizaje"
    : `Por ${siteConfig.authorName}`;
  const editorialNote = getEditorialNote(article.slug, article.categorySlug);
  const photoCreatorType = photo && (photo.licenseCode === "Contenido propio" || photo.creator === "USDAgov" || photo.sourceName === "NASA")
    ? "Organization"
    : "Person";
  const imageJsonLd = showPhoto && photo ? [
    {
      "@type": "ImageObject",
      url: absoluteUrl(photo.image),
      contentUrl: absoluteUrl(photo.image),
      width: photo.width,
      height: photo.height,
      caption: photo.caption,
      creditText: `${photo.title} — ${photo.creator}`,
      creator: { "@type": photoCreatorType, name: photo.creator },
      license: photo.licenseUrl,
      acquireLicensePage: absoluteUrl("/licencias-imagenes")
    }
  ] : illustration?.kind === "licensed-reference-media" ? [
    {
      "@type": "ImageObject",
      url: absoluteUrl(illustration.image),
      contentUrl: absoluteUrl(illustration.image),
      width: illustration.width,
      height: illustration.height,
      caption: `${illustration.title}. ${illustration.caption}`,
      creditText: `${illustration.title} — ${illustration.creator}`,
      license: illustration.licenseUrl,
      acquireLicensePage: absoluteUrl("/licencias-imagenes")
    }
  ] : undefined;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updatedDate || article.date,
    author: {
      "@type": siteConfig.authorName === siteConfig.name ? "Organization" : "Person",
      name: siteConfig.authorName,
      url: absoluteUrl("/sobre-mi")
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/brand/cadlab3d-mark.png")
    },
    articleSection: article.category,
    image: imageJsonLd,
    inLanguage: "es-ES"
  };
  const breadcrumbJsonLd = {
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
        name: "Blog",
        item: absoluteUrl("/blog")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: absoluteUrl(`/blog/${article.slug}`)
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd)} />
      <article className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: article.title }]} />
          <header className="mt-8 max-w-4xl border-l-2 border-orange-600 pl-5 sm:pl-7">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-900">{article.category} · {presentation.kind}</p>
            <h1 className="mt-4 text-balance font-display text-5xl font-black leading-[0.96] text-slate-950 sm:text-6xl">{article.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">{article.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">
              <span>Publicado el {formatDate(article.date)}</span>
              <span aria-hidden="true">·</span>
              <Link className="hover:text-blue-700" href="/sobre-mi">{visibleAuthor}</Link>
            </div>
            <div className="mt-5">
              <CopyLinkButton />
            </div>
          </header>
          {showPhoto && photo ? (
            <ArticlePhoto photo={photo} articleTitle={article.title} hero />
          ) : illustration ? (
            <>
              <aside className="mt-8 max-w-4xl border-y border-slate-300 py-4 text-sm leading-6 text-slate-600">
                <span className="font-bold text-slate-950">
                  {illustration.kind === "licensed-reference-media" ? "Referencia externa." : "Sin fotografía de proceso."}
                </span>{" "}
                {illustration.kind === "licensed-reference-media"
                  ? "La imagen siguiente ilustra el proceso o el fenómeno; no documenta una prueba realizada para este artículo."
                  : "La lámina siguiente es un esquema explicativo; no documenta una prueba realizada."}
              </aside>
              <ArticleIllustration illustration={illustration} articleTitle={article.title} hero />
            </>
          ) : (
            <aside className="mt-8 max-w-4xl border-y border-slate-300 py-4 text-sm leading-6 text-slate-600">
              <span className="font-bold text-slate-950">Sin fotografía de proceso.</span>{" "}
              Este texto es una explicación técnica; no se presenta una ilustración editorial como si fuera una prueba realizada.
            </aside>
          )}
        </div>
      </article>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,760px)_260px] lg:justify-between lg:gap-12 lg:px-8">
        <aside className="order-first content-start lg:order-last lg:sticky lg:top-28 lg:self-start">
          <TableOfContents headings={article.headings} />
        </aside>
        <div className="min-w-0 lg:order-first">
          <aside className="mb-10 border-l-2 border-blue-700 bg-blue-50/70 p-5 sm:p-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-800">{presentation.summaryLabel}</p>
            <p className="mt-3 text-lg font-bold leading-8 text-slate-950">{support.insight.takeaway}</p>
          </aside>

          <MarkdownContent content={article.content} />

          <AdSlot
            clientId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}
            slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_MID_SLOT}
          />
          {support.sources.length > 0 ? (
            <section className="mt-10 border-t-2 border-slate-950 pt-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-800">Referencias consultadas</p>
              <h2 className="mt-2 font-display text-3xl font-black text-slate-950">Documentación para comprobar y ampliar</h2>
              <ul className="mt-4 grid gap-4">
                {support.sources.map((source) => (
                  <li key={source.href} className="border-l-2 border-slate-300 pl-4">
                    <a className="font-bold text-blue-700 hover:text-blue-900" href={source.href} target="_blank" rel="noreferrer">
                      {source.name}
                    </a>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{source.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <section className="mt-10 border-y border-slate-300 bg-[#eef2f6] p-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-800">Quién escribe</p>
            <h2 className="mt-2 font-display text-2xl font-black text-slate-950">
              {siteConfig.authorName === siteConfig.name ? "Un cuaderno personal de aprendizaje" : siteConfig.authorName}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {editorialNote} Revisión editorial: {formatDate(article.updatedDate || article.date)}.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold">
              <Link className="text-blue-700 hover:text-blue-900" href="/sobre-mi">Sobre mí y el proyecto</Link>
              <Link className="text-blue-700 hover:text-blue-900" href="/fuentes">Fuentes técnicas</Link>
              <Link className="text-blue-700 hover:text-blue-900" href="/metodologia">Cómo preparo el contenido</Link>
            </div>
          </section>
          {relatedArticles.length > 0 ? (
            <nav aria-label="Lecturas relacionadas" className="mt-10 border-t-2 border-slate-950 pt-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-800">Para seguir</p>
              <h2 className="mt-2 font-display text-3xl font-black text-slate-950">Tres notas relacionadas</h2>
              <ol className="mt-4 grid gap-3">
                {relatedArticles.map((related, index) => (
                  <li key={related.slug} className="grid grid-cols-[28px_1fr] gap-3 border-t border-slate-200 pt-3">
                    <span className="font-mono text-[10px] text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                    <Link className="font-bold text-blue-700 hover:text-blue-900" href={`/blog/${related.slug}`}>
                      {related.title} →
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <AdSlot
            clientId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}
            slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_END_SLOT}
          />
        </div>
      </div>
    </>
  );
}
