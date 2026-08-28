---
title: "Cómo documentar un análisis FEM básico"
slug: "documentar-analisis-fem-basico"
description: "Guía para documentar cargas, restricciones, material, malla, resultados y límites de un análisis FEM."
category: "Simulación FEM"
categorySlug: "simulacion-fem"
date: "2026-05-08"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

**Una imagen de tensiones con muchos colores no demuestra que un análisis FEM sea correcto**. Un informe defendible permite reconstruir la pregunta, las simplificaciones, las entradas y la interpretación. Documentar no es adornar el resultado: es mostrar dónde termina la evidencia del modelo.

## Empieza por la pregunta y el alcance

**Escribe qué quieres conocer antes de abrir el software**. Por ejemplo: “comparar el desplazamiento de dos geometrías bajo la misma carga” es más preciso que “comprobar la pieza”. Define si el estudio es lineal, estático y de pequeñas deformaciones, cuando esas sean las hipótesis usadas.

Indica también qué no pretende resolver. Un modelo elástico estático no caracteriza automáticamente impacto, fatiga, fluencia, pandeo ni contacto no lineal. Si dudas sobre la utilidad del método, revisa [qué es un análisis FEM y cuándo usarlo](/blog/que-es-analisis-fem-cuando-usarlo).

## Registra geometría e hipótesis

Incluye una vista limpia del modelo y enumera detalles eliminados, simetrías, cuerpos simplificados y contactos. **Cada simplificación debe tener un motivo**: reducir coste de cálculo, evitar detalles no estructurales o representar solo una región.

La [guía de simulación FEM](/guia-simulacion-fem) ayuda a eliminar detalles sin borrar el camino de carga. Si sustituyes un tornillo por una unión rígida o una superficie por un apoyo ideal, explica cómo puede afectar a la rigidez y a las tensiones locales.

## Crea trazabilidad de las entradas

Una tabla corta evita que las cifras queden dispersas entre capturas.

| Entrada | Valor y unidad | Origen | Motivo o incertidumbre |
| --- | --- | --- | --- |
| Material | Propiedades usadas | Ficha, norma o supuesto | Modelo isotrópico, temperatura, lote |
| Carga | Magnitud y dirección | Requisito o cálculo | Reparto y combinación |
| Restricción | Grados de libertad | Montaje real | Rigidez idealizada |
| Contacto | Tipo y parámetros | Interfaz física | Fricción o separación omitida |
| Malla | Tipo y tamaño | Estudio de sensibilidad | Refinamiento local |

No escribas únicamente el nombre comercial del material. Registra **las propiedades introducidas, sus unidades y la fuente**. En una pieza FDM, un material isotrópico puede ser una simplificación fuerte debido a las capas; decláralo en lugar de presentar el resultado como validación completa.

## Documenta malla y comprobaciones

Muestra la malla global y un detalle de la zona crítica. Indica tipo de elemento, tamaño característico, refinamientos y criterio de calidad si el programa lo ofrece. Una imagen sin escala o datos no permite evaluar resolución.

### Sensibilidad de malla

Compara **al menos dos niveles razonables** en el resultado que realmente importa. Si el desplazamiento se estabiliza pero la tensión máxima sigue creciendo en una esquina ideal, puede existir una singularidad. No elimines el valor incómodo: explica si es un pico local, cómo cambia con la malla y qué lectura física tiene.

Incluye comprobaciones sencillas cuando sea posible: reacción total frente a carga aplicada, orden de magnitud de una deformación manual o simetría esperada. Una coincidencia no prueba todo el modelo, pero una incoherencia puede revelar un error temprano.

## Presenta resultados con interpretación

Cada figura necesita **variable, unidades, escala, deformada real o amplificada y ubicación del máximo relevante**. Explica si la deformación tiene sentido y si la zona crítica coincide con el camino de carga. Evita recortar la leyenda para que la captura parezca más limpia.

**No conviertas automáticamente una tensión máxima en factor de seguridad** sin comprobar criterio de fallo, material y naturaleza del pico. Si comparas diseños, usa la misma escala visual y las mismas condiciones. Relaciona cada conclusión con la pregunta inicial.

## Estructura práctica del informe

1. Objetivo y alcance.
2. Geometría, versión y simplificaciones.
3. Materiales, contactos, cargas y restricciones.
4. Malla y sensibilidad.
5. Resultados con unidades e interpretación.
6. Comprobaciones independientes.
7. Limitaciones, conclusión y siguiente validación.

Integra esta estructura y conserva las decisiones del proyecto con la [guía de documentación técnica](/guia-documentacion-tecnica).

## Checklist y errores frecuentes

- [ ] La pregunta del análisis aparece en la primera página.
- [ ] La versión del CAD y las unidades están identificadas.
- [ ] Cada entrada tiene fuente o se declara como supuesto.
- [ ] Cargas y restricciones se ven en una figura comprensible.
- [ ] La malla se justifica en la zona de interés.
- [ ] Los resultados incluyen unidades, escala y lectura escrita.
- [ ] Las singularidades y limitaciones se explican.
- [ ] La conclusión no excede lo que el modelo puede demostrar.

Los errores más frecuentes son fijar en exceso el modelo, usar una malla por defecto sin revisión, mostrar solo el resultado “bonito” y llamar segura a la pieza sin ensayo ni criterio de aceptación. Tampoco debe confundirse **precisión numérica con exactitud física**: más decimales no corrigen una condición de contorno equivocada.

## Conclusión

Un FEM básico queda bien documentado cuando otra persona puede reconstruirlo, cuestionar sus supuestos y relacionar cada conclusión con una entrada. Mostrar incertidumbre y límites no debilita el trabajo; evita que una simulación exploratoria se presente como certificación.
