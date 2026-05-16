import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AffiliateBox } from "@/components/AffiliateBox";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { Newsletter } from "@/components/Newsletter";
import { RecommendedResources } from "@/components/RecommendedResources";
import { TableOfContents } from "@/components/TableOfContents";
import { formatDate, getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
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
  if (!article) return {};

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    type: "article",
    publishedTime: article.date,
    authors: [article.author]
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = getRelatedArticles(article);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/")
    },
    articleSection: article.category,
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
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: article.title }]} />
          <div className="mt-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">{article.category}</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">{article.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{article.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
              <span>{formatDate(article.date)}</span>
              <span aria-hidden="true">·</span>
              <span>{article.author}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
            <div className="mt-6">
              <CopyLinkButton />
            </div>
          </div>
        </div>
      </article>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div>
          <MarkdownContent content={article.content} />
          <div className="mt-10">
            <Newsletter />
          </div>
        </div>
        <div className="grid content-start gap-5 lg:sticky lg:top-24">
          <TableOfContents headings={article.headings} />
          <AdPlaceholder />
          <RecommendedResources />
          <AffiliateBox />
        </div>
      </div>

      {relatedArticles.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-950">Artículos relacionados</h2>
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
