import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/site";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Editorial revision dates, never the current build time.
  const revisedPages: Record<string, string> = {
    "": "2026-09-09",
    "/blog": "2026-09-09",
    "/laboratorio-tolerancias-fdm": "2026-09-09",
    "/recursos": "2026-09-09",
    "/calculadora-precio-impresion-3d": "2026-09-09",
    "/calculadora-peso-pieza-3d": "2026-09-09",
    "/selector-material-impresion-3d": "2026-09-09",
    "/casos-practicos-impresion-3d": "2026-09-09",
    "/impresion-3d-personalizada": "2026-09-09",
    "/licencias-imagenes": "2026-09-09",
    "/sobre-mi": "2026-09-09",
    "/contacto": "2026-09-09",
    "/aviso-legal": "2026-09-09",
    "/politica-privacidad": "2026-09-09",
    "/politica-cookies": "2026-09-09"
  };
  const staticPages = [
    "",
    "/blog",
    "/recursos",
    "/laboratorio-tolerancias-fdm",
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
    "/metodologia",
    "/fuentes",
    "/licencias-imagenes",
    "/preguntas-frecuentes",
    "/contacto",
    "/politica-privacidad",
    "/politica-cookies",
    "/aviso-legal"
  ];

  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page || "/"),
      ...(revisedPages[page] ? { lastModified: new Date(revisedPages[page]) } : {})
    })),
    ...getAllArticles().map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified: new Date(article.updatedDate || article.date)
    }))
  ];
}
