---
title: "Cómo elegir tolerancias para piezas impresas en 3D"
slug: "tolerancias-piezas-impresas-3d"
description: "Criterios prácticos para definir holguras en encajes, agujeros, ejes y piezas ensambladas impresas en FDM."
category: "Impresión 3D"
categorySlug: "impresion-3d"
date: "2026-05-10"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

En CAD, dos piezas pueden encajar perfecto. En FDM, la realidad incluye boquilla, contracción, calibración y orientación. Por eso las tolerancias deben probarse.

## Resumen rápido

- Deja holgura en piezas que deben encajar.
- Prueba tolerancias con cupones pequeños antes de imprimir un conjunto grande.
- Diferencia encaje libre, encaje ajustado y pieza movil.
- Relaciona este tema con [encajes y clips para impresión 3D](/blog/disenar-encajes-clips-impresion-3d).

## Holgura inicial

Cómo punto de partida, muchos encajes FDM necesitan décimas de milímetro por lado. No lo conviertas en norma universal: depende de impresora, material, temperatura y geometría.

## Agujeros y ejes

Los agujeros impresos suelen salir más pequeños. Si un tornillo, eje o pasador debe entrar, diseña una prueba con varios diámetros y registra el resultado.

## Errores frecuentes

- Copiar tolerancias de mecanizado como si FDM fuera CNC.
- No considerar orientación de agujeros.
- Ajustar el CAD sin calibrar primero la impresora.
- Diseñar un ensamblaje completo sin imprimir pruebas de encaje.

## Ejemplo aplicado

Una holgura que funciona en PLA puede no funcionar igual en PETG, TPU o Nylon. También cambia con orientación, flujo y primera capa. Por eso es mejor crear una pieza de prueba con varias holguras y guardarla como referencia de tu impresora. Las tolerancias reales se aprenden midiendo.

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

Las tolerancias en FDM son datos de proceso. Se aprenden midiendo tu máquina, no solo leyendo tablas.

## Recomendación práctica final

Imprime una placa con ranuras y cilindros variando holguras. Guárdala como referencia para futuros proyectos.
