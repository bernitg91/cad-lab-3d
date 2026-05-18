"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

type Material = "PLA" | "PETG" | "TPU" | "ABS" | "ASA" | "Nylon" | "Otro";

type State = {
  material: Material;
  density: number;
  volume: number;
  infill: number;
  shellRatio: number;
  supports: number;
  quantity: number;
};

const densities: Record<Material, number> = {
  PLA: 1.24,
  PETG: 1.27,
  TPU: 1.21,
  ABS: 1.04,
  ASA: 1.07,
  Nylon: 1.14,
  Otro: 1.2
};

const defaultState: State = {
  material: "PLA",
  density: densities.PLA,
  volume: 80,
  infill: 20,
  shellRatio: 35,
  supports: 10,
  quantity: 1
};

function clamp(value: number, min = 0, max = Number.POSITIVE_INFINITY) {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function formatGrams(value: number) {
  return `${clamp(value).toLocaleString("es-ES", { maximumFractionDigits: 1 })} g`;
}

function NumberInput({
  label,
  name,
  value,
  unit,
  help,
  min = 0,
  max,
  step = "0.1",
  onChange
}: {
  label: string;
  name: keyof State;
  value: number;
  unit?: string;
  help?: string;
  min?: number;
  max?: number;
  step?: string;
  onChange: (name: keyof State, value: number, min?: number, max?: number) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-slate-800">{label}</span>
      <div className="flex overflow-hidden rounded-md border border-slate-300 bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
        <input
          className="min-w-0 flex-1 px-3 py-2.5 text-base outline-none"
          inputMode="decimal"
          min={min}
          max={max}
          name={name}
          step={step}
          type="number"
          value={Number.isFinite(value) ? String(value) : "0"}
          onChange={(event) => onChange(name, event.currentTarget.valueAsNumber, min, max)}
        />
        {unit ? <span className="flex items-center border-l border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-500">{unit}</span> : null}
      </div>
      {help ? <span className="text-xs leading-5 text-slate-500">{help}</span> : null}
    </label>
  );
}

export function WeightEstimator() {
  const [state, setState] = useState<State>(defaultState);
  const [message, setMessage] = useState("");

  const result = useMemo(() => {
    const volume = clamp(state.volume);
    const density = clamp(state.density);
    const shellRatio = clamp(state.shellRatio, 0, 100) / 100;
    const infill = clamp(state.infill, 0, 100) / 100;
    const supports = 1 + clamp(state.supports, 0) / 100;
    const solidWeight = volume * density;
    const printedWeight = solidWeight * (shellRatio + (1 - shellRatio) * infill) * supports;
    const totalWeight = printedWeight * clamp(state.quantity, 1);

    return {
      solidWeight,
      printedWeight,
      totalWeight,
      filamentMeters: printedWeight / 2.98
    };
  }, [state]);

  function updateNumber(name: keyof State, value: number, min = 0, max = Number.POSITIVE_INFINITY) {
    setState((current) => ({ ...current, [name]: clamp(value, min, max) }));
  }

  function updateMaterial(event: ChangeEvent<HTMLSelectElement>) {
    const material = event.currentTarget.value as Material;
    setState((current) => ({ ...current, material, density: densities[material] }));
  }

  async function copyResult() {
    const text = [
      "Estimación de peso de pieza 3D",
      `Material: ${state.material}`,
      `Volumen CAD: ${state.volume} cm3`,
      `Relleno: ${state.infill} %`,
      `Paredes/tapas estimadas: ${state.shellRatio} %`,
      `Peso estimado por pieza: ${formatGrams(result.printedWeight)}`,
      `Peso total: ${formatGrams(result.totalWeight)}`
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setMessage("Estimación copiada al portapapeles.");
    } catch {
      setMessage("No se pudo copiar automáticamente.");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6" onSubmit={(event) => event.preventDefault()}>
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Estimación rápida</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Datos de la pieza</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Introduce el volumen que te da el CAD o el laminador y ajusta relleno, paredes, soportes y cantidad.</p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-black text-slate-800">Material</span>
              <select className="h-11 rounded-md border border-slate-300 bg-white px-3 text-base outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" value={state.material} onChange={updateMaterial}>
                {Object.keys(densities).map((material) => (
                  <option key={material} value={material}>{material}</option>
                ))}
              </select>
              <span className="text-xs leading-5 text-slate-500">Carga una densidad orientativa editable.</span>
            </label>
            <NumberInput label="Densidad del material" name="density" unit="g/cm3" value={state.density} onChange={updateNumber} />
            <NumberInput label="Volumen de la pieza" name="volume" unit="cm3" value={state.volume} help="Puedes obtenerlo desde el CAD o desde algunas herramientas de análisis de malla." onChange={updateNumber} />
            <NumberInput label="Relleno" name="infill" unit="%" value={state.infill} min={0} max={100} step="1" onChange={updateNumber} />
            <NumberInput label="Paredes, tapas y suelos" name="shellRatio" unit="%" value={state.shellRatio} min={0} max={100} step="1" help="Porcentaje aproximado del volumen que se imprimirá como contorno sólido." onChange={updateNumber} />
            <NumberInput label="Soportes y margen" name="supports" unit="%" value={state.supports} step="1" help="Añade soportes, brim, purgas o margen de seguridad." onChange={updateNumber} />
            <NumberInput label="Cantidad de piezas" name="quantity" value={state.quantity} min={1} step="1" onChange={updateNumber} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-blue-800" type="button" onClick={() => setState(defaultState)}>
              Restablecer valores
            </button>
            <button className="rounded-md border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" type="button" onClick={copyResult}>
              Copiar estimación
            </button>
          </div>
          {message ? <p className="mt-4 rounded-md bg-teal-50 p-3 text-sm font-semibold text-teal-800">{message}</p> : null}
        </form>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Resultado</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Peso estimado</h2>
          <div className="mt-5 rounded-lg bg-slate-950 p-5 text-white">
            <p className="text-sm font-semibold text-slate-300">Peso por pieza</p>
            <p className="mt-1 text-4xl font-black">{formatGrams(result.printedWeight)}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">Para {clamp(state.quantity, 1)} piezas, el peso total estimado es {formatGrams(result.totalWeight)}.</p>
          </div>
          <div className="mt-5 grid gap-3">
            <Metric label="Peso si fuera maciza" value={formatGrams(result.solidWeight)} />
            <Metric label="Filamento aproximado por pieza" value={`${result.filamentMeters.toLocaleString("es-ES", { maximumFractionDigits: 1 })} m`} />
            <Metric label="Densidad usada" value={`${state.density} g/cm3`} />
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">Estimación orientativa. El peso real depende del laminador, número de paredes, ancho de línea, purgas, soportes y material real.</p>
        </aside>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-base font-black text-slate-950">{value}</p>
    </div>
  );
}
