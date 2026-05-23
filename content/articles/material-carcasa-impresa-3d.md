---
title: "Cómo elegir material para una carcasa impresa en 3D"
slug: "material-carcasa-impresa-3d"
description: "Criterios para elegir material en carcasas impresas en 3D según temperatura, impacto, montaje, acabado y uso."
category: "Materiales"
categorySlug: "materiales"
date: "2026-05-09"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Una carcasa impresa en 3D puede ser estética, funcional o ambas. El material debe elegirse según el uso: interior, exterior, temperatura, golpes, tornillos, clips y acabado esperado.

## Resumen rápido

- PLA sirve para maquetas y carcasas de baja exigencia.
- PETG suele ser mejor para uso general y algo de impacto.
- ABS o ASA pueden interesar si hay calor o exterior, pero exigen más control.
- Revisa también [diferencias entre PLA, PETG, ABS y Nylon](/blog/diferencias-pla-petg-abs-nylon) y [materiales para prototipos funcionales](/blog/materiales-prototipos-funcionales).

## Uso de la carcasa

No es lo mismo una carcasa para presentar un concepto que una caja que protege electrónica, soporta tornillos o se queda cerca de una fuente de calor. Define primero función y ambiente.

## Montaje y uniones

Si la carcasa usa tornillos, clips o insertos, el material debe tolerar montaje. Un clip fino en PLA puede partir antes que uno en PETG. Para carcasas desmontables, consulta [piezas desmontables y reparables](/blog/disenar-piezas-desmontables-reparables).

## Acabado y postproceso

PLA suele dar buen acabado visual. PETG puede generar hilos, pero funciona bien en piezas útiles. Materiales con más contracción pueden requerir cama caliente, recinto o ajustes contra warping.

## Errores frecuentes

- Elegir material solo por color.
- Usar PLA en carcasas expuestas a calor.
- Diseñar clips sin probar ciclos de apertura.
- No considerar tolerancias entre tapa y base.

## Ejemplo aplicado

Una carcasa para interior, sin carga y con acabado visual puede funcionar en PLA. Una carcasa para exterior necesita pensar en temperatura, radiación UV, humedad y tornillería. Si además debe abrirse varias veces, el material debe tolerar clips o inserts. La elección depende del uso de la carcasa, no solo del precio del filamento.

## Criterios de revisión

Antes de dar por bueno el trabajo, revisa estos puntos:

- No elijas material solo por resistencia teórica: revisa temperatura, humedad, rigidez, impacto y facilidad de impresión.
- Guarda muestras impresas con la misma geometría para comparar comportamiento real.
- Documenta proveedor, color, lote y condiciones de secado cuando el material sea sensible.
- Relaciona cada material con un uso concreto, no con una lista genérica de ventajas.

### Señal de que vas por buen camino

El resultado empieza a ser fiable cuando puedes explicar qué decisión tomaste, qué alternativa descartaste y qué dato usarías para repetir o mejorar el proyecto. Si solo tienes una captura final o una pieza impresa sin parámetros, todavía falta documentación técnica.

## Cómo validar la elección del material

1. Define el entorno de uso: interior, exterior, temperatura, humedad, carga, impactos y contacto con otras piezas.
2. Elige dos materiales candidatos y compáralos con una pieza de prueba pequeña, no solo con fichas comerciales.
3. Ajusta parámetros de impresión para cada material; no uses el mismo perfil para todos.
4. Revisa el resultado después de unas horas o días de uso si la pieza va a trabajar en condiciones reales.

### Evidencias que conviene guardar

Anota proveedor, temperatura, ventilación, cama, secado, velocidad y observaciones. Con materiales técnicos, esos datos importan tanto como el nombre del polímero.

## Límites y siguiente paso

Los rangos de comportamiento son orientativos. Dos filamentos del mismo material pueden cambiar por aditivos, humedad, color, marca o almacenamiento. Si la pieza va a trabajar con carga, calor o exterior, valida con una muestra y no con una ficha genérica.

Para ampliar el tema, revisa también [selector de material FDM](/selector-material-impresion-3d), [guía de materiales](/categorias/materiales), [calculadora de peso de pieza 3D](/calculadora-peso-pieza-3d). Ese enlazado ayuda a conectar decisiones de CAD, material, fabricación y documentación en un flujo de trabajo más completo.

## Conclusión

El material de una carcasa debe responder al uso real. Para muchos proyectos estudiantiles, PLA sirve para forma y PETG para una versión más funcional.

## Recomendación práctica final

Imprime una esquina de la carcasa con un clip, un tornillo y una zona visible. Esa muestra te dirá más que imprimir la carcasa completa a ciegas.
