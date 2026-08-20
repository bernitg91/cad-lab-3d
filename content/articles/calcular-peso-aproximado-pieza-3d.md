---
title: "Cómo calcular el peso aproximado de una pieza 3D"
slug: "calcular-peso-aproximado-pieza-3d"
description: "Método práctico para estimar el peso de una pieza 3D usando volumen, densidad, relleno y material."
category: "Diseño industrial"
categorySlug: "diseno-industrial"
date: "2026-04-08"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Estimar el peso de una pieza sirve para revisar **ergonomía, coste, consumo de material y capacidad de carga**. El método cambia según la fabricación: en una pieza maciza basta con volumen y densidad; en FDM intervienen paredes, tapas, relleno, soportes y purga.

## Fórmula para una pieza maciza

La relación general es:

`masa = volumen × densidad`

Si el volumen está en centímetros cúbicos y la densidad en gramos por centímetro cúbico, la masa resultará en gramos. Muchos programas CAD muestran el volumen en milímetros cúbicos: para convertirlo, **divide entre 1.000** antes de aplicar una densidad expresada en g/cm³.

Como referencia inicial, PLA y PETG suelen situarse alrededor de 1,2–1,3 g/cm³, mientras que ABS y varios Nylon pueden estar cerca de 1,0–1,2 g/cm³. **No uses esos rangos como ficha técnica**: pigmentos, fibras, cargas y formulaciones modifican la densidad. Prioriza el dato del fabricante de tu material.

### Ejemplo teórico

Un modelo macizo de 48 cm³ fabricado con un material de densidad declarada de 1,24 g/cm³ tendría una masa teórica de 59,52 g. El cálculo no contempla tolerancias de fabricación, humedad, vacíos ni elementos añadidos. Es una base para comparar conceptos, no una promesa de peso final.

## Por qué el porcentaje de relleno no basta

Una pieza FDM con un 20 % de relleno **no pesa el 20 % de su versión maciza**. Las paredes exteriores, las capas superiores e inferiores y los detalles pequeños pueden ocupar una parte importante del volumen. En una carcasa fina, aumentar perímetros puede influir más que cambiar el relleno.

Para entender esa diferencia, revisa [paredes, perímetros y tapas en FDM](/blog/paredes-perimetros-tapas-fdm) y [cómo elegir el relleno según la pieza](/blog/relleno-impresion-3d-segun-pieza). Ambos parámetros deben evaluarse juntos: reducir relleno mientras se mantienen muchas tapas puede ahorrar muy poco.

El laminador calcula las trayectorias reales y suele ofrecer una estimación mejor para FDM. Asegúrate de introducir el diámetro y la densidad correctos del filamento. Algunos perfiles heredan una densidad genérica y muestran una masa coherente en apariencia, pero incorrecta para la bobina utilizada.

## Método recomendado en tres niveles

### 1. Calcula el máximo teórico en CAD

Obtén volumen, aplica la densidad y guarda el resultado como **“masa maciza teórica”**. Este valor permite comparar materiales o detectar un error de unidades. Si el laminador predice más que la pieza maciza sin contar soportes, revisa la configuración.

### 2. Lamina con el perfil real

Configura **orientación, paredes, tapas, relleno, soportes, brim y purga**. Registra tanto los gramos de la pieza como el material auxiliar cuando el programa los separe. Si todavía dudas sobre la geometría, consulta [cómo optimizar una pieza para reducir material y peso](/blog/optimizar-pieza-reducir-material-peso) antes de reducir espesores sin criterio.

### 3. Pesa y corrige después de imprimir

Usa una báscula con resolución adecuada al tamaño de la pieza. **Retira soportes y brim** si quieres comparar solo el componente terminado; pésalos aparte si analizas consumo. Calcula la desviación entre estimación y realidad y anota el perfil empleado.

## Checklist de estimación

- [ ] Unidades del CAD verificadas.
- [ ] Densidad tomada de la bobina o ficha correcta.
- [ ] Perfil de laminado correspondiente a la impresora y boquilla.
- [ ] Paredes, tapas y relleno definidos.
- [ ] Soportes, brim y purga incluidos según el objetivo del cálculo.
- [ ] Insertos, tornillos, adhesivo u otros componentes sumados aparte.
- [ ] Peso real registrado después de fabricar.

Este último punto resulta especialmente útil al [calcular el coste de una pieza impresa](/blog/calcular-costes-pieza-impresa-3d), porque una diferencia pequeña por unidad puede importar en un lote.

## Errores frecuentes y limitaciones

**El error más común es mezclar mm³ con cm³**. También es frecuente multiplicar el volumen total por el porcentaje de relleno, ignorando las paredes; usar la densidad de “PLA genérico” para una formulación cargada; o comparar el peso del laminador con una pieza que aún conserva soportes.

La masa tampoco indica por sí sola si el diseño es resistente. Dos piezas del mismo peso pueden comportarse de manera distinta por su orientación, nervios y distribución de material. Antes de aligerar una zona cargada, consulta [cómo diseñar una pieza resistente para FDM](/blog/disenar-pieza-resistente-fdm) y valida el cambio con una muestra o cálculo apropiado.

## Conclusión

Usa el CAD para establecer la masa maciza, el laminador para predecir la fabricación y la báscula para corregir tus estimaciones. Guardar esos tres valores, junto al material y al perfil, crea una referencia propia mucho más útil que cualquier densidad genérica aislada.
