import fs from "node:fs";
import path from "node:path";
import type { Article, ArticleMeta } from "@/types/article";
export { formatDate } from "@/lib/date";

const articlesDirectory = path.join(process.cwd(), "content/articles");

const publicArticleSlugs = new Set([
  "calibrar-impresora-3d-piezas-funcionales",
  "como-empezar-creo-parametric-desde-cero",
  "diferencias-pla-petg-abs-nylon",
  "documentar-analisis-fem-basico",
  "documentar-proyecto-diseno-industrial",
  "elegir-filamento-piezas-funcionales",
  "errores-diseno-piezas-impresion-3d",
  "orientar-pieza-impresion-3d-resistente",
  "preparar-archivo-stl-impresion-3d",
  "preparar-informe-tecnico-universitario",
  "que-es-analisis-fem-cuando-usarlo",
  "renders-tecnicos-portfolio",
  "solidworks-vs-creo-estudiantes",
  "tolerancias-piezas-impresas-3d"
]);

const archivedArticleRedirects: Record<string, string> = {
  "calcular-costes-pieza-impresa-3d": "/calculadora-precio-impresion-3d",
  "calcular-peso-aproximado-pieza-3d": "/calculadora-peso-pieza-3d",
  "checklist-mandar-pieza-imprimir-3d": "/checklist-impresion-3d",
  "checklist-portfolio-diseno-industrial": "/guia-documentacion-tecnica",
  "crear-portfolio-tecnico-diseno-industrial": "/guia-documentacion-tecnica",
  "disenar-encajes-clips-impresion-3d": "/guia-impresion-3d-fdm",
  "disenar-pieza-resistente-fdm": "/guia-impresion-3d-fdm",
  "disenar-piezas-desmontables-reparables": "/guia-documentacion-tecnica",
  "errores-exportar-archivos-cad": "/guia-cad-parametrico",
  "espesores-minimos-piezas-plastico": "/guia-materiales-fdm",
  "estructurar-memoria-tecnica-diseno-industrial": "/guia-documentacion-tecnica",
  "evitar-warping-impresion-3d": "/guia-impresion-3d-fdm",
  "explicar-decisiones-diseno-memoria": "/guia-documentacion-tecnica",
  "ficha-tecnica-producto": "/guia-documentacion-tecnica",
  "material-carcasa-impresa-3d": "/guia-materiales-fdm",
  "materiales-prototipos-funcionales": "/guia-materiales-fdm",
  "modelado-parametrico-vs-directo": "/guia-cad-parametrico",
  "optimizar-pieza-reducir-material-peso": "/guia-cad-parametrico",
  "paredes-perimetros-tapas-fdm": "/guia-impresion-3d-fdm",
  "preparar-archivo-step-compartir-cad": "/guia-cad-parametrico",
  "preparar-planos-tecnicos-modelo-cad": "/guia-documentacion-tecnica",
  "presentar-proyecto-cad-entrevista-practicas": "/guia-documentacion-tecnica",
  "prototipo-visual-vs-funcional": "/guia-documentacion-tecnica",
  "pruebas-tolerancia-fdm": "/blog/tolerancias-piezas-impresas-3d",
  "relleno-impresion-3d-segun-pieza": "/guia-impresion-3d-fdm",
  "renders-limpios-proyecto-universitario": "/blog/renders-tecnicos-portfolio",
  "revision-diseno-antes-fabricar": "/guia-documentacion-tecnica",
  "simplificar-geometria-antes-fem": "/guia-simulacion-fem"
};

function parseFrontmatter(fileContent: string) {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    throw new Error("Article is missing frontmatter");
  }

  const frontmatter = match[1].split("\n").reduce<Record<string, string | boolean>>((data, line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return data;
    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();
    data[key] =
      rawValue === "true" ? true : rawValue === "false" ? false : rawValue.replace(/^["']|["']$/g, "");
    return data;
  }, {});

  return {
    meta: frontmatter as unknown as ArticleMeta,
    content: match[2].trim()
  };
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function getArticleFiles(): Article[] {
  const files = fs.readdirSync(articlesDirectory).filter((file) => file.endsWith(".md"));

  return files
    .map((file) => {
      const fileContent = fs.readFileSync(path.join(articlesDirectory, file), "utf8");
      const { meta, content } = parseFrontmatter(fileContent);
      const headings = Array.from(content.matchAll(/^(##|###)\s+(.+)$/gm)).map((heading) => ({
        id: slugifyHeading(heading[2]),
        text: heading[2],
        level: heading[1] === "##" ? 2 : 3
      })) as Article["headings"];

      return {
        ...meta,
        content,
        headings
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllArticles(): Article[] {
  return getArticleFiles().filter((article) => publicArticleSlugs.has(article.slug));
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getArchivedArticleRedirect(slug: string) {
  return archivedArticleRedirects[slug];
}

export function getFeaturedArticles() {
  return getAllArticles().filter((article) => article.featured).slice(0, 4);
}

export function getRelatedArticles(article: Article) {
  return getAllArticles()
    .filter((candidate) => candidate.categorySlug === article.categorySlug && candidate.slug !== article.slug)
    .slice(0, 3);
}
