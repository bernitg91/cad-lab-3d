import photoManifest from "@/content/article-photos.json";
import type { ArticlePhoto } from "@/types/article";

const articlePhotos = photoManifest as ArticlePhoto[];
const articlePhotosBySlug = new Map(
  articlePhotos.map((photo) => [photo.slug, photo])
);

export function getArticlePhoto(slug: string): ArticlePhoto {
  const photo = articlePhotosBySlug.get(slug);

  if (!photo) {
    throw new Error(`No article photo found for slug: ${slug}`);
  }

  return photo;
}

export function getAllArticlePhotos(): ArticlePhoto[] {
  return [...articlePhotos];
}
