import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/guia-cad-parametrico", label: "Diseño CAD" },
  { href: "/guia-impresion-3d-fdm", label: "Impresión 3D" },
  { href: "/guia-materiales-fdm", label: "Materiales" },
  { href: "/guia-simulacion-fem", label: "FEM" },
  { href: "/casos-practicos-impresion-3d", label: "Piezas" },
  { href: "/blog", label: "Artículos" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="border-b border-slate-800 bg-[#091625] text-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-[11px] font-semibold sm:px-6 lg:px-8">
          <p className="font-mono uppercase tracking-[0.12em]">Cuaderno de CAD, FDM y documentación técnica</p>
          <div className="hidden items-center gap-4 sm:flex">
            <Link className="hover:text-cyan-300" href="/sobre-mi">Quién escribe</Link>
            <Link className="hover:text-cyan-300" href="/contacto">Contacto</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex shrink-0 items-center gap-2.5 rounded-sm" aria-label="CAD Lab 3D, inicio">
          <Image src="/brand/cadlab3d-mark.webp" alt="" width={44} height={44} priority className="h-11 w-11 object-contain" />
          <span className="leading-none">
            <span className="block font-display text-[1.48rem] font-black uppercase tracking-[0.025em] text-slate-950">CAD Lab 3D</span>
            <span className="mt-0.5 block font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-500">Cuaderno de diseño y fabricación</span>
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-0.5 text-sm font-bold text-slate-700 xl:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} prefetch={item.href === "/blog" ? false : undefined} className="focus-ring rounded-md px-3 py-2 hover:bg-slate-100 hover:text-blue-800">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link className="focus-ring rounded-md px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100" href="/blog" prefetch={false}>Buscar</Link>
          <Link className="focus-ring rounded-md bg-[#0f9f8f] px-4 py-2.5 text-sm font-black text-[#091625] hover:bg-cyan-300" href="/recursos">Herramientas</Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="focus-ring flex cursor-pointer list-none items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-800 shadow-sm hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
            Menú
            <span aria-hidden="true" className="font-mono text-base">≡</span>
          </summary>
          <nav aria-label="Navegación móvil" className="absolute right-0 mt-3 grid w-[min(19rem,calc(100vw-2rem))] gap-1 rounded-xl border border-slate-200 bg-white p-2 text-sm font-bold text-slate-700 shadow-2xl">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-4 py-3 hover:bg-slate-100 hover:text-blue-800">{item.label}</Link>
            ))}
            <div className="my-1 border-t border-slate-200" />
            <Link href="/recursos" className="rounded-lg bg-teal-50 px-4 py-3 text-teal-900 hover:bg-teal-100">Herramientas y recursos</Link>
            <Link href="/sobre-mi" className="rounded-lg px-4 py-3 hover:bg-slate-100">Sobre CAD Lab 3D</Link>
            <Link href="/contacto" className="rounded-lg px-4 py-3 hover:bg-slate-100">Contacto</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
