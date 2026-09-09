# PageSpeed móvil — 9 de septiembre de 2026

Informe de partida facilitado por el propietario: https://pagespeed.web.dev/analysis/https-cadlab3d-com/tx2z252472?hl=es&form_factor=mobile

Medición de laboratorio del 9/09/2026 a las 15:16 CEST: Moto G Power emulado, Lighthouse 13.4.1, 4G lenta. No hay datos de campo CrUX.

| Indicador | Informe de partida |
| --- | ---: |
| Rendimiento | 55 |
| Accesibilidad | 96 |
| Buenas prácticas | 100 |
| SEO | 100 |
| FCP | 3,4 s |
| LCP | 5,2 s |
| TBT | 670 ms |
| CLS | 0 |
| Speed Index | 4,8 s |

## Cambios aplicados

- Three.js y WebGL se inicializan al acercarse el lector a la vista 3D. Se conserva el espacio, las tres vistas, controles, gestión de movimiento reducido, visibilidad y liberación de recursos.
- La sección 3D incrustada ya no registra un controlador de desplazamiento pensado para su antigua presentación fija.
- AdSense usa la carga diferida de Next.js tras la carga inicial y durante inactividad. Se conservan el identificador, la verificación, las rutas permitidas, CMP de Google y la carga única durante navegación. No se cambia el código publicitario servido por Google ni se condiciona la carga al agente de usuario.
- La fotografía principal dispone de precarga y tamaños acordes con las columnas. Las imágenes contenidas declaran el ancho que ocupa su contenido, evitando pedir una fotografía vertical al ancho completo del marco horizontal.
- Se ajustan los tamaños de las cuadrículas y se desactiva la precarga de navegación en imágenes y créditos secundarios.
- IBM Plex Mono deja de precargarse en todas las visitas. Se mantienen las fuentes del texto principal y títulos.
- Se separan los estilos de las guías y de diagnóstico de la hoja global y se añade la preconexión de Funding Choices sugerida por el informe.
- Se elimina la transparencia que reducía el contraste de los números 01–03 y se identifican las comparativas e ideas con nombres accesibles específicos.

## Recomendaciones con límites externos

El ahorro de caché indicado (16 KiB) corresponde al JavaScript de Google Ads con caché de 14 días. CADLAB3D no controla esa cabecera. Las redistribuciones atribuidas a show_ads_impl y el código no usado de publicidad/CMP se mitigan separando su arranque de la carga principal; no se eliminan funciones del proveedor.

El informe ya da 100 en buenas prácticas y SEO. Las indicaciones de CSP estricta, HSTS, COOP y Trusted Types son comprobaciones adicionales, sin puntuación; no equivalen a fallos de esos 100 puntos. Se conservan las protecciones de producción. Una política de scripts estricta o Trusted Types necesita compatibilidad con Next y los terceros; no se impone una política que pueda romper navegación, anuncios o consentimiento.

La nueva puntuación se debe obtener con otra ejecución de PageSpeed tras publicar; el enlace inicial es una captura histórica y no se actualiza. Las mediciones de laboratorio pueden variar entre ejecuciones y no sustituyen los datos reales de usuarios.
