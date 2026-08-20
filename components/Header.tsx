import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/blog", label: "Blog" },
  { href: "/guias", label: "Guías" },
  { href: "/recursos", label: "Recursos" },
  { href: "/casos-practicos-impresion-3d", label: "Casos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="CAD Lab 3D, inicio">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-white">
            C3D
          </span>
          <span>
            <span className="block text-base font-black tracking-normal text-slate-950">CAD Lab 3D</span>
            <span className="block text-xs font-semibold text-slate-500">CAD, FEM e impresión 3D</span>
          </span>
        </Link>
        <nav aria-label="Navegación principal" className="hidden flex-wrap gap-1 text-sm font-semibold text-slate-700 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 shadow-sm hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
            Menú
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <nav aria-label="Navegación móvil" className="absolute right-0 mt-3 grid w-64 gap-1 rounded-xl border border-slate-200 bg-white p-2 text-sm font-semibold text-slate-700 shadow-xl">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-4 py-3 hover:bg-slate-100 hover:text-slate-950">
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
