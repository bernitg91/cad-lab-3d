---
title: "Cómo preparar un archivo STL para impresión 3D"
slug: "preparar-archivo-stl-impresion-3d"
description: "Checklist práctica para exportar, revisar y laminar un STL antes de imprimir una pieza 3D."
category: "Impresión 3D"
categorySlug: "impresion-3d"
date: "2026-05-13"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Preparar un STL no es pulsar exportar y confiar. El archivo debe conservar escala, detalle suficiente y geometría cerrada para que el laminador pueda convertirlo en capas sin sorpresas.

## Qué debe conservar el archivo

- Revisa unidades y escala antes de exportar.
- Usa una resolución adecuada: ni facetado visible ni archivo gigante sin necesidad.
- Abre el STL en el laminador y revisa la vista previa por capas.
- Antes de enviar, pasa por el [checklist interactivo de impresión 3D](/checklist-impresion-3d).

## Ajustes de exportación

En el CAD, exporta desde el modelo final y no desde una versión de trabajo. Comprueba que las unidades sean milímetros si tu laminador trabaja así. Para piezas con radios o curvas visibles, aumenta la resolución de malla hasta que no aparezcan caras demasiado marcadas.

## Revisión en el laminador

Importa el STL y confirma dimensiones. Después revisa orientación, soportes, tiempo, masa y recorrido por capas. Si ves paredes que desaparecen, probablemente el espesor es inferior a lo que puede imprimir la boquilla.

## Exportaciones que generan problemas

- Exportar una pieza en pulgadas y laminarla como milímetros.
- Usar un STL antiguo con el mismo nombre que el corregido.
- No revisar normales, huecos o cuerpos solapados.
- Mandar a imprimir sin comprobar si los soportes caen en caras funcionales.

## Caso de una superficie curva

Un STL correcto debe abrirse con escala real, sin caras invertidas ni geometría rota. Antes de imprimir una pieza importante, importa el STL en el laminador y revisa si aparecen huecos, paredes demasiado finas o detalles que desaparecen por el diámetro de boquilla. Exportar no es el final: la revisión en laminador es parte del proceso.

## Resolución de malla: ni facetada ni innecesaria

El STL aproxima las superficies curvas mediante triángulos. Una resolución demasiado baja deja cilindros facetados y puede afectar a alojamientos; una resolución extrema crea archivos pesados sin mejorar lo que la boquilla puede fabricar. Amplía una curva crítica en el laminador y comprueba que el contorno sea suave a la escala de impresión.

Guarda también un formato editable o neutro, como el archivo CAD original y STEP cuando proceda. El STL no conserva operaciones, cotas ni intención de diseño, por lo que no debería ser la única copia de una pieza que quizá necesite cambios.

## Control de versión antes de compartir

Usa nombres que identifiquen pieza y revisión, por ejemplo `soporte_sensor_rev03.stl`. Evita `final`, `final2` o `bueno_ahora_si`. Incluye una captura de la orientación prevista y, si otra persona va a imprimir, indica unidades, material recomendado, boquilla, altura de capa y zonas que no deben recibir soportes.

### Comprobación final

Compara las dimensiones que muestra el laminador con una cota conocida del CAD. Después revisa la primera capa, las capas donde comienzan agujeros o puentes y la última capa. Este recorrido detecta muchos errores de escala, cuerpos solapados y detalles perdidos antes de consumir material.


## Exportar también requiere revisión

Un STL correcto reduce errores de fabricación, pero la validación real ocurre en el laminador. CAD y slicer deben revisarse juntos.

## Control final en el laminador

Crea una carpeta por versión con CAD, STL y captura del laminador. Así puedes repetir la impresión o explicar qué cambió si algo falla.
