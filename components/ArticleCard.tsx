import Image from "next/image";
import Link from "next/link";
import { getCategoryGuidePath } from "@/lib/categories";
import { formatDate } from "@/lib/date";
import { getArticleIllustration } from "@/lib/article-illustrations";
import { getArticlePhoto, isDocumentaryArticlePhoto, isFirsthandArticlePhoto } from "@/lib/article-photos";
import type { ArticleMeta } from "@/types/article";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const photo = getArticlePhoto(article.slug);
  const showPhoto = isDocumentaryArticlePhoto(photo);
  const isFirsthandPhoto = isFirsthandArticlePhoto(photo);
  const illustration = getArticleIllustration(article.slug);
  const isEditorialRecreation = illustration?.kind === "original-diagram";
  const illustrationVisual = isEditorialRecreation
    ? { image: illustration.editorialImage, alt: illustration.editorialAlt }
    : illustration;
  const visual = showPhoto && photo ? photo : illustrationVisual;
  const isPhotographicVisual = showPhoto || isEditorialRecreation;
  const visualLabel = isFirsthandPhoto
    ? "Foto propia"
    : showPhoto
      ? "Foto con licencia"
      : illustration?.kind === "licensed-reference-media"
        ? "Referencia con licencia"
        : isEditorialRecreation
          ? "Recreación editorial"
          : undefined;

  return (
    <article className="group flex h-full flex-col border-t-2 border-slate-950 bg-white py-5">
      <div className={`flex flex-1 gap-5 ${visual ? "items-start" : ""}`}>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-teal-800">
            <Link href={getCategoryGuidePath(article.categorySlug)} className="hover:text-teal-950">
              {article.category}
            </Link>
            {visualLabel ? <span className="text-orange-700">{visualLabel}</span> : null}
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
        {visual ? (
          <Link
            href={`/blog/${article.slug}`}
            aria-label={`Leer ${article.title}`}
            className={`relative hidden shrink-0 overflow-hidden sm:block ${
              isPhotographicVisual
                ? isEditorialRecreation
                  ? "aspect-video w-40 border border-slate-200 bg-slate-100"
                  : "aspect-square w-28 bg-slate-100"
                : "aspect-video w-40 border border-slate-200 bg-slate-950"
            }`}
          >
            <Image
              src={visual.image}
              alt={visual.alt}
              fill
              sizes={showPhoto && !isEditorialRecreation ? "112px" : "160px"}
              unoptimized={visual.image.endsWith(".svg")}
              className={`${isPhotographicVisual ? "object-cover" : "object-contain"} transition duration-300 group-hover:scale-[1.03]`}
            />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
