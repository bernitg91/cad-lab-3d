import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getAllArticles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/blog",
    "/categorias",
    "/recursos",
    "/servicios",
    "/herramientas-recomendadas",
    "/guias",
    "/sobre-mi",
    "/contacto",
    "/politica-privacidad",
    "/politica-cookies",
    "/aviso-legal"
  ];

  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page || "/"),
      lastModified: new Date()
    })),
    ...categories.map((category) => ({
      url: absoluteUrl(`/categorias/${category.slug}`),
      lastModified: new Date()
    })),
    ...getAllArticles().map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified: new Date(article.date)
    }))
  ];
}
