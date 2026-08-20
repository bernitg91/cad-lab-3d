const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const articlesDirectory = path.join(projectRoot, "content", "articles");
const renderedDirectory = path.join(projectRoot, ".next", "server", "app", "blog");
const expectedFiles = ["01-vista-general.svg", "02-proceso.svg", "03-comprobacion.svg"];

const slugs = fs
  .readdirSync(articlesDirectory)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const content = fs.readFileSync(path.join(articlesDirectory, file), "utf8");
    const slug = content.match(/^slug:\s*["']?([^"'\r\n]+)["']?$/m)?.[1]?.trim();
    if (!slug) throw new Error(`Missing slug in ${file}`);
    return slug;
  });

for (const slug of slugs) {
  const htmlPath = path.join(renderedDirectory, `${slug}.html`);
  if (!fs.existsSync(htmlPath)) throw new Error(`Missing rendered article: ${slug}`);
  const html = fs.readFileSync(htmlPath, "utf8");
  for (const filename of expectedFiles) {
    const imagePath = `/images/articles/${slug}/${filename}`;
    if (!html.includes(imagePath)) throw new Error(`Rendered article ${slug} is missing ${filename}`);
  }
  if (!html.includes("Ilustración original CADLAB3D")) throw new Error(`Rendered article ${slug} is missing visual credit`);
}

console.log(`Rendered article audit passed: ${slugs.length} pages contain their three exclusive visuals.`);
