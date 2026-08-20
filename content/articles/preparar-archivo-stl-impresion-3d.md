---
title: "Cómo preparar un archivo STL para impresión 3D"
slug: "preparar-archivo-stl-impresion-3d"
description: "Checklist práctica para exportar, revisar y laminar un STL antes de imprimir una pieza 3D."
category: "Impresión 3D"
categorySlug: "impresion-3d"
date: "2026-05-13"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Un STL listo para imprimir no es simplemente el archivo que aparece al pulsar **Exportar**. Debe representar la versión correcta de la pieza, conservar la escala, tener una malla suficiente y producir capas coherentes en el laminador. La validación termina cuando has revisado esas capas, no cuando el CAD confirma que la exportación se completó.

## 1. Revisa el modelo antes de exportarlo

Trabaja desde una copia identificada como versión de fabricación. Oculta cuerpos auxiliares, superficies de referencia y variantes que no deban salir en el archivo. Si el conjunto contiene varias piezas, decide si se imprimirán por separado: exportarlas como un único STL puede fijar una posición inconveniente o convertir cuerpos independientes en una selección difícil de orientar.

Comprueba también que el sólido esté cerrado y que no existan caras duplicadas, volúmenes solapados o detalles sin espesor. Un grabado decorativo, una ranura muy estrecha o una pared fina pueden existir matemáticamente y desaparecer al laminar. Antes de culpar al STL, compara esos detalles con la boquilla, la altura de capa y las capacidades comprobadas de la máquina. La guía sobre [paredes, perímetros y tapas en FDM](/blog/paredes-perimetros-tapas-fdm) ayuda a relacionar geometría y trayectoria de impresión.

### Confirma una dimensión conocida

Anota una cota fácil de localizar —por ejemplo, la longitud total o el diámetro de un alojamiento— y úsala después como control. **La unidad no queda descrita de forma universal dentro del STL**: el flujo de exportación e importación debe coincidir. Un modelo creado en pulgadas e interpretado como milímetros llega al laminador con una escala completamente equivocada.

## 2. Elige una resolución de malla con criterio

El STL aproxima las superficies mediante triángulos. Una malla demasiado gruesa convierte los cilindros en polígonos visibles y puede alterar una superficie de ajuste. Una malla extremadamente densa aumenta el peso del archivo y ralentiza el manejo sin añadir detalle fabricable.

No existe un único ajuste válido para todas las piezas. Revisa la desviación o tolerancia de exportación que ofrece tu CAD y observa una curva crítica ampliada. El contorno debería verse continuo a la escala final, pero no necesitas millones de triángulos para una pieza dominada por caras planas. Si compartirás el diseño para que otra persona lo modifique, acompaña el STL con un formato neutro siguiendo la guía para [preparar un archivo STEP](/blog/preparar-archivo-step-compartir-cad): el STL no conserva operaciones, cotas ni intención paramétrica.

## 3. Valida el archivo en el laminador

Importa el STL como si ya fueras a fabricar. Primero confirma la cota de control y el número de piezas. Después orienta el modelo y recorre la vista previa capa a capa. Presta especial atención a:

- la primera capa y una posible base ensanchada;
- el inicio de agujeros, puentes y voladizos;
- paredes o textos que aparecen y desaparecen;
- cuerpos que el laminador ha reparado o descartado;
- soportes situados sobre caras de ajuste o superficies visibles.

Revisa el tiempo y el material estimados solo después de comprobar la geometría. Una estimación razonable no demuestra que el archivo sea correcto. Si la pieza incorpora uniones, valida primero las holguras con las [pruebas de tolerancia FDM](/blog/pruebas-tolerancia-fdm), porque una malla correcta no compensa un encaje mal dimensionado.

### Diferencia entre problema de malla y de diseño

Una cara ausente, un hueco inesperado o una reparación automática suelen apuntar a geometría defectuosa. Una pared que desaparece de manera uniforme puede indicar que su espesor no permite generar una trayectoria con el perfil elegido. En el segundo caso, cambiar la resolución del STL no resolverá el problema: hay que modificar el diseño o validar otro proceso.

## 4. Prepara una entrega que se pueda repetir

Usa nombres con pieza y revisión, como `soporte_sensor_rev03.stl`, y evita variantes ambiguas como `final2`. Guarda juntos el CAD fuente, el STL enviado y una captura del laminador con la orientación prevista. Si otra persona va a imprimir, indica unidades esperadas, material, perfil o restricciones relevantes y las caras donde no conviene colocar soportes.

El archivo debe pasar además el [checklist antes de mandar una pieza a imprimir](/blog/checklist-mandar-pieza-imprimir-3d). Así separas la responsabilidad del diseño, la exportación y la preparación de máquina.

## 5. Errores y límites del formato STL

Los fallos más comunes son exportar una revisión antigua, mezclar unidades, unir cuerpos por accidente y aceptar sin mirar la reparación automática del laminador. También es un error asumir que un STL «sin avisos» es fabricable: el formato no conoce la función de la pieza, su material, sus tolerancias ni la dirección de carga.

**Checklist final:** abre el archivo exportado, confirma una cota conocida, recorre todas las capas, revisa detalles y soportes, verifica el nombre de revisión y conserva el modelo editable. Cinco minutos aquí pueden evitar una impresión larga con el archivo equivocado.
