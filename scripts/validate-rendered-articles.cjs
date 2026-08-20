const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const articlesDirectory = path.join(projectRoot, "content", "articles");
const photoManifestPath = path.join(projectRoot, "content", "article-photos.json");
const renderedDirectory = path.join(projectRoot, ".next", "server", "app", "blog");
const expectedTechnicalFiles = ["01-vista-general.svg", "02-proceso.svg", "03-comprobacion.svg"];

const slugs = fs
  .readdirSync(articlesDirectory)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const content = fs.readFileSync(path.join(articlesDirectory, file), "utf8");
    const slug = content.match(/^slug:\s*["']?([^"'\r\n]+)["']?$/m)?.[1]?.trim();
    if (!slug) throw new Error(`Missing slug in ${file}`);
    return slug;
  });

if (slugs.length !== 42) throw new Error(`Expected 42 rendered articles, found ${slugs.length}`);

const photoManifest = JSON.parse(fs.readFileSync(photoManifestPath, "utf8"));
const photosBySlug = new Map(photoManifest.map((photo) => [photo.slug, photo]));
if (photosBySlug.size !== slugs.length) throw new Error("Photo manifest does not contain exactly one entry per rendered article");

for (const slug of slugs) {
  const htmlPath = path.join(renderedDirectory, `${slug}.html`);
  if (!fs.existsSync(htmlPath)) throw new Error(`Missing rendered article: ${slug}`);
  const html = fs.readFileSync(htmlPath, "utf8");
  const photo = photosBySlug.get(slug);
  if (!photo) throw new Error(`Rendered article ${slug} has no photo manifest entry`);

  if (!html.includes(photo.image)) throw new Error(`Rendered article ${slug} is missing its exclusive WebP photo`);
  for (const filename of expectedTechnicalFiles) {
    const imagePath = `/images/articles/${slug}/${filename}`;
    if (!html.includes(imagePath)) throw new Error(`Rendered article ${slug} is missing ${filename}`);
  }
  if (!html.includes("Ilustración original CADLAB3D")) throw new Error(`Rendered article ${slug} is missing visual credit`);
  if (!html.includes(photo.creator)) throw new Error(`Rendered article ${slug} is missing photo creator credit`);
  if (!html.includes(photo.licenseCode)) throw new Error(`Rendered article ${slug} is missing photo license text`);
  if (!html.includes(photo.sourceUrl)) throw new Error(`Rendered article ${slug} is missing photo source URL`);
  if (!html.includes(photo.licenseUrl)) throw new Error(`Rendered article ${slug} is missing photo license URL`);
}

console.log(`Rendered article audit passed: ${slugs.length} pages contain one exclusive WebP photo, three exclusive SVG visuals, and their credits/licenses.`);
