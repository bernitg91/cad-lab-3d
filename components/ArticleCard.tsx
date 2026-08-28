import Link from "next/link";
import { getCategoryGuidePath } from "@/lib/categories";
import { formatDate } from "@/lib/date";
import { getArticleIllustration } from "@/lib/article-illustrations";
import { getArticlePhoto, isDocumentaryArticlePhoto } from "@/lib/article-photos";
import type { ArticleMeta } from "@/types/article";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const photo = getArticlePhoto(article.slug);
  const showPhoto = isDocumentaryArticlePhoto(photo);
  const illustration = getArticleIllustration(article.slug);
  const visualLabel = showPhoto
    ? "Foto exclusiva en el artículo"
    : illustration?.kind === "original-diagram"
      ? "Recreación exclusiva en el artículo"
      : illustration?.kind === "licensed-reference-media"
        ? "Referencia exclusiva en el artículo"
        : undefined;

  return (
    <article className="group relative flex h-full flex-col border-t-2 border-slate-950 bg-white py-5 pl-5 pr-1">
      <span className="absolute left-0 top-5 h-12 w-1 bg-teal-600" aria-hidden="true" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
          <Link href={getCategoryGuidePath(article.categorySlug)} className="text-teal-800 hover:text-teal-950">
            {article.category}
          </Link>
          {visualLabel ? (
            <span className="border-l border-orange-400 pl-3 text-orange-700">{visualLabel}</span>
          ) : null}
        </div>
        <h2 className="mt-3 font-display text-[1.85rem] font-black leading-[1.03] text-slate-950">
          <Link href={`/blog/${article.slug}`} className="group-hover:text-blue-700">
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{article.description}</p>
        <div className="mt-5 flex items-end justify-between gap-4 border-t border-slate-200 pt-3">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-500">
            Publicado el {formatDate(article.date)}
          </span>
          <Link className="shrink-0 text-sm font-black text-blue-700 hover:text-blue-900" href={`/blog/${article.slug}`}>
            Abrir nota →
          </Link>
        </div>
      </div>
    </article>
  );
}
