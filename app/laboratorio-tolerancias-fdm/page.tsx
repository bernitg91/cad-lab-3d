import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({ title: "Probeta de tolerancias FDM: modelo CAD y registro de pruebas", description: "Descarga una probeta paramétrica original de cinco agujeros en OpenSCAD y un registro CSV. Aprende a comparar holguras de diseño con medidas reales.", path: "/laboratorio-tolerancias-fdm" });
const holes = [0,0.1,0.2,0.3,0.4];
const decimal = (n:number, digits=2) => n.toLocaleString("es-ES",{minimumFractionDigits:digits,maximumFractionDigits:digits});

export default function ToleranceLabPage() {
  return <article className="cad-practice">
    <p className="cad-eyebrow">LABORATORIO / PRÁCTICA DE DISEÑO</p>
    <h1>Diseña la holgura.<br />Comprueba el encaje.</h1>
    <p className="cad-practice-lead">Una probeta, cinco agujeros y el mismo pasador. Este recurso te ayuda a comparar cómo cambia un ajuste al aumentar el diámetro del agujero, manteniendo las condiciones de impresión.</p>
    <p className="cad-practice-meta">Por {siteConfig.authorName} · 9 de septiembre de 2026 · Recurso original de CAD Lab 3D</p>
    <div className="cad-downloads"><a className="cad-button cad-button-primary" href="/descargas/probeta-tolerancias-fdm.scad" download>Descargar modelo CAD (.scad) <span aria-hidden="true">↓</span></a><a className="cad-button" href="/descargas/registro-tolerancias-fdm.csv" download>Registro de pruebas (.csv) <span aria-hidden="true">↓</span></a></div>
    <p className="cad-practice-note"><strong>Qué estás descargando.</strong> Un modelo paramétrico de diseño y una hoja vacía para tus medidas. La probeta no se ha fabricado ni ensayado en esta publicación; los diámetros son cotas del archivo, no resultados de impresión.</p>
    <figure className="cad-practice-figure">
      <svg viewBox="0 0 600 265" role="img" aria-label="Plano de la probeta: placa de 90 por 24 milímetros, espesor 5 milímetros, con cinco taladros de 10 a 10,4 milímetros; centros separados 16 milímetros.">
        <rect x="30" y="74" width="540" height="144" fill="#f8fbff" stroke="#1f4d9e" strokeWidth="2" />
        {holes.map((h,i)=><g key={h}><circle cx={30+(13+16*i)*6} cy="146" r={(10+h)*3} fill="#dce9fb" stroke="#2554b6" strokeWidth="1.7"/><line x1={30+(13+16*i)*6} y1="95" x2={30+(13+16*i)*6} y2="195" stroke="#82a0c7" strokeDasharray="3 4"/><text x={30+(13+16*i)*6} y="248" textAnchor="middle" fill="#264d89" fontSize="15">Ø{decimal(10+h,1)}</text></g>)}
        <line x1="42" y1="146" x2="558" y2="146" stroke="#82a0c7" strokeDasharray="4 5" />
        <path d="M30 62V22M570 62V22M30 36H570M30 36l8 -4m-8 4l8 4M570 36l-8 -4m8 4l-8 4" fill="none" stroke="#45638c" />
        <rect x="228" y="23" width="144" height="25" fill="#e7eef8"/><text x="300" y="42" textAnchor="middle" fontSize="16" fill="#264d89">90 mm</text>
      </svg>
      <figcaption>Vista superior del diseño. Placa: 90 × 24 × 5 mm. Centros X: 13, 29, 45, 61 y 77 mm; Y = 12 mm. La escala de pantalla depende del dispositivo. El archivo no lleva números grabados: marca la dirección de la serie al imprimir.</figcaption>
    </figure>
    <div className="article-body">
      <h2>Qué cambia y qué debes mantener fijo</h2>
      <p>Los cinco agujeros comparten altura, orientación y entorno de impresión. Cambia únicamente su diámetro nominal. La referencia del archivo es un pasador de 10 mm, con incrementos de holgura <strong>diametral</strong> de 0,10 mm. El paso entre centros es 16 mm.</p>
      <p>Utiliza el mismo pasador físico para toda la serie y mide su diámetro antes de empezar. Mantén material, perfil, altura de capa y compensaciones XY. Si cambias cualquiera de ellos, abre una serie nueva en el registro. Así podrás interpretar qué ha cambiado sin mezclar condiciones distintas.</p>
      <div className="table-scroll"><table><caption className="p-3 text-left font-bold">Cotas del diseño, en milímetros. No son medidas físicas.</caption><thead><tr><th>Orificio</th><th>Centro X</th><th>Diámetro CAD</th><th>Holgura diametral</th><th>Holgura radial</th></tr></thead><tbody>{holes.map((h,i)=><tr key={h}><td>{i+1}</td><td>{13+i*16}</td><td>{decimal(10+h)}</td><td>{decimal(h)}</td><td>{decimal(h/2,3)}</td></tr>)}</tbody></table></div>
      <h2>De la descarga a la primera medición</h2>
      <ol>
        <li><strong>Abre y revisa el CAD.</strong> En OpenSCAD, abre el archivo y comprueba los parámetros iniciales. El modelo usa milímetros y cinco cilindros que atraviesan la placa. Renderiza el sólido antes de exportarlo como STL. Puedes consultar la <a href="https://openscad.org/documentation.html" target="_blank" rel="noreferrer">documentación oficial de OpenSCAD</a>.</li>
        <li><strong>Verifica escala y orientación.</strong> El laminador debe mostrar una caja envolvente de 90 × 24 × 5 mm. STL no almacena unidades físicas. Coloca la cara plana sobre la cama para esta serie: los ejes de los agujeros quedarán verticales.</li>
        <li><strong>Registra el perfil.</strong> Anota impresora, material, boquilla, altura de capa, orientación y cualquier compensación de agujeros o de XY. Guarda también el perfil de laminado que has utilizado.</li>
        <li><strong>Mide después de enfriar.</strong> Identifica cada agujero por su posición. Mide en varias direcciones y alturas si observas ovalización, sin forzar las puntas del instrumento. Anota tanto las lecturas como el instrumento empleado.</li>
        <li><strong>Compara el montaje.</strong> Prueba el mismo pasador en los cinco agujeros sin lijar ni forzar. Puedes registrar «no entra», «presión manual», «deslizante» o «libre», explicando cómo aplicas esas categorías. Son observaciones de montaje, no clases de ajuste normalizadas.</li>
      </ol>
      <h2>Diametral y radial: un ejemplo resuelto</h2>
      <p>Para el cuarto agujero, el diámetro CAD es 10,30 mm. Frente a un pasador nominal de 10,00 mm, la diferencia diametral es <strong>10,30 − 10,00 = 0,30 mm</strong>. Cuando ambos son circulares y concéntricos, corresponde a 0,15 mm de separación por lado. Este cálculo describe la geometría; no predice el diámetro que imprimirá tu máquina.</p>
      <p>Para calcular la diferencia real, utiliza dos medidas físicas: <code>diámetro medido del agujero − diámetro medido del pasador</code>. El resultado puede ser negativo. Si el agujero no es circular, una sola medida no describe el ajuste: conserva las distintas lecturas y el resultado del montaje.</p>
      <h2>Cómo usar el registro CSV</h2>
      <p>El archivo contiene encabezados y ninguna fila de resultados. Añade una fila por agujero y repetición. Copia las dos primeras cotas desde la tabla de diseño y rellena las demás columnas con medidas y observaciones reales. En «notas» puedes indicar instrumento, diámetro del pasador, impresora, perfil y número de repetición.</p>
      <p>Ábrelo con delimitador coma y codificación UTF-8. Usa punto decimal en el CSV y comillas si una nota contiene comas. Deja vacía la celda cuando falte una medida: cero también es un valor y no significa «sin dato».</p>
      <h2>Cómo convertir el resultado en una decisión</h2>
      <p>Repite la combinación que te interese antes de trasladarla a otra pieza. Cambiar longitud de contacto, orientación, geometría o material puede cambiar el ajuste. Una holgura que funciona en esta placa no es automáticamente válida para una tapa, un clip ni una pieza sometida a carga.</p>
      <p>La geometría predeterminada deja un mínimo de 6,80 mm hasta los bordes laterales y 5,65 mm entre agujeros contiguos. Son comprobaciones algebraicas de separación, no valores de resistencia mecánica. Si modificas los parámetros, las aserciones del archivo avisan cuando un agujero alcanza el borde o se solapa con otro.</p>
      <h2>Descargas y licencia</h2>
      <ul><li><a href="/descargas/probeta-tolerancias-fdm.scad" download>Modelo paramétrico OpenSCAD</a></li><li><a href="/descargas/registro-tolerancias-fdm.csv" download>Registro vacío CSV</a></li><li><a href="/descargas/instrucciones-probeta-tolerancias.md" download>Instrucciones completas en Markdown</a></li></ul>
      <p>Estos tres recursos originales se publican bajo <a href="https://creativecommons.org/licenses/by/4.0/deed.es" target="_blank" rel="noreferrer">CC BY 4.0</a>. Atribución: «Probeta paramétrica de tolerancias FDM, CAD Lab 3D, 2026». Indica los cambios si adaptas el modelo.</p>
      <h2>Continúa con tu pieza</h2><p>Amplía la práctica con la <Link href="/blog/pruebas-tolerancia-fdm">guía de pruebas de tolerancia</Link>, revisa los <Link href="/blog/disenar-encajes-clips-impresion-3d">encajes y clips para impresión 3D</Link> o usa el <Link href="/checklist-impresion-3d">checklist antes de imprimir</Link>.</p>
    </div>
  </article>;
}
