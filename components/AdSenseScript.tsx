"use client";

import { usePathname } from "next/navigation";

const monetizableStaticPaths = new Set([
  "/",
  "/guia-cad-parametrico",
  "/guia-impresion-3d-fdm",
  "/solucionar-problemas-impresion-3d",
  "/guia-materiales-fdm",
  "/guia-simulacion-fem",
  "/guia-documentacion-tecnica",
  "/calculadora-precio-impresion-3d",
  "/calculadora-peso-pieza-3d",
  "/selector-material-impresion-3d",
  "/checklist-impresion-3d",
  "/glosario",
  "/laboratorio-tolerancias-fdm"
]);

function isMonetizablePath(pathname: string, articlePaths: string[]) {
  return monetizableStaticPaths.has(pathname) || articlePaths.includes(pathname);
}

type AdSenseScriptProps = {
  enabled: boolean;
  articlePaths: string[];
};

export function AdSenseScript({ enabled, articlePaths }: AdSenseScriptProps) {
  const pathname = usePathname();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;

  if (!enabled || !isMonetizablePath(pathname, articlePaths) || !clientId || !clientId.startsWith("ca-pub-")) {
    return null;
  }

  return (
    <script
      id="google-adsense"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
    />
  );
}
