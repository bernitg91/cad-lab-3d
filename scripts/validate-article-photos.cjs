const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const articlesDirectory = path.join(projectRoot, "content", "articles");
const manifestPath = path.join(projectRoot, "content", "article-photos.json");
const photosDirectory = path.join(projectRoot, "public", "images", "article-photos");
const expectedArticleCount = 42;

const allowedLicenses = new Map([
  ["CC0 1.0", "https://creativecommons.org/publicdomain/zero/1.0/"],
  ["PDM 1.0", "https://creativecommons.org/publicdomain/mark/1.0/"],
  ["CC BY 2.0", "https://creativecommons.org/licenses/by/2.0/"],
  ["Contenido propio", "https://cadlab3d.com/licencias-imagenes"]
]);

function fail(message) {
  throw new Error(`[article photos] ${message}`);
}

function readArticleSlugs() {
  const articleFiles = fs.readdirSync(articlesDirectory).filter((file) => file.endsWith(".md"));
  const slugs = articleFiles.map((file) => {
    const content = fs.readFileSync(path.join(articlesDirectory, file), "utf8");
    const slug = content.match(/^slug:\s*["']?([^"'\r\n]+)["']?$/m)?.[1]?.trim();
    if (!slug) fail(`falta el slug en content/articles/${file}`);
    return slug;
  });

  if (slugs.length !== expectedArticleCount) {
    fail(`se esperaban ${expectedArticleCount} artículos y se encontraron ${slugs.length}`);
  }
  if (new Set(slugs).size !== slugs.length) fail("hay slugs duplicados entre los artículos");

  return slugs.sort();
}

function readManifest() {
  if (!fs.existsSync(manifestPath)) fail("falta content/article-photos.json");

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (error) {
    fail(`content/article-photos.json no es JSON válido: ${error.message}`);
  }

  if (!Array.isArray(manifest)) fail("content/article-photos.json debe contener un array");
  if (manifest.length !== expectedArticleCount) {
    fail(`se esperaban ${expectedArticleCount} entradas en el manifiesto y se encontraron ${manifest.length}`);
  }

  return manifest;
}

function requireNonEmptyString(entry, field) {
  if (typeof entry[field] !== "string" || entry[field].trim().length === 0) {
    fail(`${entry.slug || "entrada sin slug"}: falta el campo de texto ${field}`);
  }
}

function requireHttpsUrl(entry, field) {
  requireNonEmptyString(entry, field);
  let url;
  try {
    url = new URL(entry[field]);
  } catch {
    fail(`${entry.slug}: ${field} no es una URL válida`);
  }
  if (url.protocol !== "https:") fail(`${entry.slug}: ${field} debe usar HTTPS`);
}

function readUint24LE(buffer, offset) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function readWebpDimensions(buffer, relativePath) {
  if (
    buffer.length < 30 ||
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    fail(`${relativePath} no tiene MIME WebP (cabecera RIFF/WEBP inválida)`);
  }

  const declaredRiffSize = buffer.readUInt32LE(4) + 8;
  if (declaredRiffSize > buffer.length) fail(`${relativePath} está truncado según su cabecera RIFF`);

  const chunkType = buffer.toString("ascii", 12, 16);
  if (chunkType === "VP8X") {
    return {
      width: readUint24LE(buffer, 24) + 1,
      height: readUint24LE(buffer, 27) + 1
    };
  }

  if (chunkType === "VP8 ") {
    if (buffer[23] !== 0x9d || buffer[24] !== 0x01 || buffer[25] !== 0x2a) {
      fail(`${relativePath} contiene una cabecera VP8 inválida`);
    }
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff
    };
  }

  if (chunkType === "VP8L") {
    if (buffer[20] !== 0x2f) fail(`${relativePath} contiene una cabecera VP8L inválida`);
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >>> 14) & 0x3fff) + 1
    };
  }

  fail(`${relativePath} usa un tipo de WebP no admitido: ${JSON.stringify(chunkType)}`);
}

const articleSlugs = readArticleSlugs();
const manifest = readManifest();
const manifestSlugs = manifest.map((entry) => entry.slug).sort();

if (new Set(manifestSlugs).size !== manifestSlugs.length) fail("hay slugs duplicados en el manifiesto fotográfico");
if (manifestSlugs.join("\n") !== articleSlugs.join("\n")) {
  const missing = articleSlugs.filter((slug) => !manifestSlugs.includes(slug));
  const unknown = manifestSlugs.filter((slug) => !articleSlugs.includes(slug));
  fail(`los slugs del manifiesto no coinciden con los artículos; faltan: ${missing.join(", ") || "ninguno"}; sobran: ${unknown.join(", ") || "ninguno"}`);
}

if (!fs.existsSync(photosDirectory)) fail("falta public/images/article-photos");
const directoryFiles = fs.readdirSync(photosDirectory).filter((name) => fs.statSync(path.join(photosDirectory, name)).isFile());
if (directoryFiles.length !== expectedArticleCount) {
  fail(`se esperaban ${expectedArticleCount} archivos fotográficos y se encontraron ${directoryFiles.length}`);
}

const requiredTextFields = [
  "slug",
  "image",
  "alt",
  "caption",
  "sha256",
  "title",
  "creator",
  "sourceName",
  "licenseCode",
  "licenseName",
  "licenseVerificationMethod",
  "changes",
  "verifiedAt"
];
const requiredUrlFields = ["creatorUrl", "sourceUrl", "originalUrl", "licenseUrl", "licenseVerificationUrl"];
const hashes = new Set();
const imagePaths = new Set();
const externalSourceUrls = new Set();
const altTexts = new Set();
const captions = new Set();
let totalBytes = 0;

for (const entry of manifest) {
  for (const field of requiredTextFields) requireNonEmptyString(entry, field);
  for (const field of requiredUrlFields) requireHttpsUrl(entry, field);

  if (altTexts.has(entry.alt)) fail(`${entry.slug}: texto alternativo repetido`);
  if (captions.has(entry.caption)) fail(`${entry.slug}: pie editorial repetido`);
  altTexts.add(entry.alt);
  captions.add(entry.caption);

  const expectedImage = `/images/article-photos/${entry.slug}.webp`;
  if (entry.image !== expectedImage) fail(`${entry.slug}: image debe ser ${expectedImage}`);
  if (imagePaths.has(entry.image)) fail(`${entry.slug}: ruta de imagen duplicada`);
  imagePaths.add(entry.image);

  if (!Number.isInteger(entry.width) || entry.width < 640) fail(`${entry.slug}: width debe ser un entero de al menos 640 px`);
  if (!Number.isInteger(entry.height) || entry.height < 360) fail(`${entry.slug}: height debe ser un entero de al menos 360 px`);
  if (!/^[a-f0-9]{64}$/.test(entry.sha256)) fail(`${entry.slug}: sha256 no es un hash hexadecimal válido`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.verifiedAt) || Number.isNaN(Date.parse(`${entry.verifiedAt}T00:00:00Z`))) {
    fail(`${entry.slug}: verifiedAt debe ser una fecha YYYY-MM-DD válida`);
  }

  const expectedLicenseUrl = allowedLicenses.get(entry.licenseCode);
  if (!expectedLicenseUrl) fail(`${entry.slug}: licencia no admitida para monetización: ${entry.licenseCode}`);
  if (entry.licenseUrl !== expectedLicenseUrl) {
    fail(`${entry.slug}: licenseUrl no corresponde a ${entry.licenseCode}`);
  }

  const isOwnContent = entry.licenseCode === "Contenido propio";
  if (isOwnContent) {
    if (entry.creator !== "CADLAB3D" || entry.sourceName !== "CADLAB3D") {
      fail(`${entry.slug}: el contenido propio debe identificar a CADLAB3D como creador y fuente`);
    }
  } else {
    if (typeof entry.openverseId !== "string" || !/^[a-f0-9-]{36}$/i.test(entry.openverseId)) {
      fail(`${entry.slug}: la fotografía externa debe conservar un openverseId válido`);
    }
    if (externalSourceUrls.has(entry.sourceUrl)) fail(`${entry.slug}: sourceUrl externa duplicada`);
    externalSourceUrls.add(entry.sourceUrl);

    const expectedVerificationUrl = entry.sourceName === "StockSnap"
      ? "https://stocksnap.io/license"
      : entry.sourceName === "WordPress Photo Directory"
        ? "https://wordpress.org/photos/license/"
        : entry.sourceUrl;
    if (entry.licenseVerificationUrl !== expectedVerificationUrl) {
      fail(`${entry.slug}: la URL de comprobación de licencia no corresponde a la fuente`);
    }
  }

  const filePath = path.join(projectRoot, "public", entry.image.replace(/^\//, ""));
  const expectedFilePath = path.join(photosDirectory, `${entry.slug}.webp`);
  if (path.resolve(filePath) !== path.resolve(expectedFilePath)) fail(`${entry.slug}: la ruta resuelta sale de la biblioteca fotográfica`);
  if (!fs.existsSync(filePath)) fail(`${entry.slug}: falta ${entry.image}`);

  const buffer = fs.readFileSync(filePath);
  if (buffer.length > 350_000) fail(`${entry.slug}: el WebP supera 350 KB`);
  const relativePath = path.relative(projectRoot, filePath).replaceAll("\\", "/");
  const dimensions = readWebpDimensions(buffer, relativePath);
  if (dimensions.width !== entry.width || dimensions.height !== entry.height) {
    fail(`${entry.slug}: el WebP mide ${dimensions.width}x${dimensions.height}, pero el manifiesto declara ${entry.width}x${entry.height}`);
  }

  const actualHash = crypto.createHash("sha256").update(buffer).digest("hex");
  if (actualHash !== entry.sha256) fail(`${entry.slug}: el SHA-256 no coincide con el archivo`);
  if (hashes.has(actualHash)) fail(`${entry.slug}: archivo repetido detectado por SHA-256`);
  hashes.add(actualHash);
  totalBytes += buffer.length;
}

const expectedFiles = new Set(manifest.map((entry) => `${entry.slug}.webp`));
for (const filename of directoryFiles) {
  if (!expectedFiles.has(filename)) fail(`archivo no inventariado en la biblioteca: public/images/article-photos/${filename}`);
}

if (hashes.size !== expectedArticleCount) fail(`se esperaban ${expectedArticleCount} hashes SHA-256 únicos y se encontraron ${hashes.size}`);

console.log(
  `Article photo audit passed: ${articleSlugs.length} articles, ${manifest.length} manifest entries, ${directoryFiles.length} WebP files, ${hashes.size} unique SHA-256 hashes, ${(totalBytes / 1024 / 1024).toFixed(2)} MB total.`
);
