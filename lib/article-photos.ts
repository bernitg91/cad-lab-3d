import photoManifest from "@/content/article-photos.json";
import type { ArticlePhoto } from "@/types/article";

const articlePhotos = photoManifest as ArticlePhoto[];
const articlePhotosBySlug = new Map(
  articlePhotos.map((photo) => [photo.slug, photo])
);

export function getArticlePhoto(slug: string): ArticlePhoto | undefined {
  return articlePhotosBySlug.get(slug);
}

export function getAllArticlePhotos(): ArticlePhoto[] {
  return [...articlePhotos];
}

export function isFirsthandArticlePhoto(photo: ArticlePhoto | undefined): photo is ArticlePhoto {
  return Boolean(
    photo &&
    !photo.openverseId &&
    photo.originalUrl.includes("/images/impresion-3d-personalizada/")
  );
}

export function isDocumentaryArticlePhoto(photo: ArticlePhoto | undefined): photo is ArticlePhoto {
  return Boolean(photo?.openverseId) || isFirsthandArticlePhoto(photo);
}
