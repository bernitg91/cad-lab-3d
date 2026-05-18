"use client";

import { useMemo, useState } from "react";

type Option = "baja" | "media" | "alta";
type Material = {
  name: string;
  score: number;
  summary: string;
  notes: string[];
};

const baseMaterials = [
  "PLA",
  "PETG",
  "TPU",
  "ABS",
  "ASA",
  "Nylon"
] as const;

export function MaterialSelector() {
  const [heat, setHeat] = useState<Option>("media");
  const [outdoor, setOutdoor] = useState(false);
  const [flexible, setFlexible] = useState(false);
  const [impact, setImpact] = useState<Option>("media");
  const [easyPrint, setEasyPrint] = useState(true);
  const [detail, setDetail] = useState(false);

  const results = useMemo(() => {
    const materials: Material[] = baseMaterials.map((name) => ({ name, score: 0, summary: "", notes: [] }));

    function add(name: string, points: number, note: string) {
      const material = materials.find((item) => item.name === name);
      if (!material) return;
      material.score += points;
      material.notes.push(note);
    }

    if (flexible) {
      add("TPU", 7, "Es el candidato natural para piezas flexibles.");
      add("PLA", -4, "No es adecuado si necesitas flexión repetida.");
      add("PETG", -2, "Puede flexar algo, pero no sustituye a TPU.");
    }

    if (outdoor) {
      add("ASA", 6, "Buena opción para exterior y exposición UV.");
      add("PETG", 3, "Puede funcionar en exterior moderado.");
      add("PLA", -3, "No suele ser la mejor opción para exterior prolongado.");
    }

    if (heat === "alta") {
      add("ABS", 4, "Mejor resistencia térmica que PLA.");
      add("ASA", 5, "Buen equilibrio para temperatura y exterior.");
      add("Nylon", 4, "Interesante para piezas técnicas.");
      add("PLA", -4, "Puede deformarse con calor moderado.");
    } else if (heat === "media") {
      add("PETG", 3, "Suele aguantar mejor que PLA en piezas funcionales.");
      add("ASA", 2, "Opción técnica si aceptas más dificultad.");
    } else {
      add("PLA", 3, "Suficiente para prototipos y piezas interiores sin calor.");
    }

    if (impact === "alta") {
      add("Nylon", 5, "Buena opción para resistencia y tenacidad.");
      add("PETG", 3, "Más tenaz que PLA en muchos usos.");
      add("TPU", flexible ? 3 : 1, "Absorbe golpes si la pieza puede ser flexible.");
      add("PLA", -2, "Puede ser rígido y quebradizo ante impacto.");
    } else if (impact === "media") {
      add("PETG", 3, "Buen punto medio para piezas funcionales.");
      add("PLA", 1, "Puede servir si la carga es baja.");
    }

    if (easyPrint) {
      add("PLA", 5, "Muy fácil de imprimir y ajustar.");
      add("PETG", 2, "Imprimible con algo más de cuidado.");
      add("ABS", -3, "Suele exigir cerramiento y control de warping.");
      add("Nylon", -3, "Más exigente por humedad y ajustes.");
    }

    if (detail) {
      add("PLA", 3, "Buen acabado visual y detalle en prototipos.");
      add("PETG", 1, "Puede dar buen resultado, aunque con más hilos.");
      add("TPU", -2, "No es ideal si priorizas detalle rígido.");
    }

    for (const material of materials) {
      material.summary = material.notes.slice(0, 2).join(" ");
    }

    return materials.sort((a, b) => b.score - a.score);
  }, [detail, easyPrint, flexible, heat, impact, outdoor]);

  const winner = results[0];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6" onSubmit={(event) => event.preventDefault()}>
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Selector FDM</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Define las necesidades de la pieza</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Select label="Temperatura de uso" value={heat} onChange={setHeat} />
            <Select label="Impacto o esfuerzo" value={impact} onChange={setImpact} />
            <Toggle label="Uso exterior o UV" checked={outdoor} onChange={setOutdoor} />
            <Toggle label="Necesita flexibilidad" checked={flexible} onChange={setFlexible} />
            <Toggle label="Priorizar impresión fácil" checked={easyPrint} onChange={setEasyPrint} />
            <Toggle label="Priorizar detalle visual" checked={detail} onChange={setDetail} />
          </div>
        </form>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Recomendación</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">{winner.name}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{winner.summary || "Ajusta los criterios para obtener una recomendación más concreta."}</p>
          <div className="mt-5 grid gap-3">
            {results.slice(0, 4).map((material) => (
              <div key={material.name} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black text-slate-950">{material.name}</p>
                  <p className="text-sm font-bold text-teal-700">{material.score} pts</p>
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-500">{material.notes[0] || "Opción posible según el contexto."}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">Resultado orientativo. Valida siempre requisitos reales, temperatura, humedad, cargas, seguridad y compatibilidad de tu impresora.</p>
        </aside>
      </div>
    </section>
  );
}

function Select({ label, value, onChange }: { label: string; value: Option; onChange: (value: Option) => void }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-slate-800">{label}</span>
      <select className="h-11 rounded-md border border-slate-300 bg-white px-3 text-base outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" value={value} onChange={(event) => onChange(event.currentTarget.value as Option)}>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">
      <input className="h-4 w-4 accent-blue-700" type="checkbox" checked={checked} onChange={(event) => onChange(event.currentTarget.checked)} />
      {label}
    </label>
  );
}
