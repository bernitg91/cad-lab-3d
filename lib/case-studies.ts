import { portfolioItems } from "@/lib/portfolio";

export type CaseStudySection = {
  title: string;
  paragraphs: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  publishedAt: string;
  updatedAt: string;
  introduction: string;
  keyPoints: string[];
  sections: CaseStudySection[];
  finalReview: string[];
};

const studies: Omit<CaseStudy, "image" | "alt">[] = [
  {
    slug: "soporte-personalizado-relojes",
    title: "Caso práctico: soporte personalizado para relojes impreso en 3D",
    description:
      "Análisis de un soporte FDM para varios relojes: estabilidad, separación, contacto, orientación de impresión y mejoras para una segunda versión.",
    publishedAt: "2026-06-23",
    updatedAt: "2026-06-23",
    introduction:
      "Este soporte se planteó como una pieza de organización y exposición. La fotografía permite estudiar un problema frecuente en diseño de producto: repetir una misma geometría sin que la base pierda estabilidad y conseguir que objetos de tamaños distintos queden visibles sin apoyos improvisados.",
    keyPoints: [
      "La base debe resistir el momento que generan los relojes más pesados.",
      "La separación entre apoyos tiene que permitir colocar y retirar cada pieza.",
      "Las superficies de contacto no deberían marcar la correa ni concentrar presión.",
      "La geometría repetida debe poder modificarse desde pocas cotas en el CAD."
    ],
    sections: [
      {
        title: "Qué problema resuelve la pieza",
        paragraphs: [
          "Guardar varios relojes en una superficie plana ocupa espacio y hace que las correas se mezclen. El soporte crea posiciones independientes y mantiene cada esfera visible. La necesidad no exige una forma compleja, pero sí una distribución coherente y una base que no vuelque cuando solo se ocupa uno de los extremos.",
          "La solución impresa muestra cuatro apoyos curvos unidos a una base longitudinal. Esta repetición permite comparar rápidamente separación, altura y proporción. También hace visible un riesgo: si todos los apoyos se modelan como copias sin una referencia común, cualquier cambio de anchura puede obligar a recolocarlos manualmente."
        ]
      },
      {
        title: "Decisiones de CAD que conviene controlar",
        paragraphs: [
          "Un modelo paramétrico debería partir del ancho útil, la distancia entre centros, el número de posiciones y el espesor del apoyo. El patrón de repetición debe depender de esas cotas, no de desplazamientos aproximados. Así se puede crear una versión para dos, cuatro o seis relojes sin reconstruir la pieza.",
          "La transición entre cada apoyo y la base necesita radios y sección suficiente. Una unión con esquina viva concentra tensión y puede romperse al colocar una correa rígida. El arco superior también debe evitar un radio demasiado pequeño: una superficie amplia reparte mejor el contacto y deja menos marcas."
        ]
      },
      {
        title: "Lectura de la pieza fabricada",
        paragraphs: [
          "La base continua simplifica la primera capa y evita ensamblajes. Los huecos inferiores reducen material y permiten acceder a las correas. Visualmente, los apoyos conservan una altura y una inclinación consistentes, señal de que el patrón se ha mantenido estable durante el modelado.",
          "La fotografía no permite certificar material, carga máxima ni durabilidad. Sí permite revisar proporción, accesibilidad y acabado superficial. Para convertir el prototipo en un producto repetible habría que registrar material, boquilla, altura de capa, orientación, masa y resultado de varias pruebas de carga."
        ]
      },
      {
        title: "Cómo validaría una segunda versión",
        paragraphs: [
          "La prueba útil no consiste solo en llenar el soporte. Conviene colocar primero un reloj pesado en un extremo y comprobar si la base gira o se levanta. Después hay que probar correas metálicas, de cuero y flexibles, porque no ocupan el mismo espacio ni apoyan con la misma presión.",
          "También mediría la distancia libre entre relojes, observaría si las coronas chocan y revisaría la base tras varios ciclos de uso. Si aparece flexión, aumentaría sección o introduciría un nervio antes de añadir relleno de forma indiscriminada."
        ]
      }
    ],
    finalReview: [
      "Comprobar estabilidad con cargas asimétricas.",
      "Medir la correa más ancha y la esfera de mayor diámetro.",
      "Redondear todas las superficies que entren en contacto con el reloj.",
      "Guardar una tabla con versión CAD, material y parámetros de impresión.",
      "Imprimir un único apoyo antes de repetir el conjunto completo."
    ]
  },
  {
    slug: "caja-prototipo-borde-reforzado",
    title: "Caso práctico: caja FDM de gran formato con borde reforzado",
    description:
      "Revisión de una caja prototipo impresa en FDM: paredes largas, esquinas, deformación, borde superior y plan de validación antes de una versión final.",
    publishedAt: "2026-06-23",
    updatedAt: "2026-06-23",
    introduction:
      "Las cajas grandes parecen sencillas en CAD, pero concentran varios problemas de fabricación: una base extensa, paredes altas que pueden curvarse y un borde superior que debe conservar la forma. Esta pieza sirve para explicar por qué un contenedor no debería diseñarse como cuatro planos finos unidos.",
    keyPoints: [
      "Las paredes largas necesitan controlar pandeo y deformación térmica.",
      "Las esquinas transmiten rigidez y deben evitar concentraciones innecesarias.",
      "El borde superior puede funcionar como marco estructural.",
      "Una prueba de volumen no equivale todavía a una pieza validada para carga."
    ],
    sections: [
      {
        title: "Por qué una caja grande es exigente en FDM",
        paragraphs: [
          "La primera dificultad es la base. Cuanto mayor sea su superficie, más sensible será a una cama sucia, una primera capa irregular o diferencias de temperatura. Una esquina levantada puede desplazar toda la pared y dejar el borde superior fuera de escuadra.",
          "La segunda dificultad son las paredes. Aunque en pantalla parezcan rígidas, una lámina alta puede vibrar durante la impresión y flexar después. Aumentar relleno no siempre resuelve el problema porque la mayor parte del comportamiento depende de perímetros, geometría de esquina y refuerzos."
        ]
      },
      {
        title: "Qué aporta el borde perimetral",
        paragraphs: [
          "En la pieza fotografiada el borde superior crea una sección más gruesa que limita la deformación de la abertura. Ese cambio de sección puede actuar como un marco y mejorar la sensación de rigidez al manipular el contenedor.",
          "El diseño debe comprobar que el borde no genere una masa excesiva en las últimas capas ni una transición brusca con la pared. Un radio interior o una pequeña cartela pueden repartir mejor el esfuerzo. Si el borde recibe elementos externos, su alojamiento debe modelarse con tolerancia y una superficie de apoyo definida."
        ]
      },
      {
        title: "Qué puede observarse y qué falta por demostrar",
        paragraphs: [
          "La fotografía documenta que el volumen, la abertura y el borde pudieron fabricarse como conjunto. También permite revisar continuidad de paredes, proporción de las esquinas y accesibilidad interior. No demuestra estanqueidad, resistencia a impacto ni capacidad de carga.",
          "Para afirmar cualquiera de esas prestaciones harían falta pruebas específicas. Una evaluación honesta separa la validación geométrica de la mecánica: que una caja conserve la forma al salir de la impresora no significa que soporte uso prolongado o temperatura."
        ]
      },
      {
        title: "Plan de mejora antes de repetir la pieza",
        paragraphs: [
          "Primero mediría diagonales y anchura en varios puntos para detectar cierre o apertura de las paredes. Después aplicaría una carga conocida en el borde y registraría la deformación de forma comparativa, aunque no sea un ensayo normalizado.",
          "Si la pared flexa demasiado, probaría nervios exteriores discretos, radios mayores o una sección local reforzada. Si el problema aparece durante la impresión, revisaría temperatura, ventilación, velocidad y orientación antes de aumentar material."
        ]
      }
    ],
    finalReview: [
      "Medir diagonales, altura y abertura en frío.",
      "Comprobar la base sobre una superficie plana.",
      "Registrar cualquier curvatura en las paredes largas.",
      "Separar la prueba de volumen de la prueba de carga.",
      "Fabricar una esquina de muestra antes de modificar toda la caja."
    ]
  },
  {
    slug: "bandeja-organizadora-medida",
    title: "Caso práctico: bandeja organizadora diseñada a medida para FDM",
    description:
      "Análisis de una bandeja alargada impresa en 3D: radios, base amplia, borde continuo, acabado visible y comprobaciones para evitar deformaciones.",
    publishedAt: "2026-06-23",
    updatedAt: "2026-06-23",
    introduction:
      "Esta bandeja muestra un tipo de encargo donde la impresión 3D aporta valor sin mecanismos complejos: adaptar dimensiones y forma a un espacio concreto. Precisamente por ser sencilla, cualquier defecto en el borde, la base o el acabado resulta muy visible.",
    keyPoints: [
      "Una base alargada aumenta el riesgo de esquinas levantadas.",
      "Los radios continuos facilitan limpieza y mejoran el recorrido de perímetros.",
      "El borde debe mantener altura y espesor uniformes.",
      "La orientación de las líneas superiores forma parte del acabado."
    ],
    sections: [
      {
        title: "Geometría pensada para un uso cotidiano",
        paragraphs: [
          "La forma de cápsula elimina esquinas interiores difíciles de limpiar y permite que los perímetros recorran el contorno sin cambios bruscos. El borde elevado contiene objetos pequeños y aporta rigidez a la pared.",
          "En CAD conviene definir longitud, anchura, radio de los extremos, profundidad y espesor desde un croquis maestro. Si el radio depende de la mitad de la anchura, la forma se mantiene coherente cuando cambia el tamaño. Modelar cada extremo por separado aumenta el riesgo de perder simetría."
        ]
      },
      {
        title: "Riesgos de una base grande y visible",
        paragraphs: [
          "La base ocupa casi toda la huella de la pieza. Esto exige una primera capa uniforme y una cama limpia. Si un extremo se levanta, la bandeja puede balancearse incluso aunque el resto de la impresión termine correctamente.",
          "La cara interior también expone las líneas superiores. El número de capas sólidas, el flujo y el patrón de superficie influyen más en la percepción final que un relleno elevado. Antes de imprimir la pieza completa puede probarse una muestra corta con el mismo ancho y espesor."
        ]
      },
      {
        title: "Qué enseña la fotografía",
        paragraphs: [
          "La pieza fabricada conserva un borde continuo y una transición suave entre fondo y pared. La forma permite revisar si el contorno mantiene espesor y si aparecen marcas en las curvas. El color uniforme facilita observar cambios de brillo asociados a velocidad o temperatura.",
          "No se conocen a partir de la imagen la tolerancia dimensional, el material exacto ni la resistencia térmica. Por eso el caso se utiliza para analizar diseño y fabricación visible, no para atribuir prestaciones no medidas."
        ]
      },
      {
        title: "Cambios que evaluaría en otra iteración",
        paragraphs: [
          "Si la bandeja necesitara más rigidez, aumentaría el momento de la sección mediante un pequeño pliegue exterior o un borde algo más ancho antes de hacer toda la pared maciza. Para reducir masa, estudiaría un fondo con espesor controlado y nervios bajos que no dificulten la limpieza.",
          "También compararía dos acabados de capa superior y comprobaría la planitud sobre una mesa. Esa comparación produce información reutilizable para futuras bandejas de otras dimensiones."
        ]
      }
    ],
    finalReview: [
      "Comprobar planitud y balanceo sobre una superficie rígida.",
      "Medir altura del borde en ambos extremos.",
      "Revisar las curvas capa a capa en el laminador.",
      "Comparar acabados superiores antes de producir otra unidad.",
      "Guardar el croquis paramétrico para adaptar longitud y anchura."
    ]
  },
  {
    slug: "adaptador-funcional-tolerancias",
    title: "Caso práctico: adaptador FDM y control de tolerancias en pequeño formato",
    description:
      "Revisión de un adaptador impreso con abertura circular y pequeños tetones: compensación dimensional, orientación, prueba de encaje y repetibilidad.",
    publishedAt: "2026-06-23",
    updatedAt: "2026-06-23",
    introduction:
      "Las piezas pequeñas pueden fallar por décimas de milímetro. Este adaptador incluye una abertura circular y dos tetones que obligan a pensar en compensación de agujeros, primera capa, dirección de esfuerzo y repetibilidad antes de fabricar varias unidades.",
    keyPoints: [
      "El diámetro nominal del CAD no garantiza el diámetro impreso.",
      "Los tetones pequeños necesitan sección, radio y orientación coherentes.",
      "El efecto de primera capa puede cerrar el contorno exterior.",
      "Una probeta de tolerancias ahorra repetir la pieza completa."
    ],
    sections: [
      {
        title: "La abertura circular como cota funcional",
        paragraphs: [
          "En FDM los agujeros suelen quedar algo más cerrados que el valor nominal por el trazado de perímetros, la resolución de la malla y la calibración de flujo. La compensación correcta no debería copiarse de una tabla sin comprobar la máquina.",
          "Una estrategia fiable es modelar una placa con varios diámetros próximos al objetivo, imprimirla con el mismo perfil y medir qué opción produce el ajuste necesario. Esa probeta debe repetirse si cambian material, boquilla o parámetros que afecten al flujo."
        ]
      },
      {
        title: "Tetones y detalles que concentran esfuerzo",
        paragraphs: [
          "Los dos salientes visibles son pequeños respecto al cuerpo. Si trabajan como posicionadores, importa su diámetro y separación; si reciben carga, también importa cómo cruzan las capas su base. Un radio de unión reduce la concentración de tensión y mejora el recorrido de la boquilla.",
          "Cuando un tetón queda cerca del límite imprimible, aumentar solo el relleno no ayuda. Es preferible revisar el número de perímetros, la anchura real de extrusión y si la geometría puede crecer ligeramente sin interferir con la pieza receptora."
        ]
      },
      {
        title: "Cómo interpretar el prototipo",
        paragraphs: [
          "La fotografía confirma que la abertura y los salientes se han materializado, y permite observar la textura de la superficie apoyada. Esa cara muestra por qué la orientación influye tanto en acabado como en precisión.",
          "Sin medir la pieza complementaria no puede afirmarse que el encaje sea correcto. Tampoco debe deducirse resistencia por el aspecto. El valor del prototipo está en permitir una comprobación física rápida y documentar qué cota necesita ajuste."
        ]
      },
      {
        title: "Proceso de validación recomendado",
        paragraphs: [
          "Mediría primero el diámetro interior en dos direcciones para detectar ovalización. Después comprobaría separación y diámetro de los tetones y registraría la fuerza necesaria para montar la pieza de forma cualitativa: libre, deslizante, ajustada o bloqueada.",
          "Antes de producir un lote repetiría al menos dos unidades con el mismo perfil. Si las medidas cambian de forma apreciable, el problema ya no es solo la cota CAD: hay que revisar estabilidad mecánica, flujo, temperatura o estado del filamento."
        ]
      }
    ],
    finalReview: [
      "Imprimir una probeta con varios diámetros próximos.",
      "Medir la abertura en dos ejes.",
      "Revisar la unión de los tetones con el cuerpo.",
      "Controlar el ensanchamiento de la primera capa.",
      "Repetir dos unidades antes de presupuestar un lote."
    ]
  }
];

export const caseStudies: CaseStudy[] = studies.map((study) => {
  const portfolioItem = portfolioItems.find((item) => item.slug === study.slug);

  if (!portfolioItem) {
    throw new Error(`Missing portfolio item for case study: ${study.slug}`);
  }

  return {
    ...study,
    image: portfolioItem.image,
    alt: portfolioItem.alt
  };
});

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
