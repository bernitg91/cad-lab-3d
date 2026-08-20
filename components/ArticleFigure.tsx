import Image from "next/image";
import type { ArticleVisual } from "@/types/article";

type ArticleFigureProps = {
  visual: ArticleVisual;
  label: string;
  reference: string;
  hero?: boolean;
};

export function ArticleFigure({ visual, label, reference, hero = false }: ArticleFigureProps) {
  const sizes = hero
    ? "(min-width: 1280px) 1024px, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
    : "(min-width: 1024px) 760px, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)";

  return (
    <figure className={hero ? "calibration-rail mx-auto mt-10 max-w-5xl pl-4" : "my-12 overflow-hidden border border-slate-200 bg-white shadow-lg shadow-slate-950/5"}>
      <div className="image-scanline overflow-hidden border border-slate-300 bg-slate-50">
        <Image
          src={visual.image}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes={sizes}
          preload={hero}
          unoptimized
          className="h-auto w-full"
        />
      </div>
      <figcaption className="border-x border-b border-slate-200 bg-white px-5 py-4 text-left text-sm leading-6 text-slate-600 sm:px-7">
        {visual.caption}
        <span className="mt-2 block font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">{visual.credit}</span>
      </figcaption>
      <div className="mt-2 flex justify-between font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-600">
        <span>{label}</span>
        <span>Ref. {reference.slice(0, 18)}</span>
      </div>
    </figure>
  );
}
