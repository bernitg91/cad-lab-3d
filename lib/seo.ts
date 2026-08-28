import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
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
  authors,
  image,
  imageAlt,
  imageWidth,
  imageHeight
}: SeoOptions): Metadata {
  const url = absoluteUrl(path);
  const socialImage = image ? absoluteUrl(image) : undefined;

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
          alt: imageAlt,
          ...(imageWidth && imageHeight ? { width: imageWidth, height: imageHeight } : {})
        }]
      } : {}),
      ...(type === "article" ? { publishedTime, authors } : {})
    },
    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title: title === siteConfig.name ? siteConfig.name : `${title} | ${siteConfig.name}`,
      description,
      ...(socialImage ? { images: [{ url: socialImage, alt: imageAlt }] } : {})
    }
  };
}

export function jsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c")
  };
}
