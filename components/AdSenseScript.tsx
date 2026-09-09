"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

const monetizableStaticPaths = new Set([
  "/tipos-impresoras-3d",
  "/filamento-vs-resina",
  "/impresion-3d-polvo-sls-mjf",
  "/impresion-3d-metal",
  "/programas-modelado-3d",
  "/keyshot-vs-blender-renderizado",
  "/que-vender-impresion-3d",
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
    <Script
      id="google-adsense"
      strategy="lazyOnload"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
    />
  );
}
