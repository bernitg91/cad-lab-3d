import Link from "next/link";

const recommended = [
  {
    title: "Plantilla de informe técnico",
    text: "Estructura para ordenar objetivos, metodología, resultados y conclusiones."
  },
  {
    title: "Checklist de impresión 3D",
    text: "Puntos clave para revisar escala, orientación, tolerancias y material."
  },
  {
    title: "Guía básica de materiales",
    text: "Criterios para comparar PLA, PETG, ABS, Nylon y materiales funcionales."
  }
];

export function RecommendedResources() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-slate-950">Recursos recomendados</p>
      <div className="mt-4 grid gap-3">
        {recommended.map((item) => (
          <div key={item.title} className="rounded-md border border-slate-200 p-3">
            <p className="font-bold text-slate-900">{item.title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">{item.text}</p>
          </div>
        ))}
      </div>
      <Link className="mt-4 inline-flex text-sm font-bold text-blue-700 hover:text-blue-900" href="/recursos">
        Ver todos los recursos
      </Link>
    </section>
  );
}
