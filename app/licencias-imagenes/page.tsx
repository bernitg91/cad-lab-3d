import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllArticlePhotos } from "@/lib/article-photos";
import { getAllArticles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/seo";
import type { ArticlePhotoLicenseCode } from "@/types/article";

export const metadata: Metadata = createPageMetadata({
  title: "Licencias y créditos de imágenes",
  description:
    "Créditos, autores, fuentes, licencias y transformaciones de las fotografías publicadas en los artículos de CAD Lab 3D.",
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
    code: "Contenido propio",
    title: "Contenido original CADLAB3D",
    description:
      "Fotografías e imágenes producidas para este sitio. Su inclusión aquí documenta el origen; no concede por sí sola permiso para reutilizarlas fuera de CADLAB3D."
  }
];

function formatVerifiedDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export default function ImageLicensesPage() {
  const photos = getAllArticlePhotos();
  const articleTitles = new Map(
    getAllArticles().map((article) => [article.slug, article.title])
  );
  const licenseCounts = new Map<ArticlePhotoLicenseCode, number>();

  for (const photo of photos) {
    licenseCounts.set(
      photo.licenseCode,
      (licenseCounts.get(photo.licenseCode) ?? 0) + 1
    );
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
          Cada imagen editorial se guarda en el sitio junto con su autor,
          fuente, licencia, transformación y fecha de comprobación. Esta página
          reúne los <strong className="font-extrabold text-slate-950">{photos.length} registros visuales</strong> utilizados en los artículos.
        </p>
      </header>

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
            Registro completo · {photos.length} de {photos.length}
          </p>
          <h2 id="credit-register" className="mt-2 font-display text-3xl font-black text-slate-950">
            Créditos por artículo
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Los enlaces conducen al artículo, al perfil de la persona autora,
            a la página original de la imagen y al texto completo de la licencia.
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
                    {" · Foto de "}
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
