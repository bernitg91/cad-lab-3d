import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  image,
  imageAlt,
  imageWidth,
  imageHeight
}: SeoOptions): Metadata {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl(image || siteConfig.socialImage.image);
  const visualAlt = image ? imageAlt : siteConfig.socialImage.alt;
  const visualWidth = image ? imageWidth : siteConfig.socialImage.width;
  const visualHeight = image ? imageHeight : siteConfig.socialImage.height;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: title === siteConfig.name ? siteConfig.name : `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(socialImage ? {
        images: [{
          url: socialImage,
          alt: visualAlt,
          ...(visualWidth && visualHeight ? { width: visualWidth, height: visualHeight } : {})
        }]
      } : {}),
      ...(type === "article" ? { publishedTime, modifiedTime, authors } : {})
    },
    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title: title === siteConfig.name ? siteConfig.name : `${title} | ${siteConfig.name}`,
      description,
      images: [{ url: socialImage, alt: visualAlt }]
    }
  };
}

export function jsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c")
  };
}
