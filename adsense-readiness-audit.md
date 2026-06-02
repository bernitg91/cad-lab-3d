# Revisión de preparación para AdSense

Fecha de revisión: 2 de junio de 2026

## Contexto

Google AdSense ha marcado el sitio con el aviso "Contenido de poco valor". Este documento resume las comprobaciones realizadas y los cambios aplicados para reducir los puntos débiles visibles antes de solicitar una nueva revisión.

Esta revisión no garantiza la aprobación. La decisión final depende de Google, del estado real de indexación, del tráfico, de la experiencia de usuario y de la evaluación manual o automática de AdSense.

## Cambios aplicados

- Se añadió una página comercial real para impresión 3D personalizada: `/impresion-3d-personalizada`.
- Se incorporaron fotos reales de piezas impresas en 3D para reforzar confianza y demostrar actividad real.
- Se añadió una página de casos prácticos con análisis técnico: `/casos-practicos-impresion-3d`.
- Se añadió un glosario técnico de CAD, FDM, materiales, FEM y documentación: `/glosario`.
- Se añadió una página de preguntas frecuentes con datos estructurados FAQPage: `/preguntas-frecuentes`.
- Se ajustó la home para que no muestre contadores artificiales ni frases orientadas a justificar monetización.
- Se configuró el correo de contacto público: `bbernat.torres@gmail.com`.
- El formulario de contacto ya no simula un envío; prepara un correo real mediante `mailto`.
- Se retiraron placeholders de anuncios para evitar bloques vacíos o elementos que parezcan publicidad activa.
- Se sustituyó el formulario visual de newsletter sin backend por una sección de rutas recomendadas.
- Se reforzaron las páginas legales con referencias a cookies, proveedores externos, Google AdSense, consentimiento y revisión legal futura.
- Se limpiaron frases públicas que sonaban a recursos pendientes o incompletos.
- Se añadió la nueva ruta a navegación, footer, recursos, servicios y sitemap.
- Se añadieron descargas reales en texto para plantillas y checklists dentro de `/recursos`.
- Se reforzaron `/contacto`, `/servicios`, `/categorias` y `/sobre-mi` para evitar páginas demasiado cortas.
- Se reescribieron bloques repetidos en los 42 artículos para reducir señales de contenido generado en serie.
- Se eliminaron de páginas visibles las referencias comerciales innecesarias a afiliación futura.
- Se añadió una guía pilar específica: `/guia-impresion-3d-fdm`.
- Se ampliaron los casos prácticos con material orientativo, uso y puntos críticos de revisión.

## Criterios consultados

- Google AdSense exige contenido propio, original, de calidad y atractivo para una audiencia concreta.
- Google recomienda revisar si las páginas ofrecen algo especial, navegación clara y contenido interesante o exclusivo.
- La documentación de Google Search sobre contenido útil prioriza contenido fiable, centrado en personas y basado en conocimiento o experiencia real.
- En comparación con servicios de impresión 3D ya publicados en España, las páginas fuertes muestran proceso, materiales, ejemplos, FAQ, forma de pedir presupuesto y límites claros del servicio.

## Comprobaciones técnicas

- Artículos publicados: 42.
- Páginas pilar principales: guía FDM, casos prácticos, impresión 3D personalizada, recursos, herramientas y guías por categoría.
- Longitud mínima de artículo detectada: 624 palabras.
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
- Nueva guía `/guia-impresion-3d-fdm`: responde `200`, tiene contenido sustancial y está enlazada desde home, guías, recursos, footer y sitemap.
- Descargas principales comprobadas en servidor local: responden `200`.
- Páginas principales comprobadas con un único `H1`, canonical y Open Graph.
- Página `/impresion-3d-personalizada` comprobada visualmente: imágenes cargan, email visible y sin errores de consola.
- Nuevas rutas añadidas al sitemap y enlazadas desde home, recursos, guías, footer o navegación principal.
- Auditoría de enlaces internos en código y Markdown: sin rutas rotas detectadas.

## Riesgos reducidos

- Páginas vacías o meramente "próximamente".
- Recursos simulados sin utilidad real.
- Textos repetidos en artículos que podían parecer contenido de baja diferenciación.
- Páginas visibles que hablaban de afiliados o monetización en vez de utilidad técnica.
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
