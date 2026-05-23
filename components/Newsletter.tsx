import Link from "next/link";

export function Newsletter() {
  return (
    <section className="rounded-lg bg-slate-950 p-6 text-white md:p-8">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-teal-300">Rutas recomendadas</p>
          <h2 className="mt-2 text-2xl font-black">Sigue aprendiendo con guías y herramientas prácticas</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Explora artículos, calculadoras y checklists organizados por CAD, impresión 3D, materiales, FEM y documentación técnica.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link className="rounded-md bg-teal-500 px-5 py-3 text-center text-sm font-black text-slate-950 hover:bg-teal-300" href="/guias">
            Ver guías
          </Link>
          <Link className="rounded-md border border-white/20 px-5 py-3 text-center text-sm font-bold text-white hover:bg-white/10" href="/recursos">
            Ver recursos
          </Link>
        </div>
      </div>
    </section>
  );
}
