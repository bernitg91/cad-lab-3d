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
    "/calculadora-precio-impresion-3d",
    "/calculadora-peso-pieza-3d",
    "/selector-material-impresion-3d",
    "/checklist-impresion-3d",
    "/guia-impresion-3d-fdm",
    "/casos-practicos-impresion-3d",
    "/glosario",
    "/preguntas-frecuentes",
    "/metodologia",
    "/servicios",
    "/impresion-3d-personalizada",
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
