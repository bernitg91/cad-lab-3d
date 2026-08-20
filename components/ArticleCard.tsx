import Image from "next/image";
import Link from "next/link";
import { getCategoryGuidePath } from "@/lib/categories";
import { formatDate } from "@/lib/date";
import { getArticlePhoto } from "@/lib/article-photos";
import type { ArticleMeta } from "@/types/article";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const photo = getArticlePhoto(article.slug);

  return (
    <article className="lift-on-hover group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-xl hover:shadow-slate-950/10">
      <Link href={`/blog/${article.slug}`} aria-label={`Leer ${article.title}`} className="image-scanline relative block aspect-[16/9] overflow-hidden bg-slate-100">
        <Image
          src={photo.image}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-3 pb-2 pt-8 text-right font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white/90">
          {photo.creator} · {photo.licenseCode}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-teal-800">
          <Link href={getCategoryGuidePath(article.categorySlug)} className="rounded bg-teal-50 px-2.5 py-1.5">
            {article.category}
          </Link>
          <span className="text-slate-600">{article.readingTime}</span>
        </div>
        <h2 className="mt-4 font-display text-[1.7rem] font-black leading-[1.05] text-slate-950">
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
