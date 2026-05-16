import Script from "next/script";
import { isProductionDeployment } from "@/lib/site";

export function AdSenseScript() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;

  if (!isProductionDeployment() || !clientId || !clientId.startsWith("ca-pub-")) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
    />
  );
}
