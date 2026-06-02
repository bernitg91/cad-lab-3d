---
title: "Cómo hacer pruebas de tolerancia en FDM"
slug: "pruebas-tolerancia-fdm"
description: "Método para crear pruebas de tolerancia en impresión 3D FDM y ajustar encajes, agujeros y piezas moviles."
category: "Impresión 3D"
categorySlug: "impresion-3d"
date: "2026-05-11"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Las tolerancias FDM no se aprenden solo leyendo recomendaciones. Cada impresora, material y perfil produce desviaciones. Una prueba pequeña te permite ajustar antes de gastar horas en una pieza completa.

## Resumen rápido

- Diseña una pieza de prueba con varias holguras.
- Mide resultados con calibre y anota material, boquilla y perfil.
- Prueba agujeros, ejes, ranuras y encajes reales.
- Parte de [cómo elegir tolerancias para piezas impresas en 3D](/blog/tolerancias-piezas-impresas-3d) y [encajes y clips para impresión 3D](/blog/disenar-encajes-clips-impresion-3d).

## Qué debe incluir una prueba

Una buena prueba de tolerancia incluye agujeros de distintos diámetros, ranuras, pestañas y un encaje macho-hembra. No hace falta que sea grande: lo importante es que represente las zonas que usarás en tu proyecto.

## Cómo interpretar el resultado

No te quedes solo con "entra" o "no entra". Clasifica cada holgura: suelta, suave, ajustada, forzada o imposible. Esa escala te ayuda a elegir tolerancias según el tipo de unión.

## Registro de resultados

Anota material, temperatura, altura de capa, perímetros, velocidad y orientación. Si cambias cualquier variable importante, la prueba anterior deja de ser totalmente comparable.

## Errores frecuentes

- Probar tolerancias con una pieza distinta a la geometría real.
- No medir y decidir solo por sensación.
- Usar una prueba de PLA para una pieza final en PETG.
- Olvidar que la primera capa puede deformar medidas de encaje.

## Ejemplo aplicado

Antes de diseñar una carcasa completa con encajes, imprime una tira con huecos de 0,1, 0,2, 0,3 y 0,4 mm de holgura. Prueba con el material y orientación reales. Esa muestra te da datos propios, más útiles que copiar tolerancias genéricas de internet.

## Criterios de revisión

Para aplicar bien esta guía sobre **hacer pruebas de tolerancia en FDM**, utiliza esta revisión:

- Antes de lanzar una impresión larga, revisa el archivo como si fueras a repetirlo dentro de un mes.
- Comprueba unidades, orientación, soportes, primera capa, paredes y zonas de encaje.
- Si la pieza tiene zonas críticas, valida primero una muestra parcial o una versión reducida.
- Guarda material, boquilla, altura de capa, relleno, tiempo estimado y observaciones del resultado.

## Aplicación práctica

Trabaja con una pieza concreta: importa el archivo en el laminador, revisa la vista por capas, localiza la zona más delicada y decide qué parámetro afecta más al resultado. Después imprime una prueba pequeña si el fallo puede costar muchas horas.

### Registro recomendado

Guarda solo evidencias útiles: capturas, medidas, parámetros, fotos del prototipo o notas de descarte. El objetivo es que otra persona pueda entender qué decisión se tomó y qué habría que revisar en la siguiente versión.

## Límites y siguiente paso

Las recomendaciones de FDM dependen de impresora, boquilla, material, humedad, tamaño de pieza y orientación. Una solución válida para PLA pequeño puede fallar en PETG, TPU o en una pieza con más horas de impresión.

Para continuar, consulta también [checklist interactiva de impresión 3D](/checklist-impresion-3d), [calculadora de precio de impresión 3D](/calculadora-precio-impresion-3d) y [selector de material FDM](/selector-material-impresion-3d).

## Conclusión

Las pruebas de tolerancia convierten suposiciones en datos. Son especialmente útiles en proyectos con tapas, clips, ejes o piezas desmontables.

## Recomendación práctica final

Guarda una caja con tus pruebas físicas etiquetadas. Es una biblioteca de tolerancias más útil que cualquier tabla genérica.
