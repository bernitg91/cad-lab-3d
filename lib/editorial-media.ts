import media from "@/content/editorial-media.json";
import type { Visual } from "@/lib/visuals";

export const editorialMedia = media;
export function getEditorialVisual(key: string): Visual {
  const item = media.find(image => image.key === key);
  if (!item) throw new Error(`Falta la imagen editorial ${key}`);
  return { image: item.image, width: item.width, height: item.height, alt: item.alt, label: item.kind === "ai-concept" ? "Concepto ilustrado con IA" : "Fotografía o captura de referencia", credit: item.kind === "ai-concept" ? "CADLAB3D · Concepto de IA" : `${item.creator} · ${item.license}`, creditId: `media-${item.key}` };
}
