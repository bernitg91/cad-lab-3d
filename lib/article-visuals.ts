import { getArticleVisualContent } from "@/lib/article-visual-content";
import type { ArticleMeta, ArticleVisual } from "@/types/article";

export type ArticleVisualSet = readonly [ArticleVisual, ArticleVisual, ArticleVisual];

export function getArticleVisuals(article: Pick<ArticleMeta, "slug" | "title">): ArticleVisualSet {
  const visual = getArticleVisualContent(article.slug);
  const basePath = `/images/articles/${article.slug}`;

  return [
    {
      image: `${basePath}/01-vista-general.svg`,
      alt: `${visual.heroLabel}: esquema técnico relacionado con ${article.title.toLowerCase()}`,
      caption: `${visual.heroLabel}. Esta vista reúne la idea principal que conviene entender antes de aplicar los ajustes del artículo.`,
      width: 1600,
      height: 900,
      credit: "Ilustración original CADLAB3D"
    },
    {
      image: `${basePath}/02-proceso.svg`,
      alt: `Secuencia técnica: ${visual.processSteps.join(", ").toLowerCase()}`,
      caption: `Proceso recomendado: ${visual.processSteps.join("; ").toLowerCase()}. Separar las etapas ayuda a cambiar una variable cada vez.`,
      width: 1600,
      height: 900,
      credit: "Ilustración original CADLAB3D"
    },
    {
      image: `${basePath}/03-comprobacion.svg`,
      alt: `Puntos de comprobación: ${visual.verificationPoints.join(", ").toLowerCase()}`,
      caption: `La revisión final debe confirmar ${visual.verificationPoints.join(", ").toLowerCase()} antes de dar la pieza o el documento por terminado.`,
      width: 1600,
      height: 900,
      credit: "Ilustración original CADLAB3D"
    }
  ];
}
