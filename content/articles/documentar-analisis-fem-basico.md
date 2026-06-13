---
title: "Cómo documentar un análisis FEM básico"
slug: "documentar-analisis-fem-basico"
description: "Guía para documentar cargas, restricciones, material, malla, resultados y límites de un análisis FEM."
category: "Simulación FEM"
categorySlug: "simulacion-fem"
date: "2026-05-08"
updatedDate: "2026-06-13"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Un análisis FEM sin documentación es difícil de defender. La imagen de colores no basta: hay que explicar hipótesis, entradas, resultados y límites.

## Qué debe quedar registrado

- Define qué pregunta responde el análisis.
- Documenta material, cargas, restricciones y malla.
- Presenta resultados con unidades y escala.
- Si aún no tienes base, empieza por [qué es un análisis FEM](/blog/que-es-analisis-fem-cuando-usarlo).
- Para estructurar la entrega completa, revisa también [recursos](/recursos).

## Hipótesis del modelo

Indica qué simplificaciones aplicaste: geometría eliminada, contactos ignorados, simetría o cargas equivalentes. Esto no debilita el informe; lo hace más honesto.

## Resultados

Incluye desplazamiento máximo, tensión relevante, factor de seguridad si aplica y una interpretación. Explica si las tensiones máximas aparecen en zonas de singularidad.

## Omisiones que debilitan el informe

- No explicar condiciones de contorno.
- Mostrar resultados sin unidades.
- Usar una malla sin justificar.
- Concluir que una pieza es segura solo por un color azul.

## Estructura de un análisis sencillo

Un FEM básico de un soporte no debería limitarse a una captura de colores. Incluye material, carga aplicada, restricciones, tamaño de malla aproximado, deformada y una lectura crítica. Si el máximo aparece en una arista viva, explica si es una singularidad o una zona realmente crítica. Esa aclaración cambia por completo la calidad del informe.

## Estructura mínima de un informe FEM

Empieza con la pregunta que intenta responder el análisis. Después incluye una imagen limpia de la geometría, las simplificaciones realizadas, las propiedades del material, las cargas y las restricciones. La malla debe mostrarse al menos en la zona de interés, junto con su tamaño característico o el criterio utilizado para refinarla.

Los resultados necesitan unidades, escala y una lectura escrita. No basta con indicar la tensión máxima: explica dónde aparece, si es estable al refinar la malla y si coincide con una zona físicamente razonable. Añade desplazamiento máximo y, cuando proceda, una comparación entre dos diseños o una comprobación manual sencilla.

### Tabla de trazabilidad

Una tabla breve puede relacionar entrada, valor, origen y efecto esperado. Por ejemplo: carga de 120 N tomada del requisito del proyecto; apoyo cilíndrico representado mediante restricción radial; módulo elástico obtenido de la ficha del material. Esta trazabilidad permite localizar qué supuesto debe cambiar si el resultado no representa el ensayo o el uso real.

## Qué no puede demostrar el modelo

Un análisis lineal con material elástico no valida fatiga, impacto, fluencia, contactos complejos ni comportamiento anisótropo de una pieza FDM. Indicar estas limitaciones no debilita el informe; demuestra que el resultado se interpreta dentro de su alcance.


## Qué hace defendible el documento

Documentar FEM es demostrar que entiendes el modelo, no solo que sabes ejecutar el software.

## Revisión final recomendada

Antes de exportar capturas, escribe una tabla con entradas del análisis y otra con resultados. Eso ordena el informe.
