---
title: "Checklist antes de mandar una pieza a imprimir en 3D"
slug: "checklist-mandar-pieza-imprimir-3d"
description: "Lista práctica para revisar geometría, tolerancias, orientación, material, parámetros y archivo antes de imprimir."
category: "Recursos"
categorySlug: "recursos"
date: "2026-03-18"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Enviar una pieza a impresión sin una revisión final puede desperdiciar horas por un error de escala, una versión antigua o un soporte colocado sobre una cara funcional. Esta checklist sirve tanto para imprimir en tu propia máquina como para entregar el archivo a un servicio externo. Adáptala al riesgo y al proceso de fabricación.

## 1. Confirma el objetivo y la versión

Antes de abrir el laminador, define qué debe hacer la pieza. Una maqueta visual permite decisiones distintas a un soporte cargado o a una tapa que debe encajar. Anota dimensiones críticas, acabado visible, cantidad, material previsto y fecha necesaria.

- [ ] El nombre del archivo identifica proyecto y revisión.
- [ ] La versión enviada es la aprobada, no una exportación antigua.
- [ ] Las unidades y la escala están confirmadas.
- [ ] Se conoce la función: visual, dimensional o funcional.
- [ ] Las caras críticas y zonas de montaje están señaladas.

Si aún no está claro qué se pretende demostrar, distingue entre prototipo visual y prototipo funcional antes de escoger parámetros caros sin necesidad.

## 2. Revisa la geometría CAD

Comprueba que el cuerpo esté cerrado, sin caras invertidas, volúmenes duplicados ni detalles que desaparezcan al exportar. Revisa espesores, radios internos, agujeros y acceso de herramientas. Una geometría puede laminar sin avisos y seguir siendo imposible de montar.

### Ajustes y tolerancias

Los encajes no deberían usar automáticamente la misma medida nominal en ambas piezas. La holgura depende de máquina, material, orientación y tipo de unión. Consulta [tolerancias para piezas impresas en 3D](/blog/tolerancias-piezas-impresas-3d) y, para un ajuste importante, imprime una muestra pequeña antes de toda la carcasa.

- [ ] Las paredes superan el mínimo reproducible del proceso previsto.
- [ ] Agujeros, pasadores y ranuras incluyen la holgura elegida.
- [ ] Hay radios en cambios bruscos de sección cuando la pieza soporta carga.
- [ ] Tornillos, insertos o componentes comerciales tienen espacio real.
- [ ] El archivo exportado conserva la resolución necesaria sin ser innecesariamente pesado.

La guía para [preparar un STL para impresión 3D](/blog/preparar-archivo-stl-impresion-3d) amplía la comprobación de exportación y malla.

## 3. Decide orientación, material y soportes

La cara apoyada en la cama afecta al acabado y a las medidas iniciales. La dirección de capas afecta a la resistencia. No elijas orientación solo para acortar el tiempo: identifica primero la carga principal, las superficies de contacto y las caras visibles.

- [ ] La orientación favorece la resistencia en la dirección necesaria.
- [ ] Los soportes no dañan una cara de ajuste si existe alternativa.
- [ ] Los voladizos y puentes son razonables para la máquina.
- [ ] La base ofrece adhesión suficiente o se ha previsto brim.
- [ ] El material soporta temperatura, humedad, impacto y flexión de uso.

Para piezas cargadas, utiliza [cómo orientar una pieza resistente](/blog/orientar-pieza-impresion-3d-resistente). Si la duda es el polímero, revisa [cómo elegir filamento para piezas funcionales](/blog/elegir-filamento-piezas-funcionales).

## 4. Inspecciona la vista previa del laminador

No basta con que el programa termine sin errores. Recorre las capas en las zonas críticas y comprueba que existen los perímetros, tapas y puentes esperados. Busca islas que empiecen en el aire, relleno interrumpido, paredes que desaparecen y movimientos sobre detalles finos.

- [ ] Impresora, boquilla y filamento del perfil son correctos.
- [ ] Temperaturas y ventilación corresponden a la bobina utilizada.
- [ ] Perímetros, tapas y relleno responden a la función.
- [ ] Los soportes tienen acceso para retirarlos.
- [ ] Tiempo y gramos entran en el límite del proyecto.
- [ ] Se ha guardado el archivo de proyecto del laminador, no solo el G-code.

El G-code debe generarse para la máquina concreta. No envíes a otra impresora un archivo ya laminado salvo que el receptor lo solicite y confirme compatibilidad.

## 5. Prepara una entrega inequívoca

Crea una carpeta limpia con el modelo, una imagen de orientación y una nota breve. Indica material, color, cantidad, escala, caras críticas, tolerancias acordadas y acabado posterior. Si el servicio debe decidir algún parámetro, déjalo explícito en vez de asumirlo.

Un mensaje útil puede decir: “Revisión B, PETG negro, dos unidades; no colocar soportes en la cara interior marcada; agujero de 6 mm destinado a tornillo pasante; confirmar orientación antes de producir”. Esa nota reduce interpretaciones sin imponer valores que el proveedor deba validar.

## Errores frecuentes y limitaciones

Los fallos habituales son sobrescribir revisiones con el mismo nombre, exportar en pulgadas como si fueran milímetros, aceptar soportes automáticos sin revisar y no comunicar qué superficie debe quedar limpia. También se olvida que un STL no conserva por sí mismo material, color ni intención de montaje.

Esta checklist reduce errores previsibles, pero **no valida la seguridad de una pieza**. Un componente sometido a carga, calor, contacto alimentario o uso crítico necesita requisitos, material y ensayos adecuados. Si el diseño aún cambia, aplica primero una [revisión de diseño antes de fabricar](/blog/revision-diseno-antes-fabricar).

## Cierre práctico

Guarda esta lista junto al proyecto y registra cualquier fallo que la revisión no detectó. La mejor checklist no es la más larga, sino la que se actualiza con problemas reales y permite repetir la pieza meses después sin reconstruir todas las decisiones.
