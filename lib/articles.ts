import fs from "node:fs";
import path from "node:path";
import type { Article, ArticleMeta } from "@/types/article";
export { formatDate } from "@/lib/date";

const articlesDirectory = path.join(process.cwd(), "content/articles");

const archivedArticleRedirects: Record<string, string> = {};

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
  return getArticleFiles();
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
  const candidates = getAllArticles().filter((candidate) => candidate.slug !== article.slug);
  const sameCategory = candidates.filter((candidate) => candidate.categorySlug === article.categorySlug);
  const otherCategories = candidates.filter((candidate) => candidate.categorySlug !== article.categorySlug);

  return [...sameCategory, ...otherCategories].slice(0, 3);
}
