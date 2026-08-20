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

En CAD, dos superficies pueden coincidir exactamente. En una pieza FDM intervienen ancho de extrusión, contracción, primera capa, calibración, orientación y forma de la unión. Por eso una cota nominal no define por sí sola el ajuste: necesitas seleccionar una holgura según la función y validarla con el proceso real.

## 1. Distingue tolerancia y holgura

La tolerancia describe la variación aceptable de una dimensión; la holgura es la separación intencionada entre piezas. En conversación suelen mezclarse, pero al diseñar conviene separarlas. Puedes añadir una holgura al CAD y aun así obtener piezas con variación dimensional entre impresiones.

Define primero el tipo de unión:

| Unión | Comportamiento buscado | Riesgo principal |
| --- | --- | --- |
| Paso libre | Montaje sin esfuerzo y desmontaje frecuente | Juego excesivo |
| Ajuste deslizante | Movimiento guiado con poca resistencia | Atasco por deformación local |
| Ajuste a presión | Retención mediante interferencia controlada | Rotura o imposibilidad de montar |
| Clip flexible | Deformación temporal y recuperación | Fatiga o separación entre capas |

No existe una cifra universal para cada fila. Utiliza referencias solo para establecer una primera serie de ensayo, no como resultado final.

## 2. Identifica las variables del proceso

Una impresora bien calibrada es el punto de partida. Flujo incorrecto, correas, temperatura o primera capa pueden introducir desviaciones que no conviene compensar ciegamente en cada modelo. Revisa [cómo calibrar una impresora para piezas funcionales](/blog/calibrar-impresora-3d-piezas-funcionales) antes de construir una biblioteca de ajustes.

Material y perfil también importan. PLA, PETG o nylon pueden contraer y flexar de forma diferente. La orientación cambia la forma de los contornos, especialmente en agujeros horizontales y puentes. La altura de capa, la boquilla y el número de paredes afectan resolución y estabilidad.

### Primera capa y pie de elefante

Una base demasiado aplastada aumenta el contorno exterior y reduce ranuras próximas a la cama. Antes de ampliar la holgura de todo el encaje, identifica si solo falla el borde inferior. Un chaflán de entrada o una corrección de primera capa puede resolver la causa sin dejar juego en el resto de la unión.

## 3. Diseña la unión según su geometría

Los agujeros suelen requerir una comprobación diferente a los ejes exteriores. El trazado de perímetros, la costura y la aproximación de curvas pueden producir desviaciones distintas aunque compartan diámetro nominal. Para tornillos, decide si buscas paso libre, roscado posterior, tornillo autorroscante o inserto; cada caso necesita geometría y prueba propias.

En tapas y carcasas, las paredes largas pueden deformarse y acumular desviación. Un encaje corto que funciona en una probeta no garantiza una tapa de gran perímetro. Añadir entradas, topes y puntos de centrado ayuda a controlar el montaje. La guía para [diseñar encajes y clips](/blog/disenar-encajes-clips-impresion-3d) desarrolla estas formas.

## 4. Establece una holgura inicial mediante ensayo

Parte de un intervalo razonable para tu máquina y diseña varias muestras alrededor de él. Mantén constantes material, orientación, perfil y longitud de contacto. En lugar de imprimir el conjunto completo, utiliza el procedimiento de [pruebas de tolerancia FDM](/blog/pruebas-tolerancia-fdm) para clasificar cada ajuste y registrar medidas.

### Proceso de decisión

1. Define función y frecuencia de montaje.
2. Identifica superficies de contacto y dirección de movimiento.
3. Corrige calibración y primera capa.
4. Diseña variantes cambiando una holgura cada vez.
5. Imprime con condiciones finales y etiqueta muestras.
6. Mide y clasifica el ajuste sin lijar.
7. Aplica la opción elegida al conjunto.
8. Valida la unión completa y repite si cambia el proceso.

Cuando el montaje deba resistir carga, combina el ajuste con paredes, orientación y radios. La guía de [diseño resistente para FDM](/blog/disenar-pieza-resistente-fdm) ayuda a evitar que una unión dimensionalmente correcta falle por otra causa.

## 5. Documenta una biblioteca propia

Guarda probeta, STL, perfil, material, fecha y observaciones. Registra si el encaje fue libre, ajustado, forzado o bloqueado, y anota cualquier posprocesado. Repite cuando cambies boquilla, material o un ajuste importante. Una biblioteca física es útil solo si puedes reconstruir las condiciones.

## 6. Errores y límites

Copiar tolerancias de mecanizado, compensar una impresora sin calibrar, usar una prueba de PLA para decidir nylon y extrapolar un encaje corto a una carcasa grande son errores habituales. También lo es declarar éxito porque una única muestra entra una vez.

**Las pruebas reducen incertidumbre, no la eliminan.** Para producción, mide repetibilidad en varias piezas y define un criterio de aceptación. En componentes críticos o de seguridad, FDM y una probeta doméstica pueden no ofrecer el control necesario; adapta el proceso y la verificación al riesgo real.
