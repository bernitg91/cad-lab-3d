export type CategorySlug =
  | "creo-parametric"
  | "solidworks"
  | "impresion-3d"
  | "materiales"
  | "diseno-industrial"
  | "simulacion-fem"
  | "proyectos-universitarios"
  | "recursos";

export type ArticleMeta = {
  title: string;
  slug: string;
  description: string;
  category: string;
  categorySlug: CategorySlug;
  date: string;
  updatedDate?: string;
  readingTime: string;
  author: string;
  featured?: boolean;
};

export type Article = ArticleMeta & {
  content: string;
  headings: { id: string; text: string; level: 2 | 3 }[];
};

export type Category = {
  name: string;
  slug: CategorySlug;
  description: string;
};
