export const siteConfig = {
  name: "CAD Lab 3D",
  defaultUrl: "https://cadlab3d.com",
  description:
    "Cuaderno en español sobre CAD, diseño industrial e impresión 3D: guías, herramientas y piezas fotografiadas con límites claros.",
  authorName: process.env.NEXT_PUBLIC_AUTHOR_NAME || "CAD Lab 3D",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "bbernat.torres@gmail.com",
  locale: "es_ES"
};

export function getDeploymentEnvironment() {
  return process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || "local";
}

export function isPreviewDeployment() {
  return getDeploymentEnvironment() === "preview";
}

export function isProductionDeployment() {
  return getDeploymentEnvironment() === "production";
}

export function getSiteUrl() {
  const vercelUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
  const previewUrl = isPreviewDeployment() && vercelUrl ? `https://${vercelUrl}` : "";
  const url = previewUrl || process.env.NEXT_PUBLIC_SITE_URL || siteConfig.defaultUrl;
  return url.replace(/\/$/, "");
}

export function absoluteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath === "/" ? "" : normalizedPath}`;
}
