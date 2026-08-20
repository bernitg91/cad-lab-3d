---
title: "Cómo calcular costes básicos de una pieza impresa en 3D"
slug: "calcular-costes-pieza-impresa-3d"
description: "Método sencillo para estimar material, tiempo, pruebas y coste real de una pieza impresa en 3D."
category: "Impresión 3D"
categorySlug: "impresion-3d"
date: "2026-05-07"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Calcular el coste de una impresión 3D exige mirar más allá de los gramos de filamento. La máquina permanece ocupada, el archivo necesita preparación y una repetición puede consumir tanto tiempo como la primera unidad. Separar esas partidas permite comparar alternativas y explicar un presupuesto sin inventar una tarifa universal.

## Qué partidas forman el coste real

Una estimación útil distingue costes directos, tiempo de trabajo y margen de incertidumbre. Así puedes actualizar una partida sin rehacer todo el cálculo.

| Partida | Cómo estimarla | Qué suele olvidarse |
| --- | --- | --- |
| Material | Gramos previstos × coste por gramo | Soportes, brim, purga y muestras |
| Uso de máquina | Horas previstas × coste horario interno | Calentamiento, enfriamiento y ocupación |
| Preparación | Tiempo de revisar, orientar y laminar | Correcciones del archivo y comunicación |
| Acabado | Minutos de retirada de soportes y montaje | Insertos, tornillos, lijado o embalaje |
| Riesgo | Margen razonado según dificultad | Repeticiones y material descartado |

El **coste por gramo** se obtiene dividiendo el precio útil de la bobina entre su masa. Si una bobina de 1 kg cuesta 24 €, el punto de partida sería 0,024 €/g. No es todavía el coste final: hay que añadir el material que el laminador asigna a soportes y adhesión. Para comprender de dónde sale esa masa, consulta [cómo calcular el peso aproximado de una pieza 3D](/blog/calcular-peso-aproximado-pieza-3d).

## Método paso a paso para presupuestar

### 1. Revisa el archivo antes de poner precio

Confirma escala, geometría cerrada, tolerancias y calidad de exportación. Una pieza que necesita rediseño no tiene el mismo coste de preparación que un STL listo para laminar. La [checklist antes de mandar una pieza a imprimir](/blog/checklist-mandar-pieza-imprimir-3d) ayuda a detectar estos trabajos ocultos.

### 2. Genera una estimación reproducible

Configura en el laminador la impresora, boquilla, material, altura de capa, paredes, relleno, soportes y orientación que realmente usarías. Guarda el perfil o una captura. Sin esos datos, dos estimaciones de la misma geometría pueden producir tiempos y masas muy distintos.

### 3. Calcula cada partida por separado

Multiplica la masa total por el coste por gramo. Para el uso de máquina, define un coste horario interno que contemple energía, desgaste y amortización según tu situación; no copies una tarifa ajena sin conocer sus máquinas y volumen de trabajo. Añade el tiempo manual de preparación y acabado con un valor coherente con el tipo de encargo.

### 4. Añade incertidumbre sin cobrarla dos veces

Una geometría conocida, corta y sin soportes necesita menos margen que una impresión larga con Nylon húmedo o grandes voladizos. El margen debe responder a riesgos concretos, no ser un porcentaje automático que además duplique gastos ya incluidos.

## Ejemplo orientativo de una pieza PETG

Supón una pieza estimada en 95 g, seis horas de máquina y veinte minutos de preparación. Si el filamento cuesta 0,026 €/g, el material de la pieza rondaría 2,47 €. Si el laminador añade 14 g entre soportes y brim, el material total pasa a unos 2,83 €.

Después se incorporan el coste horario de máquina, el tiempo manual y, si está justificado, un margen de repetición. **Las cifras son solo un ejercicio de método**: el consumo eléctrico, la amortización, la dificultad y el valor de una hora cambian en cada taller. En un lote, la preparación puede repartirse entre unidades, pero no necesariamente el acabado ni la tasa de fallo.

Antes de aceptar el tiempo del laminador, revisa la [orientación de una pieza para ganar resistencia](/blog/orientar-pieza-impresion-3d-resistente). Girar el modelo puede reducir soportes, aunque también empeorar una cara funcional o la dirección de carga.

## Checklist para cerrar la estimación

- [ ] El archivo y la versión están identificados.
- [ ] El laminado usa material, orientación y calidad acordados.
- [ ] La masa incluye soportes, brim y purga cuando proceda.
- [ ] El tiempo manual separa preparación, acabado y montaje.
- [ ] Se ha indicado qué incluye la entrega y cuántas unidades son.
- [ ] El margen responde a un riesgo visible y documentado.
- [ ] El presupuesto tiene una validez si el diseño puede cambiar.

Si la pieza es funcional, conviene contrastar también la [elección de filamento](/blog/elegir-filamento-piezas-funcionales): abaratar material no compensa una repetición causada por usar un polímero inadecuado.

## Errores y límites del cálculo

Los fallos más habituales son presupuestar antes de revisar el STL, cobrar solo filamento, ignorar el acabado y tratar una primera unidad como si fuera una serie estable. Tampoco debe confundirse **coste** con **precio**: el precio puede incluir impuestos, margen comercial, urgencia o servicio de diseño, según la actividad y la normativa aplicable.

El laminador ofrece una predicción, no una garantía. Desgaste de boquilla, humedad, pausas o pequeñas variaciones de velocidad alteran el resultado. Registra masa estimada, masa real, tiempo previsto, tiempo real y causa de cualquier repetición. Tras varias piezas similares tendrás datos propios mucho más fiables que una calculadora genérica.

## Conclusión

Una estimación defendible muestra material, máquina, trabajo y riesgo de forma separada. Empieza con datos del laminador, documenta tus supuestos y actualiza la hoja después de fabricar. Ese registro convierte cada impresión terminada en una referencia para presupuestar mejor la siguiente.
