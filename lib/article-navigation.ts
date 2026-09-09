import type { ArticleMeta } from "@/types/article";

export const readingGoals = [
  { id: "empezar", label: "Empezar" },
  { id: "resolver", label: "Resolver un fallo" },
  { id: "comparar", label: "Comparar opciones" },
  { id: "disenar", label: "Diseñar una pieza" }
];

const goalArticles: Record<string, string[]> = {
  empezar: ["como-empezar-creo-parametric-desde-cero", "calibrar-impresora-3d-piezas-funcionales", "preparar-archivo-stl-impresion-3d", "que-es-analisis-fem-cuando-usarlo"],
  resolver: ["calibrar-impresora-3d-piezas-funcionales", "evitar-warping-impresion-3d", "errores-diseno-piezas-impresion-3d", "errores-exportar-archivos-cad", "pruebas-tolerancia-fdm"],
  comparar: ["solidworks-vs-creo-estudiantes", "elegir-filamento-piezas-funcionales", "materiales-prototipos-funcionales", "material-carcasa-impresa-3d"],
  disenar: ["como-empezar-creo-parametric-desde-cero", "disenar-encajes-clips-impresion-3d", "disenar-pieza-resistente-fdm", "orientar-pieza-impresion-3d-resistente", "paredes-perimetros-tapas-fdm", "errores-diseno-piezas-impresion-3d", "preparar-archivo-stl-impresion-3d"]
};

export function matchesReadingGoal(article: ArticleMeta, goal: string) {
  return goal === "todos" || (goalArticles[goal]?.includes(article.slug) ?? false);
}

export function normalizeSearch(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").trim();
}
