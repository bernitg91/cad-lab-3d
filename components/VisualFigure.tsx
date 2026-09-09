import Image from "next/image";
import Link from "next/link";
import type { Visual } from "@/lib/visuals";
import { containedImageSizes } from "@/lib/image-sizes";

export function VisualFigure({ visual, href, className = "", sizes = "(max-width: 640px) 90vw, 30vw", caption, eager = false, preload = false, frameRatio }: { visual: Visual; href?: string; className?: string; sizes?: string; caption?: string; eager?: boolean; preload?: boolean; frameRatio?: number }) {
  // A contained portrait occupies less width than its landscape frame.
  // Describe the painted image size so srcset does not download the frame's full width.
  const containedRatio = frameRatio ?? (className.includes("cad-mag-photo-contain") ? 3 / 2 : /cad-(index|reading)-photo/.test(className) ? 4 / 3 : undefined);
  const imageSizes = containedRatio ? containedImageSizes(sizes, visual.width / visual.height, containedRatio) : sizes;
  const picture = <Image src={visual.image} alt={visual.alt} width={visual.width} height={visual.height} sizes={imageSizes} className="cad-photo-image" preload={preload} loading={preload ? undefined : eager ? "eager" : "lazy"} fetchPriority={!preload && eager ? "high" : undefined} />;
  return <figure className={`cad-photo ${className}`}>
    {href ? <Link href={href} prefetch={false} className="cad-photo-link">{picture}</Link> : <div className="cad-photo-link">{picture}</div>}
    <figcaption>{caption && <span className="cad-photo-caption">{caption}</span>}<Link href={`/licencias-imagenes#${visual.creditId}`} prefetch={false} className="cad-photo-credit">{visual.credit} <span aria-hidden="true">↗</span></Link></figcaption>
  </figure>;
}
