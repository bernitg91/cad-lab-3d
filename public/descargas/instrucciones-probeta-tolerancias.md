# Probeta paramétrica de tolerancias FDM

Recurso original de CAD Lab 3D, creado el 9 de septiembre de 2026 para preparar una práctica de encaje. El archivo define una geometría didáctica: **no se ha impreso, medido ni ensayado y no garantiza ningún ajuste**.

## Archivos

- `probeta-tolerancias-fdm.scad`: modelo paramétrico editable en OpenSCAD.
- `registro-tolerancias-fdm.csv`: registro vacío, con encabezados y sin filas de resultados.

## Geometría y unidades

Todas las dimensiones son milímetros. La placa mide **90 × 24 × 5 mm**. El origen está en una esquina de la base: X va de 0 a 90, Y de 0 a 24 y Z de 0 a 5. Los cinco taladros atraviesan todo el espesor y sus ejes son paralelos a Z.

El diámetro de cada orificio se define como:

`diámetro CAD = diámetro nominal + holgura diametral`

| Orificio, de menor a mayor X | Centro X (mm) | Centro Y (mm) | Holgura diametral (mm) | Diámetro CAD (mm) | Holgura radial nominal (mm) |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 | 13 | 12 | 0,00 | 10,00 | 0,000 |
| 2 | 29 | 12 | 0,10 | 10,10 | 0,050 |
| 3 | 45 | 12 | 0,20 | 10,20 | 0,100 |
| 4 | 61 | 12 | 0,30 | 10,30 | 0,150 |
| 5 | 77 | 12 | 0,40 | 10,40 | 0,200 |

**La holgura radial es la mitad de la diametral** cuando se comparan agujero y pasador circulares concéntricos. La tabla toma como referencia un pasador nominal de 10 mm; no contiene medidas físicas ni tolerancias de fabricación garantizadas.

## Uso

1. Abre el archivo `.scad` en OpenSCAD. Comprueba los parámetros al principio del archivo y renderiza el sólido antes de exportarlo como STL. El modelo no incluye números grabados; conserva esta tabla para identificar los orificios y marca la dirección X en la placa cuando la fabriques.
2. Abre el STL en el laminador y verifica que la caja envolvente mida 90 × 24 × 5 mm. STL no almacena una unidad física: impórtalo en milímetros. Mantén la base sobre la cama si quieres probar agujeros con ejes verticales; registra otra orientación como una serie independiente.
3. Registra impresora, perfil y cualquier compensación XY o de agujeros en `notas`. Introduce en sus columnas el material, la boquilla, la altura de capa y la orientación realmente utilizados. Mantén constantes esas condiciones entre los cinco agujeros de la serie.
4. Utiliza **el mismo pasador físico, medido**, para los cinco orificios. Mide su diámetro con un instrumento adecuado en varias posiciones y anota el rango observado y el instrumento en `notas`. El rótulo «10 mm» de un pasador no sustituye su medición.
5. Deja enfriar la pieza antes de medir. Identifica cada agujero por su centro X. Anota su diámetro físico en `diametro_medido_mm`, indicando en `notas` la dirección, la altura de medida y las lecturas adicionales si observas ovalización. Las puntas del instrumento no deben forzar el orificio.
6. Añade una fila al CSV por orificio y por repetición. Copia `holgura_diametral_mm` y `diametro_cad_mm` de la tabla de diseño; rellena las demás columnas solo con observaciones reales. Clasifica el montaje de manera consistente, por ejemplo: no entra, presión manual, deslizante o libre. Define y registra cómo aplicas esa clasificación; es una observación de montaje, no un ensayo normalizado.
7. No lijes, escaries ni fuerces los agujeros durante la primera serie. Si pruebas posprocesado, regístralo como una serie distinta. Valida después la unión real que quieras fabricar: longitud de contacto, orientación y geometría pueden cambiar el resultado.

El modelo conserva el diámetro nominal de 10 mm solicitado. Si el pasador medido difiere de 10 mm, la diferencia geométrica prevista respecto a ese pasador es `diámetro CAD − diámetro medido del pasador`. Tras fabricar, la diferencia diametral observada se calcula con `diámetro medido del agujero − diámetro medido del pasador`; puede ser negativa y no equivale por sí sola a un ajuste válido. No cambies silenciosamente el valor nominal para hacer coincidir las medidas.

## Registro y resultados

El CSV se entrega **sin datos de prueba**. Sus columnas son:

`holgura_diametral_mm,diametro_cad_mm,diametro_medido_mm,resultado_ajuste,material,boquilla_mm,altura_capa_mm,orientacion,notas`

Usa punto decimal al escribir números en el CSV, porque la coma separa campos. Si una nota contiene comas, introdúcela entre comillas dobles. Al abrirlo en una hoja de cálculo, selecciona delimitador coma y codificación UTF-8. Conserva los ceros cuando sean valores medidos o nominales; deja vacía una celda cuando no haya dato.

Las dimensiones y la serie numérica de este recurso son **datos de diseño para una práctica**, no resultados de un ensayo. La contracción, el estado de la impresora, el material, la humedad, la orientación, el perfil, la costura y el posprocesado pueden alterar el diámetro fabricado. No existe una holgura de esta tabla que se pueda prometer como deslizante, a presión o universalmente correcta.

## Comprobación geométrica

La comprobación algebraica de los valores predeterminados da:

- Centros: `13 + 16 × i`, con `i = 0, 1, 2, 3, 4`: 13, 29, 45, 61 y 77 mm; Y = 12 mm en todos.
- Radios: 5,00; 5,05; 5,10; 5,15 y 5,20 mm.
- Material mínimo hasta los extremos X: 8,00 mm a la izquierda del primer agujero y 7,80 mm a la derecha del último.
- Material mínimo hasta cualquiera de los bordes Y: `12 − 5,20 = 6,80 mm`.
- Separación libre mínima entre agujeros contiguos: `16 − 5,15 − 5,20 = 5,65 mm`.
- Los cilindros de sustracción recorren Z de −1 a 6 mm y atraviesan la placa de Z = 0 a Z = 5 mm.

Los agujeros quedan dentro de la placa y no se solapan. Esta comprobación no valida la impresión, el encaje ni la resistencia mecánica. Los cilindros se discretizan con 180 segmentos para exportar la malla; el archivo STL será una aproximación poligonal de las superficies circulares.

## Licencia y atribución

El código OpenSCAD, la plantilla CSV y este documento originales se publican bajo **Creative Commons Atribución 4.0 Internacional (CC BY 4.0)**: https://creativecommons.org/licenses/by/4.0/

Puedes compartirlos y adaptarlos, incluso para uso comercial, respetando la licencia. Atribución sugerida: «Probeta paramétrica de tolerancias FDM, CAD Lab 3D, 2026, CC BY 4.0». Conserva el enlace a la licencia e indica los cambios cuando adaptes el recurso. La atribución no implica que CAD Lab 3D respalde una modificación o un producto fabricado a partir del modelo.
