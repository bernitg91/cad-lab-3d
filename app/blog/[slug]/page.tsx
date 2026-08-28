import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { ArticlePhoto } from "@/components/ArticlePhoto";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { TableOfContents } from "@/components/TableOfContents";
import { formatDate, getAllArticleSlugs, getArchivedArticleRedirect, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { getArticleSupport } from "@/lib/article-support";
import { getArticlePhoto, isDocumentaryArticlePhoto } from "@/lib/article-photos";
import { MarkdownContent } from "@/lib/markdown";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

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
  const showPhoto = isDocumentaryArticlePhoto(photo);

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    type: "article",
    publishedTime: article.date,
    authors: [siteConfig.authorName],
    image: showPhoto ? photo.image : undefined,
    imageAlt: showPhoto ? photo.alt : undefined
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
  const presentation = getArticlePresentation(article.title);
  const photoCreatorType = photo.licenseCode === "Contenido propio" || photo.creator === "USDAgov" || photo.sourceName === "NASA"
    ? "Organization"
    : "Person";
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
    image: showPhoto ? [
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
    ] : undefined,
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
              <Link className="hover:text-blue-700" href="/sobre-mi">Cuaderno de un estudiante de Diseño Industrial</Link>
            </div>
            <div className="mt-5">
              <CopyLinkButton />
            </div>
          </header>
          {showPhoto ? (
            <ArticlePhoto photo={photo} articleTitle={article.title} hero />
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
            <h2 className="mt-2 font-display text-2xl font-black text-slate-950">Un cuaderno personal de aprendizaje</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              He preparado este texto para ordenar una decisión concreta sobre {article.category.toLowerCase()}. La revisión del {formatDate(article.updatedDate || article.date)} comprueba enlaces, límites y coherencia; no acredita pruebas que no aparezcan documentadas en la página.
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
