import type { MetadataRoute } from "next";
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
    "/guia-cad-parametrico",
    "/guia-materiales-fdm",
    "/guia-simulacion-fem",
    "/guia-documentacion-tecnica",
    "/casos-practicos-impresion-3d",
    "/glosario",
    "/servicios",
    "/impresion-3d-personalizada",
    "/guias",
    "/sobre-mi",
    "/fuentes",
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
    ...getAllArticles().map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified: new Date(article.date)
    }))
  ];
}
