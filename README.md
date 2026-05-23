# CAD Lab 3D

Web de contenido sobre CAD, diseño industrial, impresión 3D, materiales, simulación FEM y proyectos universitarios técnicos.

Producción actual: `https://cadlab3d.com`.

## Requisitos

- Node.js 20 o superior recomendado.
- npm.

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Después abre `http://localhost:3000`.

## Build de producción

```bash
npm run build
```

## Variables de entorno

Crea `.env.local` a partir de `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://cadlab3d.com
NEXT_PUBLIC_CONTACT_EMAIL=bbernat.torres@gmail.com
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT=
VERCEL_ENV=
VERCEL_URL=
```

`NEXT_PUBLIC_SITE_URL` define el dominio usado por canonical URLs, Open Graph, `robots.txt` y `sitemap.xml`. En Vercel está configurado como `https://cadlab3d.com`. Si no existe, la app usa `https://cadlab3d.com` como fallback editable.

`NEXT_PUBLIC_CONTACT_EMAIL` define el email mostrado en contacto, páginas legales y formularios de servicios. El formulario prepara un email con `mailto:` para que el usuario lo revise antes de enviarlo.

`VERCEL_ENV` y `VERCEL_URL` las define Vercel automáticamente. No las configures manualmente salvo para pruebas controladas. Cuando `VERCEL_ENV=preview`, la app usa la URL automática del despliegue (`https://$VERCEL_URL`) para canonical y Open Graph, evitando que una preview parezca la versión final de producción.

`NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` activa el script de AdSense solo si contiene un ID real con formato `ca-pub-...`. El archivo `public/ads.txt` contiene la línea oficial del editor. No uses valores inventados.

En despliegues preview, el script de AdSense permanece desactivado aunque existan variables configuradas. El archivo `/ads.txt` se sirve como archivo estático para el dominio publicado. Los anuncios reales deben cargarse solo en Production.

## Editar artículos

Los artículos están en `content/articles/` como archivos Markdown con metadatos al inicio:

```md
---
title: "Título del artículo"
slug: "url-limpia-del-articulo"
description: "Descripción SEO"
category: "Impresión 3D"
categorySlug: "impresion-3d"
date: "2026-05-01"
readingTime: "8 min"
author: "CAD Lab 3D"
featured: true
---
```

Para crear un artículo nuevo:

1. Duplica un archivo de `content/articles/`.
2. Cambia `title`, `slug`, `description`, `category`, `categorySlug`, `date` y `readingTime`.
3. Escribe el contenido usando `##` y `###` para que se genere la tabla de contenidos.
4. Usa un `categorySlug` existente en `lib/categories.ts`.
5. Incluye resumen rápido, errores frecuentes si aplica, enlaces internos y recomendación práctica final.

## Despliegue en Vercel

1. Importa el repositorio desde Vercel.
2. Framework: Next.js.
3. Build command: `npm run build`.
4. Output: configuración automática de Next.js.
5. Añade `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_CONTACT_EMAIL` en las variables de entorno de Vercel si quieres sobrescribir los valores por defecto.
6. Despliega y revisa `/`, `/blog`, `/recursos`, `/servicios`, `/impresion-3d-personalizada`, `/casos-practicos-impresion-3d`, `/glosario`, `/preguntas-frecuentes`, `/sitemap.xml` y `/robots.txt`.

La configuración no secreta de Vercel está en `vercel.json`. El estado de publicación, dominio y monetización está documentado en `launch-readiness.md`.

## Preview / Pre-production en Vercel

Vercel crea despliegues Preview automáticamente cuando se trabaja en una rama distinta de la rama de producción, al abrir un pull request o al desplegar desde la CLI sin `--prod`. Estas previews sirven para revisar cambios en una URL pública temporal sin afectar `https://cadlab3d.com`.

Flujo recomendado:

1. Mantener `main` como rama de producción.
2. Crear ramas como `preview/correcciones-seo` o `content/nuevos-artículos` para cambios.
3. Abrir pull request en GitHub.
4. Revisar la URL Preview que crea Vercel.
5. Comprobar que `/`, `/blog`, `/recursos`, `/sitemap.xml` y `/ads.txt` funcionan en Preview.
6. Fusionar a `main` solo cuando la preview esté correcta.

Comportamiento preparado en esta web:

- En Preview, canonical URLs y Open Graph usan la URL temporal del despliegue.
- En Production, canonical URLs y Open Graph usan `NEXT_PUBLIC_SITE_URL`, actualmente `https://cadlab3d.com`.
- En Preview no se carga el script de AdSense.
- `/ads.txt` se sirve como archivo estático desde `public/ads.txt`.
- En Production, si `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` está configurada, se publica el script de AdSense.

Variables recomendadas en Vercel:

- Production: `NEXT_PUBLIC_SITE_URL=https://cadlab3d.com`, `NEXT_PUBLIC_CONTACT_EMAIL=bbernat.torres@gmail.com`, ID real de AdSense solo cuando corresponda.
- Preview: no definir `NEXT_PUBLIC_SITE_URL` si quieres que la preview use su URL automática; no definir IDs de AdSense.
- Development: valores vacíos o locales.

## Dominio

El dominio principal configurado es `https://cadlab3d.com` y `https://www.cadlab3d.com` redirige al dominio principal. Si cambias de dominio:

1. Conéctalo en Vercel desde Project Settings > Domains.
2. Actualiza DNS según indique Vercel.
3. Cambia `NEXT_PUBLIC_SITE_URL` al dominio final.
4. Vuelve a desplegar.
5. Comprueba que canonical URLs, sitemap y robots usan el dominio correcto.

## GitHub

`.gitignore` evita subir `node_modules`, `.next`, `.env.local` y archivos temporales.

El proyecto incluye CI en `.github/workflows/ci.yml` para ejecutar `npm ci` y `npm run build` en cada push a `main` y en pull requests.

Si el repositorio no tiene remote configurado:

```bash
git remote add origin <URL_DEL_REPOSITORIO>
git push -u origin main
```

Si ya existe remote:

```bash
git push
```

No incluyas secretos ni credenciales en el repositorio.

## Google Search Console

1. Añade una propiedad de dominio o de prefijo URL.
2. Verifica el dominio con DNS si es posible.
3. Envía `https://cadlab3d.com/sitemap.xml`.
4. Revisa cobertura de indexación, páginas descubiertas, errores 404 y canonical seleccionadas.
5. Al principio mira impresiones, consultas, CTR, páginas con crecimiento y artículos sin indexar.
6. Tras publicar nuevos artículos, solicita indexación solo para URLs importantes; no abuses de la herramienta.

## Checklist antes de solicitar AdSense

El proyecto cuenta con 42 artículos, herramientas propias, casos prácticos con fotos reales, glosario técnico, FAQ y páginas legales. Antes de volver a solicitar revisión tras un rechazo por contenido de poco valor, comprueba:

- Artículos útiles, originales y suficientemente completos.
- Páginas legales revisadas, contacto visible y email real.
- Navegación clara entre inicio, blog, categorías, recursos, contacto y legales.
- Casos prácticos, glosario, FAQ y metodología accesibles desde la navegación interna.
- Tráfico orgánico inicial desde Google Search Console.
- Sin contenido copiado, duplicado o generado sin revisión.
- Sin páginas vacías, recursos falsamente descargables o secciones rotas.
- Sin clics artificiales, incentivos a clicar anuncios ni prácticas prohibidas.
- Sin anuncios engañosos ni placeholders que parezcan publicidad activa.

Cuando Google proporcione los datos reales, configura en Vercel:

```bash
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

Después redepliega y comprueba que `/ads.txt` devuelve la línea oficial de Google.

## Seguridad y dependencias

Ejecuta:

```bash
npm audit
npm outdated
```

No uses `npm audit fix --force` si propone bajar Next a una versión antigua o romper el proyecto. En este proyecto se prioriza estabilidad con Next moderno. La revisión actual muestra 2 avisos moderados internos de Next relacionados con `postcss`; el arreglo automático propone un cambio rompiente, así que se documenta y se revisará cuando exista una actualización segura.

## Preparar para publicar

- Revisa si hace falta añadir datos fiscales completos en política de privacidad, política de cookies y aviso legal.
- Si el volumen de consultas crece, conecta el formulario de contacto a un backend o servicio externo.
- Conecta la newsletter solo con consentimiento y política de datos completa.
- Activa anuncios o afiliados solo cuando haya contenido suficiente y textos legales revisados.
- Mantén AdSense sin bloques manuales engañosos y revisa el consentimiento de cookies antes de servir anuncios personalizados.

## Estructura

- `app/`: páginas y rutas con Next.js App Router.
- `components/`: componentes reutilizables.
- `content/articles/`: artículos locales en Markdown.
- `lib/`: lectura de artículos, SEO, categorías y renderizado.
- `types/`: tipos compartidos.
