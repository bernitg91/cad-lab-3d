import type { Metadata } from "next";
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
      "Recreaciones editoriales fotorrealistas asistidas por IA y láminas técnicas preparadas para este sitio. Las recreaciones están revisadas y se identifican como conceptuales: no documentan pruebas, mediciones ni resultados reales. Su inclusión aquí no concede por sí sola permiso para reutilizarlas fuera de CADLAB3D."
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
  const editorialRecreationCount = originalDiagramCount;
  const licensedReferenceCount = illustrations.length - originalDiagramCount;
  const articleDetails = new Map(
    publishedArticles.map((article) => [
      article.slug,
      { title: article.title, category: article.category }
    ])
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
    } else {
      licenseCounts.set(
        "Contenido propio",
        (licenseCounts.get("Contenido propio") ?? 0) + 2
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
          Las fotografías externas conservan autor, fuente y licencia; el material propio indica su método y sus límites. Esta página reúne <strong className="font-extrabold text-slate-950">{photos.length} fotografías documentales</strong>, <strong className="font-extrabold text-slate-950">{editorialRecreationCount} recreaciones editoriales fotorrealistas</strong>, <strong className="font-extrabold text-slate-950">{originalDiagramCount} láminas técnicas</strong> y <strong className="font-extrabold text-slate-950">{licensedReferenceCount} referencias con licencia</strong> que se muestran en los artículos activos.
        </p>
      </header>

      <section aria-labelledby="illustration-register" className="mt-12">
        <div className="border-b border-slate-300 pb-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
            Selección actual · {editorialRecreationCount} recreaciones editoriales · {originalDiagramCount} láminas originales · {licensedReferenceCount} referencias con licencia
          </p>
          <h2 id="illustration-register" className="mt-2 font-display text-3xl font-black text-slate-950">
            Recreaciones revisadas, esquemas rotulados y fuentes verificables
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Este registro es deliberadamente textual: cada recurso visual se muestra una sola vez, dentro de su artículo. Aquí quedan documentados su categoría, método, crédito y límites sin repetir la imagen. Las cuatro recreaciones están asistidas por IA y revisadas manualmente; no representan una prueba, una medición, un prototipo documentado ni un resultado calculado.
          </p>
        </div>

        <ol className="mt-6 grid list-none gap-4 p-0 md:grid-cols-2">
          {illustrations.map((illustration, index) => {
            const article = articleDetails.get(illustration.slug);
            const isLicensedReference = illustration.kind === "licensed-reference-media";

            return (
              <li key={illustration.slug} className="relative border-t-2 border-slate-950 bg-white py-5 pl-5 pr-2">
                <span
                  className={`absolute left-0 top-5 h-14 w-1 ${isLicensedReference ? "bg-teal-600" : "bg-orange-600"}`}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono text-[9px] font-bold uppercase tracking-[0.12em]">
                  <span className="text-teal-800">
                    Recurso {String(index + 1).padStart(2, "0")} · {article?.category ?? "Artículo técnico"}
                  </span>
                  <span className={isLicensedReference ? "text-blue-700" : "text-orange-700"}>
                    {isLicensedReference ? "Referencia con licencia" : "Recreación + lámina SVG"}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-black leading-tight text-slate-950">
                  {article?.title ?? illustration.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  <span className="font-bold text-slate-950">
                    {isLicensedReference ? `${illustration.title}.` : "Escena editorial conceptual."}
                  </span>{" "}
                  {isLicensedReference ? illustration.caption : illustration.editorialCaption}
                </p>
                {isLicensedReference ? (
                  <p className="mt-4 border-l border-slate-300 pl-4 font-mono text-[10px] leading-5 text-slate-600">
                    Crédito: <a className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href={illustration.creatorUrl} target="_blank" rel="noreferrer">{illustration.creator}</a>
                    {" · Fuente: "}<a className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href={illustration.sourceUrl} target="_blank" rel="noreferrer">{illustration.sourceName}</a>
                    {" · "}<a className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href={illustration.licenseUrl} target="_blank" rel="noreferrer">{illustration.licenseCode}</a>
                    {" · "}<a className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href={illustration.licenseVerificationUrl} target="_blank" rel="noreferrer">verificación</a>
                    {" del "}{formatVerifiedDate(illustration.verifiedAt)}
                  </p>
                ) : (
                  <div className="mt-4 border-l border-slate-300 pl-4">
                    <p className="font-mono text-[10px] leading-5 text-slate-600">
                      Método: {illustration.editorialMethod} · revisión del {formatVerifiedDate(illustration.createdAt)}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      No constituye evidencia de una prueba o resultado real. La lámina «{illustration.title}» se preparó mediante {illustration.method.toLowerCase()} y conserva la explicación rotulada del concepto.
                    </p>
                  </div>
                )}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-3 text-sm font-black">
                  <Link className="text-blue-700 hover:text-blue-900" href={`/blog/${illustration.slug}`}>
                    Abrir el artículo →
                  </Link>
                  {!isLicensedReference ? (
                    <a className="text-teal-700 hover:text-teal-950" href={illustration.image} target="_blank" rel="noreferrer">
                      Abrir lámina SVG →
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
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
            a la página original de la fotografía y al texto completo de la licencia. Las fichas no reproducen la imagen: cada fotografía permanece visible exclusivamente en su artículo.
          </p>
        </div>

        <ol className="mt-6 grid list-none gap-4 p-0 md:grid-cols-2">
          {photos.map((photo, index) => {
            const article = articleDetails.get(photo.slug);
            const isOwnPhoto = photo.licenseCode === "Contenido propio";

            return (
              <li
                key={photo.slug}
                id={`credito-${photo.slug}`}
                className="relative border-t-2 border-slate-950 bg-white py-5 pl-5 pr-2 [contain-intrinsic-size:320px] [content-visibility:auto]"
              >
                <span
                  className={`absolute left-0 top-5 h-14 w-1 ${isOwnPhoto ? "bg-orange-600" : "bg-teal-600"}`}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono text-[9px] font-bold uppercase tracking-[0.12em]">
                  <span className="text-teal-800">
                    Foto {String(index + 1).padStart(2, "0")} · {article?.category ?? "Artículo técnico"}
                  </span>
                  <span className={isOwnPhoto ? "text-orange-700" : "text-blue-700"}>
                    {isOwnPhoto ? "Fotografía propia" : "Fotografía con licencia"}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-black leading-tight text-slate-950">
                  {article?.title ?? photo.slug}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  <span className="font-bold text-slate-950">{photo.title}.</span>{" "}
                  {photo.caption}
                </p>
                <p className="mt-4 border-l border-slate-300 pl-4 font-mono text-[10px] leading-5 text-slate-600">
                  Crédito: <a className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href={photo.creatorUrl} target="_blank" rel="noreferrer">{photo.creator}</a>
                  {" · Fuente: "}<a className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href={photo.sourceUrl} target="_blank" rel="noreferrer">{photo.sourceName}</a>
                  {" · "}<a className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.licenseCode}</a>
                  {" · "}<a className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href={photo.licenseVerificationUrl} target="_blank" rel="noreferrer">verificación</a>
                  {" del "}<time dateTime={photo.verifiedAt}>{formatVerifiedDate(photo.verifiedAt)}</time>
                </p>
                <p className="mt-3 text-xs leading-5 text-slate-600">Tratamiento editorial: {photo.changes}</p>
                <div className="mt-5 border-t border-slate-200 pt-3">
                  <Link className="text-sm font-black text-blue-700 hover:text-blue-900" href={`/blog/${photo.slug}`}>
                    Abrir el artículo →
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <aside className="mt-12 border-l-4 border-teal-500 bg-teal-50 px-5 py-4 text-sm leading-6 text-slate-700">
        Si detectas una atribución incompleta o un cambio en las condiciones de
        una fuente, indícalo desde la página de <Link className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900" href="/contacto">contacto</Link>. Revisaremos el registro y la imagen publicada.
      </aside>
    </main>
  );
}
