# CAD Lab 3D launch readiness

## Estado local

- Build local verificado con `npm run build`.
- 42 artículos publicados en contenido local Markdown.
- Herramientas SEO publicadas: calculadora de precio, calculadora de peso, selector de material y checklist de impresión 3D.
- Servicio de impresión 3D personalizada publicado con ejemplos reales.
- Casos prácticos de impresión 3D, glosario técnico y FAQ publicados para reforzar contenido propio y señales de confianza.
- SEO técnico preparado: canonical, Open Graph, Twitter Card, sitemap, robots y JSON-LD.
- Monetización preparada con script de AdSense condicionado a entorno Production e ID real. No hay bloques manuales de anuncios ni enlaces afiliados falsos.
- URL pública actual: `https://cadlab3d.com`.
- Dominio principal conectado: `https://cadlab3d.com`.
- Redirección `www`: `https://www.cadlab3d.com` redirige al dominio principal.

## Publicación en Vercel

Resultado desde este entorno:

- Proyecto Vercel creado: `cad-lab-3d`.
- Producción publicada y verificada: `https://cadlab3d.com`.
- Último deployment listo: se debe comprobar en Vercel tras cada push a `main`.
- `NEXT_PUBLIC_SITE_URL` configurado en Vercel como `https://cadlab3d.com`.
- Rutas principales, `robots.txt` y `sitemap.xml` respondieron `200`.

## Dominio

Estado actual:

- `cadlab3d.com` conectado al proyecto Vercel y marcado como verificado.
- `www.cadlab3d.com` conectado y redirigido a `cadlab3d.com` con redirección 308.
- `robots.txt` anuncia `https://cadlab3d.com/sitemap.xml`.
- `sitemap.xml` genera URLs con `https://cadlab3d.com`.

## GitHub

Estado actual:

- Repositorio remoto configurado en GitHub.
- Vercel está conectado a GitHub y puede desplegar automáticamente los cambios de `main`.
- Se ha añadido CI en `.github/workflows/ci.yml` para ejecutar `npm ci` y `npm run build` en `main` y pull requests.

## Google Search Console

Pendiente externo:

1. Añadir propiedad de dominio `cadlab3d.com`.
2. Verificar dominio con DNS o la opción indicada por Google.
3. Enviar `https://cadlab3d.com/sitemap.xml`.
4. Revisar indexación, consultas, CTR y páginas no indexadas.

No se puede conectar Search Console sin cuenta Google y verificación de propiedad.

## Google AdSense

El proyecto ya incluye una integración técnica para AdSense:

- El script oficial se carga solo si `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` contiene un ID real `ca-pub-...`.
- `/ads.txt` se sirve como archivo estático desde `public/ads.txt` con la línea oficial del editor.
- No hay bloques manuales de anuncios, llamadas a clicar anuncios ni placeholders publicitarios activos.

Pasos pendientes:

1. Solicitar de nuevo la revisión desde la cuenta Google propietaria.
2. Confirmar o activar una CMP válida si AdSense lo solicita para EEE, Reino Unido y Suiza.
3. Completar datos legales reales si el proyecto empieza a vender servicios de forma habitual.
4. Mantener indexación y contenido orgánico mediante Search Console.
5. Redeplegar y comprobar `/ads.txt` y que el script de AdSense se carga solo en producción.

## Afiliados

No hay enlaces afiliados activos. Pasos futuros:

1. Elegir programas reales.
2. Añadir avisos visibles de afiliación.
3. Crear comparativas con experiencia o criterios verificables.
4. Evitar recomendaciones inventadas.

## Recursos digitales y servicios

Preparado:

- Página de recursos con guías, checklists y herramientas disponibles.
- Página de servicios CAD.
- Página de impresión 3D personalizada.
- Página de casos prácticos con piezas reales.
- Glosario técnico y FAQ.
- Contacto mediante email real.

Pendiente:

- Crear archivos descargables reales.
- Definir condiciones de servicio y datos reales del responsable.
