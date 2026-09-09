"use client";
import { useEffect, useState } from "react";
declare global { interface Window { googlefc?: { callbackQueue?: Array<Record<string,()=>void>|(()=>void)>; showRevocationMessage?: ()=>void; }; } }
export function PrivacyChoices() {
  const [available,setAvailable]=useState(false);
  useEffect(()=>{
    let mounted=true;
    window.googlefc=window.googlefc||{};
    window.googlefc.callbackQueue=window.googlefc.callbackQueue||[];
    window.googlefc.callbackQueue.push({CONSENT_API_READY:()=>{
      if (!mounted) return;
      const ready = typeof window.googlefc?.showRevocationMessage === "function";
      setAvailable(ready);
      // A full navigation from a page without ads initializes Google's consent API.
      if (ready && window.location.pathname === "/" && window.location.hash === "#opciones-privacidad") {
        window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
        window.googlefc?.showRevocationMessage?.();
      }
    }});
    return()=>{mounted=false;};
  },[]);
  // A document navigation is required to initialize the third-party consent script.
  // eslint-disable-next-line @next/next/no-html-link-for-pages
  if(!available)return <a className="underline underline-offset-4" href="/#opciones-privacidad">Opciones de privacidad</a>;
  return <button type="button" className="underline underline-offset-4 hover:text-cyan-300" onClick={()=>window.googlefc?.callbackQueue?.push({CONSENT_API_READY:()=>window.googlefc?.showRevocationMessage?.()})}>Opciones de privacidad</button>;
}
