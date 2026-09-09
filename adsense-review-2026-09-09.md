# CAD Lab 3D — revisión del 9 de septiembre de 2026

## Estado y alcance

Rediseño del sitio de CAD e impresión 3D inspirado en la composición, tipografía y experiencia 3D de la web de UNITEC del 8 de septiembre. La identidad y los datos de CAD Lab 3D siguen siendo propios: Bernat Torres Guasch, nombre confirmado por el titular en esta sesión.

El rechazo histórico documentado fue «Contenido de poco valor». No se ha consultado la cuenta de AdSense en esta revisión ni se conoce un dictamen actualizado de Google. Este archivo sustituye a la auditoría anterior para describir el código de esta versión, no para afirmar aprobación publicitaria.

## Cambios realizados

- Portada con modelo 3D didáctico de una brida: geometría CAD, capas y pieza completa. Controles por teclado/clic, giro y pausa; respeto a movimiento reducido y render detenido fuera de pantalla.
- Menú coherente en tamaños de escritorio y móvil. Corrección del hueco de navegación entre 1024 y 1279 px; Escape devuelve foco al botón.
- Identidad de Bernat Torres Guasch en autoría, contacto, aviso legal y privacidad. Sin datos corporativos de UNITEC.
- Práctica original de tolerancias: modelo OpenSCAD, esquema dimensionado, cinco diámetros, ejemplo resuelto, instrucciones y CSV vacío. No se atribuyen ensayos ni resultados de fabricación.
- Acceso desde portada, recursos, navegación, pie y artículo de tolerancias; nueva práctica incluida en sitemap.
- Conservados 17 artículos activos, 25 redirecciones de textos solapados, las fotografías documentales, las licencias y la exclusividad de las imágenes.
- Textos de galería y fichas de lectura más directos; conservados límites materiales y de medición.
- Bloques manuales de anuncios solo en producción. Galería descriptiva retirada de la lista de rutas publicitarias. Metadato de cuenta AdSense cuando existe ID configurado.
- Enlaces a privacidad y controles publicitarios de Google y a privacidad de Vercel. Reapertura de preferencias mediante la API oficial de Google cuando está disponible; este botón no sustituye una CMP publicada.
- Preview privada sin indexación, anuncios ni analítica. El dominio público mantiene la configuración de Vercel y su URL canónica.
- Dependencias corregidas tras avisos de seguridad detectados: npm audit sin vulnerabilidades conocidas al comprobar esta versión.

## Verificación

El build comprueba tipos, generación de rutas, fotografías, ilustraciones, exclusividad visual y artículos. Se añade un validador de destinos internos y anclas. Los recursos paramétricos se comprobaron algebraicamente; el archivo OpenSCAD no se ha fabricado ni se presentan medidas reales. No se ha realizado prueba visual en navegador de esta versión.

## Comprobaciones pendientes en la cuenta de Google

1. Confirmar el mensaje publicado de la CMP en «Privacidad y mensajes» para cadlab3d.com. En el repositorio no se puede certificar esa configuración; el script de AdSense puede distribuir un mensaje configurado en Google.
2. Comprobar en una sesión limpia del EEE la aceptación, rechazo y reapertura del mensaje con la configuración real publicada.
3. Tras hacer pública esta versión en cadlab3d.com y comprobar que Google puede acceder, solicitar una nueva revisión. Ni un número de artículos ni este rediseño garantizan la aprobación.

## Fuentes oficiales consultadas

- https://support.google.com/adsense/answer/7299563?hl=es — originalidad, navegación y experiencia.
- https://support.google.com/publisherpolicies/answer/11112688?hl=es — inventario de poco valor.
- https://support.google.com/adsense/answer/13554116?hl=es — CMP certificadas.
- https://developers.google.com/funding-choices/fc-api-docs — API de preferencias de privacidad.
- https://support.google.com/adsense/answer/1348695?hl=es — información de privacidad.

Las fuentes describen requisitos y herramientas. Las prioridades editoriales de este documento son una evaluación de la web, no un diagnóstico interno de Google.
