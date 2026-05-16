import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-teal-700">Error 404</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950">La pieza no encaja en este ensamblaje</h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        La página que buscas no existe o ha cambiado de dirección.
      </p>
      <Link className="mt-8 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-blue-800" href="/blog">
        Volver al blog
      </Link>
    </section>
  );
}
