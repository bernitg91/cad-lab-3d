---
title: "Cómo preparar un archivo STEP para compartir CAD"
slug: "preparar-archivo-step-compartir-cad"
description: "Buenas prácticas para exportar archivos STEP limpios, ligeros y fáciles de revisar o fabricar desde un proyecto CAD."
category: "Recursos"
categorySlug: "recursos"
date: "2026-05-04"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

STEP es un formato habitual para intercambiar sólidos y superficies entre programas CAD. Resulta más útil que una malla cuando otra persona necesita medir, fabricar o continuar la geometría. Sin embargo, **un STEP no suele conservar la intención paramétrica completa**, y abrirlo sin errores no garantiza que sea la revisión correcta.

## Acordar qué necesita el receptor

Pregunta primero para qué se utilizará el archivo: visualizar, comprobar interferencias, modificar una pieza, preparar mecanizado o integrar un ensamblaje. Esa respuesta define el alcance y los documentos que deben acompañarlo.

- Para editar cotas e historial puede ser necesario el archivo nativo.
- Para imprimir, quizá sea preferible un STL o 3MF ya verificado.
- Para fabricar con tolerancias, material y acabado hará falta un plano.
- Para revisar volumen o integración, un STEP simplificado puede ser suficiente.

La guía sobre [errores al exportar CAD](/blog/errores-exportar-archivos-cad) compara los formatos y evita tratarlos como equivalentes.

## Preparar el modelo antes de exportar

Abre la revisión autorizada y regenera el modelo. Resuelve operaciones fallidas, referencias perdidas y cuerpos accidentales. En un ensamblaje, comprueba componentes ocultos, suprimidos, duplicados y colocados fuera de posición. Decide si la entrega conservará la estructura del conjunto o será un único sólido simplificado.

### Limpiar sin eliminar información necesaria

Retira versiones antiguas, geometría de construcción y piezas que el receptor no necesita. Simplificar tornillería comercial o pequeños detalles puede reducir peso, pero acuerda el nivel de detalle si esas zonas sirven para comprobar interferencias. No borres interfaces, superficies de referencia ni tolerancias funcionales por hacer el archivo más ligero.

Si la geometría importada se editará después, la diferencia entre [modelado paramétrico y directo](/blog/modelado-parametrico-vs-directo) ayuda a explicar qué podrá modificarse sin el árbol original.

### Unidades y coordenadas

Confirma la unidad del documento y una dimensión conocida. Mantén el origen y los ejes acordados cuando la pieza se integrará en otro ensamblaje, utillaje o flujo automatizado. Centrar o girar el sólido para presentarlo puede destruir una referencia útil aunque la geometría siga siendo correcta.

## Exportar con un alcance claro

Las opciones exactas dependen del software y de la versión de STEP disponible. Siempre que sea posible, conserva sólidos, nombres de componentes y estructura que el receptor pueda interpretar. No selecciones una norma o tolerancia de conversión únicamente porque genera el archivo más pequeño; haz una prueba temprana si el otro programa es conocido.

Usa un nombre como `proyecto_pieza_R04_REVISION.step`: proyecto, componente, revisión y estado. Evita `final.step`. Si envías varios formatos, mantén el mismo nombre base y confirma que todos proceden de la misma revisión. Guarda una copia exacta de lo entregado.

## Verificar el STEP fuera del original

La comprobación esencial consiste en abrir el archivo exportado en un visor o CAD independiente. No basta con volver a mirar el modelo fuente.

1. Cuenta los cuerpos o componentes esperados.
2. Mide una dimensión general y una interfaz crítica.
3. Revisa unidades, orientación y sistema de coordenadas.
4. Busca caras ausentes, superficies abiertas o costuras extrañas.
5. Comprueba agujeros, roscas modeladas y detalles que debían conservarse.
6. Verifica que el ensamblaje no incluye piezas ocultas o duplicadas.
7. Compara visualmente con una captura de la revisión fuente.
8. Registra software y resultado si la compatibilidad es importante.

La [revisión de diseño antes de fabricar](/blog/revision-diseno-antes-fabricar) añade controles de interferencia, uniones y proceso que un visor no puede resolver por sí solo.

## Preparar el paquete de entrega

Un STEP comunica geometría, pero no siempre material, tolerancias, acabado o motivo del cambio. Acompáñalo con una nota breve que incluya revisión, unidad, propósito, componentes incluidos y limitaciones conocidas. Si va a fabricación, referencia los [planos técnicos](/blog/preparar-planos-tecnicos-modelo-cad) vigentes. Si también habrá impresión 3D, prepara por separado el [archivo STL](/blog/preparar-archivo-stl-impresion-3d) y comprueba que ambos representan la misma geometría.

No compartas más información de la necesaria. Un archivo de intercambio puede revelar geometría interna o componentes que no forman parte del trabajo. Sigue las reglas del proyecto sobre confidencialidad y permisos antes de enviar datos a servicios externos.

## Checklist final

- Receptor y propósito confirmados.
- Revisión fuente identificada y regenerada sin errores relevantes.
- Cuerpos, componentes y nivel de detalle acordados.
- Unidades, origen y orientación verificados.
- Nombre de archivo con pieza, revisión y estado.
- STEP reabierto y medido fuera del modelo original.
- Plano, captura o nota de versión incluidos cuando aportan contexto.
- Copia exacta de la entrega conservada.

## Errores frecuentes y limitaciones

Los fallos más comunes son exportar piezas ocultas, enviar una revisión antigua, asumir unidades y no reabrir el archivo. También es un error prometer edición paramétrica cuando solo se entrega un sólido sin historial o confiar en que colores y metadatos se transferirán igual entre programas.

STEP mejora la interoperabilidad, pero no elimina diferencias entre aplicaciones. Entidades avanzadas, nombres o estructura pueden traducirse de forma distinta. Si una característica es crítica, confirma el resultado en el software receptor o intercambia una muestra temprana. **La entrega fiable combina geometría verificada, revisión inequívoca y contexto suficiente para usarla correctamente.**
