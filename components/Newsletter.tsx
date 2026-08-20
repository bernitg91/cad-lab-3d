import Link from "next/link";

export function ExploreMore() {
  return (
    <section className="blueprint-grid overflow-hidden rounded-xl border border-slate-800 bg-[#091625] p-6 text-white md:p-8">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">El siguiente paso</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-black leading-none sm:text-4xl">Convierte la lectura en una decisión comprobable</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            Continúa con una ruta temática o utiliza una calculadora, selector y checklist antes de fabricar la siguiente versión.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link className="focus-ring rounded-md bg-teal-400 px-5 py-3 text-center text-sm font-black text-slate-950 hover:bg-cyan-300" href="/guias">Elegir una ruta</Link>
          <Link className="focus-ring rounded-md border border-white/20 px-5 py-3 text-center text-sm font-bold text-white hover:bg-white/10" href="/recursos">Abrir herramientas</Link>
        </div>
      </div>
    </section>
  );
}
