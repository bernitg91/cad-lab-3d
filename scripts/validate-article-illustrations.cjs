const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const manifestPath = path.join(projectRoot, "content", "article-illustrations.json");
const technicalDirectory = path.join(projectRoot, "public", "images", "technical-illustrations");
const referenceDirectory = path.join(projectRoot, "public", "images", "article-references");
const articlesDirectory = path.join(projectRoot, "content", "articles");
const expectedLicenseUrls = new Map([
  ["CC BY 2.0", "https://creativecommons.org/licenses/by/2.0/"],
  ["CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/"]
]);

function fail(message) {
  throw new Error(`Article illustration audit failed: ${message}`);
}

function requireText(entry, field) {
  if (typeof entry[field] !== "string" || entry[field].trim().length === 0) {
    fail(`${entry.slug || "entrada sin slug"}: falta ${field}`);
  }
}

function requireHttps(entry, field) {
  requireText(entry, field);
  let url;
  try {
    url = new URL(entry[field]);
  } catch {
    fail(`${entry.slug}: ${field} no es una URL válida`);
  }
  if (url.protocol !== "https:") fail(`${entry.slug}: ${field} debe usar HTTPS`);
}

function requireDate(entry, field) {
  requireText(entry, field);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry[field]) || Number.isNaN(Date.parse(`${entry[field]}T00:00:00Z`))) {
    fail(`${entry.slug}: ${field} debe ser una fecha YYYY-MM-DD válida`);
  }
}

function readPngDimensions(buffer, relativePath) {
  if (buffer.length < 24 || buffer.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
    fail(`${relativePath} no es un PNG válido`);
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function readJpegDimensions(buffer, relativePath) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) fail(`${relativePath} no es un JPEG válido`);
  const sofMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  let offset = 2;
  while (offset + 8 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset];
    offset += 1;
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (marker === 0xd9 || marker === 0xda || offset + 2 > buffer.length) break;
    const length = buffer.readUInt16BE(offset);
    if (length < 2 || offset + length > buffer.length) fail(`${relativePath} contiene un segmento JPEG inválido`);
    if (sofMarkers.has(marker)) {
      return { width: buffer.readUInt16BE(offset + 5), height: buffer.readUInt16BE(offset + 3) };
    }
    offset += length;
  }
  fail(`${relativePath} no contiene dimensiones JPEG legibles`);
}

function readSvgDimensions(buffer, relativePath) {
  const source = buffer.toString("utf8");
  if (!/^\s*<svg\b/i.test(source)) fail(`${relativePath} no es un SVG válido`);
  if (/<(?:script|foreignObject)\b/i.test(source) || /(?:href|xlink:href)\s*=\s*["']https?:/i.test(source)) {
    fail(`${relativePath} contiene código o recursos externos no permitidos`);
  }
  if (!/<title(?:\s[^>]*)?>[^<]+<\/title>/i.test(source) || !/<desc(?:\s[^>]*)?>[^<]+<\/desc>/i.test(source)) {
    fail(`${relativePath} debe incluir title y desc accesibles`);
  }
  const width = Number(source.match(/<svg\b[^>]*\bwidth=["'](\d+)["']/i)?.[1]);
  const height = Number(source.match(/<svg\b[^>]*\bheight=["'](\d+)["']/i)?.[1]);
  if (!Number.isInteger(width) || !Number.isInteger(height)) fail(`${relativePath} no declara dimensiones enteras`);
  return { width, height };
}

if (!fs.existsSync(manifestPath)) fail("falta content/article-illustrations.json");
if (!fs.existsSync(technicalDirectory)) fail("falta public/images/technical-illustrations");
if (!fs.existsSync(referenceDirectory)) fail("falta public/images/article-references");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
if (!Array.isArray(manifest) || manifest.length !== 7) fail(`se esperaban 7 registros y hay ${manifest.length}`);

const articleSlugs = new Set(
  fs.readdirSync(articlesDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => fs.readFileSync(path.join(articlesDirectory, filename), "utf8"))
    .map((content) => content.match(/^slug:\s*["']?([^"'\r\n]+)["']?$/m)?.[1]?.trim())
    .filter(Boolean)
);

const seenSlugs = new Set();
const seenImages = new Set();
const seenHashes = new Set();
const seenSources = new Set();
let originalDiagramCount = 0;
let referenceCount = 0;
let totalBytes = 0;

for (const entry of manifest) {
  for (const field of ["slug", "image", "title", "alt", "caption", "sha256", "method"]) requireText(entry, field);
  if (!articleSlugs.has(entry.slug)) fail(`slug desconocido: ${entry.slug}`);
  if (seenSlugs.has(entry.slug)) fail(`slug duplicado: ${entry.slug}`);
  if (seenImages.has(entry.image)) fail(`ruta duplicada: ${entry.image}`);
  if (seenHashes.has(entry.sha256)) fail(`hash duplicado: ${entry.slug}`);
  seenSlugs.add(entry.slug);
  seenImages.add(entry.image);
  seenHashes.add(entry.sha256);

  if (!Number.isInteger(entry.width) || entry.width < 550 || !Number.isInteger(entry.height) || entry.height < 360) {
    fail(`${entry.slug}: dimensiones declaradas insuficientes`);
  }
  if (!/^[a-f0-9]{64}$/.test(entry.sha256)) fail(`${entry.slug}: SHA-256 inválido`);
  if (entry.alt.length < 70 || entry.caption.length < 90) fail(`${entry.slug}: texto descriptivo insuficiente`);

  let expectedDirectory;
  if (entry.kind === "original-diagram") {
    originalDiagramCount += 1;
    expectedDirectory = technicalDirectory;
    if (!entry.image.startsWith("/images/technical-illustrations/") || !entry.image.endsWith("-v3.svg")) {
      fail(`${entry.slug}: ruta vectorial no versionada`);
    }
    if (entry.method !== "Dibujo vectorial original y revisión técnica") fail(`${entry.slug}: método vectorial incorrecto`);
    requireDate(entry, "createdAt");
    if (!Array.isArray(entry.readingGuide) || entry.readingGuide.length !== 3 || entry.readingGuide.some((item) => typeof item !== "string" || item.length < 45)) {
      fail(`${entry.slug}: la guía de lectura debe contener tres indicaciones específicas`);
    }
    if (entry.creator || entry.licenseCode) fail(`${entry.slug}: un esquema original no debe afirmar una licencia externa`);
  } else if (entry.kind === "licensed-reference-media") {
    referenceCount += 1;
    expectedDirectory = referenceDirectory;
    if (!entry.image.startsWith("/images/article-references/") || !/-v[23]\.(?:jpg|png)$/.test(entry.image)) {
      fail(`${entry.slug}: ruta externa no versionada`);
    }
    for (const field of ["creator", "sourceName", "licenseCode", "licenseName", "changes"]) requireText(entry, field);
    for (const field of ["creatorUrl", "sourceUrl", "originalUrl", "licenseUrl", "licenseVerificationUrl"]) requireHttps(entry, field);
    requireDate(entry, "verifiedAt");
    if (seenSources.has(entry.sourceUrl)) fail(`${entry.slug}: fuente externa repetida`);
    seenSources.add(entry.sourceUrl);
    if (expectedLicenseUrls.get(entry.licenseCode) !== entry.licenseUrl) fail(`${entry.slug}: licencia externa no admitida o URL incorrecta`);
  } else {
    fail(`${entry.slug}: tipo visual desconocido`);
  }

  const filePath = path.join(projectRoot, "public", entry.image.replace(/^\//, ""));
  if (path.dirname(path.resolve(filePath)) !== path.resolve(expectedDirectory)) fail(`${entry.slug}: la ruta sale de su biblioteca visual`);
  if (!fs.existsSync(filePath)) fail(`${entry.slug}: falta ${entry.image}`);
  const buffer = fs.readFileSync(filePath);
  if (buffer.length > 4_000_000) fail(`${entry.slug}: archivo mayor de 4 MB`);
  const relativePath = path.relative(projectRoot, filePath).replaceAll("\\", "/");
  const extension = path.extname(filePath).toLowerCase();
  const dimensions = extension === ".png"
    ? readPngDimensions(buffer, relativePath)
    : extension === ".jpg" || extension === ".jpeg"
      ? readJpegDimensions(buffer, relativePath)
      : extension === ".svg"
        ? readSvgDimensions(buffer, relativePath)
        : fail(`${relativePath} usa un formato no admitido`);
  if (dimensions.width !== entry.width || dimensions.height !== entry.height) {
    fail(`${entry.slug}: el archivo mide ${dimensions.width}x${dimensions.height}, pero declara ${entry.width}x${entry.height}`);
  }
  const hash = crypto.createHash("sha256").update(buffer).digest("hex");
  if (hash !== entry.sha256) fail(`${entry.slug}: SHA-256 no coincide`);
  totalBytes += buffer.length;
}

if (originalDiagramCount !== 4 || referenceCount !== 3) fail(`la mezcla debe ser 4 láminas originales y 3 referencias; hay ${originalDiagramCount} y ${referenceCount}`);

for (const directory of [technicalDirectory, referenceDirectory]) {
  for (const filename of fs.readdirSync(directory).filter((name) => fs.statSync(path.join(directory, name)).isFile())) {
    const relative = `/${path.relative(path.join(projectRoot, "public"), path.join(directory, filename)).replaceAll("\\", "/")}`;
    if (!seenImages.has(relative)) fail(`archivo no inventariado: ${relative}`);
  }
}

console.log(`Article illustration audit passed: ${originalDiagramCount} original vector diagrams, ${referenceCount} licensed references, unique files and verified SHA-256 hashes, ${(totalBytes / 1024 / 1024).toFixed(2)} MB total.`);
