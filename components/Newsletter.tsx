export function Newsletter() {
  return (
    <section className="rounded-lg bg-slate-950 p-6 text-white md:p-8">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-teal-300">Newsletter técnica</p>
          <h2 className="mt-2 text-2xl font-black">Recibe guías CAD y checklists de impresión 3D</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Apúntate para recibir nuevos artículos, plantillas y recursos técnicos cuando se publiquen.
          </p>
        </div>
        <form className="flex flex-col gap-3 sm:flex-row" aria-label="Newsletter sin integración">
          <input
            type="email"
            placeholder="tu@email.com"
            className="h-11 min-w-0 rounded-md border border-white/20 bg-white px-3 text-slate-950 outline-none focus:ring-4 focus:ring-teal-300/30"
          />
          <button className="h-11 rounded-md bg-teal-500 px-5 text-sm font-black text-slate-950 hover:bg-teal-300" type="button">
            Avísame
          </button>
        </form>
      </div>
    </section>
  );
}
