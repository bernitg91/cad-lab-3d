export const siteConfig = {
  name: "CAD Lab 3D",
  defaultUrl: "https://cadlab3d.com",
  description:
    "Tutoriales, recursos y guías prácticas sobre CAD, diseño industrial, impresión 3D, materiales y proyectos técnicos universitarios.",
  author: "CAD Lab 3D",
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
