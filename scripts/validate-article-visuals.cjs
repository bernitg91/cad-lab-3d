const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const articlesDirectory = path.join(projectRoot, "content", "articles");
const visualsDirectory = path.join(projectRoot, "public", "images", "articles");
const catalogPath = path.join(projectRoot, "lib", "article-visual-content.ts");
const expectedFiles = ["01-vista-general.svg", "02-proceso.svg", "03-comprobacion.svg"];

const articleSlugs = fs
  .readdirSync(articlesDirectory)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const content = fs.readFileSync(path.join(articlesDirectory, file), "utf8");
    const slug = content.match(/^slug:\s*["']?([^"'\r\n]+)["']?$/m)?.[1]?.trim();
    if (!slug) throw new Error(`Missing slug in ${file}`);
    return slug;
  })
  .sort();

const catalogSource = fs.readFileSync(catalogPath, "utf8");
const catalogSlugs = Array.from(catalogSource.matchAll(/^\s*"([^"]+)":\s*visual\(/gm), (match) => match[1]).sort();
const catalogPhrases = Array.from(catalogSource.matchAll(/"([^"]+)"/g), (match) => match[1]).filter(
  (value) => !articleSlugs.includes(value)
);

if (articleSlugs.length !== 42) throw new Error(`Expected 42 articles, found ${articleSlugs.length}`);
if (catalogSlugs.join("\n") !== articleSlugs.join("\n")) throw new Error("Visual catalog slugs do not match article slugs");
if (new Set(catalogPhrases).size !== catalogPhrases.length) throw new Error("Visual catalog contains repeated editorial phrases");

const imagePaths = articleSlugs.flatMap((slug) => expectedFiles.map((filename) => path.join(visualsDirectory, slug, filename)));
const hashes = new Set();
let totalBytes = 0;

for (const imagePath of imagePaths) {
  if (!fs.existsSync(imagePath)) throw new Error(`Missing visual: ${path.relative(projectRoot, imagePath)}`);
  const content = fs.readFileSync(imagePath);
  const svg = content.toString("utf8");
  if (!/width="1600" height="900"/.test(svg)) throw new Error(`Unexpected dimensions: ${path.relative(projectRoot, imagePath)}`);
  if (!/<title>.+<\/title><desc>.+<\/desc>/.test(svg)) throw new Error(`Missing SVG title or description: ${path.relative(projectRoot, imagePath)}`);
  if (content.byteLength > 250_000) throw new Error(`Visual exceeds 250 KB: ${path.relative(projectRoot, imagePath)}`);
  totalBytes += content.byteLength;
  hashes.add(crypto.createHash("sha256").update(content).digest("hex"));
}

if (imagePaths.length !== 126) throw new Error(`Expected 126 visual paths, found ${imagePaths.length}`);
if (hashes.size !== imagePaths.length) throw new Error(`Found ${imagePaths.length - hashes.size} repeated visual files by SHA-256`);

console.log(`Article visual audit passed: ${articleSlugs.length} articles, ${imagePaths.length} files, ${hashes.size} unique SHA-256 hashes, ${(totalBytes / 1024 / 1024).toFixed(2)} MB total.`);
