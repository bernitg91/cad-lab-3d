import Image from "next/image";
import Link from "next/link";
import { getCategoryGuidePath } from "@/lib/categories";
import { formatDate } from "@/lib/date";
import { getArticleSupport } from "@/lib/article-support";
import type { ArticleMeta } from "@/types/article";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const support = getArticleSupport(article.slug);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg">
      <Link href={`/blog/${article.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-slate-100">
        <Image
          src={support.evidence.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
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
      </div>
    </article>
  );
}
