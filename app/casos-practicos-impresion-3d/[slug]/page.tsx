import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata, jsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return createPageMetadata({
    title: study.title,
    description: study.description,
    path: `/casos-practicos-impresion-3d/${study.slug}`,
    type: "article",
    publishedTime: study.publishedAt,
    authors: [siteConfig.name],
    image: study.image
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    image: absoluteUrl(study.image),
    datePublished: study.publishedAt,
    dateModified: study.updatedAt,
    mainEntityOfPage: absoluteUrl(`/casos-practicos-impresion-3d/${study.slug}`),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/sobre-mi")
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/")
    },
    inLanguage: "es-ES"
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Casos prácticos",
        item: absoluteUrl("/casos-practicos-impresion-3d")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: study.title,
        item: absoluteUrl(`/casos-practicos-impresion-3d/${study.slug}`)
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd)} />
      <article>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Casos prácticos", href: "/casos-practicos-impresion-3d" },
                { label: study.title }
              ]}
            />
            <p className="mt-8 text-sm font-black uppercase tracking-wide text-teal-700">Pieza real analizada</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              {study.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{study.description}</p>
            <p className="mt-5 text-sm font-semibold text-slate-500">
              Publicado el 23 de junio de 2026 · Fotografía propia · Análisis visual y de diseño
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <div>
            <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={study.image}
                  alt={study.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 780px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600">
                Fotografía de la pieza fabricada. El análisis distingue lo que puede observarse de las prestaciones que requerirían medición o ensayo.
              </figcaption>
            </figure>

            <div className="article-body mt-10">
              <p>{study.introduction}</p>
              {study.sections.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
              <h2>Lista de revisión para una nueva versión</h2>
              <ul>
                {study.finalReview.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h2>Conclusión del caso</h2>
              <p>
                El valor de este prototipo no está en presentar una pieza como perfecta, sino en convertirla en evidencia para la siguiente decisión. Fotografiar, medir y registrar los cambios permite que una segunda versión sea una mejora comprobable y no una repetición a ciegas.
              </p>
            </div>

            <section className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-black text-slate-950">Alcance del análisis</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Esta página documenta observaciones de geometría, fabricación y revisión a partir de una pieza real. No atribuye material, resistencia, tolerancia ni certificación cuando esos datos no están medidos.
              </p>
            </section>
          </div>

          <aside className="grid content-start gap-5 lg:sticky lg:top-24">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-slate-950">Puntos clave</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
                {study.keyPoints.map((point) => (
                  <li key={point} className="border-l-4 border-teal-500 pl-3">{point}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-lg bg-slate-950 p-5 text-white">
              <h2 className="text-lg font-black">Continúa la revisión</h2>
              <div className="mt-4 grid gap-2 text-sm font-bold">
                <Link className="text-teal-300 hover:text-white" href="/guia-impresion-3d-fdm">Guía completa FDM</Link>
                <Link className="text-teal-300 hover:text-white" href="/checklist-impresion-3d">Checklist antes de imprimir</Link>
                <Link className="text-teal-300 hover:text-white" href="/calculadora-precio-impresion-3d">Calculadora de precio</Link>
                <Link className="text-teal-300 hover:text-white" href="/contacto">Consultar un proyecto</Link>
              </div>
            </section>
          </aside>
        </div>
      </article>
    </>
  );
}
