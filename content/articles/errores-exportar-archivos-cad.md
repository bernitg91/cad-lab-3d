---
title: "Qué errores evitar al exportar archivos CAD"
slug: "errores-exportar-archivos-cad"
description: "Errores habituales al exportar STL, STEP, planos PDF y archivos para fabricar o compartir proyectos CAD."
category: "Recursos"
categorySlug: "recursos"
date: "2026-05-05"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Exportar CAD parece una tarea administrativa, pero forma parte del control técnico. Un archivo puede abrirse y, aun así, estar incompleto, a otra escala o contener una revisión antigua. La pregunta correcta no es solo «¿qué formato guardo?», sino **qué necesita hacer el receptor con la información**.

## Elegir el formato según el uso

No existe un archivo universal. Cada formato conserva información distinta y responde a una fase del proyecto.

| Entrega | Conserva principalmente | Uso habitual | Riesgo que revisar |
| --- | --- | --- | --- |
| STL o 3MF | Malla para fabricación aditiva | Laminar e imprimir | Escala, resolución y cuerpos incluidos |
| STEP | Sólidos y superficies intercambiables | Revisar o continuar CAD | Pérdida del historial paramétrico |
| PDF técnico | Vistas, cotas y notas | Comunicar fabricación o control | Cotas ilegibles o desactualizadas |
| Archivo nativo | Operaciones, relaciones y referencias | Editar el proyecto original | Versiones, vínculos externos y compatibilidad |
| Imagen o render | Apariencia visual | Presentación y aprobación estética | No contiene geometría fabricable |

Un STL no sustituye un STEP si otra persona debe modificar el sólido. Un STEP tampoco sustituye unos planos cuando importan tolerancias, material, acabado o criterios de inspección. Para preparar cada caso, consulta [cómo exportar un STL](/blog/preparar-archivo-stl-impresion-3d), [cómo compartir un STEP](/blog/preparar-archivo-step-compartir-cad) y [cómo preparar planos desde CAD](/blog/preparar-planos-tecnicos-modelo-cad).

## Comprobar el modelo antes de exportar

Exporta desde una revisión identificada, no desde la pestaña que casualmente quedó abierta. Actualiza operaciones, resuelve advertencias y confirma qué cuerpos deben salir. En un ensamblaje, revisa piezas ocultas, suprimidas, duplicadas y componentes de referencia. Si el receptor no necesita tornillería comercial o geometría interna sensible, acuerda el alcance antes de eliminarla.

### Unidades y origen

STL describe coordenadas pero no siempre comunica las unidades de manera fiable entre programas. Si una pieza de 50 mm aparece como 50 pulgadas o 50 metros, el archivo puede seguir siendo geométricamente válido. Añade la unidad al mensaje o nombre de entrega y confirma la dimensión principal al reabrirlo.

El origen y la orientación también importan en ensamblajes, utillajes y archivos que se importarán automáticamente. Mover una pieza «para que se vea centrada» puede romper la referencia que espera otra persona.

### Resolución y geometría

En mallas, una tolerancia de exportación demasiado gruesa crea curvas facetadas; una excesivamente fina produce archivos pesados sin mejorar una impresora concreta. Observa la superficie y el tamaño resultante en vez de elegir el máximo por costumbre. En sólidos, busca caras ausentes, superficies abiertas o cuerpos que llegan como malla cuando se esperaban sólidos editables.

## Nombrar y versionar sin ambigüedad

Nombres como `final_final_2.step` no explican qué cambió ni cuál debe fabricarse. Un patrón sencillo puede incluir proyecto, pieza, revisión y estado: `soporte_motor_R03_APROBACION.step`. La fecha puede ayudar en intercambios puntuales, pero **la revisión debe seguir siendo la referencia principal** si el proyecto usa control de cambios.

No sobrescribas silenciosamente una entrega ya enviada. Si corriges una cota, aumenta la revisión y acompaña el archivo con una nota breve: qué cambia, qué archivos sustituye y si afecta a fabricación. Mantén coherencia entre STEP, STL y PDF; dos formatos con el mismo nombre base pero geometrías distintas son una fuente frecuente de errores.

## Proceso de exportación y verificación

Utiliza este checklist antes de compartir:

1. Confirma destinatario, propósito y formato solicitado.
2. Guarda y actualiza el modelo; revisa errores del árbol o referencias perdidas.
3. Aísla las piezas o cuerpos que forman parte de la entrega.
4. Verifica unidades, sistema de coordenadas y orientación acordada.
5. Exporta con un nombre y revisión inequívocos.
6. **Cierra o aparta el original y abre el archivo exportado** en otro visor, CAD o laminador.
7. Mide al menos una dimensión conocida y cuenta los cuerpos recibidos.
8. Comprueba visualmente caras, agujeros, roscas representadas y detalles críticos.
9. Adjunta plano, captura o nota de versión si el formato no comunica todo el contexto.
10. Conserva una copia exacta de lo enviado para poder rastrear la entrega.

La [revisión de diseño antes de fabricar](/blog/revision-diseno-antes-fabricar) añade controles útiles cuando el archivo va directamente a producción.

## Errores frecuentes y limitaciones

Los fallos más habituales son enviar una revisión anterior, olvidar un componente, exportar un ensamblaje con posiciones incorrectas, usar unidades implícitas o suponer que «si abre, está bien». También es problemático entregar únicamente renders, ocultar datos necesarios de fabricación o incluir detalles innecesarios que dificultan la revisión.

Reimportar detecta muchos errores, pero no garantiza compatibilidad total: dos programas pueden interpretar de forma diferente nombres, colores, capas o entidades avanzadas. Si el proyecto depende de esas propiedades, realiza una prueba temprana con el software del receptor. **Exportar bien significa verificar el resultado fuera del archivo original**, documentar sus límites y dejar claro qué versión debe usarse.
