import { getArticleIllustration } from "@/lib/article-illustrations";
import { getAllArticlePhotos, getArticlePhoto, isFirsthandArticlePhoto } from "@/lib/article-photos";
import previews from "@/content/image-previews.json";

export type Visual = { image: string; width: number; height: number; alt: string; label: string; credit: string; creditId: string };

export function getArticleVisual(slug: string): Visual | undefined {
  const photo = getArticlePhoto(slug);
  if (photo) return { ...photo, label: isFirsthandArticlePhoto(photo) ? "Fotografía propia" : "Fotografía de referencia", credit: `${photo.creator} · ${photo.licenseCode}`, creditId: `credito-${slug}` };
  const illustration = getArticleIllustration(slug);
  if (!illustration) return undefined;
  const preview = previews.find(item => item.source === illustration.image);
  return { ...illustration, ...preview, label: illustration.kind === "original-diagram" ? "Esquema técnico original" : "Referencia con licencia", credit: illustration.kind === "original-diagram" ? "CADLAB3D · Esquema original" : `${illustration.creator} · ${illustration.licenseCode}`, creditId: `credito-${slug}` };
}

export function getPortfolioVisual(image: string, alt: string): Visual {
  const photo = getAllArticlePhotos().find(item => new URL(item.originalUrl).pathname === image);
  const preview = previews.find(item => item.source === image);
  if (photo) return { ...photo, alt, label: "Fotografía propia", credit: "CADLAB3D · Archivo de piezas", creditId: "archivo-propio" };
  if (!preview) throw new Error(`Falta una versión optimizada de ${image}`);
  return { ...preview, alt, label: "Fotografía propia", credit: "CADLAB3D · Archivo de piezas", creditId: "archivo-propio" };
}
