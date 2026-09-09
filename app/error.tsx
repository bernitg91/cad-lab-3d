"use client";

import Link from "next/link";

export default function PageError({ retry }: { retry: () => void }) {
  return <section className="mx-auto max-w-3xl px-6 py-20">
    <h1 className="text-3xl font-bold">No se ha podido cargar esta página</h1>
    <p className="mt-4 text-base leading-7">Puedes volver a intentarlo o continuar por las guías. Si el problema persiste, escríbenos desde contacto.</p>
    <div className="mt-6 flex flex-wrap gap-5">
      <button type="button" onClick={() => retry()} className="rounded-md bg-blue-700 px-5 py-3 font-bold text-white">Volver a intentar</button>
      <Link href="/guias" className="px-2 py-3 underline">Ir a las guías</Link>
      <Link href="/contacto" className="px-2 py-3 underline">Contacto</Link>
    </div>
  </section>;
}
