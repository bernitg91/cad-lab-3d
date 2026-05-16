import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/blog", label: "Blog" },
  { href: "/categorias", label: "Categorías" },
  { href: "/guias", label: "Guías" },
  { href: "/recursos", label: "Recursos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="CAD Lab 3D, inicio">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-white">
            C3D
          </span>
          <span>
            <span className="block text-base font-black tracking-normal text-slate-950">CAD Lab 3D</span>
            <span className="block text-xs font-semibold text-slate-500">CAD, FEM e impresión 3D</span>
          </span>
        </Link>
        <nav aria-label="Navegación principal" className="flex flex-wrap gap-1 text-sm font-semibold text-slate-700">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
