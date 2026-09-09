"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const navItems = [
  { href: "/tipos-impresoras-3d", label: "Impresoras" },
  { href: "/que-vender-impresion-3d", label: "Qué vender" },
  { href: "/programas-modelado-3d", label: "CAD y render" },
  { href: "/blog", label: "Artículos" }
];
export function Header() {
  const pathname=usePathname();
  const [open,setOpen]=useState(false);
  const menuButton=useRef<HTMLButtonElement>(null);
  useEffect(()=>{setOpen(false);},[pathname]);
  useEffect(()=>{ if(!open)return; const close=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);menuButton.current?.focus();}}; window.addEventListener("keydown",close); return()=>window.removeEventListener("keydown",close); },[open]);
  return <header className="cad-header">
    <Link href="/" className="cad-brand" aria-label="CAD Lab 3D, inicio"><Image src="/brand/cadlab3d-mark.webp" alt="" width={43} height={43} priority /><span>CAD<span>LAB</span>3D<small>DISEÑO Y FABRICACIÓN</small></span></Link>
    <nav className="cad-desktop-nav" aria-label="Navegación principal">{navItems.map(item=><Link key={item.href} href={item.href} prefetch={item.href==="/blog"?false:undefined} aria-current={pathname===item.href?"page":undefined}>{item.label}</Link>)}</nav>
    <Link href="/recursos" className="cad-header-action">Herramientas <span aria-hidden="true">↗</span></Link>
    <button ref={menuButton} className="cad-menu-button" type="button" aria-controls="cad-mobile-menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?"Cerrar":"Menú"}<span aria-hidden="true">{open?"×":"☰"}</span></button>
    {open && <nav className="cad-mobile-nav" id="cad-mobile-menu" aria-label="Navegación móvil">{[...navItems,{href:"/recursos",label:"Herramientas y recursos"},{href:"/casos-practicos-impresion-3d",label:"Piezas reales"},{href:"/guia-materiales-fdm",label:"Materiales"},{href:"/sobre-mi",label:"Sobre CAD Lab 3D"},{href:"/contacto",label:"Contacto"}].map(item=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)} aria-current={pathname===item.href?"page":undefined}>{item.label}<span aria-hidden="true">↗</span></Link>)}</nav>}
  </header>;
}
