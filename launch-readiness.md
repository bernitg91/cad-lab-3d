# CAD Lab 3D launch readiness

## Estado local

- Build local verificado con `npm run build`.
- 42 artículos publicados en contenido local Markdown.
- SEO técnico preparado: canonical, Open Graph, Twitter Card, sitemap, robots y JSON-LD.
- Monetización futura preparada sin anuncios reales ni enlaces afiliados falsos.
- URL pública actual: `https://cadlab3d.com`.
- Dominio principal conectado: `https://cadlab3d.com`.
- Redirección `www`: `https://www.cadlab3d.com` redirige al dominio principal.

## Publicación en Vercel

Resultado desde este entorno:

- Proyecto Vercel creado: `cad-lab-3d`.
- Producción publicada y verificada: `https://cadlab3d.com`.
- Último deployment listo: `dpl_J9y1BR7BvHvH8hZsbNAjWYrHa2h2`.
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

- No hay remote configurado.
- No se puede hacer push hasta crear o conectar un repositorio remoto.
- Se ha añadido CI en `.github/workflows/ci.yml` para ejecutar `npm ci` y `npm run build` en `main` y pull requests.
- Vercel puede desplegar manualmente desde este workspace, pero la integración GitHub automática requiere conectar un repositorio.

## Google Search Console

Pendiente externo:

1. Añadir propiedad de dominio `cadlab3d.com`.
2. Verificar dominio con DNS o la opción indicada por Google.
3. Enviar `https://cadlab3d.com/sitemap.xml`.
4. Revisar indexación, consultas, CTR y páginas no indexadas.

No se puede conectar Search Console sin cuenta Google y verificación de propiedad.

## Google AdSense

El proyecto ya incluye una integración técnica apagada para AdSense:

- El script oficial se carga solo si `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` contiene un ID real `ca-pub-...`.
- `/ads.txt` genera la línea de Google solo si `GOOGLE_ADSENSE_PUBLISHER_ID` contiene un ID real `pub-...`.
- Sin esos valores, no se muestran anuncios ni se publica ningún identificador falso.

Pasos futuros:

1. Solicitar AdSense desde la cuenta Google propietaria.
2. Completar datos legales reales.
3. Validar que no hay páginas vacías ni recursos engañosos.
4. Esperar algo de indexación y contenido orgánico.
5. Configurar los IDs reales de AdSense en Vercel.
6. Redeplegar y comprobar `/ads.txt`.

## Afiliados

No hay enlaces afiliados activos. Pasos futuros:

1. Elegir programas reales.
2. Añadir avisos visibles de afiliación.
3. Crear comparativas con experiencia o criterios verificables.
4. Evitar recomendaciones inventadas.

## Recursos digitales y servicios

Preparado:

- Página de recursos con productos futuros.
- Página de servicios CAD.
- Contacto visual sin backend.

Pendiente:

- Crear archivos descargables reales.
- Conectar formulario.
- Definir condiciones de servicio y datos reales del responsable.
