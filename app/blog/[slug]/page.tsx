import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { ExploreMore } from "@/components/Newsletter";
import { RecommendedResources } from "@/components/RecommendedResources";
import { TableOfContents } from "@/components/TableOfContents";
import { formatDate, getAllArticles, getArchivedArticleRedirect, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { getArticleSupport } from "@/lib/article-support";
import { MarkdownContent } from "@/lib/markdown";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
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
  const support = getArticleSupport(article.slug);

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    type: "article",
    publishedTime: article.date,
    authors: [article.author],
    image: support.evidence?.image
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
  const contentSections = article.content.split(/(?=^##\s)/m);
  const contentPivot = Math.max(1, Math.ceil(contentSections.length / 2));
  const firstContent = contentSections.slice(0, contentPivot).join("").trim();
  const secondContent = contentSections.slice(contentPivot).join("").trim();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updatedDate || article.date,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/sobre-mi")
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/brand/cadlab3d-mark.png")
    },
    articleSection: article.category,
    ...(support.evidence ? { image: absoluteUrl(support.evidence.image) } : {}),
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
              <Link className="hover:text-blue-700" href="/sobre-mi">{article.author}</Link>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
            <div className="mt-6 flex justify-center">
              <CopyLinkButton />
            </div>
          </header>
          <figure className="calibration-rail mx-auto mt-10 max-w-5xl pl-4">
            <div className="image-scanline relative aspect-[4/3] overflow-hidden border border-slate-300 bg-slate-100 shadow-xl shadow-slate-950/10 sm:aspect-[16/9]">
              <Image
                src={support.evidence.image}
                alt={support.evidence.alt}
                fill
                priority
                sizes="(min-width: 1280px) 1024px, (min-width: 768px) 90vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="border-x border-b border-slate-200 bg-white px-5 py-4 text-left text-sm leading-6 text-slate-600 sm:px-7">
              {support.evidence.caption}
            </figcaption>
            <div className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-slate-400"><span>Vista principal</span><span>Ref. {article.slug.slice(0, 18)}</span></div>
          </figure>
        </div>
      </article>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,760px)_300px] lg:justify-center lg:gap-10 lg:px-8">
        <aside className="order-first grid content-start gap-5 lg:order-last lg:sticky lg:top-28 lg:self-start">
          <TableOfContents headings={article.headings} />
          <div className="hidden lg:block"><RecommendedResources /></div>
        </aside>
        <div className="min-w-0 lg:order-first">
          <aside className="mb-10 border-l-4 border-blue-700 bg-blue-50 p-6 sm:p-7">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-800">La respuesta corta</p>
            <p className="mt-3 text-lg font-bold leading-8 text-slate-950">{support.insight.takeaway}</p>
          </aside>

          <MarkdownContent content={firstContent} />

          <AdSlot
            clientId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}
            slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_MID_SLOT}
          />

          <figure className="my-10 overflow-hidden border border-slate-200 bg-white shadow-lg shadow-slate-950/5">
            <div className="relative aspect-[4/3] bg-slate-100 sm:aspect-[16/9]">
              <Image
                src={support.inlineEvidence.image}
                alt={support.inlineEvidence.alt}
                fill
                sizes="(min-width: 1024px) 820px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600">
              {support.inlineEvidence.caption}
            </figcaption>
          </figure>

          {secondContent ? <MarkdownContent content={secondContent} /> : null}

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
            <h2 className="mt-2 text-xl font-black text-slate-950">Contenido preparado por CAD Lab 3D</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Esta guía se apoya en práctica con CAD e impresión FDM, documentación técnica y fuentes oficiales. Los valores de tolerancia, temperatura o resistencia son orientativos y deben validarse con la impresora, el material y la geometría reales.
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
