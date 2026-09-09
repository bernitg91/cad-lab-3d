import { topicGuides } from "@/lib/topic-guides";
import { siteConfig } from "@/lib/site";
import type { ArticleMeta } from "@/types/article";

export const guideArticles: ArticleMeta[] = [
  ...topicGuides.map((guide): ArticleMeta => ({
    title: guide.title, slug: guide.slug, href: "/" + guide.slug,
    description: guide.description, category: guide.category,
    categorySlug: ["programas-modelado-3d", "keyshot-vs-blender-renderizado"].includes(guide.slug) ? "diseno-industrial" : "impresion-3d",
    date: "2026-09-09", author: siteConfig.authorName,
    readingTime: Math.max(1, Math.ceil(JSON.stringify(guide.sections).split(/\s+/).length / 200)) + " min",
    editorialMedia: guide.heroMedia,
    goals: guide.slug === "keyshot-vs-blender-renderizado" ? ["comparar", "renderizar"] : guide.slug === "programas-modelado-3d" ? ["comparar", "disenar", "empezar"] : ["comparar", "empezar"]
  })),
  { title: "Qué vender con impresión 3D: ocho ideas y cómo validarlas", slug: "que-vender-impresion-3d", href: "/que-vender-impresion-3d", description: "Organizadores, rótulos, soportes, decoración y prototipos: identifica un comprador, prepara una muestra y calcula el coste completo antes de vender.", category: "Productos y costes", categorySlug: "recursos", date: "2026-09-09", author: siteConfig.authorName, readingTime: "8 min", editorialMedia: "drawer-organizers", goals: ["vender", "disenar"] }
];
