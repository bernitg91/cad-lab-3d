---
title: "Cómo explicar decisiones de diseño en una memoria"
slug: "explicar-decisiones-diseno-memoria"
description: "Método para justificar decisiones de diseño en memorias técnicas con criterios, alternativas y evidencias."
category: "Proyectos universitarios"
categorySlug: "proyectos-universitarios"
date: "2026-05-08"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Una memoria técnica mejora cuando explica **por qué una solución es adecuada para el problema**, no solo cómo se modeló. Decir «se eligió esta forma porque queda mejor» deja el razonamiento fuera del documento. Una justificación útil conecta requisito, alternativas, criterio, evidencia y limitación.

## Convertir opiniones en criterios de diseño

Empieza por los requisitos del proyecto. De ellos pueden derivarse criterios como facilidad de montaje, volumen, masa, coste, accesibilidad, fabricación, mantenimiento, ergonomía o acabado. No todos tienen la misma prioridad: un requisito obligatorio no debe quedar oculto dentro de una media de puntuaciones.

Una frase como «la opción B es más sencilla» sigue siendo ambigua. Especifica qué significa sencilla: ¿tiene menos piezas?, ¿reduce operaciones?, ¿necesita menos soportes?, ¿permite acceder a los tornillos con una herramienta común? **Un criterio debe poder observarse o argumentarse con evidencia.**

La [estructura de una memoria técnica](/blog/estructurar-memoria-tecnica-diseno-industrial) ayuda a colocar estos argumentos dentro del relato general del proyecto.

## Comparar alternativas de forma transparente

Muestra solo las alternativas que aportan información sobre una decisión real. Tres variantes casi idénticas no demuestran exploración si nunca cambian la arquitectura o los criterios. Para cada opción, registra ventajas, riesgos y motivo de descarte antes de desarrollar por completo la elegida.

Una matriz puede ordenar la comparación:

| Alternativa | Criterio que favorece | Riesgo o coste | Evidencia pendiente |
| --- | --- | --- | --- |
| Unión con tornillos | Desmontaje y mantenimiento | Más componentes y espacio | Comprobar acceso de herramienta |
| Clip integrado | Montaje rápido | Fatiga y tolerancia del encaje | Ensayar ciclos y material |
| Adhesivo | Pocas piezas visibles | Difícil reparación | Verificar compatibilidad y superficie |

La tabla no declara un ganador universal. Solo hace visibles las consecuencias que deben evaluarse en ese proyecto. Si reparabilidad es obligatoria, por ejemplo, una opción adhesiva puede quedar descartada aunque sea ligera. La guía sobre [piezas desmontables y reparables](/blog/disenar-piezas-desmontables-reparables) ofrece criterios concretos para ese caso.

### Cuándo usar puntuaciones

Una matriz ponderada puede ayudar si defines pesos antes de conocer el resultado y explicas cómo puntúas. **No uses decimales aparentando una precisión inexistente**. Mantén separados los requisitos de cumplimiento obligatorio y realiza una pequeña revisión de sensibilidad: si cambiar ligeramente un peso altera el ganador, la conclusión es frágil y merece más evidencia.

## Elegir evidencias adecuadas

No todas las afirmaciones requieren el mismo respaldo. Una decisión dimensional puede apoyarse en una medición; una elección de material, en fichas técnicas y condiciones de uso; un cambio ergonómico, en una prueba con usuarios bien descrita; y una decisión estructural, en cálculo, ensayo o simulación con hipótesis explícitas.

### Diferenciar evidencia y estimación

Escribe «el prototipo medido pesa…» cuando exista una medición y «el CAD estima…» cuando proceda del modelo. No presentes un render como prueba de fabricación ni una simulación como garantía física. Si usas FEM, incluye material, restricciones, cargas y límites según la [guía para documentar un análisis FEM](/blog/documentar-analisis-fem-basico).

Un prototipo visual puede validar volumen y percepción, pero no necesariamente resistencia. Antes de citarlo como evidencia, aclara la pregunta que respondió con la guía de [prototipo visual frente a funcional](/blog/prototipo-visual-vs-funcional).

## Fórmula práctica para redactar cada decisión

Puedes construir un párrafo técnico con cinco piezas:

1. **Requisito:** qué debía conseguirse o evitarse.
2. Alternativas: qué opciones razonables se consideraron.
3. **Criterio:** qué factores permitieron compararlas y con qué prioridad.
4. **Evidencia:** qué dato, prueba, referencia o restricción respalda la elección.
5. **Límite:** qué no se ha comprobado y qué riesgo permanece.

Por ejemplo: «La carcasa debía abrirse para mantenimiento. Se compararon tornillos, clips y adhesivo. Se eligieron tornillos porque permiten desmontaje y la geometría deja acceso frontal; el prototipo confirmó el acceso de la herramienta. Queda pendiente validar la resistencia del alojamiento tras varios ciclos». El valor está en la cadena lógica, no en usar palabras complejas.

## Checklist para revisar la memoria

- Cada decisión importante remite a un objetivo o requisito.
- Las alternativas descartadas tienen un motivo, no desaparecen sin explicación.
- Los criterios se definieron antes de declarar la opción ganadora.
- Mediciones, cálculos, simulaciones y opiniones están diferenciados.
- Las figuras tienen pie y se citan desde el texto.
- Los resultados negativos y las limitaciones también aparecen.
- La conclusión explica si la elección cumplió lo que pretendía.

Mantener estas evidencias desde el comienzo es más fácil con el flujo para [documentar un proyecto de diseño industrial](/blog/documentar-proyecto-diseno-industrial).

## Errores frecuentes y límites

Evita justificar a posteriori, dar puntuaciones sin método, usar «innovador» como criterio o afirmar que una opción es más resistente sin prueba ni cálculo. Tampoco hace falta fingir certeza: una decisión puede ser provisional si lo indicas y propones cómo validarla.

Una buena explicación no convierte una evidencia limitada en una conclusión universal. El objetivo es que el lector pueda seguir tu razonamiento, detectar sus supuestos y entender qué harías después. **La honestidad sobre lo no comprobado es parte de una decisión técnica defendible.**
