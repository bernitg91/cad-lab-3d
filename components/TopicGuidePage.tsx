import "@/app/topic-guides.css";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VisualFigure } from "@/components/VisualFigure";
import { getEditorialVisual } from "@/lib/editorial-media";
import { jsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { TopicGuide } from "@/types/topic-guide";

export function TopicGuidePage({ guide }: { guide: TopicGuide }) {
  return <div className="cad-topic-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({ "@context": "https://schema.org", "@type": "TechArticle", headline: guide.title, description: guide.description, mainEntityOfPage: absoluteUrl(`/${guide.slug}`), author: { "@type": "Person", name: siteConfig.authorName, url: absoluteUrl("/sobre-mi") }, inLanguage: "es-ES", datePublished: "2026-09-09", dateModified: "2026-09-09" })} />
    <Breadcrumbs items={[{ label: "Guías", href: "/guias" }, { label: guide.shortTitle }]} />
    <header className="cad-topic-header"><p className="cad-eyebrow">{guide.category}</p><h1>{guide.title}</h1><p>{guide.lead}</p><div className="cad-topic-byline">Por <Link href="/sobre-mi">{siteConfig.authorName}</Link> · <time dateTime="2026-09-09">9 de septiembre de 2026</time></div></header>
    <div className="cad-topic-cover"><VisualFigure visual={getEditorialVisual(guide.heroMedia)} className="cad-mag-photo cad-mag-photo-contain" sizes="(max-width: 800px) 90vw, 65vw" caption={guide.heroCaption} frameRatio={16 / 10} eager /><aside><p className="cad-eyebrow">PARA DECIDIR</p><p>{guide.takeaway}</p><Link href="/recursos">Herramientas para tu proyecto</Link></aside></div>
    <div className="cad-topic-layout"><nav className="cad-topic-index" aria-label="En esta guía"><strong>En esta guía</strong>{guide.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}<a href="#referencias">Fuentes y criterio editorial</a></nav>
      <div className="cad-topic-body">{guide.sections.map(section => <section id={section.id} key={section.id}>
        <h2>{section.title}</h2>
        {section.media && <VisualFigure visual={getEditorialVisual(section.media)} className="cad-mag-photo cad-mag-photo-contain" sizes="(max-width: 800px) 90vw, 55vw" caption={section.caption} />}
        {section.paragraphs?.map(text => <p key={text}>{text}</p>)}
        {section.table && <div className="cad-topic-table" tabIndex={0} role="region" aria-label={`Tabla: ${section.title}`}><table><thead><tr>{section.table.headings.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead><tbody>{section.table.rows.map(row => <tr key={row[0]}>{row.map((cell,index) => index === 0 ? <th scope="row" key={index}>{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div>}
        {section.bullets && <ul>{section.bullets.map(text => <li key={text}>{text}</li>)}</ul>}
        {section.steps && <ol>{section.steps.map(text => <li key={text}>{text}</li>)}</ol>}
        {section.links && <div className="cad-topic-links">{section.links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>}
      </section>)}
      <section id="referencias" className="cad-topic-references"><h2>Fuentes y criterio editorial</h2><p>Comparación documental revisada el 9 de septiembre de 2026. Las fotografías y capturas identifican su procedencia; no se presentan como pruebas propias de equipos o programas. Consulta la documentación de tu versión y material antes de aplicar un ajuste.</p><ul>{guide.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul><Link href="/metodologia">Cómo se prepara el contenido</Link></section>
      </div>
    </div>
  </div>;
}
