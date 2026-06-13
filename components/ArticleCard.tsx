import Link from "next/link";
import { getCategoryGuidePath } from "@/lib/categories";
import { formatDate } from "@/lib/date";
import type { ArticleMeta } from "@/types/article";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-teal-700">
        <Link href={getCategoryGuidePath(article.categorySlug)} className="rounded bg-teal-50 px-2.5 py-1">
          {article.category}
        </Link>
        <span className="text-slate-400">{article.readingTime}</span>
      </div>
      <h2 className="mt-4 text-xl font-black leading-tight text-slate-950">
        <Link href={`/blog/${article.slug}`} className="group-hover:text-blue-700">
          {article.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{article.description}</p>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
        <span>{formatDate(article.date)}</span>
        <Link className="text-blue-700 hover:text-blue-900" href={`/blog/${article.slug}`}>
          Leer artículo
        </Link>
      </div>
    </article>
  );
}
