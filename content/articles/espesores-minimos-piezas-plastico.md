---
title: "Cómo elegir espesores mínimos en piezas de plástico"
slug: "espesores-minimos-piezas-plastico"
description: "Criterios para definir espesores en piezas de plástico según rigidez, fabricación, impresión 3D y uso final."
category: "Materiales"
categorySlug: "materiales"
date: "2026-05-04"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

El espesor de una pieza de plástico afecta rigidez, peso, tiempo, coste y fabricación. No existe un valor universal: depende de proceso, material y función.

## Resumen rápido

- Define carga, tamaño y proceso antes de fijar espesor.
- En FDM, adapta paredes al ancho de boquilla.
- Usa nervios y radios para mejorar rigidez sin engordar todo.
- Para FDM, revisa [errores comunes al diseñar piezas para impresión 3D](/blog/errores-diseno-piezas-impresion-3d).

## Espesor y rigidez

Aumentar espesor aumenta rigidez, pero también peso y material. Muchas veces conviene usar nervios o geometría plegada en vez de hacer todo macizo.

## Espesor en FDM

Con boquilla de 0,4 mm, diseña paredes que el laminador pueda construir con varios perímetros. Si una pared queda demasiado fina, puede desaparecer o salir débil.

## Errores frecuentes

- Usar el mismo espesor en toda la pieza sin pensar en esfuerzos.
- Hacer nervios demasiado finos para imprimir.
- No redondear uniones entre paredes.
- Reducir peso quitando material de zonas críticas.

## Ejemplo aplicado

Una pared de 0,8 mm puede imprimirse, pero quizá no resista montaje, lijado o un tornillo cercano. En carcasas FDM pequeñas, muchas veces conviene pensar en múltiplos del ancho de línea y reforzar zonas de tornillo con bosses o nervios. El espesor mínimo no es solo el que sale de la boquilla; es el que cumple función.


## Conclusión

El espesor mínimo debe ser fabricable y suficiente para la función. Es una decisión de diseño, no solo una cota.

## Recomendación práctica final

Antes de cerrar una pieza, revisa cada pared preguntando: qué función cumple, cómo se fabrica y qué pasa si se reduce?
