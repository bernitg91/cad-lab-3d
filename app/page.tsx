import type { Metadata } from "next";
import Link from "next/link";
import { CadExperience } from "@/components/CadExperience";
import { VisualFigure } from "@/components/VisualFigure";
import { getArticleVisual, getPortfolioVisual } from "@/lib/visuals";
import { portfolioItems } from "@/lib/portfolio";
import { getAllArticles } from "@/lib/articles";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "Diseño CAD e impresión 3D", description: siteConfig.description, path: "/" });

const routes = [
  { label: "DISEÑO CAD", title: "Un modelo que evoluciona contigo.", text: "Croquis definidos, referencias estables y operaciones que siguen funcionando cuando cambias una cota.", href: "/guia-cad-parametrico", links: ["Croquis y restricciones", "Diseño paramétrico", "Exportación STEP y STL"], mark: "CAD" },
  { label: "IMPRESIÓN 3D", title: "Menos prueba y error. Más criterio.", text: "Aprende a elegir orientación, paredes y material según lo que necesita la pieza. Del laminador al primer prototipo.", href: "/guia-impresion-3d-fdm", links: ["Orientación y soportes", "Paredes y relleno", "Tolerancias y encajes"], mark: "FDM" },
  { label: "MATERIALES Y VALIDACIÓN", title: "El material también se diseña.", text: "Compara usos, identifica las limitaciones de cada material y prepara las comprobaciones antes de dar una pieza por terminada.", href: "/guia-materiales-fdm", links: ["PLA, PETG y materiales técnicos", "Condiciones de uso", "Pruebas y documentación"], mark: "MAT" }
];

const tools = [
  ["€", "Precio de impresión", "Material, tiempo de máquina, preparación y margen en una misma cuenta.", "/calculadora-precio-impresion-3d"],
  ["g", "Peso de la pieza", "Una estimación a partir de volumen, densidad y estrategia de impresión.", "/calculadora-peso-pieza-3d"],
  ["↗", "Selector de material", "Compara opciones según el uso que esperas darle a tu pieza.", "/selector-material-impresion-3d"],
  ["✓", "Checklist antes de imprimir", "Revisa archivo, máquina y acabado antes de empezar la fabricación.", "/checklist-impresion-3d"]
];

export default function HomePage() {
  const articles = getAllArticles();
  const featuredSlugs = ["disenar-encajes-clips-impresion-3d", "elegir-filamento-piezas-funcionales", "preparar-archivo-stl-impresion-3d"];
  const featured = featuredSlugs.map(slug => articles.find(article => article.slug === slug)).filter(Boolean);
  const selected = [...featured, ...articles.filter(article => !featuredSlugs.includes(article.slug))].slice(0, 3);
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([
      { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/"), logo: absoluteUrl("/brand/cadlab3d-mark.png"), description: siteConfig.description },
      { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: absoluteUrl("/"), description: siteConfig.description }
    ])} />
    <CadExperience />
    <section className="cad-section cad-photo-story" aria-labelledby="primera-capa-title">
      <VisualFigure visual={getArticleVisual("calibrar-impresora-3d-piezas-funcionales")!} href="/blog/calibrar-impresora-3d-piezas-funcionales" className="cad-process-photo" sizes="(max-width: 899px) 90vw, 58vw" caption="Detalle real de la deposición de la primera capa. Fotografía de referencia externa." />
      <div className="cad-photo-story-copy"><p className="cad-eyebrow">EL DISEÑO TOCA LA MESA</p><h2>Todo empieza<br />con una<br /><span>buena primera capa.</span></h2><p>El modelo pone la forma. La impresión pone a prueba las decisiones: apoyo, orientación, recorrido y unión entre capas.</p><Link href="/blog/calibrar-impresora-3d-piezas-funcionales" className="cad-text-link">Preparar la primera impresión <span aria-hidden="true">↗</span></Link></div>
    </section>
    <section id="aprende" className="cad-section cad-intro">
      <p className="cad-eyebrow">APRENDER HACIENDO</p>
      <h2>Entre el archivo y el objeto<br />hay decisiones.<br /><span>Aquí las hacemos comprensibles.</span></h2>
      <div className="cad-intro-bottom"><p>CAD Lab 3D es un proyecto personal de aprendizaje en diseño industrial y fabricación digital. Un lugar para entender cómo se modela una pieza, por qué falla una impresión y qué merece la pena comprobar.</p><Link href="/sobre-mi" className="cad-text-link">Conoce el proyecto <span aria-hidden="true">↗</span></Link></div>
      <div className="cad-learning-grid">{routes.map(route => <article className="cad-learning-card" key={route.mark}>
        <div className="cad-card-top"><span className="cad-eyebrow">{route.label}</span><span className="cad-card-mark" aria-hidden="true">{route.mark}</span></div>
        <h3><Link href={route.href}>{route.title}</Link></h3><p>{route.text}</p>
        <ul>{route.links.map(label => <li key={label}>{label}</li>)}</ul>
        <Link href={route.href} className="cad-card-link">Abrir la guía <span aria-hidden="true">↗</span></Link>
      </article>)}</div>
    </section>
    <section className="cad-piece-section"><div className="cad-section">
      <div className="cad-section-heading"><div><p className="cad-eyebrow">FOTOGRAFÍAS DEL ARCHIVO PROPIO</p><h2>Ideas que ya<br />se pueden tocar.</h2></div><p>Piezas del archivo de CAD Lab 3D. Una selección para observar apoyos, paredes y contornos antes de diseñar tu siguiente objeto.</p></div>
      <div className="cad-piece-grid">{[0, 2, 7].map(index => { const item = portfolioItems[index]; const href = `/casos-practicos-impresion-3d#caso-${index + 1}`; return <article key={item.image}>
        <VisualFigure visual={getPortfolioVisual(item.image, item.alt)} href={href} className="cad-piece-photo" />
        <p className="cad-eyebrow">{String(index + 1).padStart(2, "0")} / {item.use}</p><h3><Link href={href}>{item.title}</Link></h3><p>{item.description}</p><Link href={href} className="cad-card-link">Ver la pieza y qué revisar <span aria-hidden="true">↗</span></Link>
      </article>; })}</div>
      <Link href="/casos-practicos-impresion-3d" className="cad-button cad-button-primary cad-gallery-button">Ver las ocho piezas <span aria-hidden="true">↗</span></Link>
    </div></section>
    <section className="cad-lab-section"><div className="cad-section cad-lab-layout">
      <div><p className="cad-eyebrow">LABORATORIO ABIERTO</p><h2>La próxima prueba<br />empieza con<br /><span>un archivo tuyo.</span></h2><p>Descarga una probeta de cinco agujeros, modifica sus parámetros y compara el ajuste con un pasador medido. Incluye el modelo CAD y una hoja para registrar tus resultados.</p><Link href="/laboratorio-tolerancias-fdm" className="cad-button cad-button-light">Explorar la práctica <span aria-hidden="true">↗</span></Link></div>
      <div className="cad-lab-sheet"><div className="cad-sheet-header"><span>PRÁCTICA / TOLERANCIAS FDM</span><span>01</span></div><h3>Una misma pieza.<br />Cinco holguras.</h3>
        <div className="cad-clearance-row" aria-label="Holguras diametrales de diseño en milímetros">{["0,00", "0,10", "0,20", "0,30", "0,40"].map(n => <span key={n}>{n}<small>mm</small></span>)}</div>
        <dl><div><dt>Modelo editable</dt><dd>OpenSCAD</dd></div><div><dt>Registro de pruebas</dt><dd>CSV</dd></div><div><dt>Placa de diseño</dt><dd>90 × 24 × 5 mm</dd></div></dl>
        <p>Geometría didáctica original. Los resultados los obtienes tú al imprimir y medir.</p><Link href="/laboratorio-tolerancias-fdm" className="cad-card-link">Ver el modelo y las instrucciones <span aria-hidden="true">↗</span></Link>
      </div>
    </div></section>
    <section id="herramientas" className="cad-section">
      <div className="cad-section-heading"><div><p className="cad-eyebrow">A MANO, CUANDO LO NECESITAS</p><h2>Haz números.<br />Toma decisiones.</h2></div><p>Herramientas gratuitas que puedes usar directamente. Calcula una estimación y contrástala después con tu laminador y las condiciones reales.</p></div>
      <div className="cad-tools-grid">{tools.map(([mark,title,text,href])=><Link key={href} href={href} className="cad-tool"><span className="cad-tool-mark" aria-hidden="true">{mark}</span><h3>{title}</h3><p>{text}</p><span className="cad-card-link">Abrir herramienta <span aria-hidden="true">↗</span></span></Link>)}</div>
    </section>
    <section className="cad-reading-section"><div className="cad-section">
      <div className="cad-section-heading"><div><p className="cad-eyebrow">DEL CUADERNO DE TRABAJO</p><h2>Una duda concreta.<br />Una lectura útil.</h2></div><Link href="/blog" prefetch={false} className="cad-text-link">Todos los artículos <span aria-hidden="true">↗</span></Link></div>
      <div className="cad-reading-grid">{selected.map(article=>article&&<article key={article.slug} className="cad-reading-card">{getArticleVisual(article.slug) && <VisualFigure visual={getArticleVisual(article.slug)!} href={`/blog/${article.slug}`} className="cad-reading-photo" />}<p className="cad-eyebrow">{article.category}</p><h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3><p>{article.description}</p><Link href={`/blog/${article.slug}`} className="cad-card-link">Leer artículo <span aria-hidden="true">↗</span></Link></article>)}</div>
      <div className="cad-case-banner"><div><p className="cad-eyebrow">DE LA PANTALLA A LA MESA</p><h3>Piezas reales.<br />Decisiones que se pueden observar.</h3><p>Soportes, cajas, adaptadores y organizadores. Revisa las fotografías y el análisis de su geometría, sin confundir una observación con un ensayo.</p></div><Link href="/casos-practicos-impresion-3d" className="cad-button cad-button-primary">Explorar las piezas <span aria-hidden="true">↗</span></Link></div>
    </div></section>
    <section className="cad-section cad-closing"><p className="cad-eyebrow">EL SIGUIENTE PASO ES TUYO</p><h2>Una idea mejora<br /><span>cuando la pruebas.</span></h2><div><Link href="/guias" className="cad-button cad-button-primary">Empieza por una guía <span aria-hidden="true">↗</span></Link><Link href="/contacto" className="cad-text-link">Comparte una duda o corrección <span aria-hidden="true">↗</span></Link></div><nav aria-label="Más áreas de aprendizaje"><Link href="/guia-simulacion-fem">Simulación FEM ↗</Link><Link href="/guia-documentacion-tecnica">Documentación técnica ↗</Link><Link href="/metodologia">Método editorial ↗</Link><Link href="/fuentes">Fuentes técnicas ↗</Link></nav></section>
  </>;
}
