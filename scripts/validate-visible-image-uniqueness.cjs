const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const renderedDirectory = path.join(projectRoot, ".next", "server", "app");
const photoManifestPath = path.join(projectRoot, "content", "article-photos.json");
const siteOrigin = "https://cadlab3d.com";

function fail(message) {
  throw new Error(`[visible image uniqueness] ${message}`);
}

function decodeHtmlAttribute(value) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/(?:&apos;|&#39;|&#x27;)/gi, "'")
    .replace(/&#(\d+);/g, (_, codePoint) => String.fromCodePoint(Number(codePoint)))
    .replace(/&#x([a-f0-9]+);/gi, (_, codePoint) => String.fromCodePoint(Number.parseInt(codePoint, 16)));
}

function decodePathname(pathname) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    fail(`no se puede decodificar la ruta ${JSON.stringify(pathname)}`);
  }
}

function normalizeLocalImageTarget(target) {
  const decodedTarget = decodeHtmlAttribute(target).trim();
  if (!decodedTarget || /^(?:data|blob):/i.test(decodedTarget)) return undefined;

  let url;
  try {
    url = new URL(decodedTarget, `${siteOrigin}/`);
  } catch {
    fail(`URL de imagen no válida: ${JSON.stringify(decodedTarget)}`);
  }

  if (url.origin !== siteOrigin) return undefined;
  const pathname = path.posix.normalize(decodePathname(url.pathname).replaceAll("\\", "/"));
  return pathname.startsWith("/images/") ? pathname : undefined;
}

function normalizeImageSource(source) {
  const decodedSource = decodeHtmlAttribute(source).trim();
  if (!decodedSource) return undefined;

  let sourceUrl;
  try {
    sourceUrl = new URL(decodedSource, `${siteOrigin}/`);
  } catch {
    fail(`src de <img> no válido: ${JSON.stringify(decodedSource)}`);
  }

  if (sourceUrl.origin === siteOrigin && sourceUrl.pathname === "/_next/image") {
    const optimizedTarget = sourceUrl.searchParams.get("url");
    if (!optimizedTarget) fail(`falta el parámetro url en ${JSON.stringify(decodedSource)}`);
    return normalizeLocalImageTarget(optimizedTarget);
  }

  return normalizeLocalImageTarget(decodedSource);
}

function listHtmlFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listHtmlFiles(entryPath));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(entryPath);
  }
  return files;
}

function routeFromHtmlPath(htmlPath) {
  let relative = path.relative(renderedDirectory, htmlPath).replaceAll("\\", "/");
  relative = relative.replace(/\.html$/, "");
  if (relative === "index") return "/";
  if (relative.endsWith("/index")) relative = relative.slice(0, -"/index".length);
  return `/${relative}`;
}

function readPhotoFamilies() {
  if (!fs.existsSync(photoManifestPath)) fail("falta content/article-photos.json");

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(photoManifestPath, "utf8"));
  } catch (error) {
    fail(`content/article-photos.json no es JSON válido: ${error.message}`);
  }
  if (!Array.isArray(manifest)) fail("content/article-photos.json debe contener un array");

  const familyByPath = new Map();
  const ownerByFamily = new Map();

  function addFamilyMember(imagePath, family, slug) {
    const existingFamily = familyByPath.get(imagePath);
    if (existingFamily && existingFamily !== family) {
      fail(`${imagePath} pertenece a dos familias fotográficas: ${existingFamily} y ${family}`);
    }
    familyByPath.set(imagePath, family);
    ownerByFamily.set(family, slug);
  }

  for (const photo of manifest) {
    if (typeof photo.slug !== "string" || typeof photo.image !== "string" || typeof photo.originalUrl !== "string") {
      fail("cada foto debe declarar slug, image y originalUrl");
    }
    const imagePath = normalizeLocalImageTarget(photo.image);
    if (!imagePath) fail(`${photo.slug}: image debe ser una ruta local bajo /images/`);
    const family = imagePath;
    addFamilyMember(imagePath, family, photo.slug);

    let originalUrl;
    try {
      originalUrl = new URL(photo.originalUrl);
    } catch {
      fail(`${photo.slug}: originalUrl no es una URL válida`);
    }
    if (originalUrl.origin === siteOrigin && originalUrl.pathname.startsWith("/images/")) {
      const originalPath = normalizeLocalImageTarget(photo.originalUrl);
      if (!originalPath) fail(`${photo.slug}: no se pudo normalizar originalUrl`);
      addFamilyMember(originalPath, family, photo.slug);
    }
  }

  return { familyByPath, ownerByFamily };
}

if (!fs.existsSync(renderedDirectory)) fail("falta .next/server/app; ejecuta next build antes del validador");

const htmlFiles = listHtmlFiles(renderedDirectory);
if (htmlFiles.length === 0) fail("no se encontraron HTML generados bajo .next/server/app");

const { familyByPath, ownerByFamily } = readPhotoFamilies();
const occurrences = [];

for (const htmlPath of htmlFiles) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const route = routeFromHtmlPath(htmlPath);
  const imageTags = html.match(/<img\b[^>]*>/gi) ?? [];

  for (const tag of imageTags) {
    const sourceMatch = tag.match(/\ssrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    if (!sourceMatch) continue;
    const source = sourceMatch[1] ?? sourceMatch[2] ?? sourceMatch[3];
    const imagePath = normalizeImageSource(source);
    if (!imagePath) continue;

    const family = familyByPath.get(imagePath) ?? imagePath;
    occurrences.push({
      family,
      familyOwner: ownerByFamily.get(family),
      imagePath,
      route,
      htmlPath: path.relative(projectRoot, htmlPath).replaceAll("\\", "/")
    });
  }
}

const occurrencesByFamily = new Map();
for (const occurrence of occurrences) {
  const familyOccurrences = occurrencesByFamily.get(occurrence.family) ?? [];
  familyOccurrences.push(occurrence);
  occurrencesByFamily.set(occurrence.family, familyOccurrences);
}

const reusedFamilies = [...occurrencesByFamily.entries()].filter(([, familyOccurrences]) => familyOccurrences.length > 1);
if (reusedFamilies.length > 0) {
  const details = reusedFamilies.map(([family, familyOccurrences]) => {
    const owner = familyOccurrences[0].familyOwner ? ` (familia fotográfica de ${familyOccurrences[0].familyOwner})` : "";
    const uses = familyOccurrences
      .map((occurrence) => `  - ${occurrence.route}: ${occurrence.imagePath} [${occurrence.htmlPath}]`)
      .join("\n");
    return `${family}${owner}\n${uses}`;
  });
  fail(`${reusedFamilies.length} imágenes o familias visuales aparecen en más de un <img>:\n${details.join("\n")}`);
}

const routesWithImages = new Set(occurrences.map((occurrence) => occurrence.route));
console.log(
  `Visible image uniqueness passed: ${occurrences.length} visible /images/ images across ${routesWithImages.size} routes; no image reuse detected.`
);
