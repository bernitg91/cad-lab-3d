import type { Category } from "@/types/article";

export const categories: Category[] = [
  {
    name: "Creo Parametric",
    slug: "creo-parametric",
    description: "Modelado paramétrico, ensamblajes, planos y flujo de trabajo profesional en Creo."
  },
  {
    name: "SolidWorks",
    slug: "solidworks",
    description: "Guías para estudiantes, comparativas y buenas prácticas de modelado en SolidWorks."
  },
  {
    name: "Impresión 3D",
    slug: "impresion-3d",
    description: "Diseño para FDM, preparación de piezas, tolerancias y control de calidad."
  },
  {
    name: "Materiales",
    slug: "materiales",
    description: "Filamentos, plásticos técnicos y criterios para elegir materiales funcionales."
  },
  {
    name: "Diseño industrial",
    slug: "diseno-industrial",
    description: "Desarrollo de producto, documentación, portfolio y criterios de diseño."
  },
  {
    name: "Simulación FEM",
    slug: "simulacion-fem",
    description: "Conceptos básicos para entender esfuerzos, restricciones, mallas y resultados."
  },
  {
    name: "Proyectos universitarios",
    slug: "proyectos-universitarios",
    description: "Informes, memoria técnica, entregas académicas y presentación de proyectos."
  },
  {
    name: "Recursos",
    slug: "recursos",
    description: "Plantillas, checklists y materiales descargables para trabajar mejor."
  }
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

const categoryGuidePaths: Record<string, string> = {
  "creo-parametric": "/guia-cad-parametrico",
  solidworks: "/guia-cad-parametrico",
  "impresion-3d": "/guia-impresion-3d-fdm",
  materiales: "/guia-materiales-fdm",
  "diseno-industrial": "/guia-documentacion-tecnica",
  "simulacion-fem": "/guia-simulacion-fem",
  "proyectos-universitarios": "/guia-documentacion-tecnica",
  recursos: "/recursos"
};

export function getCategoryGuidePath(slug: string) {
  return categoryGuidePaths[slug] ?? "/categorias";
}
