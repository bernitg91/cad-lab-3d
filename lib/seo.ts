import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  authors
}: SeoOptions): Metadata {
  const url = absoluteUrl(path);

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
      ...(type === "article" ? { publishedTime, authors } : {})
    },
    twitter: {
      card: "summary_large_image",
      title: title === siteConfig.name ? siteConfig.name : `${title} | ${siteConfig.name}`,
      description
    }
  };
}

export function jsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c")
  };
}
