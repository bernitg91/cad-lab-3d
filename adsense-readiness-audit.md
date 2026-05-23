# Revisión de preparación para AdSense

Fecha de revisión: 23 de mayo de 2026

## Contexto

Google AdSense ha marcado el sitio con el aviso "Contenido de poco valor". Este documento resume las comprobaciones realizadas y los cambios aplicados para reducir los puntos débiles visibles antes de solicitar una nueva revisión.

Esta revisión no garantiza la aprobación. La decisión final depende de Google, del estado real de indexación, del tráfico, de la experiencia de usuario y de la evaluación manual o automática de AdSense.

## Cambios aplicados

- Se añadió una página comercial real para impresión 3D personalizada: `/impresion-3d-personalizada`.
- Se incorporaron fotos reales de piezas impresas en 3D para reforzar confianza y demostrar actividad real.
- Se configuró el correo de contacto público: `bbernat.torres@gmail.com`.
- El formulario de contacto ya no simula un envío; prepara un correo real mediante `mailto`.
- Se retiraron placeholders de anuncios para evitar bloques vacíos o elementos que parezcan publicidad activa.
- Se sustituyó el formulario visual de newsletter sin backend por una sección de rutas recomendadas.
- Se reforzaron las páginas legales con referencias a cookies, proveedores externos, Google AdSense, consentimiento y revisión legal futura.
- Se limpiaron frases públicas que sonaban a recursos pendientes o incompletos.
- Se añadió la nueva ruta a navegación, footer, recursos, servicios y sitemap.

## Comprobaciones técnicas

- Artículos publicados: 42.
- Longitud mínima de artículo detectada: 483 palabras.
- Todos los artículos tienen frontmatter obligatorio.
- No hay slugs duplicados.
- Todos los artículos incluyen "Resumen rápido".
- Todos los artículos incluyen "Recomendación práctica final".
- Enlaces internos revisados: sin enlaces rotos detectados en rutas conocidas.
- Páginas estáticas y dinámicas principales con metadata o metadata dinámica.
- `ads.txt` presente con la línea oficial del editor.
- `robots.txt` permite rastreo y apunta al sitemap.
- `sitemap.xml` incluye páginas principales, categorías y artículos.
- Build de producción ejecutado correctamente.
- Rutas principales comprobadas en servidor local: todas respondieron `200`.
- Páginas principales comprobadas con un único `H1`, canonical y Open Graph.
- Página `/impresion-3d-personalizada` comprobada visualmente: imágenes cargan, email visible y sin errores de consola.

## Riesgos reducidos

- Páginas vacías o meramente "próximamente".
- Recursos simulados sin utilidad real.
- Formularios que prometen envíos inexistentes.
- Bloques de anuncios engañosos o invasivos.
- Falta de página de contacto clara.
- Falta de señales de confianza en servicios reales.
- Falta de explicación sobre cookies, terceros y AdSense.

## Pendiente fuera del código

- Activar o confirmar una CMP válida desde AdSense para usuarios del EEE, Reino Unido y Suiza si Google lo solicita.
- Solicitar de nuevo la revisión en AdSense cuando la versión actual esté desplegada.
- Mantener indexación activa en Google Search Console y enviar el sitemap.
- Añadir datos fiscales o legales completos si la prestación de servicios se convierte en actividad comercial habitual.
- Seguir publicando contenido original y útil antes de depender de ingresos publicitarios.
