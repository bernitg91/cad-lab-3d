export type PortfolioItem = {
  slug?: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  material: string;
  use: string;
  criticalPoints: string[];
  objective: string;
  review: string;
  lesson: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "soporte-personalizado-relojes",
    title: "Soporte personalizado para relojes",
    description: "Pieza funcional de exposición con apoyos repetidos, base estable y geometría preparada para uso cotidiano.",
    image: "/images/impresion-3d-personalizada/soporte-relojes-fdm.jpg",
    alt: "Soporte impreso en 3D para relojes sobre fondo claro",
    material: "No documentado",
    use: "Exposición y organización",
    criticalPoints: ["Estabilidad de base", "Separación entre apoyos", "Acabado visible"],
    objective: "Crear un soporte a medida que mantenga varios relojes visibles, separados y apoyados sin depender de piezas comerciales.",
    review: "Conviene revisar estabilidad de la base, separación entre apoyos, radios interiores y orientación de impresión para reducir soportes.",
    lesson: "En objetos de exposición importa tanto la función como la limpieza visual: una base simple y repetible facilita imprimir varias unidades con el mismo criterio."
  },
  {
    slug: "caja-prototipo-borde-reforzado",
    title: "Caja prototipo con borde reforzado",
    description: "Contenedor impreso para validar volumen, rigidez, montaje perimetral y acabado antes de una versión final.",
    image: "/images/impresion-3d-personalizada/caja-prototipo-fdm.jpg",
    alt: "Caja prototipo impresa en 3D con borde reforzado",
    material: "No documentado",
    use: "Validación de volumen y montaje",
    criticalPoints: ["Paredes largas", "Borde superior", "Deformación y rigidez"],
    objective: "Comprobar proporciones, volumen interior, rigidez de paredes y comportamiento del borde antes de fabricar una versión definitiva.",
    review: "Hay que revisar espesor mínimo, esquinas, altura de capa, deformación en paredes largas y posible unión con varillas o elementos externos.",
    lesson: "Las cajas grandes deben diseñarse con bordes, radios y refuerzos pensados para FDM; una pared aparentemente sencilla puede deformarse si no se controla."
  },
  {
    slug: "bandeja-organizadora-medida",
    title: "Bandeja organizadora a medida",
    description: "Objeto de uso diario con paredes suaves, borde elevado y forma adaptada a una necesidad concreta.",
    image: "/images/impresion-3d-personalizada/bandeja-organizadora-fdm.jpg",
    alt: "Bandeja organizadora roja impresa en 3D",
    material: "No documentado",
    use: "Organización y uso cotidiano",
    criticalPoints: ["Radios interiores", "Base estable", "Limpieza de acabado"],
    objective: "Diseñar una bandeja útil para agrupar objetos pequeños con una geometría compacta y fácil de limpiar.",
    review: "Interesan radios amplios, base estable, borde suficientemente rígido y una orientación que deje buen acabado en la cara visible.",
    lesson: "Las piezas simples también necesitan diseño: radios y espesores bien elegidos pueden mejorar mucho la percepción de calidad."
  },
  {
    title: "Jarrón decorativo con textura helicoidal",
    description: "Pieza visual para comprobar acabado, repetición de patrón, continuidad de capas y presencia estética.",
    image: "/images/impresion-3d-personalizada/jarron-decorativo-fdm.jpg",
    alt: "Jarrón verde impreso en 3D con textura helicoidal",
    material: "No documentado",
    use: "Pieza decorativa y prueba de patrón",
    criticalPoints: ["Continuidad de perímetros", "Retracciones", "Estabilidad en altura"],
    objective: "Evaluar una geometría decorativa con patrón continuo y superficie visible en una pieza de volumen medio.",
    review: "Es importante comprobar continuidad de perímetros, velocidad, retracciones y estabilidad durante las capas altas.",
    lesson: "En piezas decorativas el diseño puede ocultar o convertir las capas FDM en parte del acabado, siempre que el patrón sea coherente."
  },
  {
    slug: "adaptador-funcional-tolerancias",
    title: "Adaptador funcional de pequeño formato",
    description: "Pieza compacta para validar diámetro interior, apoyo, encaje y tolerancia en una geometría sencilla.",
    image: "/images/impresion-3d-personalizada/adaptador-aro-funcional-fdm.jpg",
    alt: "Adaptador negro impreso en 3D con abertura circular",
    material: "No documentado",
    use: "Adaptador y comprobación dimensional",
    criticalPoints: ["Diámetro interior", "Holgura", "Contracción real"],
    objective: "Comprobar un aro o adaptador donde importan el diámetro interior, el apoyo y la repetibilidad dimensional.",
    review: "Antes de fabricar varias unidades conviene hacer prueba de tolerancia, revisar el agujero interior y medir contracción real.",
    lesson: "Las piezas pequeñas deben probarse con medidas reales: una décima de milímetro puede cambiar si el encaje entra suave o queda demasiado duro."
  },
  {
    title: "Panel técnico con relieves",
    description: "Prototipo plano con zonas elevadas para revisar forma, textura, superficies y lectura del diseño.",
    image: "/images/impresion-3d-personalizada/panel-prototipo-tecnico-fdm.jpg",
    alt: "Panel técnico gris impreso en 3D con relieves",
    material: "No documentado",
    use: "Prototipo visual con relieves",
    criticalPoints: ["Primera capa", "Superficies superiores", "Puentes y esquinas"],
    objective: "Validar un panel con geometrías elevadas, zonas planas y lectura visual de formas antes de cerrar el diseño.",
    review: "Hay que revisar primera capa, acabado de superficies superiores, puentes cortos, esquinas y posibles marcas de flujo.",
    lesson: "Los paneles planos suelen mostrar defectos con facilidad; elegir orientación, altura de capa y patrón superior cambia mucho el resultado."
  },
  {
    title: "Piezas de prueba y útiles de escritorio",
    description: "Muestras para estudiar escala, agarre, proporciones y repetición dimensional antes de fabricar más unidades.",
    image: "/images/impresion-3d-personalizada/utiles-escritorio-fdm.jpg",
    alt: "Piezas verdes impresas en 3D junto a material de escritorio",
    material: "No documentado",
    use: "Pruebas rápidas de forma y agarre",
    criticalPoints: ["Escala", "Ergonomía", "Repetición dimensional"],
    objective: "Probar formas, agarres y volúmenes con piezas rápidas antes de invertir tiempo en una versión más acabada.",
    review: "Conviene separar pruebas de forma, pruebas de resistencia y pruebas de tolerancia para no mezclar objetivos en una sola impresión.",
    lesson: "Una pieza de prueba barata puede ahorrar muchas horas si sirve para confirmar escala, ergonomía y orientación desde el principio."
  },
  {
    title: "Pieza decorativa por capas",
    description: "Geometría visual con patrón escalonado para mostrar precisión de contornos y acabado FDM visible.",
    image: "/images/impresion-3d-personalizada/pieza-decorativa-azul-fdm.jpg",
    alt: "Pieza decorativa azul impresa en 3D con patrón por capas",
    material: "No documentado",
    use: "Geometría visual por capas",
    criticalPoints: ["Vibraciones", "Eje central", "Perímetros continuos"],
    objective: "Mostrar una geometría compleja de contornos repetidos donde el propio laminado define el acabado visual.",
    review: "La revisión se centra en continuidad de perímetros, vibraciones, estabilidad del eje central y acabado de los contornos.",
    lesson: "Cuando el patrón de capas es intencionado, la impresión 3D deja de parecer una limitación y se convierte en parte del lenguaje formal."
  }
];
