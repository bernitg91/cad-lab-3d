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

Antes de dar por bueno el trabajo, revisa estos puntos:

- Comprueba la orientación, los soportes y la primera capa antes de lanzar una pieza larga.
- Anota material, boquilla, altura de capa, paredes, relleno y temperatura para poder repetir el resultado.
- Imprime una muestra pequeña cuando haya encajes, clips, zonas finas o una geometría nueva.
- Revisa la vista previa del laminador capa a capa en las zonas críticas.

### Señal de que vas por buen camino

El resultado empieza a ser fiable cuando puedes explicar qué decisión tomaste, qué alternativa descartaste y qué dato usarías para repetir o mejorar el proyecto. Si solo tienes una captura final o una pieza impresa sin parámetros, todavía falta documentación técnica.

## Procedimiento recomendado

1. Empieza con una revisión del modelo: unidades, escala, orientación posible, zonas finas y superficies funcionales.
2. Configura el laminador con el material real y revisa la vista previa antes de mirar solo el tiempo estimado.
3. Si la pieza tiene tolerancias, clips o zonas cargadas, imprime una muestra parcial antes de fabricar la versión completa.
4. Después de imprimir, compara el resultado con el objetivo inicial y anota qué cambiarías en CAD o en el perfil.

### Evidencias que conviene guardar

Guarda capturas de orientación, parámetros del laminador, peso estimado, tiempo de impresión y una foto del resultado. Esa pequeña ficha convierte una prueba aislada en conocimiento reutilizable para futuros trabajos.

## Límites y siguiente paso

No apliques estos criterios como una receta cerrada si cambian impresora, boquilla, material o escala. Una pieza pequeña puede tolerar decisiones que fallan en una pieza grande; un material rígido puede necesitar holguras distintas a uno flexible. Cuando el coste de fallo sea alto, convierte primero la zona crítica en una prueba parcial.

Para ampliar el tema, revisa también [calculadora de precio de impresión 3D](/calculadora-precio-impresion-3d), [checklist interactiva de impresión 3D](/checklist-impresion-3d), [selector de material FDM](/selector-material-impresion-3d). Ese enlazado ayuda a conectar decisiones de CAD, material, fabricación y documentación en un flujo de trabajo más completo.

## Conclusión

Las pruebas de tolerancia convierten suposiciones en datos. Son especialmente útiles en proyectos con tapas, clips, ejes o piezas desmontables.

## Recomendación práctica final

Guarda una caja con tus pruebas físicas etiquetadas. Es una biblioteca de tolerancias más útil que cualquier tabla genérica.
