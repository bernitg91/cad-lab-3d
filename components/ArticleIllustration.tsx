import Image from "next/image";
import type { ArticleIllustration as ArticleIllustrationData } from "@/types/article";

type ArticleIllustrationProps = {
  illustration: ArticleIllustrationData;
  articleTitle?: string;
  hero?: boolean;
};

export function ArticleIllustration({ illustration, articleTitle, hero = false }: ArticleIllustrationProps) {
  const wrapperClass = hero
    ? "mx-auto mt-8 max-w-5xl border-t-2 border-slate-950 pt-3"
    : "my-12 border-t-2 border-slate-950 pt-3";
  const sizes = hero
    ? "(min-width: 1280px) 1024px, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
    : "(min-width: 1024px) 760px, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)";

  if (illustration.kind === "licensed-reference-media") {
    const captionId = `illustration-caption-${illustration.slug}`;
    const referenceLabel = illustration.method.startsWith("Figura")
      ? "Figura científica de referencia"
      : "Fotografía de referencia";

    return (
      <figure className={wrapperClass} aria-describedby={captionId} data-illustration-src={illustration.image}>
        <div className="overflow-hidden border border-slate-300 bg-slate-950">
          <div className="flex min-h-9 items-center justify-between gap-3 bg-slate-950 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.13em]">
            <span className="text-cyan-200">
              {referenceLabel}
              {articleTitle ? <span className="sr-only"> del artículo {articleTitle}</span> : null}
            </span>
            <span className="shrink-0 border-l border-slate-700 pl-3 text-slate-300">{illustration.licenseCode}</span>
          </div>
          <Image
            src={illustration.image}
            alt={illustration.alt}
            width={illustration.width}
            height={illustration.height}
            sizes={sizes}
            preload={hero}
            fetchPriority={hero ? "high" : "auto"}
            className="max-h-[680px] w-full object-contain"
          />
        </div>
        <figcaption id={captionId} className="border-x border-b border-slate-200 bg-white px-5 py-4 text-left text-sm leading-6 text-slate-600 sm:px-6">
          <p><span className="font-bold text-slate-950">{illustration.title}.</span> {illustration.caption}</p>
          <p className="mt-2 font-mono text-[10px] leading-5 text-slate-600">
            Imagen de{" "}
            <a className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href={illustration.creatorUrl} target="_blank" rel="noreferrer">{illustration.creator}</a>
            {" · "}
            <a className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href={illustration.sourceUrl} target="_blank" rel="noreferrer">{illustration.sourceName}</a>
            {" · "}
            <a className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href={illustration.licenseUrl} target="_blank" rel="noreferrer">{illustration.licenseCode}</a>
            . {illustration.changes}
          </p>
        </figcaption>
      </figure>
    );
  }

  const editorialCaptionId = `editorial-caption-${illustration.slug}`;
  const technicalCaptionId = `technical-caption-${illustration.slug}`;

  return (
    <section
      className={wrapperClass}
      data-illustration-src={illustration.editorialImage}
      data-technical-illustration-src={illustration.image}
    >
      <figure aria-describedby={editorialCaptionId}>
        <div className="overflow-hidden border border-slate-300 bg-[#e9e4da]">
          <div className="flex min-h-9 items-center justify-between gap-3 bg-slate-950 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.13em]">
            <span className="text-cyan-200">
              Recreación editorial fotorrealista
              {articleTitle ? <span className="sr-only"> del artículo {articleTitle}</span> : null}
            </span>
            <span className="shrink-0 border-l border-slate-700 pl-3 text-slate-300">Imagen conceptual</span>
          </div>
          <Image
            src={illustration.editorialImage}
            alt={illustration.editorialAlt}
            width={illustration.editorialWidth}
            height={illustration.editorialHeight}
            sizes={sizes}
            preload={hero}
            fetchPriority={hero ? "high" : "auto"}
            className="max-h-[680px] w-full object-cover"
          />
        </div>
        <figcaption id={editorialCaptionId} className="border-x border-b border-slate-200 bg-white px-5 py-4 text-left text-sm leading-6 text-slate-600 sm:px-6">
          <p>{illustration.editorialCaption}</p>
          <p className="mt-2 font-mono text-[10px] leading-5 text-slate-600">
            {illustration.editorialMethod}. No es una fotografía de un proyecto o ensayo documentado y no se utiliza como evidencia técnica.
          </p>
        </figcaption>
      </figure>

      <figure className="mt-7 border-t border-slate-300 pt-3" aria-describedby={technicalCaptionId}>
        <div className="overflow-hidden border border-slate-300 bg-[#f3efe5]">
          <div className="flex min-h-9 items-center justify-between gap-3 bg-slate-900 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.13em]">
            <span className="text-cyan-200">Lámina técnica complementaria</span>
            <span className="shrink-0 border-l border-slate-700 pl-3 text-slate-300">Esquema conceptual</span>
          </div>
          <Image
            src={illustration.image}
            alt={illustration.alt}
            width={illustration.width}
            height={illustration.height}
            sizes={sizes}
            unoptimized
            className="max-h-[680px] w-full object-contain"
          />
        </div>
        <figcaption id={technicalCaptionId} className="border-x border-b border-slate-200 bg-white px-5 py-4 text-left text-sm leading-6 text-slate-600 sm:px-6">
          <p><span className="font-bold text-slate-950">{illustration.title}.</span> {illustration.caption}</p>
          <p className="mt-3">
            <a className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href={illustration.image} target="_blank" rel="noreferrer">
              Abrir la lámina a tamaño completo ↗
            </a>
          </p>
          <ol className="mt-4 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-3">
            {illustration.readingGuide.map((item, index) => (
              <li key={item} className="grid grid-cols-[24px_1fr] gap-2 text-xs leading-5 text-slate-600">
                <span className="font-mono text-[9px] font-bold text-teal-700">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 font-mono text-[10px] leading-5 text-slate-600">
            {illustration.method} para CAD Lab 3D. El esquema no representa medidas, ensayos o resultados obtenidos en una prueba física.
          </p>
        </figcaption>
      </figure>
    </section>
  );
}
