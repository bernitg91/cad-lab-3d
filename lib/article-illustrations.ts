import illustrationManifest from "@/content/article-illustrations.json";
import type { ArticleIllustration } from "@/types/article";

const articleIllustrations = illustrationManifest as unknown as ArticleIllustration[];
const illustrationsBySlug = new Map(
  articleIllustrations.map((illustration) => [illustration.slug, illustration])
);

export function getArticleIllustration(slug: string): ArticleIllustration | undefined {
  return illustrationsBySlug.get(slug);
}

export function getAllArticleIllustrations(): ArticleIllustration[] {
  return articleIllustrations;
}

export function isOriginalArticleDiagram(illustration: ArticleIllustration): boolean {
  return illustration.kind === "original-diagram";
}

export function isLicensedReferenceMedia(illustration: ArticleIllustration): boolean {
  return illustration.kind === "licensed-reference-media";
}
