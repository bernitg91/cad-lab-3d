import Image from "next/image";
import type { ArticlePhoto as ArticlePhotoData } from "@/types/article";

type ArticlePhotoProps = {
  photo: ArticlePhotoData;
  articleTitle?: string;
  hero?: boolean;
};

export function ArticlePhoto({ photo, articleTitle, hero = false }: ArticlePhotoProps) {
  const creditId = `photo-credit-${photo.slug}`;
  const isOwnPhysicalPhoto = !photo.openverseId && photo.originalUrl.includes("/images/impresion-3d-personalizada/");
  const sizes = hero
    ? "(min-width: 1280px) 1024px, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
    : "(min-width: 1024px) 760px, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)";

  return (
    <figure
      className={
        hero
          ? "mx-auto mt-10 max-w-5xl border-t-2 border-slate-950 pt-3"
          : "my-12 overflow-hidden border-t-2 border-slate-950 bg-white pt-3"
      }
      aria-describedby={creditId}
      data-photo-src={photo.image}
    >
      <div className="relative overflow-hidden border border-slate-300 bg-slate-950">
        <Image
          src={photo.image}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          preload={hero}
          fetchPriority={hero ? "high" : "auto"}
          className="max-h-[680px] w-full object-contain"
        />
        <span className="absolute left-0 top-0 bg-slate-950/90 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-cyan-200">
          {photo.openverseId ? "Fotografía de referencia" : isOwnPhysicalPhoto ? "Fotografía propia de la pieza" : "Ilustración editorial propia"}
          {articleTitle ? <span className="sr-only"> del artículo {articleTitle}</span> : null}
        </span>
        <span className="absolute bottom-0 right-0 bg-white/95 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-slate-800">
          {photo.licenseCode}
        </span>
      </div>

      <figcaption
        id={creditId}
        className="border-x border-b border-slate-200 bg-white px-5 py-4 text-left text-sm leading-6 text-slate-600 sm:px-6"
      >
        <p>{photo.caption}</p>
        <p className="mt-2 font-mono text-[10px] leading-5 text-slate-600">
          <span className="font-bold text-slate-900">“{photo.title}”</span>
          {" · "}Imagen de {" "}
          <a
            className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
            href={photo.creatorUrl}
            target="_blank"
            rel="noreferrer"
          >
            {photo.creator}
          </a>
          {" · "}
          <a
            className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
            href={photo.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            {photo.sourceName}
          </a>
          {" · "}
          <a
            className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
            href={photo.licenseUrl}
            target="_blank"
            rel="noreferrer"
          >
            {photo.licenseCode}
          </a>
          . {photo.changes}
        </p>
      </figcaption>
    </figure>
  );
}
