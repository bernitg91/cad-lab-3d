"use client";
import { useEffect, useState } from "react";
declare global { interface Window { googlefc?: { callbackQueue?: Array<Record<string,()=>void>|(()=>void)>; showRevocationMessage?: ()=>void; }; } }
export function PrivacyChoices() {
  const [available,setAvailable]=useState(false);
  useEffect(()=>{
    let mounted=true;
    window.googlefc=window.googlefc||{};
    window.googlefc.callbackQueue=window.googlefc.callbackQueue||[];
    window.googlefc.callbackQueue.push({CONSENT_API_READY:()=>{if(mounted)setAvailable(typeof window.googlefc?.showRevocationMessage==="function");}});
    return()=>{mounted=false;};
  },[]);
  if(!available)return null;
  return <button type="button" className="underline underline-offset-4 hover:text-cyan-300" onClick={()=>window.googlefc?.callbackQueue?.push({CONSENT_API_READY:()=>window.googlefc?.showRevocationMessage?.()})}>Opciones de privacidad</button>;
}
