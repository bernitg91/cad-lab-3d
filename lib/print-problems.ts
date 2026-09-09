export const printProblems = [
  {
    id: "primera-capa", title: "La primera capa no se pega", clue: "La línea se arrastra, quedan huecos o la base se desprende al comenzar.",
    checks: ["Confirma que la placa admite ese material y límpiala siguiendo sus instrucciones: una superficie lisa y una texturizada pueden necesitar cuidados distintos.", "Revisa la calibración de primera capa indicada para tu impresora. Si la línea queda redonda y suelta o excesivamente aplastada, corrige antes de continuar.", "Prueba un cuadrado pequeño con el perfil del fabricante. Observa la unión de las líneas; una velocidad inicial menor puede ayudar, pero no corrige una placa sucia."],
    test: "Repite el mismo cuadrado. Comprueba que las líneas se unen, que la boquilla no arrastra material y que la base se mantiene adherida.",
    avoid: "No acerques cada vez más la boquilla para compensar cualquier problema de adhesión.",
    guide: "/blog/calibrar-impresora-3d-piezas-funcionales", guideLabel: "Revisar la calibración paso a paso", tool: "/checklist-impresion-3d", toolLabel: "Checklist antes de imprimir",
    source: "https://help.prusa3d.com/article/first-layer-issues_1804", sourceLabel: "Prusa · Primera capa"
  },
  {
    id: "warping", title: "Las esquinas se levantan", clue: "La base empieza bien y se curva durante la impresión: warping o alabeo.",
    checks: ["Anota si la esquina se levanta desde el inicio o después de varias capas. Revisa primero la adhesión, sin dar por hecho que todo es contracción térmica.", "Recupera el perfil de material y evita corrientes sobre la pieza. El cerramiento y la refrigeración deben corresponder al filamento y a la máquina.", "Prueba un borde de adhesión, o brim, y revisa si la geometría concentra la contracción en esquinas largas o estrechas."],
    test: "Imprime una sección que conserve la esquina y su apoyo. Compara cuándo empieza a levantarse y si la base sigue plana después de enfriar.",
    avoid: "No cierres cualquier impresora ni anules la refrigeración como solución universal.",
    guide: "/blog/evitar-warping-impresion-3d", guideLabel: "Entender y corregir el warping", tool: "/selector-material-impresion-3d", toolLabel: "Revisar la elección de material",
    source: "https://help.prusa3d.com/article/warping_2011", sourceLabel: "Prusa · Warping"
  },
  {
    id: "hilos", title: "Aparecen hilos entre zonas", clue: "Se forman filamentos finos durante los desplazamientos sin extrusión: stringing.",
    checks: ["Revisa el estado del filamento y los residuos en la boquilla. Si hay indicios de humedad, sigue el procedimiento de secado de esa bobina.", "Vuelve al perfil de retracción previsto para tu extrusor. Un valor de una máquina Bowden no se traslada directamente a una de extrusión directa.", "Compara cambios pequeños de retracción o temperatura, uno cada vez y dentro de los límites del fabricante. Mantén la misma geometría de prueba."],
    test: "Usa dos torres pequeñas separadas. Valora tanto los hilos como los huecos al reanudar la extrusión: eliminar hilos no sirve si empeora la pieza.",
    avoid: "No aumentes la retracción sin límite ni atribuyas todos los hilos a la temperatura.",
    guide: "/guia-materiales-fdm", guideLabel: "Consultar requisitos del material", tool: "/checklist-impresion-3d", toolLabel: "Comprobar bobina y perfil",
    source: "https://help.prusa3d.com/article/stringing-and-oozing_1805", sourceLabel: "Prusa · Stringing y goteo"
  },
  {
    id: "subextrusion", title: "Falta material en las líneas", clue: "Las paredes tienen huecos, las líneas son incompletas o la extrusión se interrumpe.",
    checks: ["Comprueba que el perfil coincide con el diámetro del filamento, la boquilla instalada y el material. Revisa también si la bobina puede girar libremente.", "Consulta el manual para revisar engranajes, alimentación y posibles atascos. Distingue la ventilación del hotend de la del enfriamiento de la pieza.", "Solo después de descartar alimentación y obstrucciones, revisa el flujo y si la velocidad exige más material del que el equipo puede fundir."],
    test: "Repite una pared sencilla con el perfil conocido. Busca líneas continuas y observa si el fallo aparece al aumentar la velocidad o también en zonas lentas.",
    avoid: "No tapes un atasco aumentando el multiplicador de extrusión.",
    guide: "/blog/calibrar-impresora-3d-piezas-funcionales", guideLabel: "Ordenar la calibración", tool: "/checklist-impresion-3d", toolLabel: "Revisar la preparación",
    source: "https://help.prusa3d.com/article/under-extrusion_2007", sourceLabel: "Prusa · Subextrusión"
  },
  {
    id: "encajes", title: "El agujero o el encaje no ajusta", clue: "El pasador no entra, hay demasiado juego o la medida impresa difiere del CAD.",
    checks: ["Comprueba unidades y dimensiones del archivo. Mide el pasador real y el agujero por encima de la primera capa para separar el ensanchamiento de la base.", "Revisa exceso de extrusión y deformación. Compara varias cotas: un error parecido en todas no se corrige igual que uno proporcional al tamaño.", "Imprime varias holguras con la misma orientación y material del montaje final. Conserva el perfil y registra qué ajuste obtienes después de enfriar."],
    test: "Utiliza la probeta descargable de cinco agujeros. Anota medida, ajuste y condiciones; traslada la elección al conjunto solo después de comprobarlo.",
    avoid: "No escales toda la pieza para corregir un solo agujero ni adoptes una holgura como valor universal.",
    guide: "/blog/pruebas-tolerancia-fdm", guideLabel: "Preparar una prueba de tolerancias", tool: "/laboratorio-tolerancias-fdm", toolLabel: "Descargar probeta y registro",
    source: "https://www.simplify3d.com/resources/print-quality-troubleshooting/dimensional-accuracy/", sourceLabel: "Simplify3D · Precisión dimensional"
  },
  {
    id: "capas", title: "La pieza se separa entre capas", clue: "La rotura sigue una capa o aparecen grietas horizontales durante la fabricación.",
    checks: ["Observa la superficie de la rotura. Si faltan líneas o hay huecos, descarta subextrusión antes de tratarlo solo como falta de unión.", "Comprueba que la altura de capa sea adecuada a la boquilla. Revisa temperatura y refrigeración de pieza con el perfil del material, sin superar sus límites.", "Si falla al usarla, revisa la dirección de carga, la orientación y las concentraciones de esfuerzo. Una pieza puede verse bien y estar orientada de forma desfavorable."],
    test: "Compara una muestra de la zona crítica bajo la misma solicitación y registra cómo falla. Una comprobación doméstica no acredita una carga admisible de seguridad.",
    avoid: "No supongas que aumentar el relleno soluciona una unión deficiente entre capas.",
    guide: "/blog/orientar-pieza-impresion-3d-resistente", guideLabel: "Elegir una orientación resistente", tool: "/blog/paredes-perimetros-tapas-fdm", toolLabel: "Revisar paredes y tapas",
    source: "https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806", sourceLabel: "Prusa · Separación entre capas"
  }
];
