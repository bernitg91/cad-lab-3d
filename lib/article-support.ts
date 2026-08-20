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

export type ArticleInsight = {
  takeaway: string;
  fieldNote: string;
  checks: [string, string, string];
};

type ArticleSupport = {
  evidence: ArticleEvidence;
  inlineEvidence: ArticleEvidence;
  sources: ArticleSource[];
  insight: ArticleInsight;
};

const media = {
  cad: {
    image: "/images/editorial/cad-parametrico-estudio.webp",
    alt: "Diseñador revisando una carcasa paramétrica en una estación CAD",
    caption: "El modelo, el prototipo y las medidas deben revisarse juntos: una pantalla limpia no demuestra por sí sola que la pieza esté lista para fabricar."
  },
  fdm: {
    image: "/images/editorial/impresion-fdm-taller.webp",
    alt: "Impresora FDM fabricando un soporte funcional naranja",
    caption: "Una pieza funcional se valida observando proceso, capas, geometría y resultado; no solo el aspecto de la vista previa del laminador."
  },
  fem: {
    image: "/images/editorial/analisis-fem-validacion.webp",
    alt: "Ingeniero comparando una simulación FEM con una pieza física",
    caption: "La escala de colores es el final del proceso, no el principio: cargas, apoyos, malla y comprobaciones determinan si el resultado tiene sentido."
  },
  docs: {
    image: "/images/editorial/documentacion-tecnica-proyecto.webp",
    alt: "Mesa de trabajo con planos, despiece, render y prototipo",
    caption: "Una documentación convincente conecta necesidad, decisiones, geometría, fabricación y evidencia del resultado en una secuencia fácil de seguir."
  },
  materials: {
    image: "/images/editorial/materiales-fdm-comparativa.webp",
    alt: "Bobinas y probetas impresas con distintos materiales FDM",
    caption: "Elegir material exige comparar ambiente, carga, temperatura, flexibilidad y capacidad real de la impresora, no solo la ficha comercial."
  },
  tolerance: {
    image: "/images/editorial/tolerancias-fdm-medicion.webp",
    alt: "Medición con calibre de probetas de tolerancia impresas en 3D",
    caption: "Una pequeña matriz de prueba revela el comportamiento real de impresora, orientación y material antes de comprometer una pieza completa."
  },
  watch: {
    image: "/images/impresion-3d-personalizada/soporte-relojes-fdm.jpg",
    alt: "Soporte personalizado para relojes fabricado mediante impresión 3D",
    caption: "Pieza propia: el uso cotidiano permite revisar estabilidad, repetición de apoyos, acabado y facilidad de acceso."
  },
  box: {
    image: "/images/impresion-3d-personalizada/caja-prototipo-fdm.jpg",
    alt: "Caja prototipo impresa en FDM con paredes largas y borde reforzado",
    caption: "Prototipo propio para comprobar volumen, rigidez de paredes, deformación y montaje antes de cerrar el diseño."
  },
  tray: {
    image: "/images/impresion-3d-personalizada/bandeja-organizadora-fdm.jpg",
    alt: "Bandeja organizadora roja impresa en 3D",
    caption: "Pieza propia donde la continuidad del borde, los radios y la estabilidad de una base amplia se pueden evaluar directamente."
  },
  ring: {
    image: "/images/impresion-3d-personalizada/adaptador-aro-funcional-fdm.jpg",
    alt: "Adaptador circular negro impreso en 3D",
    caption: "Pieza propia de ajuste: el diámetro interior y la holgura deben medirse físicamente antes de repetir unidades."
  },
  vase: {
    image: "/images/impresion-3d-personalizada/jarron-decorativo-fdm.jpg",
    alt: "Jarrón verde impreso en 3D con superficie helicoidal",
    caption: "En una geometría curva, la resolución de malla y la altura de capa afectan de forma distinta al acabado visible."
  },
  panel: {
    image: "/images/impresion-3d-personalizada/panel-prototipo-tecnico-fdm.jpg",
    alt: "Panel de prueba FDM con relieves y superficies superiores",
    caption: "Pieza propia útil para observar primera capa, flujo, esquinas y acabado superior antes de fabricar una pieza larga."
  },
  desk: {
    image: "/images/impresion-3d-personalizada/utiles-escritorio-fdm.jpg",
    alt: "Conjunto de útiles de escritorio impresos en 3D",
    caption: "Una familia de objetos sencillos permite comparar decisiones de forma, consumo de material y utilidad real."
  },
  blue: {
    image: "/images/impresion-3d-personalizada/pieza-decorativa-azul-fdm.jpg",
    alt: "Pieza azul FDM con contornos repetidos y eje central",
    caption: "La orientación define la lectura de las capas, la continuidad de los contornos y la estabilidad del eje central."
  }
} satisfies Record<string, ArticleEvidence>;

const sources = {
  ptc: {
    name: "Centro de ayuda oficial de Creo Parametric",
    href: "https://support.ptc.com/help/creo/creo_pma/r12/spanish/tutorials_pma/pma_tutorials.html",
    note: "Tutoriales oficiales sobre piezas, ensamblajes y planos en Creo Parametric."
  },
  step: {
    name: "PTC: exportación de piezas y conjuntos a STEP",
    href: "https://support.ptc.com/help/creo/creo_pma/r12/spanish/data_exchange/interface/Exporting_Part_or_Assembly_to_STEP.html",
    note: "Opciones oficiales de intercambio STEP y conservación de datos del modelo."
  },
  solidworks: {
    name: "SOLIDWORKS Design Help 2026",
    href: "https://help.solidworks.com/2026/english/SolidWorks/sldworks/r_help_fundamentals.htm",
    note: "Referencia oficial de fundamentos y funciones del programa."
  },
  prusaDesign: {
    name: "Prusa: modelar pensando en impresión 3D",
    href: "https://help.prusa3d.com/article/modeling-with-3d-printing-in-mind_164135",
    note: "Criterios oficiales sobre sólidos, voladizos, paredes y tolerancias."
  },
  prusaMaterials: {
    name: "Prusa Filament Material Guide",
    href: "https://help.prusa3d.com/filament-material-guide",
    note: "Comparación de familias de filamento, temperaturas y requisitos de impresión."
  },
  prusaLayers: {
    name: "PrusaSlicer: capas y perímetros",
    href: "https://help.prusa3d.com/article/layers-and-perimeters_1748",
    note: "Relación entre altura de capa, número de perímetros, tiempo y resistencia."
  },
  prusaInfill: {
    name: "PrusaSlicer: relleno y patrones",
    href: "https://help.prusa3d.com/article/infill-patterns_177130",
    note: "Criterios oficiales para elegir patrón, densidad y soporte de capas superiores."
  },
  prusaWarping: {
    name: "Prusa: diagnóstico de warping",
    href: "https://help.prusa3d.com/article/warping_2011",
    note: "Causas térmicas y medidas de adhesión, ambiente, velocidad y brim."
  },
  prusaRepair: {
    name: "Prusa: modelos 3D dañados o no cerrados",
    href: "https://help.prusa3d.com/article/corrupted-3d-models-for-printing_2205",
    note: "Detección y reparación de errores frecuentes de malla antes de laminar."
  },
  nasaFem: {
    name: "NASA FEMCI",
    href: "https://etd.gsfc.nasa.gov/capabilities/capabilities-listing/femci/",
    note: "Recursos de referencia sobre análisis estructural y elementos finitos."
  },
  nasaReview: {
    name: "NASA: revisión crítica de resultados FEM",
    href: "https://www.nasa.gov/centers-and-facilities/nesc/finite-element-analyses-not-all-beautiful-color-plots-are-precise-or-accurate/",
    note: "Por qué un mapa de colores necesita hipótesis y comprobaciones independientes."
  }
} satisfies Record<string, ArticleSource>;

type Entry = {
  hero: keyof typeof media;
  inline: keyof typeof media;
  sourceKeys: (keyof typeof sources)[];
  insight: ArticleInsight;
};

function entry(hero: Entry["hero"], inline: Entry["inline"], sourceKeys: Entry["sourceKeys"], takeaway: string, fieldNote: string, checks: ArticleInsight["checks"]): Entry {
  return { hero, inline, sourceKeys, insight: { takeaway, fieldNote, checks } };
}

const entries: Record<string, Entry> = {
  "calibrar-impresora-3d-piezas-funcionales": entry("panel", "tolerance", ["prusaLayers"], "Calibra con una secuencia corta y medible; cambiar cinco parámetros a la vez impide saber qué ha mejorado.", "En taller conviene guardar una pieza patrón con fecha, material y perfil. Si una impresión funcional empieza a fallar, repetir ese patrón permite separar un problema de máquina de un problema de geometría.", ["Comprueba primera capa y flujo antes de ajustar tolerancias.", "Mide paredes y agujeros con el mismo material de la pieza final.", "Cambia una variable, imprime y anota el resultado."]),
  "como-empezar-creo-parametric-desde-cero": entry("cad", "docs", ["ptc"], "Aprende Creo siguiendo el orden croquis, operación, referencia, ensamblaje y plano; memorizar iconos aislados no crea criterio paramétrico.", "Un buen ejercicio inicial es una pieza sencilla que obligue a modificar dos cotas después de terminarla. Si el modelo se regenera sin reparaciones, el árbol está empezando a ser robusto.", ["Define intención de diseño antes de acotar.", "Nombra planos, croquis y operaciones importantes.", "Termina cada ejercicio con una modificación y un plano."]),
  "diferencias-pla-petg-abs-nylon": entry("materials", "box", ["prusaMaterials"], "No existe un filamento mejor en general: existe el material que cubre temperatura, carga, ambiente y capacidad de impresión con menos riesgos.", "Para una carcasa interior, PLA puede ser suficiente; cerca de calor, humedad o golpes, PETG, ASA o nylon pueden tener sentido. La decisión debe incluir también deformación, secado y acabado.", ["Anota la temperatura máxima real de servicio.", "Distingue rigidez de resistencia a impacto.", "Confirma que impresora, boquilla y entorno admiten el material."]),
  "documentar-analisis-fem-basico": entry("fem", "docs", ["nasaFem", "nasaReview"], "Un informe FEM útil permite reconstruir el modelo: geometría, material, cargas, restricciones, contactos, malla y criterio de lectura.", "Una captura del resultado sin escala, unidades ni condiciones de contorno no es evidencia. Añade al menos una vista de la malla y otra de los apoyos para que el lector pueda cuestionar el modelo.", ["Explica de dónde sale cada carga y apoyo.", "Incluye unidades, escala de deformación y tamaño de malla.", "Compara reacciones, orden de magnitud o un cálculo sencillo."]),
  "documentar-proyecto-diseno-industrial": entry("docs", "watch", [], "La memoria debe contar una cadena de decisiones verificable, no una cronología de tareas ni una galería de renders.", "El soporte de relojes muestra una secuencia clara: necesidad de orden, apoyos repetidos, base estable, fabricación FDM y revisión del uso. Esa lógica es más valiosa que mostrar veinte vistas sin explicación.", ["Formula el problema y los requisitos antes de enseñar la forma.", "Vincula cada decisión importante con una evidencia.", "Cierra con límites, cambios y siguiente iteración."]),
  "elegir-filamento-piezas-funcionales": entry("materials", "box", ["prusaMaterials"], "Selecciona filamento por modo de fallo probable: calor, impacto, fluencia, humedad, UV o desgaste.", "Una caja rígida que encaja bien el primer día puede deformarse si permanece cargada o cerca de una fuente de calor. La prueba debe reproducir el tiempo y el ambiente de uso, no solo la impresión.", ["Describe carga, temperatura y exposición exterior.", "Imprime una probeta o zona crítica antes de la pieza completa.", "Registra secado, orientación y perfil junto al resultado."]),
  "errores-diseno-piezas-impresion-3d": entry("tray", "fdm", ["prusaDesign"], "Diseña para el proceso: orientación, paredes, radios, apoyos y tolerancias deben aparecer antes de exportar el STL.", "Una base amplia y un borde continuo parecen simples, pero revelan contracción, esquinas y continuidad de extrusión. Revisar estas zonas evita corregir el problema cuando la pieza ya lleva horas imprimiéndose.", ["Busca paredes más finas que dos líneas de extrusión.", "Revisa voladizos y puentes en la orientación prevista.", "Separa zonas de ajuste para probarlas a escala real."]),
  "orientar-pieza-impresion-3d-resistente": entry("blue", "fem", ["prusaLayers"], "Orienta para que las capas acompañen la carga principal y después comprueba soportes, precisión y acabado.", "La orientación que deja una cara bonita puede colocar la unión entre capas justo donde aparece tracción. Dibuja la dirección de carga sobre una captura del laminador antes de decidir.", ["Marca dónde hay tracción, flexión y cortante.", "Compara tiempo, soportes y sección resistente en dos orientaciones.", "Valida la opción elegida con una prueba representativa."]),
  "preparar-archivo-stl-impresion-3d": entry("vase", "fdm", ["prusaDesign", "prusaRepair"], "Un STL listo tiene unidades correctas, malla cerrada, resolución suficiente y una vista por capas revisada.", "Aumentar triángulos no mejora un arco que la boquilla no puede reproducir. Exporta una muestra, mide el archivo y revisa las facetas visibles antes de generar versiones enormes.", ["Confirma milímetros y dimensiones máximas.", "Repara normales, huecos y cuerpos solapados.", "Inspecciona perímetros, puentes y capas críticas en el laminador."]),
  "preparar-informe-tecnico-universitario": entry("docs", "cad", [], "Un informe técnico se entiende si cada sección responde qué se decidió, con qué datos y cómo se comprobó.", "Empieza por una tabla breve de requisitos y úsala como hilo conductor. Las figuras deben llevar pie y ser citadas en el texto; si una imagen no sostiene ninguna decisión, probablemente sobra.", ["Separa hechos, cálculos, supuestos y opinión.", "Numera figuras y explica por qué importan.", "Revisa coherencia entre objetivos, resultados y conclusiones."]),
  "que-es-analisis-fem-cuando-usarlo": entry("fem", "cad", ["nasaFem", "nasaReview"], "Usa FEM cuando una pregunta mecánica concreta no se resuelve con geometría, experiencia o un cálculo manual sencillo.", "Antes de mallar, escribe la pregunta: dónde se concentra tensión, cuánto se deforma o qué cambio reduce masa. Si no puedes formularla, el modelo probablemente acabará produciendo colores sin una decisión.", ["Define magnitud y dirección de las cargas.", "Representa apoyos y contactos sin bloquear de más.", "Comprueba el resultado con equilibrio y orden de magnitud."]),
  "renders-tecnicos-portfolio": entry("docs", "watch", [], "Un render técnico debe explicar forma, material, escala y función; la espectacularidad es secundaria.", "Combina una vista principal con una de detalle y una evidencia del prototipo. Mantén cámara y fondo coherentes para que el lector compare, y añade una frase que explique qué demuestra cada imagen.", ["Usa una perspectiva que no deforme la pieza.", "Controla reflejos para conservar aristas y uniones.", "Incluye escala, contexto de uso o una vista de detalle."]),
  "solidworks-vs-creo-estudiantes": entry("cad", "docs", ["solidworks", "ptc"], "La mejor elección depende del entorno académico y profesional, pero la habilidad transferible es construir modelos robustos y documentarlos bien.", "Modela la misma pieza corta en ambos programas y modifica dos cotas al final. Compara árbol, referencias, ensamblaje y plano; esa prueba aporta más que una lista genérica de funciones.", ["Comprueba licencias y formato exigido en tu centro.", "Valora estabilidad al cambiar geometría, no solo velocidad inicial.", "Aprende intercambio STEP y creación de planos."]),
  "tolerancias-piezas-impresas-3d": entry("tolerance", "ring", ["prusaDesign"], "Las tolerancias FDM se calibran para una combinación concreta de máquina, material, orientación y tipo de ajuste.", "Un aro pequeño permite medir diámetro interior sin gastar una pieza completa. Conserva la muestra y registra la compensación aplicada para repetir el ajuste con criterio.", ["Distingue holgura total de holgura por lado.", "Prueba agujeros y ejes en la orientación final.", "Mide varias muestras antes de fijar una corrección."]),
  "calcular-costes-pieza-impresa-3d": entry("fdm", "desk", ["prusaMaterials"], "Separa material, tiempo de máquina, preparación, riesgo de repetición y acabado; los gramos por sí solos no forman un presupuesto.", "Una pieza de poco peso puede bloquear la impresora durante horas y exigir revisión manual. En lotes, reparte la preparación, pero conserva una reserva para control y unidades fallidas.", ["Usa el tiempo real estimado por el laminador.", "Incluye soportes, brim y tasa razonable de fallo.", "Distingue coste, margen e impuestos en la oferta."]),
  "disenar-encajes-clips-impresion-3d": entry("tolerance", "ring", ["prusaDesign"], "Un clip fiable nace de la dirección de flexión, el radio en la raíz, la deformación admisible y una holgura comprobada.", "Imprime solo el clip y su zona de contacto antes de fabricar la carcasa completa. Cinco minutos de prueba pueden revelar una raíz demasiado rígida o una entrada que marca la pieza.", ["Orienta las capas para no abrir la raíz del clip.", "Añade radios y evita cambios bruscos de sección.", "Ensaya varios ciclos, no solo el primer montaje."]),
  "disenar-pieza-resistente-fdm": entry("fdm", "fem", ["prusaLayers", "prusaInfill"], "La resistencia suele mejorar antes con orientación, sección y perímetros que rellenando la pieza al cien por cien.", "Localiza el camino de carga y añade material donde realmente trabaja: nervios, radios y paredes bien conectadas. Una sección mal orientada seguirá siendo débil aunque el interior esté macizo.", ["Dibuja el camino de carga entre apoyos.", "Aumenta perímetros antes de abusar del relleno.", "Evita entallas y valida la zona crítica con una prueba."]),
  "evitar-warping-impresion-3d": entry("panel", "fdm", ["prusaWarping"], "El warping se reduce controlando contracción, primera capa, geometría y estabilidad térmica como un sistema.", "Observa qué esquina se levanta y cuándo ocurre. Si aparece tarde, puede dominar la contracción acumulada; si aparece al inicio, revisa limpieza, distancia de boquilla y superficie.", ["Limpia la cama y verifica la primera capa.", "Reduce esquinas vivas o añade orejas y brim.", "Protege materiales técnicos de corrientes y cambios térmicos."]),
  "paredes-perimetros-tapas-fdm": entry("box", "fdm", ["prusaLayers"], "Diseña espesores como múltiplos razonables del ancho de extrusión y comprueba cómo los interpreta el laminador.", "Una tapa larga puede parecer cerrada en CAD y mostrar huecos o flexión en la vista por capas. Revisa perímetros, capas superiores y apoyos internos antes de aumentar relleno sin criterio.", ["Relaciona espesor con ancho de línea y boquilla.", "Inspecciona capas superiores sobre el relleno.", "Refuerza con nervios o geometría antes que con masa indiscriminada."]),
  "pruebas-tolerancia-fdm": entry("tolerance", "ring", ["prusaDesign"], "Una prueba útil cambia una sola variable y reproduce orientación, material y proceso de la pieza final.", "Diseña una matriz pequeña con valores claramente separados y evita etiquetas diminutas que la boquilla no pueda resolver. Mide cada zona y conserva tanto el valor nominal como el real.", ["Incluye el rango alrededor del ajuste esperado.", "Mantén idénticos perfil, material y orientación.", "Registra temperatura, compensaciones y medida obtenida."]),
  "relleno-impresion-3d-segun-pieza": entry("fdm", "panel", ["prusaInfill", "prusaLayers"], "El relleno sostiene capas superiores y ayuda en compresión, pero no reemplaza una geometría bien orientada ni perímetros suficientes.", "Compara dos muestras con el mismo peso: una con más perímetros y otra con más relleno. La diferencia de rigidez y fallo suele aclarar qué parámetro aporta valor en esa geometría.", ["Elige patrón según carga, flexibilidad y velocidad.", "Asegura soporte suficiente bajo tapas planas.", "Evita 100 % si crea calor, tiempo y tensiones sin beneficio."]),
  "espesores-minimos-piezas-plastico": entry("cad", "box", ["prusaDesign", "prusaLayers"], "El espesor mínimo depende del proceso, la longitud libre, la carga y el material; una cifra universal es engañosa.", "Una pared corta puede funcionar con poco espesor mientras una pared larga vibra o se abomba. Mantén espesor uniforme cuando sea posible y usa nervios para aumentar rigidez sin crear masas gruesas.", ["Relaciona longitud libre con rigidez necesaria.", "Evita transiciones bruscas y acumulaciones de material.", "Comprueba en el laminador el número real de líneas de pared."]),
  "material-carcasa-impresa-3d": entry("box", "materials", ["prusaMaterials"], "Para una carcasa importan calor, impacto, tornillos, exposición, acabado y deformación a largo plazo.", "Antes de elegir, mide la temperatura cerca del equipo y decide cómo se abrirá la carcasa. El material y el sistema de cierre se condicionan mutuamente: un clip flexible no pide lo mismo que un inserto roscado.", ["Define temperatura y ambiente de servicio.", "Elige cierre y material como una sola decisión.", "Ensaya apoyos, tornillos y zonas cercanas a fuentes de calor."]),
  "materiales-prototipos-funcionales": entry("materials", "desk", ["prusaMaterials"], "El material del prototipo debe representar la propiedad que quieres comprobar: forma, montaje, flexión, calor o uso repetido.", "No necesitas el material final para validar volumen, pero sí uno representativo para probar un clip o una bisagra. Separa prototipos de forma y de función para gastar menos y aprender más rápido.", ["Escribe qué pregunta responde cada prototipo.", "No extrapoles resistencia entre materiales muy distintos.", "Documenta qué propiedad aún no ha sido validada."]),
  "calcular-peso-aproximado-pieza-3d": entry("cad", "materials", ["prusaInfill"], "El peso estimado combina volumen externo, paredes, capas sólidas, relleno, soportes y densidad del material.", "Para presupuestar, toma la masa del laminador y añade consumos auxiliares. Para diseñar, compara variantes con el mismo perfil; así sabrás si el cambio geométrico reduce material de verdad.", ["Usa densidad del material real, no una genérica.", "Incluye soportes, purgas y unidades del lote.", "Compara el peso estimado con una pieza medida y corrige el modelo."]),
  "checklist-portfolio-diseno-industrial": entry("docs", "cad", [], "Un portfolio técnico debe permitir entender tu contribución, tus decisiones y el nivel real de desarrollo sin adivinar.", "Revisa cada proyecto en treinta segundos: si no se entiende problema, proceso y resultado, la jerarquía falla. Después comprueba a fondo cotas, pies de figura y consistencia gráfica.", ["Identifica claramente tu rol y las restricciones.", "Equilibra proceso, CAD, prototipo y resultado.", "Elimina imágenes repetidas que no aporten una decisión nueva."]),
  "crear-portfolio-tecnico-diseno-industrial": entry("docs", "watch", [], "Selecciona pocos proyectos y cuéntalos con profundidad: problema, criterios, iteraciones, evidencia y aprendizaje.", "Una página por fase funciona mejor que una galería continua. Usa el mismo lenguaje visual para todos los casos y reserva la imagen más fuerte para abrir cada proyecto.", ["Escoge trabajos que demuestren habilidades distintas.", "Explica qué hiciste tú y qué recibió el equipo.", "Muestra una decisión difícil y cómo la comprobaste."]),
  "disenar-piezas-desmontables-reparables": entry("cad", "box", ["prusaDesign"], "Diseñar para reparar significa prever acceso, ciclos de montaje, piezas de desgaste y herramientas desde el primer modelo.", "Simula el desmontaje con una secuencia numerada. Si una pieza obliga a retirar cinco componentes innecesarios o oculta un tornillo, la arquitectura debe revisarse antes de detallar.", ["Define qué componentes deben sustituirse.", "Deja acceso para herramienta, mano y cableado.", "Evita que un cierre barato condene todo el producto."]),
  "ficha-tecnica-producto": entry("docs", "cad", [], "Una ficha técnica eficaz reúne solo datos verificables, con unidades, condiciones y versión del producto.", "Separa prestaciones confirmadas de objetivos de diseño. Una tabla compacta de dimensiones, masa, material, interfaz y entorno evita esconder información importante en párrafos promocionales.", ["Indica unidades, tolerancias y condiciones de ensayo.", "Añade versión, fecha y responsable de revisión.", "No publiques una prestación que no puedas rastrear a una fuente."]),
  "modelado-parametrico-vs-directo": entry("cad", "docs", ["ptc"], "Usa paramétrico cuando importa conservar intención y familias de cambios; usa directo para intervenir geometría sin depender del historial.", "Prueba el método con el cambio que más probablemente pedirá el proyecto. Si modificar ancho rompe referencias, el árbol necesita otra estrategia; si el archivo recibido no tiene historial, el modelado directo puede ser más eficaz.", ["Lista los cambios previsibles antes de modelar.", "Evita referencias frágiles a aristas temporales.", "Documenta qué cotas y relaciones controlan el diseño."]),
  "optimizar-pieza-reducir-material-peso": entry("cad", "fdm", ["prusaLayers", "nasaReview"], "Reduce masa eliminando material lejos del camino de carga y conservándolo en paredes, nervios, uniones y apoyos.", "Compara variantes por masa, deformación y tiempo de impresión. Un vaciado agresivo puede ahorrar gramos y crear soportes, vibraciones o concentraciones de tensión que empeoran el conjunto.", ["Marca zonas cargadas y zonas pasivas.", "Usa nervios y radios antes de engrosar todo.", "Comprueba que el ahorro no aumenta soportes o tiempo de forma desproporcionada."]),
  "prototipo-visual-vs-funcional": entry("desk", "materials", ["prusaMaterials"], "Un prototipo visual valida apariencia y escala; uno funcional valida comportamiento. Mezclarlos encarece pruebas y confunde conclusiones.", "Para presentar volumen puede bastar PLA y acabado rápido. Para ensayar un cierre, usa orientación, material y ciclos representativos aunque la superficie no sea perfecta.", ["Escribe una pregunta concreta antes de fabricar.", "Elige fidelidad solo en las variables que vas a observar.", "Etiqueta claramente qué aspectos no están validados."]),
  "renders-limpios-proyecto-universitario": entry("docs", "cad", [], "Un render limpio guía la mirada con encuadre, contraste y material coherentes; no necesita un escenario complejo.", "Configura una cámara principal y reutilízala entre iteraciones. Un fondo neutro, sombras suaves y una vista de detalle suelen explicar más que efectos intensos o múltiples luces de color.", ["Corrige escala y perspectiva antes de materiales.", "Separa la pieza del fondo sin perder aristas claras.", "Añade una segunda vista solo si revela información nueva."]),
  "revision-diseno-antes-fabricar": entry("cad", "tolerance", ["prusaDesign"], "La revisión previa debe recorrer requisitos, interfaces, fabricación, montaje y verificación con responsables y evidencias.", "Congela una versión para revisar y evita cambiar el modelo durante la reunión. Usa capturas con zonas numeradas y convierte cada duda en una acción con responsable y fecha.", ["Comprueba unidades, escala y sistema de coordenadas.", "Revisa interferencias, accesos y tolerancias en interfaces.", "Cierra cada observación como aceptada, corregida o pendiente."]),
  "estructurar-memoria-tecnica-diseno-industrial": entry("docs", "cad", [], "Estructura la memoria según el razonamiento del proyecto: problema, requisitos, alternativas, desarrollo, verificación y conclusiones.", "Crea el índice antes de redactar y asigna a cada capítulo una pregunta. Si dos secciones responden lo mismo, fusiónalas; si una figura no tiene una decisión asociada, reubícala o elimínala.", ["Mantén trazabilidad entre requisito y resultado.", "Usa tablas para comparar alternativas con los mismos criterios.", "Distingue resultado medido, estimado y pendiente."]),
  "explicar-decisiones-diseno-memoria": entry("docs", "tolerance", [], "Una decisión técnica se explica con alternativas, criterios, evidencia y consecuencia, no con frases como «se eligió por ser mejor».", "Presenta dos o tres opciones reales y una tabla breve. Después explica qué criterio fue decisivo y qué coste o limitación aceptaste; esa renuncia demuestra criterio de diseño.", ["Nombra las alternativas que realmente consideraste.", "Usa el mismo conjunto de criterios para compararlas.", "Declara la limitación que permanece tras elegir."]),
  "preparar-planos-tecnicos-modelo-cad": entry("docs", "cad", ["ptc"], "El plano debe definir la pieza sin duplicar cotas ni depender de interpretar el modelo 3D.", "Empieza por función e interfaces: datums, cotas críticas, material y acabado. Añade vistas solo cuando aclaren geometría y comprueba que una modificación del modelo actualiza el plano sin perder referencias.", ["Acota desde referencias funcionales y evita cadenas innecesarias.", "Incluye sección o detalle donde una vista general no baste.", "Revisa escala, unidades, tolerancias y revisión del documento."]),
  "presentar-proyecto-cad-entrevista-practicas": entry("cad", "docs", [], "Cuenta un caso corto donde una decisión CAD resolvió una restricción y fue comprobada con plano, simulación o prototipo.", "Prepara una explicación de dos minutos y otra de diez. Empieza por el problema, muestra el árbol o la geometría solo cuando sostenga una decisión y termina con lo que cambiarías.", ["Aclara tu contribución individual.", "Lleva capturas legibles y un archivo de respaldo.", "Practica responder por qué elegiste esa estrategia de modelado."]),
  "checklist-mandar-pieza-imprimir-3d": entry("tolerance", "fdm", ["prusaDesign", "prusaRepair"], "Antes de enviar, confirma versión, unidades, dimensiones, orientación, material, acabado, cantidad y criterio de aceptación.", "Incluye una imagen marcada de las superficies críticas y no confíes en el nombre del archivo para explicar cambios. Si hay un encaje, indica la pieza compañera o la medida funcional.", ["Exporta desde el sólido correcto y abre de nuevo el archivo.", "Marca caras visibles, zonas de apoyo y tolerancias críticas.", "Define qué defecto obliga a repetir la pieza."]),
  "errores-exportar-archivos-cad": entry("cad", "docs", ["step", "prusaRepair"], "Una exportación se valida reabriendo el archivo en un visor independiente y comparando unidades, cuerpos, escala y geometría.", "Conserva el nativo como fuente y genera STEP para intercambio o STL/3MF para fabricación. El formato neutro no guarda siempre parámetros, materiales o estructura tal como estaban.", ["Comprueba sistema de coordenadas y unidades.", "Verifica que no falten cuerpos ni componentes ocultos.", "Entrega una captura o PDF que defina la versión esperada."]),
  "preparar-archivo-step-compartir-cad": entry("cad", "docs", ["step"], "Un STEP de intercambio necesita estructura, unidades, versión y una comprobación de importación; exportar sin revisar no cierra la entrega.", "Decide si el receptor necesita pieza, conjunto o geometría simplificada. Abre el STEP en una sesión limpia, revisa sólidos y árbol de componentes y conserva el registro de exportación si el software lo genera.", ["Elige el protocolo STEP compatible con el receptor.", "Elimina información ajena solo si no rompe interfaces.", "Acompaña el archivo con nombre, revisión y captura de referencia."]),
  "simplificar-geometria-antes-fem": entry("fem", "cad", ["nasaFem", "nasaReview"], "Simplifica solo después de identificar caminos de carga, contactos y zonas donde necesitas leer resultados.", "Suprimir un redondeo pequeño puede ahorrar malla; borrar el radio de una unión que concentra tensión puede cambiar la pregunta. Guarda una copia y anota cada simplificación con su justificación.", ["Conserva agujeros, apoyos y contactos que transmiten carga.", "Compara masa y rigidez global antes y después.", "Refina localmente donde la geometría gobierna el resultado."])
};

export function getArticleSupport(slug: string): ArticleSupport {
  const selected = entries[slug];
  if (!selected) {
    return {
      evidence: media.cad,
      inlineEvidence: media.docs,
      sources: [],
      insight: {
        takeaway: "Define primero la decisión técnica que quieres tomar y reúne solo la evidencia necesaria para sostenerla.",
        fieldNote: "Trabaja con una pieza, archivo o entrega concreta y registra qué cambiaste, por qué y qué resultado obtuviste.",
        checks: ["Confirma el objetivo.", "Comprueba el resultado.", "Documenta los límites."]
      }
    };
  }
  return {
    evidence: media[selected.hero],
    inlineEvidence: media[selected.inline],
    sources: selected.sourceKeys.map((key) => sources[key]),
    insight: selected.insight
  };
}
