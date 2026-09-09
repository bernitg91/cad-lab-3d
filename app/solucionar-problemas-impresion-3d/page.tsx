import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { printProblems } from "@/lib/print-problems";
import { createPageMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Problemas de impresión 3D: diagnóstico y soluciones FDM",
  description: "Identifica seis fallos FDM: primera capa, warping, hilos, subextrusión, encajes y separación de capas. Comprueba una causa y valida una prueba cada vez.",
  path: "/solucionar-problemas-impresion-3d"
});

export default function PrintingProblemsPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({
      "@context": "https://schema.org", "@type": "TechArticle", headline: "Problemas de impresión 3D: diagnóstico y soluciones FDM",
      description: metadata.description, mainEntityOfPage: absoluteUrl("/solucionar-problemas-impresion-3d"), inLanguage: "es-ES",
      author: { "@type": "Person", name: siteConfig.authorName, url: absoluteUrl("/sobre-mi") }, datePublished: "2026-09-09", dateModified: "2026-09-09"
    })} />
    <div className="cad-diagnosis">
      <Breadcrumbs items={[{ label: "Guías", href: "/guias" }, { label: "Resolver fallos de impresión" }]} />
      <header className="cad-diagnosis-header">
        <p className="cad-eyebrow">DIAGNÓSTICO FDM</p>
        <h1>¿Qué está fallando<br />en tu impresión?</h1>
        <p>Empieza por lo que ves. Revisa una causa, cambia una variable y repite una muestra pequeña antes de gastar otra bobina en la pieza completa.</p>
        <div className="cad-diagnosis-byline">Por <Link href="/sobre-mi">{siteConfig.authorName}</Link> · <time dateTime="2026-09-09">9 de septiembre de 2026</time></div>
      </header>
      <nav className="cad-symptom-index" aria-label="Elige el síntoma de tu impresión">
        {printProblems.map(problem => <Link href={`#${problem.id}`} key={problem.id}><strong>{problem.title}</strong><span>{problem.clue}</span></Link>)}
      </nav>
      <aside className="cad-diagnosis-baseline"><h2>Guarda el punto de partida</h2><p>Anota impresora, boquilla, material, perfil y momento del fallo. Haz una foto y guarda una copia del perfil antes de tocarlo. La comparación pierde valor si cambias temperatura, flujo y velocidad a la vez.</p></aside>
      <div className="cad-diagnosis-layout">
        <div>{printProblems.map(problem => <section id={problem.id} key={problem.id} className="cad-problem">
          <h2>{problem.title}</h2><p className="cad-problem-clue">{problem.clue}</p>
          <h3>Comprueba en este orden</h3><ol>{problem.checks.map(check => <li key={check}>{check}</li>)}</ol>
          <div className="cad-problem-test"><h3>Cómo comprobar el cambio</h3><p>{problem.test}</p></div>
          <p className="cad-problem-avoid"><strong>Evita este atajo:</strong> {problem.avoid}</p>
          <nav aria-label={`Continúa: ${problem.title}`} className="cad-problem-links"><Link href={problem.guide}>{problem.guideLabel}</Link><Link href={problem.tool}>{problem.toolLabel}</Link></nav>
          <p className="cad-problem-source">Referencia: <a href={problem.source} target="_blank" rel="noreferrer">{problem.sourceLabel}</a></p>
        </section>)}</div>
        <aside className="cad-diagnosis-aside"><h2>De la duda a la prueba</h2><p>Estas herramientas ayudan a decidir antes de repetir la impresión.</p><Link href="/laboratorio-tolerancias-fdm">Probeta de cinco holguras</Link><Link href="/selector-material-impresion-3d">Selector de material</Link><Link href="/calculadora-precio-impresion-3d">Coste de repetir una pieza</Link><Link href="/guia-impresion-3d-fdm">Guía completa de FDM</Link></aside>
      </div>
      <section className="cad-diagnosis-baseline"><h2>Si el síntoma no encaja</h2><p>Los huecos en las tapas, por ejemplo, no siempre tienen la misma causa que una pared incompleta. Revisa el apoyo del relleno y el espesor superior en la <Link href="/blog/paredes-perimetros-tapas-fdm">guía de paredes y tapas</Link>. Si necesitas plantear otra duda, incluye material, máquina, perfil y cuándo empieza el fallo al <Link href="/contacto">escribir al proyecto</Link>.</p><p>Esta guía organiza documentación técnica y criterios de comprobación; no presenta ensayos propios ni valores universales. Consulta siempre el manual del equipo. Puedes revisar <Link href="/metodologia">cómo preparo los contenidos</Link> y sus fuentes enlazadas en cada apartado.</p></section>
    </div>
  </>;
}
