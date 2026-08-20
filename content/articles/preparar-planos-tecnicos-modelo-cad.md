---
title: "Cómo preparar planos técnicos desde un modelo CAD"
slug: "preparar-planos-tecnicos-modelo-cad"
description: "Guía para generar planos técnicos claros desde CAD con vistas, cotas, escala, material y notas útiles."
category: "Proyectos universitarios"
categorySlug: "proyectos-universitarios"
date: "2026-05-10"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Un plano técnico generado desde CAD no es una captura decorada con cotas. Es el documento que debe permitir **identificar, fabricar, montar o verificar** una pieza sin tener que adivinar la intención del diseñador. El modelo aporta geometría; el plano selecciona y organiza la información necesaria para un uso concreto.

## 1. Decide para qué servirá el plano

Antes de crear vistas, define el destinatario. Un plano para evaluar una asignatura puede necesitar explicar decisiones y construcción geométrica. Un plano de fabricación debe priorizar dimensiones funcionales, material, tolerancias y acabado. Un plano de conjunto debe aclarar posición, cantidad y relación entre componentes.

Esta decisión evita dos extremos: dibujar todo lo que permite el programa o reducir el plano a una imagen que solo entiende quien creó el modelo. Si el documento formará parte de una memoria, coordina su contenido con la guía para [preparar un informe técnico universitario](/blog/preparar-informe-tecnico-universitario).

## 2. Elige vistas que eliminen ambigüedades

Selecciona como principal la vista que mejor describa la forma y el uso de la pieza, no necesariamente la orientación en la que se modeló. Añade planta, perfil o vista posterior únicamente cuando revelen geometría que no queda definida. Una vista isométrica sombreada facilita reconocer el objeto, pero **no sustituye las proyecciones acotadas**.

### Secciones y detalles

Utiliza una sección para mostrar espesores, cavidades o alojamientos internos. Un detalle ampliado funciona mejor que saturar la vista general con notas pequeñas. Indica con claridad el plano de corte y la escala del detalle. En ensamblajes, una vista explosionada puede explicar el orden de montaje, mientras una sección del conjunto muestra contactos y posiciones finales.

El objetivo no es alcanzar un número fijo de vistas. Haz una prueba sencilla: oculta el modelo 3D y pregunta si las vistas permiten reconstruir las zonas importantes sin suposiciones.

## 3. Acota desde la función, no desde el historial CAD

Prioriza dimensiones generales, interfaces, posiciones de agujeros, espesores críticos y distancias necesarias para inspeccionar la pieza. Evita cotas duplicadas o contradictorias y cadenas innecesarias que acumulen variaciones. La referencia de una posición debe relacionarse con superficies estables y útiles para fabricar o medir.

Las tolerancias no deben añadirse como decoración. Define una tolerancia cuando el funcionamiento dependa de ella y puedas justificarla según proceso y verificación. Para piezas FDM, las holguras del modelo deben validarse físicamente; la guía de [tolerancias en piezas impresas](/blog/tolerancias-piezas-impresas-3d) explica por qué una cota nominal no garantiza el encaje.

### Dimensiones que dependen del modelo

Siempre que sea posible, usa cotas asociativas al CAD para que se actualicen con la geometría. Después de modificar el modelo, revisa el plano completo: una cota actualizada puede quedar fuera de posición, una sección puede perder referencia y una vista puede cambiar de escala. La automatización reduce errores, pero no sustituye la revisión.

## 4. Completa cajetín, notas y control de revisión

El cajetín debe permitir identificar el documento. Incluye nombre o código de pieza, proyecto, fecha, revisión, escala, unidades, autor y formato de hoja. Añade material y proceso cuando estén decididos; si son provisionales, indícalo para no confundir una hipótesis con una especificación aprobada.

Una [ficha técnica de producto](/blog/ficha-tecnica-producto) puede reunir información de uso y prestaciones, pero no reemplaza el plano dimensional. Del mismo modo, el plano no necesita repetir toda la memoria. Cada documento debe tener una función clara y referencias cruzadas coherentes.

Cuando compartas geometría además del PDF, sigue un proceso controlado para [preparar el archivo STEP](/blog/preparar-archivo-step-compartir-cad) y asegúrate de que ambos archivos representan la misma revisión.

## 5. Exporta y comprueba el PDF final

No des por terminado el trabajo en la vista de dibujo del CAD. Exporta el PDF y revísalo al tamaño de salida. Comprueba grosores de línea, contraste, caracteres especiales, marcos y márgenes. Si el plano va a imprimirse, realiza una prueba o visualízalo al 100 %: una cota que solo se lee con un zoom elevado no funcionará en una hoja real.

### Checklist práctico

- ¿Las vistas definen la pieza sin información repetida?
- ¿Las secciones y detalles tienen llamadas y escalas correctas?
- ¿Cada cota sirve para fabricar, montar o verificar?
- ¿Unidades, material, escala y revisión aparecen de forma inequívoca?
- ¿No hay cotas huérfanas después de modificar el CAD?
- ¿El PDF coincide con el modelo y con los archivos que vas a entregar?

## 6. Errores y limitaciones

Los fallos habituales son acotar según la secuencia de operaciones en lugar de la función, mezclar revisiones, indicar tolerancias imposibles para el proceso y esconder geometría crítica por elegir una vista atractiva. También conviene recordar que **un plano claro no valida por sí solo el diseño**: cargas, material, montaje y fabricabilidad requieren sus propias comprobaciones.

Antes de entregar, pide a otra persona que interprete el plano sin abrir el modelo. Las preguntas que tenga revelan omisiones con más eficacia que seguir añadiendo cotas al azar.
