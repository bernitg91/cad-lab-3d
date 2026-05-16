import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { categories, getCategory } from "@/lib/categories";
import { getAllArticles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    ...createPageMetadata({
      title: category.name,
      description: category.description,
      path: `/categorias/${category.slug}`
    })
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const articles = getAllArticles().filter((article) => article.categorySlug === category.slug);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Categorías", href: "/categorias" }, { label: category.name }]} />
      <h1 className="mt-6 text-4xl font-black text-slate-950">{category.name}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{category.description}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
