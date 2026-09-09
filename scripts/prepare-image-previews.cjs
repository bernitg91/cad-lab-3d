// Lossless framing: resize and compress existing licensed photos; keep the originals.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..");
const sources = [
  ["/images/impresion-3d-personalizada/soporte-relojes-fdm.jpg", "soporte-relojes", 900],
  ["/images/article-references/calibrar-impresora-3d-piezas-funcionales-v2.jpg", "primera-capa", 1600],
  ["/images/article-references/elegir-filamento-piezas-funcionales-v2.jpg", "bobina-filamento", 1000],
  ["/images/article-references/evitar-warping-impresion-3d-v3.png", "estudio-warping", 1400]
];
(async () => {
  fs.mkdirSync(path.join(root, "public/images/previews"), { recursive: true });
  const manifest = [];
  for (const [source, name, width] of sources) {
    const image = `/images/previews/${name}.webp`;
    const output = path.join(root, "public", image);
    const info = await sharp(path.join(root, "public", source)).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(output);
    manifest.push({ source, image, width: info.width, height: info.height, sha256: crypto.createHash("sha256").update(fs.readFileSync(output)).digest("hex"), changes: "Redimensionada y comprimida a WebP. Sin alterar el contenido. El encuadre de la miniatura puede adaptarse a su contenedor." });
    console.log(`${name}: ${info.width} × ${info.height}, ${Math.round(info.size / 1024)} KB`);
  }
  fs.writeFileSync(path.join(root, "content/image-previews.json"), JSON.stringify(manifest, null, 2) + "\n");
})().catch(error => { console.error(error); process.exitCode = 1; });
