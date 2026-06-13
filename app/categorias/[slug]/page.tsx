import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { absoluteUrl } from "@/lib/site";
import { categories, getCategory, getCategoryGuidePath } from "@/lib/categories";

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
    title: category.name,
    description: category.description,
    robots: { index: false, follow: true },
    alternates: { canonical: absoluteUrl(getCategoryGuidePath(category.slug)) }
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  permanentRedirect(getCategoryGuidePath(category.slug));
}
