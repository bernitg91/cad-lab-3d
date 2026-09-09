export const siteConfig = {
  name: "CAD Lab 3D",
  defaultUrl: "https://cadlab3d.com",
  description:
    "Aprende diseño CAD e impresión 3D con guías prácticas, modelos paramétricos descargables, calculadoras y análisis de piezas reales.",
  authorName: "Bernat Torres Guasch",
  socialImage: {
    image: "/images/article-photos/disenar-encajes-clips-impresion-3d.webp",
    width: 900,
    height: 1200,
    alt: "Adaptador circular negro impreso en 3D, del archivo propio de CAD Lab 3D"
  },
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
