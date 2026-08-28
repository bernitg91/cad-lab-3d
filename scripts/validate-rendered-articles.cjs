const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const articlesDirectory = path.join(projectRoot, "content", "articles");
const photoManifestPath = path.join(projectRoot, "content", "article-photos.json");
const illustrationManifestPath = path.join(projectRoot, "content", "article-illustrations.json");
const redirectsPath = path.join(projectRoot, "content", "article-redirects.json");
const renderedDirectory = path.join(projectRoot, ".next", "server", "app", "blog");

const sourceArticles = fs
  .readdirSync(articlesDirectory)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const content = fs.readFileSync(path.join(articlesDirectory, file), "utf8");
    const slug = content.match(/^slug:\s*["']?([^"'\r\n]+)["']?$/m)?.[1]?.trim();
    if (!slug) throw new Error(`Missing slug in ${file}`);
    return { slug, content };
  });
const allSlugs = sourceArticles.map((article) => article.slug);
const sourceBySlug = new Map(sourceArticles.map((article) => [article.slug, article.content]));

const redirects = JSON.parse(fs.readFileSync(redirectsPath, "utf8"));
const slugs = allSlugs.filter((slug) => !redirects[slug]);

if (allSlugs.length !== 42) throw new Error(`Expected 42 source articles, found ${allSlugs.length}`);

const photoManifest = JSON.parse(fs.readFileSync(photoManifestPath, "utf8"));
const photosBySlug = new Map(photoManifest.map((photo) => [photo.slug, photo]));
const illustrationManifest = JSON.parse(fs.readFileSync(illustrationManifestPath, "utf8"));
const illustrationsBySlug = new Map(illustrationManifest.map((illustration) => [illustration.slug, illustration]));
if (photosBySlug.size !== 10) throw new Error(`Expected 10 documentary photo entries, found ${photosBySlug.size}`);
if (illustrationsBySlug.size !== 7) throw new Error(`Expected 7 article illustration entries, found ${illustrationsBySlug.size}`);
for (const slug of photosBySlug.keys()) {
  if (!slugs.includes(slug)) throw new Error(`Photo manifest contains an inactive article: ${slug}`);
  if (illustrationsBySlug.has(slug)) throw new Error(`Article ${slug} has both a documentary photo and a replacement illustration`);
}
for (const slug of illustrationsBySlug.keys()) {
  if (!slugs.includes(slug)) throw new Error(`Illustration manifest contains an inactive article: ${slug}`);
}
for (const slug of slugs) {
  if (!photosBySlug.has(slug) && !illustrationsBySlug.has(slug)) {
    throw new Error(`Active article ${slug} has neither a documentary photo nor an illustration`);
  }
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

for (const slug of slugs) {
  const htmlPath = path.join(renderedDirectory, `${slug}.html`);
  if (!fs.existsSync(htmlPath)) throw new Error(`Missing rendered article: ${slug}`);
  const html = fs.readFileSync(htmlPath, "utf8");
  const photo = photosBySlug.get(slug);
  const illustration = illustrationsBySlug.get(slug);
  const source = sourceBySlug.get(slug);
  const headingIds = Array.from(source.matchAll(/^(?:##|###)\s+(.+)$/gm)).map((match) => slugifyHeading(match[1].trim()));
  if (html.includes("<p>## ") || html.includes("<p>### ")) {
    throw new Error(`Rendered article ${slug} contains literal Markdown headings inside a paragraph`);
  }
  for (const headingId of headingIds) {
    if (!html.includes(`id="${headingId}"`)) {
      throw new Error(`Rendered article ${slug} is missing heading anchor #${headingId}`);
    }
  }
  if (html.includes("He preparado este texto para ordenar una decisión concreta")) {
    throw new Error(`Rendered article ${slug} still contains the repeated legacy author note`);
  }
  if (!html.includes("Revisión editorial:")) {
    throw new Error(`Rendered article ${slug} is missing its category-specific editorial note`);
  }
  const isDocumentaryPhoto = Boolean(photo && (photo.openverseId || photo.originalUrl.includes("/images/impresion-3d-personalizada/")));

  if (isDocumentaryPhoto) {
    if (!html.includes(photo.image)) throw new Error(`Rendered article ${slug} is missing its documentary WebP photo`);
    if (!html.includes(photo.creator)) throw new Error(`Rendered article ${slug} is missing photo creator credit`);
    if (!html.includes(photo.licenseCode)) throw new Error(`Rendered article ${slug} is missing photo license text`);
    if (!html.includes(photo.sourceUrl)) throw new Error(`Rendered article ${slug} is missing photo source URL`);
    if (!html.includes(photo.licenseUrl)) throw new Error(`Rendered article ${slug} is missing photo license URL`);
  } else if (illustration?.kind === "licensed-reference-media") {
    if (!html.includes("Referencia externa")) throw new Error(`Rendered article ${slug} must identify its external reference`);
    if (!html.includes(illustration.image)) throw new Error(`Rendered article ${slug} is missing its licensed reference image`);
    if (!html.includes(illustration.creator)) throw new Error(`Rendered article ${slug} is missing reference creator credit`);
    if (!html.includes(illustration.sourceUrl)) throw new Error(`Rendered article ${slug} is missing reference source URL`);
    if (!html.includes(illustration.licenseCode) || !html.includes(illustration.licenseUrl)) {
      throw new Error(`Rendered article ${slug} is missing reference license details`);
    }
    if (!html.includes("no documenta una prueba realizada para este artículo")) {
      throw new Error(`Rendered article ${slug} must distinguish the reference from a firsthand test`);
    }
  } else if (illustration?.kind === "original-diagram") {
    if (!html.includes("no documenta una prueba real")) {
      throw new Error(`Rendered article ${slug} must distinguish the recreation from a documented test`);
    }
    if (!html.includes(illustration.editorialImage)) throw new Error(`Rendered article ${slug} is missing its editorial recreation PNG`);
    if (!html.includes("Recreación editorial fotorrealista")) {
      throw new Error(`Rendered article ${slug} is missing the editorial recreation label`);
    }
    if (!html.includes(illustration.editorialMethod)) {
      throw new Error(`Rendered article ${slug} is missing its AI/editorial recreation disclosure`);
    }
    if (!/recreaci(?:ó|&oacute;|&#xF3;|&#243;)n/i.test(html) || !/(?:\bIA\b|inteligencia artificial)/i.test(html)) {
      throw new Error(`Rendered article ${slug} must explicitly disclose that the editorial recreation uses AI`);
    }
    if (!html.includes(illustration.image)) throw new Error(`Rendered article ${slug} is missing its complementary technical SVG`);
    if (!html.includes("Lámina técnica complementaria")) throw new Error(`Rendered article ${slug} is missing the complementary illustration label`);
    if (!html.includes(illustration.method)) throw new Error(`Rendered article ${slug} is missing the illustration-method disclosure`);
    for (const guideItem of illustration.readingGuide) {
      if (!html.includes(guideItem)) throw new Error(`Rendered article ${slug} is missing a reading-guide item`);
    }
  } else {
    throw new Error(`Rendered article ${slug} has no valid documentary or illustrative visual`);
  }
}

const originalDiagramCount = illustrationManifest.filter((entry) => entry.kind === "original-diagram").length;
const referenceCount = illustrationManifest.length - originalDiagramCount;
console.log(`Rendered article audit passed: ${slugs.length} curated pages distinguish documentary photographs, ${referenceCount} licensed references, ${originalDiagramCount} editorial recreations and ${originalDiagramCount} companion technical diagrams; ${Object.keys(redirects).length} overlapping articles redirect to stronger resources.`);
