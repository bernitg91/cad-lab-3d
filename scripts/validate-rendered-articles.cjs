const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const articlesDirectory = path.join(projectRoot, "content", "articles");
const photoManifestPath = path.join(projectRoot, "content", "article-photos.json");
const redirectsPath = path.join(projectRoot, "content", "article-redirects.json");
const renderedDirectory = path.join(projectRoot, ".next", "server", "app", "blog");

const allSlugs = fs
  .readdirSync(articlesDirectory)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const content = fs.readFileSync(path.join(articlesDirectory, file), "utf8");
    const slug = content.match(/^slug:\s*["']?([^"'\r\n]+)["']?$/m)?.[1]?.trim();
    if (!slug) throw new Error(`Missing slug in ${file}`);
    return slug;
  });

const redirects = JSON.parse(fs.readFileSync(redirectsPath, "utf8"));
const slugs = allSlugs.filter((slug) => !redirects[slug]);

if (allSlugs.length !== 42) throw new Error(`Expected 42 source articles, found ${allSlugs.length}`);

const photoManifest = JSON.parse(fs.readFileSync(photoManifestPath, "utf8"));
const photosBySlug = new Map(photoManifest.map((photo) => [photo.slug, photo]));
if (photosBySlug.size !== allSlugs.length) throw new Error("Photo manifest does not contain exactly one entry per source article");

for (const slug of slugs) {
  const htmlPath = path.join(renderedDirectory, `${slug}.html`);
  if (!fs.existsSync(htmlPath)) throw new Error(`Missing rendered article: ${slug}`);
  const html = fs.readFileSync(htmlPath, "utf8");
  const photo = photosBySlug.get(slug);
  if (!photo) throw new Error(`Rendered article ${slug} has no photo manifest entry`);

  if (!html.includes(photo.image)) throw new Error(`Rendered article ${slug} is missing its exclusive WebP photo`);
  if (!html.includes(photo.creator)) throw new Error(`Rendered article ${slug} is missing photo creator credit`);
  if (!html.includes(photo.licenseCode)) throw new Error(`Rendered article ${slug} is missing photo license text`);
  if (!html.includes(photo.sourceUrl)) throw new Error(`Rendered article ${slug} is missing photo source URL`);
  if (!html.includes(photo.licenseUrl)) throw new Error(`Rendered article ${slug} is missing photo license URL`);
}

console.log(`Rendered article audit passed: ${slugs.length} curated pages contain an exclusive WebP photo and its credits/licenses; ${Object.keys(redirects).length} overlapping articles redirect to stronger resources.`);
