---
title: "Cómo calcular el peso aproximado de una pieza 3D"
slug: "calcular-peso-aproximado-pieza-3d"
description: "Método práctico para estimar el peso de una pieza 3D usando volumen, densidad, relleno y material."
category: "Diseño industrial"
categorySlug: "diseno-industrial"
date: "2026-04-08"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Calcular el peso aproximado de una pieza ayuda a estimar coste, ergonomía, consumo de material y viabilidad. En CAD puedes obtener volumen, pero en impresión 3D FDM el relleno y las paredes cambian el resultado real.

## Resumen rápido

- Para piezas macizas usa volumen por densidad.
- Para FDM, el laminador estima mejor porque incluye paredes, tapas y relleno.
- Registra peso estimado y peso real para calibrar tus proyectos.
- Si tienes el volumen CAD, usa la [calculadora de peso de pieza 3D](/calculadora-peso-pieza-3d).
- Si la pieza será funcional, revisa también [cómo elegir filamento para piezas funcionales](/blog/elegir-filamento-piezas-funcionales).

## Fórmula básica

La relación general es:

`masa = volumen x densidad`

Si el volumen está en centímetros cúbicos y la densidad en gramos por centímetro cúbico, el resultado será gramos.

## Densidades orientativas

Cómo referencia inicial:

- PLA: cerca de 1,24 g/cm3.
- PETG: cerca de 1,27 g/cm3.
- ABS: cerca de 1,04 g/cm3.
- Nylon: cerca de 1,14 g/cm3.

Estos valores pueden variar según fabricante y aditivos.

## Piezas FDM con relleno

En FDM, una pieza al 20% de relleno no pesa exactamente el 20% de una pieza maciza. Las paredes, tapas y suelos pueden representar gran parte del material. El laminador suele dar una estimación más realista que el CAD.

## Método recomendado

Exporta el STL, abre el laminador, configura material, paredes, relleno y altura de capa. Compara la masa estimada con el cálculo teórico del CAD para entender la diferencia.

## Errores frecuentes

- Mezclar milímetros cúbicos con centímetros cúbicos.
- Usar densidad de una ficha distinta al filamento real.
- Ignorar soportes, purga, brim o piezas de prueba.
- Estimar coste solo por gramos y olvidar tiempo de máquina.

## Ejemplo aplicado

Un soporte CAD de 60 cm3 no pesa lo mismo si se fabrica macizo, con 20% de relleno o con cuatro perímetros. En una carcasa, las paredes y tapas pueden representar más material que el relleno. Una forma práctica es comparar tres datos: peso teórico macizo, peso estimado por el laminador y peso real medido después de imprimir. Esa comparación te enseña cómo se comportan tus perfiles.


## Conclusión

El CAD sirve para estimar piezas macizas. El laminador sirve para estimar piezas impresas. Usar ambos datos te da una visión más completa.

## Recomendación práctica final

Guarda una tabla con peso estimado y peso real de tus impresiones. Después de diez piezas, tus estimaciones serán mucho más fiables.
