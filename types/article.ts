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

export type ArticlePhotoLicenseCode =
  | "CC0 1.0"
  | "PDM 1.0"
  | "CC BY 2.0"
  | "CC BY 4.0"
  | "Contenido propio";

type ArticleIllustrationBase = {
  slug: string;
  image: string;
  title: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  sha256: string;
};

export type ArticleIllustration = ArticleIllustrationBase & (
  | {
      kind: "original-diagram";
      method: "Dibujo vectorial original y revisión técnica";
      createdAt: string;
      readingGuide: [string, string, string];
    }
  | {
      kind: "licensed-reference-media";
      method: "Fotografía externa con licencia verificada" | "Figura científica externa con licencia verificada";
      creator: string;
      creatorUrl: string;
      sourceName: string;
      sourceUrl: string;
      originalUrl: string;
      licenseCode: ArticlePhotoLicenseCode;
      licenseName: string;
      licenseUrl: string;
      licenseVerificationUrl: string;
      changes: string;
      verifiedAt: string;
    }
);

export type ArticlePhoto = {
  slug: string;
  image: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  sha256: string;
  openverseId?: string;
  title: string;
  creator: string;
  creatorUrl: string;
  sourceName: string;
  sourceUrl: string;
  originalUrl: string;
  licenseCode: ArticlePhotoLicenseCode;
  licenseName: string;
  licenseUrl: string;
  licenseVerificationUrl: string;
  licenseVerificationMethod: string;
  changes: string;
  verifiedAt: string;
};
