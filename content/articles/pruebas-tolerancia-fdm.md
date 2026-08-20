---
title: "Cómo hacer pruebas de tolerancia en FDM"
slug: "pruebas-tolerancia-fdm"
description: "Método para crear pruebas de tolerancia en impresión 3D FDM y ajustar encajes, agujeros y piezas moviles."
category: "Impresión 3D"
categorySlug: "impresion-3d"
date: "2026-05-11"
updatedDate: "2026-08-20"
readingTime: "5 min"
author: "CAD Lab 3D"
featured: false
---

Las tolerancias en FDM dependen de la máquina, el material, el perfil, la orientación y la propia geometría. Por eso una cifra encontrada en internet solo puede ser un punto de partida. Una probeta pequeña permite convertir esa suposición en datos antes de imprimir una carcasa o un mecanismo completo.

## 1. Define qué encaje necesitas probar

No todas las uniones persiguen el mismo comportamiento. Una tapa desmontable necesita movimiento y acceso; un pasador a presión busca retención; un eje móvil debe girar sin un juego excesivo. Escribe la función y decide cómo clasificarás el resultado antes de diseñar la prueba.

La guía sobre [cómo elegir tolerancias para piezas impresas](/blog/tolerancias-piezas-impresas-3d) explica las variables generales. La probeta, en cambio, debe responder a tu combinación concreta de impresora, material y geometría.

### Reproduce la unión real

Un bloque genérico de agujeros no representa necesariamente una lengüeta, una ranura larga o un clip. Conserva en la muestra la orientación, el espesor alrededor del encaje, la longitud de contacto y la dirección de montaje. Si el diseño usa clips flexibles, conviene revisar además los criterios de [encajes y clips para impresión 3D](/blog/disenar-encajes-clips-impresion-3d).

## 2. Diseña una probeta comparable

Incluye varias holguras alrededor del valor que consideras razonable, identificadas en relieve o en un plano adjunto. No hay un intervalo universal: el rango debe responder a la resolución de tu proceso y al tipo de ajuste. Mantén iguales el resto de dimensiones para que la holgura sea la variable principal.

Evita que las muestras sean tan pequeñas que la primera capa domine todo el resultado. Separa cada unión lo suficiente para que el calor o la deformación de una no afecte a la siguiente. Si probarás agujeros verticales y horizontales, colócalos como casos distintos; **la orientación cambia cómo se construye su contorno**.

## 3. Imprime con condiciones representativas

Utiliza el mismo material, boquilla, altura de capa, orientación, perímetros y compensaciones previstos para la pieza final. Si cambias flujo o temperatura durante la serie, ya no podrás atribuir la diferencia únicamente a la holgura. Antes de empezar, conviene tener una base estable con la guía para [calibrar una impresora para piezas funcionales](/blog/calibrar-impresora-3d-piezas-funcionales).

Observa la primera capa. El «pie de elefante» puede cerrar una ranura o aumentar un contorno macho aunque el resto de la pieza sea correcto. No lijes la probeta antes de medir salvo que el posprocesado forme parte definida del proceso final; de lo contrario estarías evaluando otro método.

### Registra las condiciones

Asocia a cada muestra un código y guarda material, perfil, fecha, orientación y revisión del archivo. Anota también cualquier cambio de boquilla o mantenimiento relevante. Una biblioteca física sin esa información resulta difícil de reutilizar.

## 4. Mide y clasifica el ajuste

No te quedes con «entra» o «no entra». Usa categorías consistentes: bloqueado, presión fuerte, ajustado desmontable, deslizante y libre. Describe cómo aplicaste la fuerza; la sensación manual no es un instrumento preciso, pero puede ser útil si se registra de la misma manera.

Mide con calibre las zonas accesibles y compara nominal con fabricado. No fuerces una punta del calibre en un hueco irregular ni interpretes una única medida como forma perfecta. Para ejes o agujeros funcionales, toma varias lecturas y revisa si hay ovalización, costura o capas deformadas.

## 5. Aplica el resultado al diseño

Elige la holgura que cumpla la función, no simplemente la menor que consigue entrar. Después valida una muestra de la unión completa, porque una carcasa grande puede deformarse de forma distinta a la probeta. Si las piezas se fabricarán varias veces, imprime más de una muestra para observar repetibilidad.

Este es un proceso recomendado:

1. define función y criterio de ajuste;
2. diseña variantes cambiando una sola variable;
3. imprime con el perfil final;
4. inspecciona y mide sin modificar las muestras;
5. registra la clasificación;
6. incorpora el valor elegido al CAD;
7. valida la unión real antes de producir el conjunto.

Si la pieza va a soportar carga, recuerda que la holgura es solo una parte del problema. Revisa también [orientación y resistencia FDM](/blog/orientar-pieza-impresion-3d-resistente).

## 6. Errores y limitaciones

Usar una probeta de PLA para decidir una pieza final en PETG, cambiar simultáneamente material y orientación o medir solo una muestra produce conclusiones débiles. La humedad, el desgaste, la calibración y la forma del encaje pueden alterar el resultado con el tiempo.

**Una prueba de tolerancias no crea una regla universal**. Crea una referencia documentada para un proceso concreto. Guarda la pieza etiquetada y repite la prueba cuando cambie una variable importante; así tendrás una biblioteca de fabricación más útil que una tabla genérica.
