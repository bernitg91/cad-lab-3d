import type { Metadata } from "next";
import Link from "next/link";
import { MagazineOpening } from "@/components/MagazineOpening";
import { TaskRoutes } from "@/components/TaskRoutes";
import { CadExperience } from "@/components/CadExperience";
import { VisualFigure } from "@/components/VisualFigure";
import { getArticleVisual, getPortfolioVisual } from "@/lib/visuals";
import { getEditorialVisual } from "@/lib/editorial-media";
import { portfolioItems } from "@/lib/portfolio";
import { productIdeas } from "@/lib/product-ideas";
import { topicGuides } from "@/lib/topic-guides";
import { getAllArticles } from "@/lib/articles";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "Diseño CAD e impresión 3D", description: siteConfig.description, path: "/" });
const threeColumnSizes = "(max-width: 560px) 88vw, (max-width: 800px) calc((88vw - 32px) / 2), (max-width: 1440px) calc((88vw - 64px) / 3), 401px";
const fourColumnSizes = "(max-width: 560px) 88vw, (max-width: 1050px) calc((88vw - 32px) / 2), (max-width: 1440px) calc((88vw - 72px) / 4), 298px";
const tools = [
  {title:"Precio de impresión",text:"Cuenta material, máquina y trabajo antes de proponer un precio.",href:"/calculadora-precio-impresion-3d",mark:"€"},
  {title:"Peso y filamento",text:"Estima el consumo y contrástalo con tu laminador.",href:"/calculadora-peso-pieza-3d",mark:"g"},
  {title:"Selector de material",text:"Compara opciones por entorno, carga y flexibilidad.",href:"/selector-material-impresion-3d",mark:"MAT"},
  {title:"Prueba de tolerancias",text:"Descarga el modelo y registra el ajuste real.",href:"/laboratorio-tolerancias-fdm",mark:"mm"}
];

export default function HomePage() {
  const featured = getAllArticles().filter(article => ["elegir-filamento-piezas-funcionales","errores-diseno-piezas-impresion-3d","que-es-analisis-fem-cuando-usarlo"].includes(article.slug));
  const profitPiece = portfolioItems[2];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([
      {"@context":"https://schema.org","@type":"Organization",name:siteConfig.name,url:absoluteUrl("/"),logo:absoluteUrl("/brand/cadlab3d-mark.png"),description:siteConfig.description},
      {"@context":"https://schema.org","@type":"WebSite",name:siteConfig.name,url:absoluteUrl("/"),description:siteConfig.description}
    ])} />
    <MagazineOpening />
    <TaskRoutes />
    <section id="aprende" className="cad-mag-section"><div className="cad-mag-heading"><div><p className="cad-eyebrow">COMPARAR ANTES DE ELEGIR</p><h2>Impresoras, materiales<br />y programas 3D.</h2></div><p>Guías para entender las diferencias y decidir por el trabajo que quieres hacer.</p></div><div className="cad-mag-grid-three">{topicGuides.map(guide => <article className="cad-mag-card" key={guide.slug}><VisualFigure visual={getEditorialVisual(guide.heroMedia)} href={"/"+guide.slug} className="cad-mag-photo cad-mag-photo-contain" sizes={threeColumnSizes} /><p className="cad-eyebrow">{guide.category}</p><h3><Link href={"/"+guide.slug}>{guide.shortTitle}</Link></h3><p>{guide.description}</p><Link href={"/"+guide.slug} className="cad-mag-link" aria-label={"Leer la comparativa: " + guide.shortTitle}>Leer la comparativa</Link></article>)}</div></section>
    <section className="cad-mag-tinted"><div className="cad-mag-section"><div className="cad-mag-heading"><div><p className="cad-eyebrow">QUÉ FABRICAR</p><h2>Ideas que resuelven<br />algo concreto.</h2></div><div><p>Organización, personalización y piezas a medida. Empieza con una muestra y comprueba si existe demanda.</p><Link href="/que-vender-impresion-3d" className="cad-mag-link">Ver las ocho ideas para vender</Link></div></div><div className="cad-mag-grid-four">{productIdeas.slice(0,4).map(idea => <article className="cad-mag-card" key={idea.id}><VisualFigure visual={getEditorialVisual(idea.media!)} href={"/que-vender-impresion-3d#"+idea.id} className="cad-mag-photo" sizes={fourColumnSizes} /><h3><Link href={"/que-vender-impresion-3d#"+idea.id}>{idea.title}</Link></h3><p>{idea.value}</p><Link href={"/que-vender-impresion-3d#"+idea.id} className="cad-mag-link" aria-label={"Qué comprobar antes de vender: " + idea.title}>Qué comprobar antes de vender</Link></article>)}</div></div></section>
    <section className="cad-mag-section cad-profit-feature"><VisualFigure visual={getPortfolioVisual(profitPiece.image,profitPiece.alt)} href="/que-vender-impresion-3d#rentabilidad" className="cad-mag-photo cad-mag-photo-contain" sizes="(max-width: 800px) 88vw, (max-width: 1440px) calc((88vw - 44px) / 2), 595px" /><div><p className="cad-eyebrow">HAZ LAS CUENTAS</p><h2>El precio de venta<br />no es tu beneficio.</h2><p>Material, fallos, trabajo manual, embalaje y comisiones. Revisa un ejemplo completo y sustituye los supuestos por tus datos.</p><div className="cad-profit-example"><span>Ejemplo hipotético por unidad</span><strong>15,00 € <small>−</small> 7,61 € <small>=</small> 7,39 €</strong><p>Venta menos costes incluidos. El resto aún debe cubrir otros gastos e impuestos; no es beneficio neto.</p></div><Link href="/que-vender-impresion-3d#rentabilidad" className="cad-mag-link">Entender el margen paso a paso</Link></div></section>
    <section id="herramientas" className="cad-mag-section cad-mag-tools"><div className="cad-mag-heading"><div><p className="cad-eyebrow">ABRE, CALCULA Y COMPRUEBA</p><h2>Herramientas para<br />tu próxima pieza.</h2></div><Link href="/recursos" className="cad-mag-link">Todos los recursos</Link></div><div className="cad-mag-grid-four">{tools.map(tool => <Link className="cad-mag-tool" href={tool.href} key={tool.href}><span>{tool.mark}</span><h3>{tool.title}</h3><p>{tool.text}</p></Link>)}</div></section>
    <section className="cad-mag-section cad-mag-problems"><div><p className="cad-eyebrow">CUANDO LA IMPRESIÓN FALLA</p><h2>Empieza por el síntoma.</h2><p>Una causa cada vez, una muestra pequeña y una comprobación que puedas repetir.</p></div><nav aria-label="Diagnóstico rápido">{[["La primera capa no se pega","primera-capa"],["Se levantan las esquinas","warping"],["Aparecen hilos","hilos"],["Falta material","subextrusion"],["El encaje no ajusta","encajes"],["La pieza se separa entre capas","capas"]].map(([label,id]) => <Link href={"/solucionar-problemas-impresion-3d#"+id} key={id}>{label}</Link>)}</nav></section>
    <CadExperience embedded />
    <section className="cad-mag-tinted"><div className="cad-mag-section"><div className="cad-mag-heading"><div><p className="cad-eyebrow">PIEZAS DEL ARCHIVO PROPIO</p><h2>Observa la forma.<br />Piensa en cómo se fabrica.</h2></div><Link href="/casos-practicos-impresion-3d" className="cad-mag-link">Ver la colección completa</Link></div><div className="cad-mag-grid-four">{[1,3,4,7].map(index => {const item=portfolioItems[index]; const href="/casos-practicos-impresion-3d#caso-"+(index+1); return <article className="cad-mag-card" key={item.image}><VisualFigure visual={getPortfolioVisual(item.image,item.alt)} href={href} className="cad-mag-photo cad-mag-photo-contain" sizes={fourColumnSizes} /><h3><Link href={href}>{item.title}</Link></h3><p>{item.description}</p></article>;})}</div></div></section>
    <section className="cad-mag-section"><div className="cad-mag-heading"><div><p className="cad-eyebrow">SIGUE APRENDIENDO</p><h2>Una decisión mejor<br />en cada proyecto.</h2></div><Link href="/blog" className="cad-mag-link">Explorar todos los artículos</Link></div><div className="cad-mag-grid-three">{featured.map(article => <article className="cad-mag-card" key={article.slug}><VisualFigure visual={getArticleVisual(article.slug)!} href={"/blog/"+article.slug} className="cad-mag-photo cad-mag-photo-contain" sizes={threeColumnSizes} /><p className="cad-eyebrow">{article.category}</p><h3><Link href={"/blog/"+article.slug}>{article.title}</Link></h3><p>{article.description}</p></article>)}</div></section>
    <section className="cad-mag-section cad-mag-author"><div><p className="cad-eyebrow">CADLAB3D · BERNAT TORRES GUASCH</p><h2>Un proyecto personal<br />para aprender haciendo.</h2></div><div><p>Guías documentadas, fotografías del archivo propio, referencias con licencia y recursos para comprobar tus decisiones.</p><Link href="/sobre-mi" className="cad-mag-link">Conoce el proyecto y su método</Link></div></section>
  </>;
}
