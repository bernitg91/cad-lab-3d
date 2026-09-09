import type { MetadataRoute } from "next";
import { absoluteUrl, isPreviewDeployment } from "@/lib/site";
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Allow crawlers to read the noindex metadata on public preview URLs.
  if (isPreviewDeployment()) return { rules: { userAgent: "*", allow: "/" } };
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: absoluteUrl("/sitemap.xml")
  };
}
