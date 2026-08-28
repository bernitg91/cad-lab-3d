import Image from "next/image";
import Link from "next/link";
import { getCategoryGuidePath } from "@/lib/categories";
import { formatDate } from "@/lib/date";
import { getArticlePhoto, isFirsthandArticlePhoto } from "@/lib/article-photos";
import type { ArticleMeta } from "@/types/article";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const photo = getArticlePhoto(article.slug);
  const showPhoto = isFirsthandArticlePhoto(photo);

  return (
    <article className="group flex h-full flex-col border-t-2 border-slate-950 bg-white py-5">
      <div className={`flex flex-1 gap-5 ${showPhoto ? "items-start" : ""}`}>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-teal-800">
            <Link href={getCategoryGuidePath(article.categorySlug)} className="hover:text-teal-950">
              {article.category}
            </Link>
            {showPhoto ? <span className="text-orange-700">Foto propia</span> : null}
          </div>
          <h2 className="mt-3 font-display text-[1.85rem] font-black leading-[1.03] text-slate-950">
            <Link href={`/blog/${article.slug}`} className="group-hover:text-blue-700">
              {article.title}
            </Link>
          </h2>
          <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{article.description}</p>
          <div className="mt-5 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Publicado el {formatDate(article.date)}</span>
            <Link className="text-blue-700 hover:text-blue-900" href={`/blog/${article.slug}`}>
              Leer →
            </Link>
          </div>
        </div>
        {showPhoto ? (
          <Link href={`/blog/${article.slug}`} aria-label={`Leer ${article.title}`} className="relative hidden aspect-square w-28 shrink-0 overflow-hidden bg-slate-100 sm:block">
            <Image
              src={photo.image}
              alt={photo.alt}
              fill
              sizes="112px"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
            />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
