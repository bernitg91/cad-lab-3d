import Link from "next/link";

type RecommendedResource = {
  title: string;
  text: string;
  href: string;
};

const resourcesByTopic: Record<string, RecommendedResource[]> = {
  "simulacion-fem": [
    { title: "Guía de simulación FEM", text: "Hipótesis, apoyos, malla y comprobaciones antes de interpretar resultados.", href: "/guia-simulacion-fem" },
    { title: "Guía de documentación", text: "Cómo registrar entradas, resultados, límites y evidencias del análisis.", href: "/guia-documentacion-tecnica" },
    { title: "Fuentes técnicas", text: "Documentación primaria utilizada para contrastar las guías.", href: "/fuentes" }
  ],
  materiales: [
    { title: "Selector de material FDM", text: "Compara familias de filamento según temperatura, impacto, exterior y flexibilidad.", href: "/selector-material-impresion-3d" },
    { title: "Guía de materiales FDM", text: "Límites, preparación y criterios de elección para cada familia.", href: "/guia-materiales-fdm" },
    { title: "Guía de impresión FDM", text: "Conecta material, orientación, paredes y verificación de la pieza.", href: "/guia-impresion-3d-fdm" }
  ],
  cad: [
    { title: "Guía de CAD paramétrico", text: "Croquis, referencias, operaciones, ensamblajes y planos preparados para cambiar.", href: "/guia-cad-parametrico" },
    { title: "Guía de documentación", text: "Planos, decisiones y evidencias para explicar una entrega técnica.", href: "/guia-documentacion-tecnica" },
    { title: "Fuentes técnicas", text: "Ayuda oficial de Creo, SolidWorks y formatos de intercambio.", href: "/fuentes" }
  ],
  "impresion-3d": [
    { title: "Checklist de impresión 3D", text: "Revisa escala, orientación, tolerancias y material antes de fabricar.", href: "/checklist-impresion-3d" },
    { title: "Calculadora de precio FDM", text: "Estima material, tiempo, preparación, margen e impuestos.", href: "/calculadora-precio-impresion-3d" },
    { title: "Galería de piezas comentadas", text: "Observaciones visibles y límites de piezas FDM fotografiadas.", href: "/casos-practicos-impresion-3d" }
  ]
};

export function RecommendedResources({ categorySlug }: { categorySlug: string }) {
  const topic = categorySlug === "simulacion-fem"
    ? "simulacion-fem"
    : categorySlug === "materiales"
      ? "materiales"
      : categorySlug === "creo-parametric" || categorySlug === "solidworks" || categorySlug === "recursos"
        ? "cad"
        : "impresion-3d";
  const recommended = resourcesByTopic[topic];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-slate-950">Recursos recomendados</p>
      <div className="mt-4 grid gap-3">
        {recommended.map((item) => (
          <Link key={item.title} href={item.href} className="block rounded-md border border-slate-200 p-3 hover:border-blue-300">
            <p className="font-bold text-slate-900">{item.title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">{item.text}</p>
          </Link>
        ))}
      </div>
      <Link className="mt-4 inline-flex text-sm font-bold text-blue-700 hover:text-blue-900" href="/recursos">Ver todos los recursos</Link>
    </section>
  );
}
