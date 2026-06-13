export type ArticleEvidence = {
  image: string;
  alt: string;
  caption: string;
};

export type ArticleSource = {
  name: string;
  href: string;
  note: string;
};

type ArticleSupport = {
  evidence?: ArticleEvidence;
  sources: ArticleSource[];
};

const ptcTutorials = {
  name: "Tutoriales oficiales de Creo Parametric",
  href: "https://support.ptc.com/help/creo/creo_pma/r12/spanish/tutorials_pma/pma_tutorials.html",
  note: "Ejercicios oficiales de piezas, ensamblajes y planos."
};

const solidworksHelp = {
  name: "SOLIDWORKS Design Help 2026",
  href: "https://help.solidworks.com/2026/english/SolidWorks/sldworks/r_help_fundamentals.htm",
  note: "Referencia oficial de fundamentos y funciones del programa."
};

const prusaMaterials = {
  name: "Prusa Filament Material Guide",
  href: "https://help.prusa3d.com/filament-material-guide",
  note: "Comparación de familias de filamento y requisitos de impresión."
};

const prusaDesign = {
  name: "Prusa: modelar pensando en impresión 3D",
  href: "https://help.prusa3d.com/article/modeling-with-3d-printing-in-mind_164135",
  note: "Criterios sobre sólidos, mallas y preparación de modelos imprimibles."
};

const nasaFem = {
  name: "NASA FEMCI",
  href: "https://etd.gsfc.nasa.gov/capabilities/capabilities-listing/femci/",
  note: "Recursos de referencia sobre análisis estructural y elementos finitos."
};

const nasaFemReview = {
  name: "NASA: revisión crítica de resultados FEM",
  href: "https://www.nasa.gov/centers-and-facilities/nesc/finite-element-analyses-not-all-beautiful-color-plots-are-precise-or-accurate/",
  note: "Advertencia sobre resultados visuales sin comprobación suficiente."
};

const supports: Record<string, ArticleSupport> = {
  "calibrar-impresora-3d-piezas-funcionales": {
    evidence: {
      image: "/images/impresion-3d-personalizada/panel-prototipo-tecnico-fdm.jpg",
      alt: "Panel de prueba impreso en FDM con relieves y superficies superiores",
      caption: "Pieza de prueba propia. Las superficies amplias y los relieves permiten observar primera capa, flujo y acabado superior antes de fabricar una pieza funcional."
    },
    sources: [
      {
        name: "Prusa: calibración de la primera capa",
        href: "https://help.prusa3d.com/article/first-layer-calibration-i3_112364",
        note: "Referencia visual para ajustar la distancia entre boquilla y superficie."
      },
      {
        name: "Prusa: calibración del multiplicador de extrusión",
        href: "https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257",
        note: "Explicación del ajuste de caudal de filamento."
      }
    ]
  },
  "como-empezar-creo-parametric-desde-cero": { sources: [ptcTutorials] },
  "diferencias-pla-petg-abs-nylon": { sources: [prusaMaterials] },
  "documentar-analisis-fem-basico": { sources: [nasaFem, nasaFemReview] },
  "documentar-proyecto-diseno-industrial": {
    evidence: {
      image: "/images/impresion-3d-personalizada/soporte-relojes-fdm.jpg",
      alt: "Soporte personalizado para relojes fabricado mediante impresión 3D",
      caption: "Ejemplo propio de proyecto documentable: necesidad concreta, geometría repetida, fabricación FDM y revisión del resultado físico."
    },
    sources: []
  },
  "elegir-filamento-piezas-funcionales": {
    evidence: {
      image: "/images/impresion-3d-personalizada/caja-prototipo-fdm.jpg",
      alt: "Caja prototipo impresa en FDM con paredes largas y borde reforzado",
      caption: "Prototipo propio usado para observar rigidez de paredes, estabilidad dimensional y acabado. La fotografía no sustituye un ensayo mecánico."
    },
    sources: [
      prusaMaterials,
      {
        name: "Prusa: secado y almacenamiento de filamento",
        href: "https://help.prusa3d.com/article/drying-filament_332086",
        note: "La humedad puede alterar el proceso y la calidad obtenida."
      }
    ]
  },
  "errores-diseno-piezas-impresion-3d": {
    evidence: {
      image: "/images/impresion-3d-personalizada/bandeja-organizadora-fdm.jpg",
      alt: "Bandeja roja impresa en 3D con base amplia y borde continuo",
      caption: "Pieza propia donde se pueden revisar continuidad del borde, radios, base amplia y estabilidad de las paredes."
    },
    sources: [prusaDesign]
  },
  "orientar-pieza-impresion-3d-resistente": {
    evidence: {
      image: "/images/impresion-3d-personalizada/pieza-decorativa-azul-fdm.jpg",
      alt: "Pieza azul FDM con contornos repetidos y eje central",
      caption: "Ejemplo propio donde la orientación define la lectura de las capas, la continuidad de los contornos y la estabilidad del eje central."
    },
    sources: [
      {
        name: "Prusa: separación entre capas en FDM",
        href: "https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806",
        note: "Causas habituales de separación y adhesión insuficiente entre capas."
      },
      {
        name: "PrusaSlicer: dividir piezas para cambiar la orientación",
        href: "https://help.prusa3d.com/article/cut-tool_1779",
        note: "Ejemplo de división del modelo cuando una sola orientación no resuelve todo."
      }
    ]
  },
  "preparar-archivo-stl-impresion-3d": {
    evidence: {
      image: "/images/impresion-3d-personalizada/jarron-decorativo-fdm.jpg",
      alt: "Jarrón verde impreso en 3D con superficie helicoidal",
      caption: "En una geometría curva como esta, una malla demasiado basta puede dejar facetas visibles; una resolución excesiva solo aumenta el archivo sin mejorar lo que fabrica la boquilla."
    },
    sources: [
      prusaDesign,
      {
        name: "Prusa: modelos 3D dañados o no cerrados",
        href: "https://help.prusa3d.com/article/corrupted-3d-models-for-printing_2205",
        note: "Detección y reparación de errores frecuentes de malla."
      }
    ]
  },
  "preparar-informe-tecnico-universitario": { sources: [] },
  "que-es-analisis-fem-cuando-usarlo": { sources: [nasaFem, nasaFemReview] },
  "renders-tecnicos-portfolio": {
    evidence: {
      image: "/images/impresion-3d-personalizada/soporte-relojes-fdm.jpg",
      alt: "Soporte para relojes fotografiado sobre un fondo neutro",
      caption: "Fotografía propia usada como referencia de presentación: fondo sencillo, lectura clara de la forma y escala aportada por los objetos."
    },
    sources: []
  },
  "solidworks-vs-creo-estudiantes": { sources: [solidworksHelp, ptcTutorials] },
  "tolerancias-piezas-impresas-3d": {
    evidence: {
      image: "/images/impresion-3d-personalizada/adaptador-aro-funcional-fdm.jpg",
      alt: "Adaptador negro impreso en 3D con abertura circular",
      caption: "Pieza propia de pequeño formato donde el diámetro interior y la holgura deben comprobarse físicamente antes de repetir unidades."
    },
    sources: [prusaDesign]
  }
};

export function getArticleSupport(slug: string): ArticleSupport {
  return supports[slug] ?? { sources: [] };
}
