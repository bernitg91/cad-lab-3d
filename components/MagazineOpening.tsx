import Link from "next/link";
import { VisualFigure } from "@/components/VisualFigure";
import { getArticleVisual, getPortfolioVisual } from "@/lib/visuals";
import { portfolioItems } from "@/lib/portfolio";

export function MagazineOpening() {
  const piece = portfolioItems[0];
  return <section className="cad-magazine-opening">
    <header><p className="cad-eyebrow">EL CUADERNO DE DISEÑO Y FABRICACIÓN</p><h1>Impresión 3D.<br /><span>Ideas que toman forma.</span></h1><p>Qué impresora elegir, qué merece la pena fabricar y cómo llevar una pieza del CAD a la mesa.</p></header>
    <div className="cad-front-grid">
      <article className="cad-front-lead"><VisualFigure visual={getArticleVisual("calibrar-impresora-3d-piezas-funcionales")!} href="/guia-impresion-3d-fdm" className="cad-mag-photo" sizes="(max-width: 760px) 88vw, (max-width: 1440px) calc((88vw - 32px) * .6364), 786px" preload /><div><p className="cad-eyebrow">EMPIEZA AQUÍ</p><h2><Link href="/guia-impresion-3d-fdm">Tu primera buena impresión empieza antes de pulsar «imprimir».</Link></h2><p>Material, orientación, laminado y primera capa: un recorrido para entender qué cambia el resultado.</p></div></article>
      <article className="cad-front-side"><VisualFigure visual={getPortfolioVisual(piece.image,piece.alt)} href="/casos-practicos-impresion-3d" className="cad-mag-photo cad-mag-photo-contain" sizes="(max-width: 760px) 88vw, (max-width: 1440px) calc((88vw - 32px) * .3636), 450px" /><p className="cad-eyebrow">DEL ARCHIVO PROPIO</p><h2><Link href="/casos-practicos-impresion-3d">Un soporte pensado para una necesidad concreta.</Link></h2><p>Observa apoyos, proporciones y acabado en piezas reales del proyecto.</p><Link href="/casos-practicos-impresion-3d" className="cad-mag-link">Explorar las piezas</Link></article>
    </div>
  </section>;
}
