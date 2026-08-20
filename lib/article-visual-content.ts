export type VisualTextTriplet = readonly [string, string, string];

export type ArticleVisualContent = {
  heroLabel: string;
  processSteps: VisualTextTriplet;
  verificationPoints: VisualTextTriplet;
};

export type ArticleVisualCatalog = Readonly<Record<string, ArticleVisualContent>>;

function visual(
  heroLabel: string,
  processSteps: VisualTextTriplet,
  verificationPoints: VisualTextTriplet
): ArticleVisualContent {
  return { heroLabel, processSteps, verificationPoints };
}

const articleVisualCatalog: ArticleVisualCatalog = {
  "calcular-costes-pieza-impresa-3d": visual(
    "Desglose real por pieza",
    ["Laminar la versión final", "Sumar máquina y material", "Añadir preparación y riesgo"],
    ["Gramos con soportes incluidos", "Tarifa horaria documentada", "Margen separado del coste"]
  ),
  "calcular-peso-aproximado-pieza-3d": visual(
    "Del volumen CAD a la masa",
    ["Medir el volumen del sólido", "Aplicar densidad del polímero", "Corregir con el laminado"],
    ["Unidades cúbicas coherentes", "Densidad del material real", "Estimación comparada con báscula"]
  ),
  "calibrar-impresora-3d-piezas-funcionales": visual(
    "Calibración para cotas útiles",
    ["Estabilizar la primera capa", "Ajustar flujo con una pared", "Medir una probeta funcional"],
    ["Espesor dentro de tolerancia", "Agujeros sin sobreextrusión", "Perfil guardado por filamento"]
  ),
  "checklist-mandar-pieza-imprimir-3d": visual(
    "Entrega sin ambigüedades",
    ["Congelar archivo y revisión", "Marcar caras y ajustes críticos", "Enviar requisitos de fabricación"],
    ["Escala confirmada en milímetros", "Cantidad y material escritos", "Criterio de aceptación definido"]
  ),
  "checklist-portfolio-diseno-industrial": visual(
    "Portfolio técnico en 30 segundos",
    ["Seleccionar proyectos complementarios", "Ordenar problema, proceso y resultado", "Eliminar imágenes redundantes"],
    ["Autoría personal identificada", "Decisiones respaldadas por pruebas", "Datos sensibles retirados"]
  ),
  "como-empezar-creo-parametric-desde-cero": visual(
    "Primer árbol paramétrico robusto",
    ["Definir referencias estables", "Construir croquis bien restringidos", "Probar cambios de cotas"],
    ["Modelo regenera sin errores", "Operaciones tienen nombres claros", "Plano coincide con la pieza"]
  ),
  "crear-portfolio-tecnico-diseno-industrial": visual(
    "Casos que demuestran criterio",
    ["Elegir tres habilidades distintas", "Narrar decisiones e iteraciones", "Cerrar con evidencia física"],
    ["Cada caso tiene objetivo", "Proceso ocupa espacio suficiente", "Resultado explica el aprendizaje"]
  ),
  "diferencias-pla-petg-abs-nylon": visual(
    "Cuatro materiales, cuatro compromisos",
    ["Definir temperatura y ambiente", "Comparar rigidez e impacto", "Revisar dificultad de impresión"],
    ["PLA lejos de calor sostenido", "PETG evaluado ante fluencia", "ABS y nylon con entorno controlado"]
  ),
  "disenar-encajes-clips-impresion-3d": visual(
    "Clip flexible sin rotura",
    ["Trazar la dirección de flexión", "Redondear la raíz del clip", "Probar entrada y retención"],
    ["Deformación dentro del material", "Capas alineadas con el esfuerzo", "Montaje repetido sin fisuras"]
  ),
  "disenar-pieza-resistente-fdm": visual(
    "Resistencia desde la geometría",
    ["Dibujar el camino de carga", "Orientar capas a favor", "Reforzar uniones con radios"],
    ["Perímetros antes que relleno", "Entallas críticas suavizadas", "Probeta rota de forma prevista"]
  ),
  "disenar-piezas-desmontables-reparables": visual(
    "Arquitectura pensada para reparar",
    ["Identificar piezas de desgaste", "Planificar acceso a fijaciones", "Simular el desmontaje completo"],
    ["Herramienta entra sin obstáculos", "Cierre soporta varios ciclos", "Repuesto cambia sin dañar carcasa"]
  ),
  "documentar-analisis-fem-basico": visual(
    "FEM reproducible, no solo colores",
    ["Registrar hipótesis y material", "Mostrar apoyos, cargas y malla", "Interpretar tensiones y desplazamientos"],
    ["Unidades visibles en resultados", "Reacciones equilibran las cargas", "Escala deformada está declarada"]
  ),
  "documentar-proyecto-diseno-industrial": visual(
    "Del requisito a la evidencia",
    ["Convertir necesidad en criterios", "Justificar alternativas de diseño", "Documentar prototipo y ensayo"],
    ["Requisitos conservan trazabilidad", "Figuras tienen pie informativo", "Conclusión responde al problema"]
  ),
  "elegir-filamento-piezas-funcionales": visual(
    "Filamento según el modo de fallo",
    ["Describir carga y exposición", "Descartar materiales incompatibles", "Imprimir una muestra crítica"],
    ["Temperatura de servicio cubierta", "Humedad considerada en nylon", "Máquina admite el perfil térmico"]
  ),
  "errores-diseno-piezas-impresion-3d": visual(
    "Errores visibles antes de laminar",
    ["Revisar paredes y voladizos", "Detectar huecos y aristas débiles", "Adaptar la forma al proceso"],
    ["Espesores generan líneas completas", "Puentes tienen distancia viable", "Ajustes disponen de holgura"]
  ),
  "errores-exportar-archivos-cad": visual(
    "Exportar y volver a comprobar",
    ["Elegir el formato de destino", "Configurar escala y resolución", "Reabrir en un visor independiente"],
    ["Todos los cuerpos están presentes", "Normales y sólidos son válidos", "Revisión aparece en el nombre"]
  ),
  "espesores-minimos-piezas-plastico": visual(
    "Espesor ligado a función y proceso",
    ["Medir la longitud libre", "Estimar carga y deformación", "Añadir nervios donde convenga"],
    ["Pared uniforme sin masas locales", "Laminador conserva el espesor", "Zona larga no pandea al usarla"]
  ),
  "estructurar-memoria-tecnica-diseno-industrial": visual(
    "Una memoria guiada por preguntas",
    ["Plantear problema y requisitos", "Comparar alternativas con criterios", "Conectar verificación y conclusiones"],
    ["Índice sigue el razonamiento", "Tablas comparan variables iguales", "Pendientes quedan diferenciados"]
  ),
  "evitar-warping-impresion-3d": visual(
    "Controlar la contracción desde la base",
    ["Limpiar y nivelar la cama", "Estabilizar temperatura ambiental", "Reducir tensión en las esquinas"],
    ["Primera capa queda uniforme", "Brim permanece totalmente adherido", "Pieza enfría sin levantarse"]
  ),
  "explicar-decisiones-diseno-memoria": visual(
    "Decisiones con criterios explícitos",
    ["Presentar alternativas reales", "Ponderar requisitos del proyecto", "Declarar elección y renuncias"],
    ["Comparación usa la misma escala", "Fuente de cada dato indicada", "Limitación residual reconocida"]
  ),
  "ficha-tecnica-producto": visual(
    "Datos verificables en una página",
    ["Agrupar identidad y versión", "Ordenar prestaciones por uso", "Añadir condiciones de ensayo"],
    ["Dimensiones incluyen tolerancia", "Unidades no cambian entre tablas", "Fecha de revisión es visible"]
  ),
  "material-carcasa-impresa-3d": visual(
    "Carcasa, ambiente y cierre",
    ["Medir calor alrededor del equipo", "Seleccionar polímero compatible", "Diseñar fijaciones acordes"],
    ["Inserto no abre las paredes", "Ventilación cubre la disipación", "Material resiste el entorno previsto"]
  ),
  "materiales-prototipos-funcionales": visual(
    "Material según la pregunta del prototipo",
    ["Separar forma de función", "Priorizar la propiedad ensayada", "Registrar límites de equivalencia"],
    ["Rigidez representa el uso", "Superficie crítica está reproducida", "Conclusión no extrapola de más"]
  ),
  "modelado-parametrico-vs-directo": visual(
    "Dos estrategias para cambiar geometría",
    ["Anticipar modificaciones frecuentes", "Elegir historial o edición directa", "Ensayar un cambio tardío"],
    ["Referencias sobreviven al cambio", "Intención queda documentada", "Archivo recibido mantiene integridad"]
  ),
  "optimizar-pieza-reducir-material-peso": visual(
    "Menos masa, misma función",
    ["Localizar zonas poco solicitadas", "Vaciar sin cortar cargas", "Comparar variantes laminadas"],
    ["Rigidez objetivo se conserva", "Soportes no aumentan demasiado", "Tiempo baja junto con los gramos"]
  ),
  "orientar-pieza-impresion-3d-resistente": visual(
    "Capas alineadas con la carga",
    ["Marcar tracción y flexión", "Comparar dos orientaciones", "Validar la sección más débil"],
    ["Unión entre capas queda protegida", "Soportes no dañan la interfaz", "Rotura ocurre fuera del uso normal"]
  ),
  "paredes-perimetros-tapas-fdm": visual(
    "La envolvente que aporta rigidez",
    ["Relacionar pared y ancho de línea", "Configurar perímetros continuos", "Sostener correctamente las tapas"],
    ["No aparecen huecos internos", "Capas superiores quedan cerradas", "Costura evita la zona funcional"]
  ),
  "preparar-archivo-step-compartir-cad": visual(
    "STEP listo para intercambio",
    ["Limpiar el conjunto entregable", "Exportar con protocolo acordado", "Importar en una sesión limpia"],
    ["Árbol conserva componentes útiles", "Sólidos llegan sin superficies abiertas", "Coordenadas coinciden con referencia"]
  ),
  "preparar-archivo-stl-impresion-3d": visual(
    "Malla preparada para fabricar",
    ["Exportar con resolución suficiente", "Reparar geometría no manifold", "Inspeccionar capas en el slicer"],
    ["Dimensión máxima coincide con CAD", "Curvas no muestran facetas graves", "Vista previa carece de islas"]
  ),
  "preparar-informe-tecnico-universitario": visual(
    "Informe que demuestra el trabajo",
    ["Delimitar objetivo y alcance", "Describir método y resultados", "Responder con conclusiones medibles"],
    ["Supuestos aparecen señalados", "Figuras están citadas en texto", "Bibliografía usa formato consistente"]
  ),
  "preparar-planos-tecnicos-modelo-cad": visual(
    "Plano definido desde la función",
    ["Seleccionar referencias funcionales", "Acotar interfaces y geometría", "Completar material y revisión"],
    ["No existen cotas duplicadas", "Secciones aclaran zonas ocultas", "Modelo y cajetín están sincronizados"]
  ),
  "presentar-proyecto-cad-entrevista-practicas": visual(
    "Un caso CAD contado con claridad",
    ["Resumir problema y restricciones", "Mostrar una decisión relevante", "Cerrar con prueba y aprendizaje"],
    ["Contribución individual resulta clara", "Capturas se leen a distancia", "Explicación cabe en dos minutos"]
  ),
  "prototipo-visual-vs-funcional": visual(
    "Dos prototipos, dos preguntas",
    ["Definir qué debe aprenderse", "Elegir fidelidad necesaria", "Fabricar solo variables críticas"],
    ["Visual valida forma y escala", "Funcional reproduce cargas reales", "Aspectos no ensayados están marcados"]
  ),
  "pruebas-tolerancia-fdm": visual(
    "Matriz pequeña, ajuste medible",
    ["Diseñar un rango de holguras", "Imprimir en orientación definitiva", "Medir y etiquetar muestras"],
    ["Paso entre valores es legible", "Material coincide con la pieza", "Corrección queda asociada al perfil"]
  ),
  "que-es-analisis-fem-cuando-usarlo": visual(
    "Simular para responder una pregunta",
    ["Formular la magnitud buscada", "Idealizar cargas y restricciones", "Contrastar el orden de magnitud"],
    ["Modelo evita apoyos artificiales", "Malla converge en la zona crítica", "Resultado conduce a una decisión"]
  ),
  "relleno-impresion-3d-segun-pieza": visual(
    "Relleno al servicio de la envolvente",
    ["Identificar función del interior", "Escoger patrón y densidad", "Comparar peso, tiempo y rigidez"],
    ["Tapas reciben soporte suficiente", "Patrón acompaña la carga", "Densidad no sustituye buenos perímetros"]
  ),
  "renders-limpios-proyecto-universitario": visual(
    "Jerarquía visual sin ruido",
    ["Fijar cámara y encuadre", "Ajustar materiales sobrios", "Iluminar volumen y aristas"],
    ["Perspectiva mantiene proporciones", "Fondo separa bien el objeto", "Segunda vista aporta información"]
  ),
  "renders-tecnicos-portfolio": visual(
    "Render que explica ingeniería",
    ["Elegir vista funcional principal", "Destacar un detalle constructivo", "Combinar imagen y evidencia"],
    ["Escala se entiende sin adivinar", "Uniones permanecen visibles", "Pie explica qué se demuestra"]
  ),
  "revision-diseno-antes-fabricar": visual(
    "Puerta de control antes de fabricar",
    ["Congelar una revisión concreta", "Recorrer interfaces y montaje", "Asignar cada acción pendiente"],
    ["Interferencias están resueltas", "Tolerancias críticas tienen dueño", "Decisión queda cerrada o fechada"]
  ),
  "simplificar-geometria-antes-fem": visual(
    "Simplificar sin perder la física",
    ["Identificar caminos de carga", "Suprimir detalles irrelevantes", "Comparar modelo completo y reducido"],
    ["Masa global cambia poco", "Contactos esenciales se conservan", "Concentraciones útiles siguen presentes"]
  ),
  "solidworks-vs-creo-estudiantes": visual(
    "Comparar herramientas con una misma pieza",
    ["Modelar idéntico ejercicio", "Modificar cotas y referencias", "Generar conjunto y plano"],
    ["Licencia cubre el curso", "Intercambio STEP funciona bien", "Habilidad aprendida es transferible"]
  ),
  "tolerancias-piezas-impresas-3d": visual(
    "Holgura calibrada para el proceso",
    ["Definir el tipo de ajuste", "Crear probetas de eje y agujero", "Aplicar compensación medida"],
    ["Holgura total está especificada", "Diámetro real se mide varias veces", "Ajuste se repite en otra muestra"]
  )
};

const fallbackVisualContent = visual(
  "Decisión técnica verificable",
  ["Definir el objetivo", "Mostrar el proceso", "Registrar el resultado"],
  ["Dato principal comprobado", "Evidencia vinculada al criterio", "Límite de uso declarado"]
);

export function getArticleVisualContent(slug: string): ArticleVisualContent {
  return articleVisualCatalog[slug] ?? fallbackVisualContent;
}
