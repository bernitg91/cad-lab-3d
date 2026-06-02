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

Para aplicar bien esta guía sobre **elegir tolerancias para piezas impresas en 3D**, utiliza esta revisión:

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

Las tolerancias en FDM son datos de proceso. Se aprenden midiendo tu máquina, no solo leyendo tablas.

## Recomendación práctica final

Imprime una placa con ranuras y cilindros variando holguras. Guárdala como referencia para futuros proyectos.
