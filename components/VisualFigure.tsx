import Image from "next/image";
import Link from "next/link";
import type { Visual } from "@/lib/visuals";

export function VisualFigure({ visual, href, className = "", sizes = "(max-width: 640px) 90vw, 30vw", caption, eager = false }: { visual: Visual; href?: string; className?: string; sizes?: string; caption?: string; eager?: boolean }) {
  const picture = <Image src={visual.image} alt={visual.alt} width={visual.width} height={visual.height} sizes={sizes} className="cad-photo-image" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} />;
  return <figure className={`cad-photo ${className}`}>
    {href ? <Link href={href} className="cad-photo-link">{picture}</Link> : <div className="cad-photo-link">{picture}</div>}
    <figcaption>{caption && <span className="cad-photo-caption">{caption}</span>}<Link href={`/licencias-imagenes#${visual.creditId}`} className="cad-photo-credit">{visual.credit} <span aria-hidden="true">↗</span></Link></figcaption>
  </figure>;
}
