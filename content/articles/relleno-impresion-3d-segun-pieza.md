---
title: "Qué relleno usar en impresión 3D según el tipo de pieza"
slug: "relleno-impresion-3d-segun-pieza"
description: "Guía para elegir porcentaje y patrón de relleno en piezas estéticas, prototipos, soportes y piezas funcionales."
category: "Impresión 3D"
categorySlug: "impresion-3d"
date: "2026-05-12"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

El relleno es la estructura interna que genera el laminador entre las paredes de una pieza FDM. Elegirlo por costumbre —por ejemplo, aplicar el mismo porcentaje a todo— puede aumentar tiempo y material sin mejorar la zona que realmente trabaja. La decisión debe considerar función, orientación, paredes, tapas y forma de aplicar la carga.

## 1. Empieza por la función de la pieza

Una maqueta visual solo necesita sostener su forma y cerrar correctamente las superficies. Un útil de taller puede recibir compresión, flexión o tornillos. Una carcasa grande quizá necesite rigidez para no vibrar, aunque soporte poca carga. Escribe el modo de uso y señala por dónde entran las fuerzas antes de tocar el porcentaje.

La siguiente tabla no prescribe valores universales; indica qué variable conviene priorizar en cada caso:

| Tipo de pieza | Prioridad habitual | Qué revisar antes de subir relleno |
| --- | --- | --- |
| Maqueta o volumen visual | Tiempo y acabado exterior | Tapas, soporte de superficies y estabilidad |
| Carcasa | Rigidez de paredes y uniones | Perímetros, nervios, tornillos y orientación |
| Soporte funcional | Trayectoria de carga | Orientación, radios, paredes y zonas macizas locales |
| Pieza ligera | Relación rigidez-masa | Geometría hueca, nervios y patrón interno |

## 2. Porcentaje y patrón no significan lo mismo

El porcentaje controla cuánto espacio interior ocupa la estructura según el cálculo del laminador. El patrón define cómo se distribuye. Rejilla, líneas, cúbico o gyroid pueden producir recorridos, tiempos y rigideces distintos. Los nombres y algoritmos también varían entre programas, así que compara la vista previa y no solo la etiqueta.

Un porcentaje alto no convierte automáticamente la pieza en resistente. Si la carga separa las capas, existe una esquina aguda o el material no es adecuado, el relleno puede aportar poco. Consulta [cómo diseñar una pieza resistente para FDM](/blog/disenar-pieza-resistente-fdm) para trabajar primero la geometría.

### Tapas y apoyo interno

El relleno también sostiene capas superiores. Una superficie amplia con poco soporte interno puede mostrar hundimiento o mala textura. Antes de aumentar toda la densidad, revisa número de tapas, orientación de la pieza, puentes y un patrón que ofrezca apoyo suficiente. La guía sobre [paredes, perímetros y tapas](/blog/paredes-perimetros-tapas-fdm) explica cómo se relacionan estas variables.

## 3. Las paredes suelen gobernar la respuesta

En muchas geometrías, la parte exterior está más alejada del eje de flexión y contribuye mucho a la rigidez. Añadir perímetros puede ser más eficiente que llenar el núcleo. Esto no es una regla absoluta: una carga concentrada, una rosca, una zona de aplastamiento o una unión pueden necesitar material interno.

Utiliza modificadores del laminador cuando sea posible para reforzar solo una región. Alrededor de tornillos o apoyos puede interesar mayor densidad local, más paredes o una geometría CAD específica. Imprimir todo al 100 % es una solución costosa que además puede introducir acumulación térmica y no corrige un diseño débil.

## 4. Orientación y material cambian la decisión

La estructura interna trabaja junto con las capas. Orienta la pieza para que las trayectorias principales acompañen las cargas y revisa soportes y superficie funcional. La guía para [orientar piezas según resistencia](/blog/orientar-pieza-impresion-3d-resistente) debe preceder a cualquier comparación de porcentajes.

El material modifica rigidez, temperatura de uso y comportamiento al impacto. Un patrón que funciona en una probeta de PLA no demuestra el mismo resultado en PETG, ABS o nylon. Si la elección está abierta, revisa las [diferencias entre PLA, PETG, ABS y nylon](/blog/diferencias-pla-petg-abs-nylon) y valida con el material final.

## 5. Proceso práctico para elegir relleno

1. Define función, dirección de carga y criterio de fallo.
2. Corrige orientación, radios, espesores y uniones en el CAD.
3. Elige paredes y tapas suficientes para la envolvente.
4. Selecciona un patrón compatible con la carga y el tiempo disponible.
5. Compara en el laminador masa, duración y trayectorias de dos o tres variantes.
6. Imprime una probeta o la zona crítica con las mismas condiciones.
7. Registra perfil y resultado antes de reutilizarlo.

Si el objetivo principal es ahorrar masa, combina estas decisiones con [optimización de pieza para reducir material](/blog/optimizar-pieza-reducir-material-peso); los vaciados y nervios diseñados pueden ser más controlables que un cambio global de porcentaje.

## 6. Errores y límites

Comparar piezas con distinta orientación, material o número de paredes impide atribuir el cambio al relleno. También es un error interpretar la masa estimada como resistencia o aplicar 100 % sin revisar la vista previa. Los perfiles del laminador son puntos de partida: **la resistencia real exige pruebas representativas**, especialmente en componentes de seguridad.

Guarda perfiles separados para maqueta, prototipo y pieza funcional, pero documenta qué condiciones validaste. Un buen perfil acelera decisiones repetidas; no sustituye analizar cada geometría nueva.
