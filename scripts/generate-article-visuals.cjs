const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const articlesDirectory = path.join(projectRoot, "content", "articles");
const outputDirectory = path.join(projectRoot, "public", "images", "articles");
const visualCatalogPath = path.join(projectRoot, "lib", "article-visual-content.ts");

const paletteSets = [
  { ink: "#0f172a", blue: "#1d4ed8", teal: "#0f766e", signal: "#f59e0b", mist: "#e7eff7", paper: "#f8fafc" },
  { ink: "#172033", blue: "#2557a7", teal: "#087e8b", signal: "#ff9f1c", mist: "#e9f1f5", paper: "#fbfdff" },
  { ink: "#111827", blue: "#315bb5", teal: "#167d73", signal: "#e98a15", mist: "#e8eef8", paper: "#f9fbfe" },
  { ink: "#132238", blue: "#2459c4", teal: "#0b7a75", signal: "#f4a261", mist: "#e6f0f2", paper: "#f8fbfc" }
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function normalizeText(value) {
  return value.replace(/\*\*|`|\[|\]|\([^)]*\)/g, "").replace(/\s+/g, " ").trim();
}

function parseArticle(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error("Article is missing frontmatter");

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = value;
  }

  const headings = Array.from(match[2].matchAll(/^##\s+(.+)$/gm), (heading) => normalizeText(heading[1]));
  return { meta, headings };
}

function hashNumber(value) {
  return Number.parseInt(crypto.createHash("sha256").update(value).digest("hex").slice(0, 8), 16);
}

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function wrapText(text, maxCharacters, maxLines = 3) {
  const words = normalizeText(text).split(" ");
  const lines = [];
  let wordIndex = 0;

  while (wordIndex < words.length && lines.length < maxLines) {
    if (lines.length === maxLines - 1) {
      const remainder = words.slice(wordIndex).join(" ");
      lines.push(remainder.length > maxCharacters ? `${remainder.slice(0, maxCharacters - 1).trim()}…` : remainder);
      break;
    }

    let line = words[wordIndex];
    wordIndex += 1;
    while (wordIndex < words.length && `${line} ${words[wordIndex]}`.length <= maxCharacters) {
      line += ` ${words[wordIndex]}`;
      wordIndex += 1;
    }
    lines.push(line.length > maxCharacters ? `${line.slice(0, maxCharacters - 1).trim()}…` : line);
  }

  return lines.slice(0, maxLines);
}

function loadVisualCatalog() {
  const source = fs.readFileSync(visualCatalogPath, "utf8");
  const entryPattern = /"([^"]+)":\s*visual\(\s*"([^"]+)",\s*\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\],\s*\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\]\s*\)/g;
  const catalog = new Map();
  for (const match of source.matchAll(entryPattern)) {
    catalog.set(match[1], {
      heroLabel: match[2],
      processSteps: [match[3], match[4], match[5]],
      verificationPoints: [match[6], match[7], match[8]]
    });
  }
  return catalog;
}

function textBlock(lines, x, y, fontSize, lineHeight, options = {}) {
  const { fill = "#0f172a", weight = 700, anchor = "start", family = "Arial, sans-serif", letterSpacing = 0 } = options;
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${fontSize}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="${letterSpacing}">${lines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join("")}</text>`;
}

function classifyVisual(slug, title, category) {
  const source = `${slug} ${title} ${category}`.toLowerCase();
  if (/fem|simulaci/.test(source)) return "fem";
  if (/material|pla|petg|abs|nylon|filamento/.test(source)) return "materials";
  if (/coste|peso|optimizar/.test(source)) return "metrics";
  if (/encaje|clip|desmont|repar|carcasa|revisi.n/.test(source)) return "assembly";
  if (/memoria|informe|portfolio|ficha|document|presentar|render|proyecto universitario/.test(source)) return "documentation";
  if (/step|stl|cad|creo|solidworks|modelado|plano|geometr/.test(source)) return "cad";
  return "fdm";
}

function svgDefinitions(palette, seed) {
  const gridSize = 28 + (seed % 4) * 4;
  return `<defs>
    <pattern id="grid" width="${gridSize}" height="${gridSize}" patternUnits="userSpaceOnUse">
      <path d="M ${gridSize} 0 L 0 0 0 ${gridSize}" fill="none" stroke="${palette.blue}" stroke-opacity="0.09" stroke-width="1"/>
    </pattern>
    <linearGradient id="panel" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${palette.paper}"/><stop offset="1" stop-color="${palette.mist}"/></linearGradient>
    <linearGradient id="stress" x1="0" x2="1"><stop offset="0" stop-color="${palette.teal}"/><stop offset="0.55" stop-color="${palette.signal}"/><stop offset="1" stop-color="#dc2626"/></linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="${palette.ink}" flood-opacity="0.13"/></filter>
  </defs>`;
}

function background(palette, plate, slug) {
  return `<rect width="1600" height="900" fill="${palette.paper}"/>
    <rect width="1600" height="900" fill="url(#grid)"/>
    <path d="M0 88H1600" stroke="${palette.ink}" stroke-opacity="0.14"/>
    <path d="M82 0V900M1518 0V900" stroke="${palette.ink}" stroke-opacity="0.1"/>
    <text x="82" y="55" fill="${palette.ink}" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="3">CADLAB3D · ${escapeXml(plate)}</text>
    <text x="1518" y="55" fill="${palette.ink}" fill-opacity="0.62" font-family="Arial, sans-serif" font-size="14" font-weight="700" text-anchor="end" letter-spacing="1.8">${escapeXml(slug.slice(0, 28).toUpperCase())}</text>`;
}

function dimensionLine(x1, y1, x2, y2, label, palette) {
  return `<g stroke="${palette.ink}" stroke-width="2" fill="none" opacity="0.75">
    <path d="M${x1} ${y1}H${x2}"/>
    <path d="M${x1} ${y1 - 10}V${y1 + 10}M${x2} ${y2 - 10}V${y2 + 10}"/>
    <path d="M${x1 + 3} ${y1}l10 -6v12zM${x2 - 3} ${y2}l-10 -6v12z" fill="${palette.ink}" stroke="none"/>
  </g><text x="${(x1 + x2) / 2}" y="${y1 - 12}" fill="${palette.ink}" font-family="Arial, sans-serif" font-size="15" font-weight="700" text-anchor="middle">${escapeXml(label)}</text>`;
}

function drawCad(seed, palette) {
  const random = seededRandom(seed);
  const cutout = 70 + Math.round(random() * 65);
  const rise = 120 + Math.round(random() * 65);
  return `<g transform="translate(120 205)" filter="url(#shadow)">
    <path d="M55 280L285 135 560 250 325 404Z" fill="${palette.blue}" fill-opacity="0.16" stroke="${palette.blue}" stroke-width="5"/>
    <path d="M55 280V${280 - rise}L285 ${135 - rise}V135M285 ${135 - rise}L560 ${250 - rise}V250M55 ${280 - rise}L325 ${404 - rise} 560 ${250 - rise}" fill="none" stroke="${palette.ink}" stroke-width="5"/>
    <path d="M55 ${280 - rise}L285 ${135 - rise} 560 ${250 - rise} 325 ${404 - rise}Z" fill="url(#panel)" stroke="${palette.ink}" stroke-width="5"/>
    <ellipse cx="305" cy="${255 - rise}" rx="${cutout}" ry="${Math.round(cutout * 0.48)}" fill="${palette.paper}" stroke="${palette.teal}" stroke-width="5"/>
    <path d="M${305 - cutout} ${255 - rise}v68M${305 + cutout} ${255 - rise}v68" stroke="${palette.teal}" stroke-width="4" stroke-dasharray="9 9"/>
    <g stroke="${palette.blue}" stroke-width="2" opacity="0.55"><path d="M90 230L360 345M165 185L435 300M250 145L520 260"/><path d="M150 220L385 75M230 255L465 110M310 290L545 145"/></g>
  </g>${dimensionLine(185, 704, 630, 704, `${220 + (seed % 180)} mm`, palette)}`;
}

function drawFdm(seed, palette) {
  const random = seededRandom(seed);
  const partWidth = 230 + Math.round(random() * 120);
  const layerCount = 8 + (seed % 5);
  const layers = Array.from({ length: layerCount }, (_, index) => {
    const inset = index * (12 + (seed % 4));
    return `<path d="M${300 - partWidth / 2 + inset} ${570 - index * 18}H${300 + partWidth / 2 - inset}" stroke="${index % 3 === 0 ? palette.signal : palette.teal}" stroke-width="12" stroke-linecap="round"/>`;
  }).join("");
  return `<g transform="translate(80 125)">
    <path d="M80 70H600V600H80Z" fill="none" stroke="${palette.ink}" stroke-width="14"/>
    <path d="M135 150H545M135 520H545" stroke="${palette.blue}" stroke-width="8"/>
    <path d="M340 150V280" stroke="${palette.ink}" stroke-width="10"/>
    <path d="M305 275H375L355 340H325Z" fill="${palette.signal}" stroke="${palette.ink}" stroke-width="5"/>
    <path d="M340 340V385" stroke="${palette.signal}" stroke-width="7" stroke-dasharray="9 8"/>
    <rect x="115" y="515" width="450" height="32" rx="4" fill="${palette.ink}"/>
    ${layers}
    <path d="M585 155V515" stroke="${palette.blue}" stroke-width="3" stroke-dasharray="12 10"/>
    <circle cx="585" cy="${210 + Math.round(random() * 220)}" r="14" fill="${palette.signal}"/>
  </g>${dimensionLine(185, 760, 625, 760, `${0.16 + (seed % 4) * 0.04} mm / capa`, palette)}`;
}

function drawFem(seed, palette) {
  const random = seededRandom(seed);
  const points = Array.from({ length: 7 }, (_, index) => ({ x: 145 + index * 78, y: 380 + Math.sin(index * 0.9 + random()) * 90 }));
  const mesh = points.slice(0, -1).map((point, index) => {
    const next = points[index + 1];
    return `<path d="M${point.x} ${point.y}L${next.x} ${next.y}L${next.x - 35} ${next.y + 135}Z" fill="${index > 3 ? palette.signal : palette.teal}" fill-opacity="${0.13 + index * 0.06}" stroke="${palette.blue}" stroke-width="2"/><path d="M${point.x} ${point.y}L${point.x + 34} ${point.y + 132}L${next.x - 35} ${next.y + 135}" fill="none" stroke="${palette.blue}" stroke-width="2"/>`;
  }).join("");
  const arrows = [0, 1, 2].map((index) => `<path d="M${250 + index * 145} 195v105" stroke="${palette.signal}" stroke-width="8"/><path d="M${230 + index * 145} 285l20 28 20-28" fill="${palette.signal}"/>`).join("");
  return `<g transform="translate(70 115)">
    ${arrows}
    ${mesh}
    <rect x="120" y="610" width="550" height="24" fill="url(#stress)"/>
    <text x="120" y="665" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="${palette.ink}">BAJA</text>
    <text x="670" y="665" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="${palette.ink}" text-anchor="end">ALTA</text>
    <g stroke="${palette.ink}" stroke-width="6"><path d="M140 535v80M625 535v80"/><path d="M110 615h60M595 615h60"/></g>
  </g>`;
}

function drawMaterials(seed, palette) {
  const random = seededRandom(seed);
  const labels = ["PLA", "PETG", "ABS", "PA"];
  const spools = labels.map((label, index) => {
    const x = 155 + index * 145;
    const radius = 68 + Math.round(random() * 14);
    const color = [palette.teal, palette.blue, palette.signal, "#7c3aed"][index];
    return `<g><circle cx="${x}" cy="325" r="${radius}" fill="${color}" fill-opacity="0.22" stroke="${color}" stroke-width="8"/><circle cx="${x}" cy="325" r="25" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="4"/><text x="${x}" y="430" fill="${palette.ink}" font-family="Arial, sans-serif" font-size="23" font-weight="800" text-anchor="middle">${label}</text><rect x="${x - 45}" y="490" width="90" height="170" rx="42" fill="${color}" fill-opacity="0.16" stroke="${color}" stroke-width="5"/><path d="M${x} 510v130" stroke="${color}" stroke-width="8" stroke-linecap="round"/></g>`;
  }).join("");
  return `<g transform="translate(60 95)">${spools}<path d="M90 720H700" stroke="${palette.ink}" stroke-width="3"/>${dimensionLine(150, 745, 650, 745, "comparativa de probetas", palette)}</g>`;
}

function drawDocumentation(seed, palette) {
  const shift = seed % 45;
  return `<g transform="translate(105 145)" filter="url(#shadow)">
    <g transform="rotate(-4 310 280)"><rect x="65" y="55" width="420" height="555" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="5"/><rect x="105" y="105" width="255" height="28" fill="${palette.blue}" fill-opacity="0.18"/><rect x="105" y="155" width="335" height="10" fill="${palette.ink}" fill-opacity="0.18"/><rect x="105" y="185" width="280" height="10" fill="${palette.ink}" fill-opacity="0.14"/><path d="M125 315L230 245 360 310 245 385Z" fill="${palette.teal}" fill-opacity="0.14" stroke="${palette.teal}" stroke-width="4"/><path d="M125 315V${255 - shift / 3}L230 ${185 - shift / 3}V245M230 ${185 - shift / 3}L360 ${250 - shift / 3}V310" fill="none" stroke="${palette.ink}" stroke-width="3"/><rect x="105" y="445" width="330" height="90" fill="url(#panel)" stroke="${palette.blue}" stroke-width="3"/></g>
    <g transform="translate(390 205) rotate(5 150 190)"><rect x="0" y="0" width="300" height="390" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="5"/><circle cx="150" cy="145" r="78" fill="${palette.signal}" fill-opacity="0.16" stroke="${palette.signal}" stroke-width="5"/><path d="M88 145h124M150 83v124" stroke="${palette.signal}" stroke-width="4"/><rect x="45" y="270" width="210" height="14" fill="${palette.ink}" fill-opacity="0.2"/><rect x="45" y="305" width="165" height="14" fill="${palette.ink}" fill-opacity="0.14"/></g>
  </g>`;
}

function drawMetrics(seed, palette) {
  const random = seededRandom(seed);
  const bars = Array.from({ length: 5 }, (_, index) => {
    const height = 80 + Math.round(random() * 235);
    return `<rect x="${145 + index * 92}" y="${590 - height}" width="58" height="${height}" fill="${index === 4 ? palette.signal : palette.blue}" fill-opacity="${0.35 + index * 0.1}"/>`;
  }).join("");
  return `<g transform="translate(80 100)">
    <path d="M95 590H690M95 590V145" stroke="${palette.ink}" stroke-width="6"/>
    ${bars}
    <path d="M145 450C250 420 330 300 420 340S560 245 650 190" fill="none" stroke="${palette.teal}" stroke-width="9"/>
    <circle cx="650" cy="190" r="16" fill="${palette.signal}"/>
    <g transform="translate(445 95)"><path d="M0 95L105 30 230 85 120 158Z" fill="${palette.teal}" fill-opacity="0.18" stroke="${palette.teal}" stroke-width="4"/><path d="M0 95v65l120 64 110-66V85M120 158v66" fill="none" stroke="${palette.ink}" stroke-width="4"/></g>
    <text x="108" y="640" fill="${palette.ink}" font-family="Arial, sans-serif" font-size="17" font-weight="700">VARIABLE</text><text x="690" y="640" fill="${palette.ink}" font-family="Arial, sans-serif" font-size="17" font-weight="700" text-anchor="end">RESULTADO</text>
  </g>`;
}

function drawAssembly(seed, palette) {
  const offset = 48 + (seed % 55);
  return `<g transform="translate(90 180)">
    <path d="M80 250L260 145 440 235 255 350Z" fill="${palette.blue}" fill-opacity="0.12" stroke="${palette.blue}" stroke-width="5"/>
    <path d="M80 250v110l175 95 185-110V235M255 350v105" fill="none" stroke="${palette.ink}" stroke-width="5"/>
    <g transform="translate(${offset} -${offset})"><path d="M80 250L260 145 440 235 255 350Z" fill="${palette.teal}" fill-opacity="0.16" stroke="${palette.teal}" stroke-width="5"/><path d="M80 250v70M440 235v70" stroke="${palette.teal}" stroke-width="5"/></g>
    <g stroke="${palette.signal}" stroke-width="7" fill="${palette.signal}"><path d="M120 155L205 230"/><path d="M190 205l22 31-35-13z"/><path d="M465 150L385 220"/><path d="M402 194l-24 31 36-11z"/></g>
    <g transform="translate(500 120)"><circle cx="95" cy="95" r="82" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="5"/><circle cx="95" cy="95" r="29" fill="${palette.signal}" fill-opacity="0.28" stroke="${palette.signal}" stroke-width="5"/><path d="M95 12v40M95 138v40M12 95h40M138 95h40" stroke="${palette.ink}" stroke-width="5"/></g>
  </g>`;
}

function drawMotif(kind, seed, palette) {
  if (kind === "cad") return drawCad(seed, palette);
  if (kind === "fem") return drawFem(seed, palette);
  if (kind === "materials") return drawMaterials(seed, palette);
  if (kind === "documentation") return drawDocumentation(seed, palette);
  if (kind === "metrics") return drawMetrics(seed, palette);
  if (kind === "assembly") return drawAssembly(seed, palette);
  return drawFdm(seed, palette);
}

function iconFor(kind, index, palette) {
  const rotation = index * 12;
  const base = {
    cad: `<path d="M20 74L75 40l65 28-57 37zM20 74v38l63 33 57-35V68M83 105v40" fill="none" stroke="${palette.blue}" stroke-width="6"/>`,
    fdm: `<path d="M28 25h108v120H28zM45 120h75M82 25v45M64 70h36l-9 27H73z" fill="none" stroke="${palette.teal}" stroke-width="6"/><path d="M58 118h50" stroke="${palette.signal}" stroke-width="12"/>`,
    fem: `<path d="M20 125L52 44l42 54 42-70 18 97z" fill="${palette.signal}" fill-opacity="0.16" stroke="${palette.blue}" stroke-width="5"/><path d="M20 125L94 98M52 44l42 54 60 27M94 98l42-70" stroke="${palette.teal}" stroke-width="3"/>`,
    materials: `<circle cx="82" cy="70" r="48" fill="${palette.teal}" fill-opacity="0.18" stroke="${palette.teal}" stroke-width="7"/><circle cx="82" cy="70" r="16" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="4"/><rect x="58" y="118" width="48" height="35" rx="16" fill="${palette.signal}" fill-opacity="0.3" stroke="${palette.signal}" stroke-width="4"/>`,
    documentation: `<path d="M38 20h82l24 24v112H38zM120 20v28h24M58 75h66M58 98h66M58 121h42" fill="none" stroke="${palette.blue}" stroke-width="6"/>`,
    metrics: `<path d="M26 140V35M26 140h120" fill="none" stroke="${palette.ink}" stroke-width="6"/><rect x="48" y="95" width="20" height="45" fill="${palette.blue}"/><rect x="82" y="65" width="20" height="75" fill="${palette.teal}"/><rect x="116" y="38" width="20" height="102" fill="${palette.signal}"/>`,
    assembly: `<path d="M22 86l45-27 46 23-47 29zM22 86v30l44 24 47-28V82M48 39l38-22 42 21-42 25z" fill="none" stroke="${palette.teal}" stroke-width="6"/><path d="M52 54l18 16M108 51L91 66" stroke="${palette.signal}" stroke-width="6"/>`
  }[kind] || "";
  return `<g transform="rotate(${rotation} 82 82)">${base}</g>`;
}

function makeHero(article, kind, seed, palette) {
  const heroLines = wrapText(article.visual.heroLabel, 18, 3);
  const titleLines = wrapText(article.meta.title, 43, 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
    <title>${escapeXml(article.meta.title)}</title><desc>Ilustración técnica original creada para CADLAB3D.</desc>
    ${svgDefinitions(palette, seed)}${background(palette, "LÁMINA 01 · VISTA GENERAL", article.meta.slug)}
    ${drawMotif(kind, seed, palette)}
    <rect x="875" y="155" width="625" height="590" fill="url(#panel)" stroke="${palette.ink}" stroke-width="3" filter="url(#shadow)"/>
    <rect x="920" y="205" width="190" height="34" fill="${palette.teal}"/>
    <text x="1015" y="228" fill="white" font-family="Arial, sans-serif" font-size="15" font-weight="800" text-anchor="middle" letter-spacing="2">${escapeXml(article.meta.category.toUpperCase())}</text>
    ${textBlock(heroLines, 920, 322, 56, 66, { fill: palette.ink, weight: 800 })}
    ${textBlock(titleLines, 920, 525, 22, 29, { fill: palette.ink, weight: 700 })}
    <path d="M920 620H1438" stroke="${palette.blue}" stroke-width="5"/>
    <text x="920" y="666" fill="${palette.blue}" font-family="Arial, sans-serif" font-size="18" font-weight="800" letter-spacing="2">DECISIÓN · PROCESO · EVIDENCIA</text>
    <circle cx="1450" cy="690" r="24" fill="${palette.signal}"/><path d="M1438 690l9 9 18-21" fill="none" stroke="${palette.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function makeProcess(article, kind, seed, palette) {
  const steps = article.visual.processSteps;
  const cards = steps.map((step, index) => {
    const x = 90 + index * 505;
    const lines = wrapText(step, 24, 3);
    return `<g transform="translate(${x} 215)">
      <rect width="430" height="480" fill="url(#panel)" stroke="${index === 1 ? palette.teal : palette.ink}" stroke-width="${index === 1 ? 5 : 3}" filter="url(#shadow)"/>
      <rect width="430" height="58" fill="${index === 1 ? palette.teal : palette.ink}"/>
      <text x="30" y="38" fill="white" font-family="Arial, sans-serif" font-size="17" font-weight="800" letter-spacing="2">PASO 0${index + 1}</text>
      <g transform="translate(128 95)">${iconFor(kind, index, palette)}</g>
      ${textBlock(lines, 38, 360, 30, 38, { fill: palette.ink, weight: 800 })}
      <path d="M38 462H392" stroke="${palette.blue}" stroke-opacity="0.35" stroke-width="3"/>
    </g>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
    <title>Proceso visual de ${escapeXml(article.meta.title)}</title><desc>Tres pasos técnicos exclusivos para este artículo de CADLAB3D.</desc>
    ${svgDefinitions(palette, seed + 1)}${background(palette, "LÁMINA 02 · SECUENCIA DE TRABAJO", article.meta.slug)}
    ${cards}
    <path d="M520 455h55M1080 455h55" stroke="${palette.signal}" stroke-width="8"/><path d="M560 438l24 17-24 17M1120 438l24 17-24 17" fill="none" stroke="${palette.signal}" stroke-width="8"/>
    <text x="800" y="820" fill="${palette.ink}" font-family="Arial, sans-serif" font-size="19" font-weight="700" text-anchor="middle" letter-spacing="1.5">UN CAMBIO CADA VEZ · REGISTRO DE DATOS · COMPARACIÓN</text>
  </svg>`;
}

function makeVerification(article, kind, seed, palette) {
  const selected = article.visual.verificationPoints;
  const calloutPositions = [
    { boxX: 900, boxY: 175, pointX: 620, pointY: 300 },
    { boxX: 1015, boxY: 390, pointX: 645, pointY: 465 },
    { boxX: 875, boxY: 610, pointX: 560, pointY: 620 }
  ];
  const callouts = selected.map((label, index) => {
    const position = calloutPositions[index];
    const lines = wrapText(label, 30, 2);
    return `<g>
      <circle cx="${position.pointX}" cy="${position.pointY}" r="16" fill="${palette.signal}" stroke="${palette.paper}" stroke-width="5"/>
      <path d="M${position.pointX + 18} ${position.pointY}H${position.boxX - 28}V${position.boxY + 58}" fill="none" stroke="${palette.signal}" stroke-width="4"/>
      <rect x="${position.boxX}" y="${position.boxY}" width="500" height="128" fill="${palette.paper}" stroke="${index === 1 ? palette.teal : palette.ink}" stroke-width="3" filter="url(#shadow)"/>
      <rect x="${position.boxX}" y="${position.boxY}" width="58" height="128" fill="${index === 1 ? palette.teal : palette.ink}"/>
      <text x="${position.boxX + 29}" y="${position.boxY + 74}" fill="white" font-family="Arial, sans-serif" font-size="23" font-weight="800" text-anchor="middle">0${index + 1}</text>
      ${textBlock(lines, position.boxX + 88, position.boxY + 54, 25, 34, { fill: palette.ink, weight: 800 })}
    </g>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
    <title>Comprobaciones de ${escapeXml(article.meta.title)}</title><desc>Lámina técnica con puntos de control específicos para este artículo.</desc>
    ${svgDefinitions(palette, seed + 2)}${background(palette, "LÁMINA 03 · PUNTOS DE COMPROBACIÓN", article.meta.slug)}
    <g transform="translate(35 75) scale(.92)">${drawMotif(kind, seed + 19, palette)}</g>
    ${callouts}
    <rect x="90" y="795" width="1418" height="38" fill="${palette.ink}"/>
    <text x="800" y="821" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="800" text-anchor="middle" letter-spacing="2">COMPROBAR ANTES DE FABRICAR · DOCUMENTAR DESPUÉS DE MEDIR</text>
  </svg>`;
}

const files = fs.readdirSync(articlesDirectory).filter((file) => file.endsWith(".md")).sort();
const visualCatalog = loadVisualCatalog();
const writtenFiles = [];

for (const file of files) {
  const article = parseArticle(fs.readFileSync(path.join(articlesDirectory, file), "utf8"));
  if (!article.meta.slug || !article.meta.title || !article.meta.category) {
    throw new Error(`Missing visual metadata in ${file}`);
  }
  article.visual = visualCatalog.get(article.meta.slug);
  if (!article.visual) throw new Error(`Missing visual catalog entry for ${article.meta.slug}`);

  const seed = hashNumber(article.meta.slug);
  const palette = paletteSets[seed % paletteSets.length];
  const kind = classifyVisual(article.meta.slug, article.meta.title, article.meta.category);
  const articleOutput = path.join(outputDirectory, article.meta.slug);
  fs.mkdirSync(articleOutput, { recursive: true });

  const visuals = [
    ["01-vista-general.svg", makeHero(article, kind, seed, palette)],
    ["02-proceso.svg", makeProcess(article, kind, seed, palette)],
    ["03-comprobacion.svg", makeVerification(article, kind, seed, palette)]
  ];

  for (const [filename, svg] of visuals) {
    const outputPath = path.join(articleOutput, filename);
    fs.writeFileSync(outputPath, svg, "utf8");
    writtenFiles.push(outputPath);
  }
}

const hashes = writtenFiles.map((file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"));
const uniqueHashes = new Set(hashes);
if (writtenFiles.length !== files.length * 3 || uniqueHashes.size !== writtenFiles.length) {
  throw new Error(`Visual audit failed: ${writtenFiles.length} files, ${uniqueHashes.size} unique hashes`);
}
if (visualCatalog.size !== files.length) throw new Error(`Visual catalog has ${visualCatalog.size} entries for ${files.length} articles`);

console.log(`Generated ${writtenFiles.length} unique SVG visuals for ${files.length} articles.`);
