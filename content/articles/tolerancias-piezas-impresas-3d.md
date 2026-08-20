---
title: "Cómo elegir tolerancias para piezas impresas en 3D"
slug: "tolerancias-piezas-impresas-3d"
description: "Criterios prácticos para definir holguras en encajes, agujeros, ejes y piezas ensambladas impresas en FDM."
category: "Impresión 3D"
categorySlug: "impresion-3d"
date: "2026-05-10"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

En CAD, dos piezas pueden encajar perfecto. En FDM, la realidad incluye boquilla, contracción, calibración y orientación. Por eso las tolerancias deben probarse.

## Variables que cambian la holgura

- Deja holgura en piezas que deben encajar.
- Prueba tolerancias con cupones pequeños antes de imprimir un conjunto grande.
- Diferencia encaje libre, encaje ajustado y pieza movil.
- Relaciona este tema con la sección de encajes de la [guía completa de impresión 3D FDM](/guia-impresion-3d-fdm).

## Holgura inicial

Cómo punto de partida, muchos encajes FDM necesitan décimas de milímetro por lado. No lo conviertas en norma universal: depende de impresora, material, temperatura y geometría.

## Agujeros y ejes

Los agujeros impresos suelen salir más pequeños. Si un tornillo, eje o pasador debe entrar, diseña una prueba con varios diámetros y registra el resultado.

## Errores al copiar tolerancias genéricas

- Copiar tolerancias de mecanizado como si FDM fuera CNC.
- No considerar orientación de agujeros.
- Ajustar el CAD sin calibrar primero la impresora.
- Diseñar un ensamblaje completo sin imprimir pruebas de encaje.

## Caso de un adaptador circular

Una holgura que funciona en PLA puede no funcionar igual en PETG, TPU o Nylon. También cambia con orientación, flujo y primera capa. Por eso es mejor crear una pieza de prueba con varias holguras y guardarla como referencia de tu impresora. Las tolerancias reales se aprenden midiendo.

## Diseñar una probeta de encajes útil

Una buena probeta debe reproducir la unión real: eje y agujero, lengüeta y ranura o tapa y carcasa. Incluye varias holguras identificadas en la propia pieza, por ejemplo 0,15; 0,25; 0,35 y 0,45 mm por lado. Imprime con el mismo material, orientación, boquilla y altura de capa previstos para el proyecto.

No pruebes solo si “entra” o “no entra”. Clasifica el ajuste: bloqueado, presión fuerte, deslizante con resistencia, libre o excesivo. Mide las zonas accesibles con calibre y anota si la primera capa ha creado pie de elefante. Esa deformación puede arruinar un encaje correcto en el resto de la altura.

## Agujeros no equivalen a contornos exteriores

Los agujeros pequeños suelen cerrarse más de lo esperado por el trazado de perímetros y la resolución del proceso. Un cilindro exterior y un agujero con el mismo diámetro nominal no tienen por qué mostrar la misma desviación. Para tornillos, decide si necesitas paso libre, roscado posterior o inserto térmico; cada solución requiere una geometría distinta.

### Mantener una biblioteca propia

Guarda la probeta con su fecha y perfil. Si cambias flujo, boquilla o material, imprime otra y compárala. Con el tiempo tendrás datos de tu proceso en lugar de aplicar una cifra genérica a todas las piezas.


## La tolerancia se valida físicamente

Las tolerancias en FDM son datos de proceso. Se aprenden midiendo tu máquina, no solo leyendo tablas.

## Probeta recomendada

Imprime una placa con ranuras y cilindros variando holguras. Guárdala como referencia para futuros proyectos.
