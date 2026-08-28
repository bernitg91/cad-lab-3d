import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticlePhoto } from "@/components/ArticlePhoto";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { ExploreMore } from "@/components/Newsletter";
import { RecommendedResources } from "@/components/RecommendedResources";
import { TableOfContents } from "@/components/TableOfContents";
import { formatDate, getAllArticleSlugs, getArchivedArticleRedirect, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { getArticleSupport } from "@/lib/article-support";
import { getArticlePhoto } from "@/lib/article-photos";
import { MarkdownContent } from "@/lib/markdown";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    type: "article",
    publishedTime: article.date,
    authors: [siteConfig.authorName],
    image: photo.image,
    imageAlt: photo.alt
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
    image: [
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
    ],
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
      <article className="technical-grid border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: article.title }]} />
          <header className="mx-auto mt-8 max-w-4xl text-center">
            <p className="inline-flex border-y border-teal-300 px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-900">{article.category}</p>
            <h1 className="mx-auto mt-6 text-balance font-display text-5xl font-black leading-[0.95] text-slate-950 sm:text-6xl lg:text-7xl">{article.title}</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">{article.description}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">
              <span>{formatDate(article.date)}</span>
              {article.updatedDate ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Actualizado el {formatDate(article.updatedDate)}</span>
                </>
              ) : null}
              <span aria-hidden="true">·</span>
              <Link className="hover:text-blue-700" href="/sobre-mi">{siteConfig.authorName}</Link>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
            <div className="mt-6 flex justify-center">
              <CopyLinkButton />
            </div>
          </header>
          <ArticlePhoto photo={photo} articleTitle={article.title} hero />
        </div>
      </article>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,760px)_300px] lg:justify-center lg:gap-10 lg:px-8">
        <aside className="order-first grid content-start gap-5 lg:order-last lg:sticky lg:top-28 lg:self-start">
          <TableOfContents headings={article.headings} />
          <div className="hidden lg:block"><RecommendedResources categorySlug={article.categorySlug} /></div>
        </aside>
        <div className="min-w-0 lg:order-first">
          <aside className="mb-10 border-l-4 border-blue-700 bg-blue-50 p-6 sm:p-7">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-800">La respuesta corta</p>
            <p className="mt-3 text-lg font-bold leading-8 text-slate-950">{support.insight.takeaway}</p>
          </aside>

          <MarkdownContent content={article.content} />

          <AdSlot
            clientId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}
            slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_MID_SLOT}
          />

          <section className="mt-10 border border-teal-200 bg-teal-50/70 p-6 sm:p-7">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-800">Nota de taller</p>
            <h2 className="mt-2 font-display text-3xl font-black leading-none text-slate-950">Cómo llevarlo a una pieza real</h2>
            <p className="mt-4 leading-7 text-slate-700">{support.insight.fieldNote}</p>
            <ul className="mt-5 grid gap-3">
              {support.insight.checks.map((check, index) => (
                <li key={check} className="flex gap-3 rounded-lg border border-teal-100 bg-white/80 p-4 text-sm font-semibold leading-6 text-slate-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-teal-700 font-mono text-xs font-black text-white">{index + 1}</span>
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </section>
          <AdSlot
            clientId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}
            slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_END_SLOT}
          />
          {support.sources.length > 0 ? (
            <section className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-black uppercase tracking-wide text-teal-700">Referencias consultadas</p>
              <h2 className="mt-2 text-xl font-black text-slate-950">Documentación para comprobar y ampliar</h2>
              <ul className="mt-4 grid gap-4">
                {support.sources.map((source) => (
                  <li key={source.href} className="border-l-4 border-slate-200 pl-4">
                    <a className="font-bold text-blue-700 hover:text-blue-900" href={source.href} target="_blank" rel="noreferrer">
                      {source.name}
                    </a>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{source.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {relatedArticles.length > 0 ? (
            <nav aria-label="Lecturas relacionadas" className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-black uppercase tracking-wide text-teal-700">Continúa la ruta</p>
              <h2 className="mt-2 text-xl font-black text-slate-950">Artículos que amplían esta decisión</h2>
              <ul className="mt-4 grid gap-3">
                {relatedArticles.map((related) => (
                  <li key={related.slug}>
                    <Link className="font-bold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:text-blue-900" href={`/blog/${related.slug}`}>
                      {related.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <section className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Autoría y revisión</p>
            <h2 className="mt-2 text-xl font-black text-slate-950">{siteConfig.authorName}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Responsable editorial de esta guía sobre {article.category.toLowerCase()}. Revisión material: {formatDate(article.updatedDate || article.date)}. Las referencias específicas y los límites de la explicación se muestran en la propia página.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold">
              <Link className="text-blue-700 hover:text-blue-900" href="/sobre-mi">Sobre el proyecto</Link>
              <Link className="text-blue-700 hover:text-blue-900" href="/fuentes">Fuentes técnicas</Link>
              <Link className="text-blue-700 hover:text-blue-900" href="/metodologia">Metodología editorial</Link>
            </div>
          </section>
          <div className="mt-10">
            <ExploreMore />
          </div>
        </div>
      </div>

      {relatedArticles.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-black uppercase leading-none text-slate-950">Artículos relacionados</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.slug} article={related} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
