"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

type MaterialOption = "PLA" | "PETG" | "TPU" | "ABS" | "ASA" | "Nylon" | "Otro";

type CalculatorState = {
  material: MaterialOption;
  materialPriceKg: number;
  weightGrams: number;
  printHours: number;
  printMinutes: number;
  powerWatts: number;
  electricityPrice: number;
  laborRate: number;
  preparationMinutes: number;
  postProcessingMinutes: number;
  machineRate: number;
  failureRate: number;
  profitMargin: number;
  vatRate: number;
  showVat: boolean;
  quantity: number;
};

type CalculationResult = {
  printHours: number;
  materialCost: number;
  electricityCost: number;
  machineCost: number;
  laborHours: number;
  laborCost: number;
  baseCost: number;
  failureCost: number;
  realCost: number;
  profit: number;
  priceWithoutVat: number;
  vatAmount: number;
  priceWithVat: number;
  unitPrice: number;
  totalPrice: number;
};

const materialPrices: Record<MaterialOption, number> = {
  PLA: 20,
  PETG: 24,
  TPU: 35,
  ABS: 25,
  ASA: 32,
  Nylon: 50,
  Otro: 25
};

const defaultState: CalculatorState = {
  material: "PLA",
  materialPriceKg: materialPrices.PLA,
  weightGrams: 80,
  printHours: 5,
  printMinutes: 0,
  powerWatts: 150,
  electricityPrice: 0.25,
  laborRate: 15,
  preparationMinutes: 10,
  postProcessingMinutes: 0,
  machineRate: 1,
  failureRate: 10,
  profitMargin: 30,
  vatRate: 21,
  showVat: true,
  quantity: 1
};

const euroFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function clampNumber(value: number, min = 0) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, value);
}

function formatEuro(value: number) {
  return euroFormatter.format(clampNumber(value));
}

function calculateCost(state: CalculatorState): CalculationResult {
  const printHours = clampNumber(state.printHours) + clampNumber(state.printMinutes) / 60;
  const materialCost = (clampNumber(state.weightGrams) / 1000) * clampNumber(state.materialPriceKg);
  const electricityCost = (clampNumber(state.powerWatts) / 1000) * printHours * clampNumber(state.electricityPrice);
  const machineCost = printHours * clampNumber(state.machineRate);
  const laborHours = (clampNumber(state.preparationMinutes) + clampNumber(state.postProcessingMinutes)) / 60;
  const laborCost = laborHours * clampNumber(state.laborRate);
  const baseCost = materialCost + electricityCost + machineCost + laborCost;
  const failureCost = baseCost * (clampNumber(state.failureRate) / 100);
  const realCost = baseCost + failureCost;
  const profit = realCost * (clampNumber(state.profitMargin) / 100);
  const priceWithoutVat = realCost + profit;
  const vatAmount = priceWithoutVat * (clampNumber(state.vatRate) / 100);
  const priceWithVat = priceWithoutVat + vatAmount;
  const unitPrice = state.showVat ? priceWithVat : priceWithoutVat;
  const totalPrice = unitPrice * clampNumber(state.quantity, 1);

  return {
    printHours,
    materialCost,
    electricityCost,
    machineCost,
    laborHours,
    laborCost,
    baseCost,
    failureCost,
    realCost,
    profit,
    priceWithoutVat,
    vatAmount,
    priceWithVat,
    unitPrice,
    totalPrice
  };
}

function toInputValue(value: number) {
  return Number.isFinite(value) ? String(value) : "0";
}

function NumberField({
  label,
  name,
  value,
  unit,
  help,
  min = 0,
  step = "0.01",
  onChange
}: {
  label: string;
  name: keyof CalculatorState;
  value: number;
  unit?: string;
  help?: string;
  min?: number;
  step?: string;
  onChange: (name: keyof CalculatorState, value: number, min?: number) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-slate-800">{label}</span>
      <div className="flex overflow-hidden rounded-md border border-slate-300 bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
        <input
          className="min-w-0 flex-1 px-3 py-2.5 text-base outline-none"
          inputMode="decimal"
          min={min}
          name={name}
          step={step}
          type="number"
          value={toInputValue(value)}
          onChange={(event) => onChange(name, event.currentTarget.valueAsNumber, min)}
        />
        {unit ? <span className="flex items-center border-l border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-500">{unit}</span> : null}
      </div>
      {help ? <span className="text-xs leading-5 text-slate-500">{help}</span> : null}
    </label>
  );
}

function buildBudgetText(state: CalculatorState, result: CalculationResult) {
  const lines = [
    "Presupuesto orientativo de impresión 3D",
    "",
    `Material: ${state.material}`,
    `Peso usado: ${clampNumber(state.weightGrams).toFixed(0)} g`,
    `Tiempo de impresión: ${clampNumber(state.printHours).toFixed(0)} h ${clampNumber(state.printMinutes).toFixed(0)} min`,
    `Precio unitario: ${formatEuro(result.unitPrice)}${state.showVat ? " con IVA" : " sin IVA"}`,
    `Cantidad: ${clampNumber(state.quantity, 1)}`,
    `Precio total: ${formatEuro(result.totalPrice)}`,
    "",
    "Desglose básico:",
    `Material: ${formatEuro(result.materialCost)}`,
    `Electricidad: ${formatEuro(result.electricityCost)}`,
    `Máquina/desgaste: ${formatEuro(result.machineCost)}`,
    `Mano de obra: ${formatEuro(result.laborCost)}`,
    `Riesgo de fallo: ${formatEuro(result.failureCost)}`,
    `Margen: ${formatEuro(result.profit)}`,
    ...(state.showVat ? [`IVA: ${formatEuro(result.vatAmount)}`] : []),
    `Total por pieza: ${formatEuro(result.unitPrice)}`,
    "",
    "Estimación generada con CAD Lab 3D."
  ];

  return lines.join("\n");
}

export function PrintCostCalculator() {
  const [state, setState] = useState<CalculatorState>(defaultState);
  const [copyStatus, setCopyStatus] = useState("");
  const [recalculated, setRecalculated] = useState(false);
  const result = useMemo(() => calculateCost(state), [state]);

  function updateNumber(name: keyof CalculatorState, value: number, min = 0) {
    setState((current) => ({
      ...current,
      [name]: clampNumber(value, min)
    }));
  }

  function updateMaterial(event: ChangeEvent<HTMLSelectElement>) {
    const material = event.currentTarget.value as MaterialOption;
    setState((current) => ({
      ...current,
      material,
      materialPriceKg: materialPrices[material]
    }));
  }

  function resetValues() {
    setState(defaultState);
    setCopyStatus("");
  }

  async function copyBudget() {
    const text = buildBudgetText(state, result);

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Presupuesto copiado al portapapeles.");
    } catch {
      setCopyStatus("No se pudo copiar automáticamente. Puedes seleccionar el resultado manualmente.");
    }
  }

  function downloadBudget() {
    const text = buildBudgetText(state, result);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "presupuesto-impresion-3d.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function recalculate() {
    setRecalculated(true);
    window.setTimeout(() => setRecalculated(false), 700);
  }

  const breakdown = [
    ["Material", result.materialCost],
    ["Electricidad", result.electricityCost],
    ["Máquina/desgaste", result.machineCost],
    ["Mano de obra", result.laborCost],
    ["Riesgo de fallo", result.failureCost],
    ["Margen", result.profit],
    ...(state.showVat ? ([["IVA", result.vatAmount]] as [string, number][]) : []),
    ["Total", result.unitPrice]
  ] as [string, number][];

  return (
    <section aria-labelledby="calculadora" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6" onSubmit={(event) => event.preventDefault()}>
          <div className="flex flex-col gap-2 border-b border-slate-200 pb-5">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">Datos de impresión</p>
            <h2 id="calculadora" className="text-2xl font-black text-slate-950">Calcula un presupuesto FDM</h2>
            <p className="max-w-3xl text-sm leading-6 text-slate-600">
              Ajusta material, consumo, horas de máquina, mano de obra, riesgo, margen e IVA. Los resultados se recalculan automáticamente.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-black text-slate-800">Material</span>
              <select
                className="h-11 rounded-md border border-slate-300 bg-white px-3 text-base outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                value={state.material}
                onChange={updateMaterial}
              >
                {Object.keys(materialPrices).map((material) => (
                  <option key={material} value={material}>{material}</option>
                ))}
              </select>
              <span className="text-xs leading-5 text-slate-500">Carga un precio orientativo por kg que puedes editar.</span>
            </label>

            <NumberField label="Precio del material por kg" name="materialPriceKg" unit="€/kg" value={state.materialPriceKg} onChange={updateNumber} />
            <NumberField label="Peso de la pieza" name="weightGrams" unit="g" value={state.weightGrams} help="Incluye filamento usado en soportes, brim o pruebas si corresponde." step="1" onChange={updateNumber} />

            <div className="grid gap-3 sm:grid-cols-2">
              <NumberField label="Horas" name="printHours" unit="h" value={state.printHours} step="1" onChange={updateNumber} />
              <NumberField label="Minutos" name="printMinutes" unit="min" value={state.printMinutes} step="1" onChange={updateNumber} />
            </div>

            <NumberField label="Consumo eléctrico medio" name="powerWatts" unit="W" value={state.powerWatts} help="Una impresora FDM doméstica puede variar mucho según cama caliente, material y tamaño." step="1" onChange={updateNumber} />
            <NumberField label="Precio electricidad" name="electricityPrice" unit="€/kWh" value={state.electricityPrice} onChange={updateNumber} />
            <NumberField label="Coste de mano de obra" name="laborRate" unit="€/h" value={state.laborRate} help="Tiempo humano dedicado a preparar, revisar, retirar, limpiar o entregar la pieza." onChange={updateNumber} />
            <NumberField label="Tiempo de preparación" name="preparationMinutes" unit="min" value={state.preparationMinutes} help="Archivo, laminado, limpieza de cama, retirada de pieza y revisión básica." step="1" onChange={updateNumber} />
            <NumberField label="Tiempo de postprocesado" name="postProcessingMinutes" unit="min" value={state.postProcessingMinutes} help="Lijado, soportes, montaje, inserts, revisión, embalaje u otros acabados." step="1" onChange={updateNumber} />
            <NumberField label="Coste de máquina / desgaste" name="machineRate" unit="€/h" value={state.machineRate} help="Amortización de impresora, boquilla, cama, mantenimiento y recambios." onChange={updateNumber} />
            <NumberField label="Riesgo de fallo" name="failureRate" unit="%" value={state.failureRate} help="Margen técnico para cubrir repeticiones, fallos de adhesión o errores de impresión." onChange={updateNumber} />
            <NumberField label="Margen comercial" name="profitMargin" unit="%" value={state.profitMargin} onChange={updateNumber} />
            <NumberField label="IVA" name="vatRate" unit="%" value={state.vatRate} onChange={updateNumber} />
            <NumberField label="Cantidad de piezas" name="quantity" value={state.quantity} min={1} step="1" onChange={updateNumber} />
          </div>

          <label className="mt-5 flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
            <input
              checked={state.showVat}
              className="mt-1 h-4 w-4 accent-blue-700"
              type="checkbox"
              onChange={(event) => {
                const showVat = event.currentTarget.checked;
                setState((current) => ({ ...current, showVat }));
              }}
            />
            <span>
              Mostrar precio con IVA
              <span className="block pt-1 text-xs font-normal leading-5 text-slate-500">Si lo desactivas, el resultado principal muestra el precio sin IVA.</span>
            </span>
          </label>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-blue-800" type="button" onClick={recalculate}>
              Recalcular
            </button>
            <button className="rounded-md border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" type="button" onClick={resetValues}>
              Restablecer valores
            </button>
            <button className="rounded-md border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" type="button" onClick={copyBudget}>
              Copiar presupuesto
            </button>
            <button className="rounded-md border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" type="button" onClick={downloadBudget}>
              Descargar presupuesto
            </button>
          </div>
          {copyStatus ? <p className="mt-4 rounded-md bg-teal-50 p-3 text-sm font-semibold text-teal-800">{copyStatus}</p> : null}
        </form>

        <aside className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28 ${recalculated ? "ring-4 ring-teal-100" : ""}`} aria-live="polite">
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Resultado</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Precio recomendado</h2>
          <div className="mt-5 rounded-lg bg-slate-950 p-5 text-white">
            <p className="text-sm font-semibold text-slate-300">Precio recomendado por pieza</p>
            <p className="mt-1 text-4xl font-black tracking-normal">{formatEuro(result.unitPrice)}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Para esta pieza, el precio recomendado es de {formatEuro(result.unitPrice)} por unidad y {formatEuro(result.totalPrice)} para un lote de {clampNumber(state.quantity, 1)} piezas.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Metric label="Precio total del lote" value={formatEuro(result.totalPrice)} />
            <Metric label="Coste real de fabricación" value={formatEuro(result.realCost)} />
            <Metric label="Margen estimado" value={formatEuro(result.profit)} />
            <Metric label="Tiempo de impresión" value={`${result.printHours.toFixed(2)} h`} />
          </div>

          <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-3">Concepto</th>
                  <th className="px-3 py-3 text-right">Coste</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {breakdown.map(([label, value]) => (
                  <tr key={label} className={label === "Total" ? "bg-slate-950 font-black text-white" : "text-slate-700"}>
                    <td className="px-3 py-3">{label}</td>
                    <td className="px-3 py-3 text-right">{formatEuro(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Esta calculadora ofrece una estimación orientativa. El precio final puede variar según la impresora, el material, la complejidad del modelo, los soportes, la calidad exigida y el postprocesado.
          </p>
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
