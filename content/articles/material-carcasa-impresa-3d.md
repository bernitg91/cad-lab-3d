---
title: "Cómo elegir material para una carcasa impresa en 3D"
slug: "material-carcasa-impresa-3d"
description: "Criterios para elegir material en carcasas impresas en 3D según temperatura, impacto, montaje, acabado y uso."
category: "Materiales"
categorySlug: "materiales"
date: "2026-05-09"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Una carcasa impresa en 3D puede ocultar componentes, soportar un montaje, proteger frente a golpes o presentar un concepto. Cada función exige algo distinto al material. Antes de escoger filamento por color o facilidad, **define ambiente, temperatura, uniones, esfuerzos y vida útil esperada**.

## Traducir el uso en requisitos

Empieza describiendo dónde trabajará la carcasa. ¿Estará en interior o exterior? ¿Cerca de un motor, una ventana o una fuente de calor? ¿Recibirá golpes, limpieza frecuente o radiación solar? ¿Debe abrirse cada semana o solo una vez? ¿Protege electrónica, pero necesita ventilación?

También diferencia prototipo y producto. Una maqueta en PLA puede validar volumen y acceso, aunque no represente el material final. Si quieres comprobar comportamiento, elige el material del prototipo según la pregunta, como explica la guía de [materiales para prototipos funcionales](/blog/materiales-prototipos-funcionales).

## Comparación inicial de materiales FDM

Esta tabla orienta la primera selección, pero las formulaciones comerciales y los parámetros de impresión producen diferencias importantes.

| Material | Puede ser útil cuando… | Aspecto a vigilar |
| --- | --- | --- |
| PLA | importa el acabado, la rapidez y el uso interior moderado | pérdida de rigidez con calor y clips frágiles según diseño |
| PETG | se busca tenacidad general, algo de flexibilidad y resistencia a humedad | hilos, puentes y ajuste de tolerancias |
| ABS | se necesita mayor tolerancia térmica y postprocesado específico | contracción, emisiones y necesidad de entorno controlado |
| ASA | la carcasa estará expuesta a exterior y radiación UV | warping, ventilación y dificultad de impresión |
| Nylon | importan tenacidad, desgaste o clips repetidos | absorción de humedad, flexibilidad y control dimensional |
| TPU | se necesita una funda, junta o absorción de impacto | poca rigidez y dificultad en puentes o paredes finas |

No conviertas esta comparación en una clasificación absoluta. Consulta fichas técnicas del filamento real y revisa la [comparativa de PLA, PETG, ABS y nylon](/blog/diferencias-pla-petg-abs-nylon) antes de decidir.

## Diseñar pared, ventilación y temperatura juntas

La resistencia térmica no depende solo del nombre del polímero. Una pared larga, fina y precargada por tornillos puede deformarse antes que una geometría rígida. Distribuye espesores, evita masas aisladas y añade radios en transiciones. Para conectar el CAD con la extrusión, usa la guía de [espesores mínimos en plástico](/blog/espesores-minimos-piezas-plastico).

Si la carcasa contiene electrónica, no cierres ventilaciones únicamente por estética. Estima dónde entra y sale aire, deja distancia a componentes calientes y evita que una rejilla debilite la zona atornillada. La impresión 3D no concede automáticamente aislamiento eléctrico, resistencia al fuego ni estanqueidad: esas propiedades requieren materiales clasificados, diseño específico y validación apropiada.

## Uniones que condicionan el material

### Tornillos e insertos

Un tornillo autorroscante puede dañar un alojamiento si el diámetro, la profundidad o el par no son adecuados. Los insertos térmicos facilitan desmontaje, pero exigen suficiente material alrededor y un proceso repetible. Imprime una sección con el alojamiento real y prueba el montaje antes de fabricar la carcasa entera.

### Clips y pestañas

Un clip combina material, longitud flexible, espesor, radio y orientación de capas. Cambiar de PLA a PETG o nylon no arregla un clip corto, con esquina viva o impreso a contracapa. Sigue la guía de [diseño de encajes y clips](/blog/disenar-encajes-clips-impresion-3d) y registra cuántos ciclos representativos soporta la muestra.

### Tapa y base

La holgura entre mitades depende de máquina, material y orientación. No uses un ajuste nominal. Añade referencias de centrado que no sobredefinan el ensamblaje y deja acceso de herramienta. Si habrá mantenimiento, aplica criterios de [diseño reparable](/blog/disenar-piezas-desmontables-reparables).

## Proceso práctico de selección

1. Define uso, ambiente, temperatura, golpes y frecuencia de apertura.
2. Marca las zonas críticas: fuentes de calor, tornillos, clips, juntas y rejillas.
3. Descarta materiales que no cumplen una condición obligatoria según datos del fabricante.
4. Elige dos candidatos y diseña el mismo cupón: esquina, unión, rejilla y acabado visible.
5. Imprime con orientación y parámetros documentados.
6. Comprueba encaje, deformación, montaje y acabado bajo condiciones representativas.
7. Ajusta geometría antes de atribuir cada fallo al polímero.
8. Fabrica una sección mayor y repite la evaluación antes de cerrar la revisión.

Los materiales con contracción elevada pueden exigir una primera capa más controlada, temperatura estable y medidas específicas contra el warping.

## Errores y limitaciones

Elegir solo por apariencia, colocar PLA junto a calor sin validar, apretar tornillos sin controlar el montaje o prometer uso exterior por una única muestra son fallos comunes. También lo es suponer que una carcasa impresa es impermeable: líneas, costuras y uniones pueden permitir fugas.

Una prueba doméstica permite comparar versiones, pero no certifica inflamabilidad, protección IP, aislamiento ni seguridad de producto. Cuando esas prestaciones sean necesarias, usa normas, ensayos y materiales adecuados. Para un proyecto *maker* o universitario, una decisión sólida deja claro **qué se validó, con qué muestra y qué sigue pendiente**.
