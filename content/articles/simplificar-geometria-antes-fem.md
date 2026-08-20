---
title: "Cómo simplificar geometría antes de un FEM"
slug: "simplificar-geometria-antes-fem"
description: "Criterios para simplificar modelos CAD antes de un análisis FEM sin eliminar información estructural importante."
category: "Simulación FEM"
categorySlug: "simulacion-fem"
date: "2026-05-06"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Simplificar un modelo antes de FEM consiste en conservar la física necesaria para responder la pregunta y retirar detalles que solo encarecen el mallado. No es «hacer el CAD más ligero» sin criterio. Cada supresión cambia la idealización y debe poder justificarse por su efecto esperado en cargas, rigidez, contactos o resultados locales.

## 1. Formula primero la pregunta del análisis

No puedes decidir qué detalle sobra si no sabes qué resultado importa. Para estudiar desplazamiento global de un soporte quizá puedas omitir un texto grabado. Para evaluar tensión alrededor de un agujero, ese agujero y sus radios son precisamente la zona que debes conservar.

Escribe el objetivo, la región de interés y el tipo de resultado. Después revisa [qué es un análisis FEM y cuándo usarlo](/blog/que-es-analisis-fem-cuando-usarlo) para confirmar que cargas, apoyos y material están suficientemente definidos. Si el problema aún es ambiguo, simplificar puede esconder incertidumbre en vez de resolverla.

## 2. Clasifica la geometría por su función

Crea una copia del CAD y separa los detalles en tres grupos:

- **conservar:** interfaces de carga, apoyos, contactos, espesores y zonas de resultado;
- **simplificar:** detalles cuyo efecto puede representarse de otra manera;
- **eliminar:** elementos decorativos sin influencia prevista en la pregunta.

Textos, logotipos, moleteados, roscas modeladas y chaflanes pequeños suelen ser candidatos a retirada en un estudio global. Sin embargo, una rosca puede ser esencial si estudias el contacto local, y un radio pequeño puede gobernar una concentración de tensiones. La clasificación depende del alcance.

### Comparar tamaño y efecto

No uses solo una regla de tamaño. Un detalle pequeño en una superficie libre puede ser irrelevante, mientras una ranura pequeña que atraviesa la trayectoria de carga puede cambiar la rigidez o iniciar un fallo. Pregunta si el detalle altera sección resistente, contacto, apoyo, masa distribuida o punto donde leerás resultados.

## 3. Simplifica ensamblajes y contactos

Suprime componentes que no transmiten carga relevante y sustituye tornillería por conectores o condiciones equivalentes solo cuando esa idealización sea adecuada. En un conjunto simétrico, una fracción del modelo puede reducir coste si geometría, carga y respuesta respetan la simetría. Documenta el plano de corte y las restricciones aplicadas.

Los contactos requieren atención. Unir todos los componentes como «pegados» puede hacer el modelo más rígido; permitir separación o deslizamiento puede ser más realista y también más difícil de resolver. **La estabilidad numérica no es una razón suficiente para elegir un contacto falso.**

### Modelos de cascarón, viga y sólido

Piezas delgadas pueden representarse con cascarones y perfiles esbeltos con vigas, siempre que conozcas los supuestos del elemento y definas secciones correctamente. Esto no es solo borrar operaciones: es cambiar el tipo de modelo. Compara una versión sencilla o un caso de referencia antes de aplicar la idealización a un conjunto complejo.

## 4. Evita caras pequeñas y transiciones problemáticas

Detalles cortos crean aristas y caras diminutas que obligan al mallador a generar elementos pequeños. Busca operaciones de reparación, eliminación de caras o reconocimiento de agujeros, pero revisa el resultado visualmente. Eliminar una cara no debe cerrar accidentalmente un paso, unir cuerpos o modificar el espesor.

Tras simplificar, comprueba volumen o masa cuando sean relevantes y superpone la geometría original con la idealizada. Esta comparación detecta cambios mayores que pueden pasar desapercibidos al observar modelos por separado.

## 5. Verifica que la simplificación no gobierna el resultado

Sigue un proceso reproducible:

1. guarda el modelo original y crea una revisión para análisis;
2. registra la pregunta y las regiones críticas;
3. clasifica detalles en conservar, simplificar y eliminar;
4. aplica cambios por grupos, no todos a la vez;
5. comprueba contactos, espesores, masa e interfaces;
6. ejecuta un análisis inicial y revisa deformada y reacciones;
7. recupera un detalle dudoso y compara el resultado relevante;
8. documenta diferencias y modelo elegido.

Si recuperar un detalle cambia de forma importante la conclusión, debe conservarse o representarse mejor. La malla también necesita una comprobación independiente; simplificar reduce dificultades, pero no demuestra convergencia.

## 6. Documenta decisiones y límites

Incluye capturas antes/después, una lista de supresiones y la razón de cada grupo. La guía para [documentar un análisis FEM básico](/blog/documentar-analisis-fem-basico) permite registrar geometría, material, malla, cargas y resultados, y la de [preparar un informe técnico](/blog/preparar-informe-tecnico-universitario) ayuda a expresar las limitaciones.

Los errores más frecuentes son borrar todos los radios, eliminar fijaciones que definen el apoyo, unir contactos para lograr convergencia y presentar el modelo simplificado como geometría real. **Una simulación más rápida no es necesariamente más válida.** La simplificación correcta es aquella cuya influencia has razonado, comprobado cuando era crítica y dejado trazable para otra persona.
