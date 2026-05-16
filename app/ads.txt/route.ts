import { isProductionDeployment } from "@/lib/site";

export function GET() {
  const publisherId = process.env.GOOGLE_ADSENSE_PUBLISHER_ID;
  const content =
    isProductionDeployment() && publisherId && publisherId.startsWith("pub-")
      ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
      : "# ads.txt preparado para Google AdSense. La línea real solo se publica en producción.\n";

  return new Response(content, {
    headers: {
      "content-type": "text/plain; charset=utf-8"
    }
  });
}
