import Link from "next/link";

export function AffiliateBox() {
  return (
    <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
      <p className="text-sm font-black uppercase tracking-wide text-blue-900">Enlaces recomendados</p>
      <p className="mt-2 text-sm leading-6 text-blue-950">
        Consulta criterios de selección para software, filamentos, medición y recursos útiles antes de invertir tiempo o dinero.
      </p>
      <Link className="mt-4 inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800" href="/herramientas-recomendadas">
        Ver herramientas
      </Link>
    </section>
  );
}
