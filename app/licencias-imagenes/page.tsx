import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllArticleIllustrations } from "@/lib/article-illustrations";
import { getAllArticlePhotos } from "@/lib/article-photos";
import { getAllArticles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/seo";
import type { ArticlePhotoLicenseCode } from "@/types/article";

export const metadata: Metadata = createPageMetadata({
  title: "Licencias y créditos de imágenes",
  description:
    "Procedencia, método, créditos y licencias de las fotografías e ilustraciones publicadas en CAD Lab 3D.",
  path: "/licencias-imagenes"
});

const licenseExplanations: {
  code: ArticlePhotoLicenseCode;
  title: string;
  description: string;
}[] = [
  {
    code: "CC0 1.0",
    title: "CC0 1.0 Universal",
    description:
      "La persona autora ha renunciado a sus derechos en la medida permitida por la ley. La obra puede copiarse, adaptarse y usarse con fines comerciales sin exigir atribución; CADLAB3D conserva el crédito para mantener la trazabilidad."
  },
  {
    code: "PDM 1.0",
    title: "Marca de Dominio Público 1.0",
    description:
      "La marca identifica obras que se consideran libres de restricciones conocidas de copyright. No es una licencia, pero documentamos igualmente autoría, procedencia y fecha de verificación."
  },
  {
    code: "CC BY 2.0",
    title: "Creative Commons Atribución 2.0",
    description:
      "Permite compartir y adaptar la obra, también comercialmente, siempre que se indique la autoría, se enlace la licencia y se informen las modificaciones realizadas."
  },
  {
    code: "CC BY 4.0",
    title: "Creative Commons Atribución 4.0",
    description:
      "Permite compartir y adaptar la obra, también para fines comerciales, con crédito, enlace a la licencia e indicación de los cambios."
  },
  {
    code: "Contenido propio",
    title: "Contenido preparado para CADLAB3D",
    description:
      "Fotografías de piezas y material editorial preparado para este sitio. Su inclusión aquí documenta el origen; no concede por sí sola permiso para reutilizarlo fuera de CADLAB3D."
  }
];

function formatVerifiedDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export default function ImageLicensesPage() {
  const publishedArticles = getAllArticles();
  const publishedArticleSlugs = new Set(
    publishedArticles.map((article) => article.slug)
  );
  const photos = getAllArticlePhotos().filter((photo) =>
    publishedArticleSlugs.has(photo.slug)
  );
  const illustrations = getAllArticleIllustrations().filter((illustration) =>
    publishedArticleSlugs.has(illustration.slug)
  );
  const originalDiagramCount = illustrations.filter((illustration) => illustration.kind === "original-diagram").length;
  const licensedReferenceCount = illustrations.length - originalDiagramCount;
  const articleTitles = new Map(
    publishedArticles.map((article) => [article.slug, article.title])
  );
  const licenseCounts = new Map<ArticlePhotoLicenseCode, number>();

  for (const photo of photos) {
    licenseCounts.set(
      photo.licenseCode,
      (licenseCounts.get(photo.licenseCode) ?? 0) + 1
    );
  }
  for (const illustration of illustrations) {
    if (illustration.kind === "licensed-reference-media") {
      licenseCounts.set(
        illustration.licenseCode,
        (licenseCounts.get(illustration.licenseCode) ?? 0) + 1
      );
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Licencias de imágenes" }
        ]}
      />

      <header className="mt-6 max-w-4xl">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
          Trazabilidad visual
        </p>
        <h1 className="mt-3 font-display text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
          Licencias y créditos de imágenes
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Las fotografías externas conservan autor, fuente y licencia; las láminas técnicas indican su método y dejan claro que no son pruebas físicas. Esta página reúne las <strong className="font-extrabold text-slate-950">{photos.length} fotografías documentales</strong> y los <strong className="font-extrabold text-slate-950">{illustrations.length} recursos visuales complementarios</strong> que se muestran en los artículos activos.
        </p>
      </header>

      <section aria-labelledby="illustration-register" className="mt-12">
        <div className="border-b border-slate-300 pb-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
            Selección actual · {originalDiagramCount} láminas originales · {licensedReferenceCount} referencias con licencia
          </p>
          <h2 id="illustration-register" className="mt-2 font-display text-3xl font-black text-slate-950">
            Una mezcla de esquemas rotulados y fuentes verificables
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Los temas físicos usan fotografías o figuras externas cuando existe una fuente comercialmente reutilizable. Los temas conceptuales conservan un esquema rotulado y una guía de lectura; ninguno se presenta como una prueba propia.
          </p>
        </div>

        <ol className="mt-6 grid list-none gap-4 p-0 md:grid-cols-2">
          {illustrations.map((illustration, index) => (
            <li key={illustration.slug} className="overflow-hidden border border-slate-200 bg-white shadow-sm">
              <div className={`relative aspect-[3/2] ${illustration.kind === "licensed-reference-media" ? "bg-slate-950" : "bg-[#f3efe5]"}`}>
                <Image src={illustration.image} alt={illustration.alt} fill sizes="(min-width: 768px) 45vw, 100vw" unoptimized={illustration.image.endsWith(".svg")} className="object-contain" />
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-teal-700">
                  {String(index + 1).padStart(2, "0")} · {illustration.kind === "licensed-reference-media" ? "Referencia con licencia" : "Lámina técnica original"}
                </p>
                <h3 className="mt-2 font-display text-xl font-black leading-tight text-slate-950">
                  <Link className="hover:text-blue-800" href={`/blog/${illustration.slug}`}>{illustration.title}</Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{illustration.caption}</p>
                {illustration.kind === "licensed-reference-media" ? (
                  <p className="mt-3 font-mono text-[10px] leading-5 text-slate-500">
                    <a className="font-bold text-blue-700 underline" href={illustration.creatorUrl} target="_blank" rel="noreferrer">{illustration.creator}</a>
                    {" · "}<a className="font-bold text-blue-700 underline" href={illustration.sourceUrl} target="_blank" rel="noreferrer">{illustration.sourceName}</a>
                    {" · "}<a className="font-bold text-blue-700 underline" href={illustration.licenseUrl} target="_blank" rel="noreferrer">{illustration.licenseCode}</a>
                    {" · "}<a className="font-bold text-blue-700 underline" href={illustration.licenseVerificationUrl} target="_blank" rel="noreferrer">comprobación</a>
                    {" del "}{formatVerifiedDate(illustration.verifiedAt)}
                  </p>
                ) : (
                  <p className="mt-3 font-mono text-[10px] leading-5 text-slate-500">{illustration.method} · preparada el {formatVerifiedDate(illustration.createdAt)}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="license-guide" className="mt-12">
        <div className="border-b border-slate-300 pb-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
            Guía de lectura
          </p>
          <h2 id="license-guide" className="mt-2 font-display text-3xl font-black text-slate-950">
            Qué significa cada indicación
          </h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {licenseExplanations.map((license) => (
            <article
              key={license.code}
              className="border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-black text-slate-950">
                  {license.title}
                </h3>
                <span className="shrink-0 bg-slate-950 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-cyan-200">
                  {licenseCounts.get(license.code) ?? 0} imágenes
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {license.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="credit-register" className="mt-14">
        <div className="border-b border-slate-300 pb-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
            Registro fotográfico actual · {photos.length} imágenes
          </p>
          <h2 id="credit-register" className="mt-2 font-display text-3xl font-black text-slate-950">
            Fotografías documentales publicadas
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Los enlaces conducen al artículo, al perfil de la persona autora,
            a la página original de la fotografía y al texto completo de la licencia. Cada registro corresponde a la imagen que se muestra actualmente en ese artículo.
          </p>
        </div>

        <ol className="mt-6 grid list-none gap-4 p-0 md:grid-cols-2">
          {photos.map((photo, index) => (
            <li
              key={photo.slug}
              id={`credito-${photo.slug}`}
              className="border border-slate-200 bg-white p-5 shadow-sm [contain-intrinsic-size:320px] [content-visibility:auto]"
            >
              <div className="flex items-start gap-4">
                <span
                  className="mt-0.5 shrink-0 font-mono text-xs font-bold text-teal-700"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-black leading-snug text-slate-950">
                    <Link
                      className="underline decoration-blue-300 underline-offset-4 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                      href={`/blog/${photo.slug}`}
                    >
                      {articleTitles.get(photo.slug) ?? photo.slug}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    <span className="font-bold text-slate-900">{photo.title}</span>
                    {" · Imagen de "}
                    <a
                      className="text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                      href={photo.creatorUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {photo.creator}
                    </a>
                  </p>
                  <p className="mt-2 font-mono text-[10px] leading-5 text-slate-600">
                    Fuente: {" "}
                    <a
                      className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                      href={photo.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {photo.sourceName}
                    </a>
                    {" · "}
                    <a
                      className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                      href={photo.licenseUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {photo.licenseCode}
                    </a>
                    {" · Verificada el "}
                    <time dateTime={photo.verifiedAt}>
                      {formatVerifiedDate(photo.verifiedAt)}
                    </time>
                    {" · "}
                    <a
                      className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                      href={photo.licenseVerificationUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      comprobación
                    </a>
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {photo.changes}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <aside className="mt-12 border-l-4 border-teal-500 bg-teal-50 px-5 py-4 text-sm leading-6 text-slate-700">
        Si detectas una atribución incompleta o un cambio en las condiciones de
        una fuente, indícalo desde la página de <Link className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href="/contacto">contacto</Link>. Revisaremos el registro y la imagen publicada.
      </aside>
    </main>
  );
}
