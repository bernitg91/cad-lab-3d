# Mantenimiento técnico de CAD Lab 3D

Revisión: 9 de septiembre de 2026. Producción: https://cadlab3d.com.

## Publicación y recuperación

El repositorio conserva el historial y Vercel publica `main`. Cada publicación debe superar el build completo y la CI. Para recuperar una versión anterior, usar el rollback del despliegue en Vercel y revertir de forma revisada el cambio en Git; no reescribir el historial compartido. La copia privada de Sites usa el mismo código con `CADLAB_STATIC_PREVIEW=1`, `VERCEL_ENV=preview` y su propio dominio.

No se mantiene una base de datos de visitantes. Los recursos editoriales y las fotografías publicadas están versionados. El formulario prepara un correo localmente, conserva el mensaje y permite copiarlo; no es un servicio de envío ni puede confirmar la entrega. El destino real se define mediante `NEXT_PUBLIC_CONTACT_EMAIL`.

## Controles antes de publicar

- `npm ci`: instalar el lockfile con Node 24 LTS.
- `npm audit --audit-level=high`: comprobar avisos de dependencias.
- `npm run build`: lint, regresiones de cálculo, licencias/archivos de imágenes, compilación y tipos, metadatos, sitemap, JSON-LD, referencias accesibles y enlaces internos.
- Confirmar por HTTP el dominio de producción, sus rutas importantes, un 404 real y las redirecciones 308; los HTML locales no prueban por sí solos los códigos HTTP del servidor.

Se usan ESLint 10, TypeScript ESLint, el plugin de Next y reglas de Hooks directamente. Las fotografías ya optimizadas permiten `<img>` con dimensiones explícitas; las imágenes editoriales utilizan también `next/image`. No se fuerza una versión incompatible del preset completo de Next.

## SEO

Las páginas del sitemap tienen título y descripción únicos, canonical absoluto, una imagen social disponible y un H1. Los artículos incluyen autor, fechas y una imagen pertinente en BlogPosting. Las recreaciones conservan su identificación editorial. `lastModified` representa cambios sustanciales documentados, no la fecha de cada build; si no se conoce, se omite.

Las previews permiten leer el `noindex,nofollow` y no anuncian sitemap. Mantener activada la protección de acceso de las plataformas. La producción no debe heredar las variables de preview. Las URLs archivadas conservan redirecciones y no se incluyen en el sitemap.

La propiedad de dominio está verificada por DNS y el sitemap público fue leído correctamente el 9/9/2026. Las solicitudes de rastreo de portada y laboratorio fueron aceptadas. No volver a enviarlas repetidamente. Search Console requiere datos nuevos para evaluar cambios; ninguna configuración garantiza una posición o la aprobación de AdSense.

## Seguridad y privacidad

Vercel sirve HTTPS/HSTS y las cabeceras configuradas de tipo MIME, referente, enmarcado y permisos de cámara, micrófono y ubicación. La CSP bloquea objetos incrustados, cambios de base y enmarcado externo y actualiza peticiones inseguras. No es una lista restrictiva de scripts: conserva compatibilidad con Next, AdSense y el consentimiento de Google. No afirmar protección total frente a XSS.

AdSense solo se carga en producción y en las rutas editoriales permitidas. La CMP de Google publicada proporciona consentimiento y revocación. El enlace visible de privacidad abre la API disponible o realiza una navegación al inicio para inicializarla. Las políticas identifican responsable, finalidades, bases jurídicas, conservación, proveedores, derechos y reclamación. Las funciones externas dependen del navegador, ubicación y disponibilidad de Google.

Los formularios no introducen mensajes en URLs HTTP mediante GET. La aplicación no guarda consultas en localStorage ni en una base de datos. Vercel Analytics solo se utiliza en producción. No añadir analítica, publicidad, formularios remotos, newsletter, cuentas o proveedores nuevos sin actualizar la información de privacidad y revisar el consentimiento aplicable.

## Límites de esta revisión

Los controles automáticos y la lectura de código no equivalen a una certificación de accesibilidad, una auditoría de penetración ni un resultado de Core Web Vitals de usuarios reales. La revisión de Search Console no disponía de datos suficientes de Core Web Vitals. Comprobar esas métricas cuando haya muestra; no publicar una puntuación inventada ni prometer indexación o monetización.
