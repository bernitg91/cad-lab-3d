"use client";

import { useMemo, useState } from "react";

const groups = [
  {
    title: "Archivo y geometría",
    items: ["Unidades y escala revisadas", "STL/3MF sin errores visibles", "Espesores mínimos comprobados", "Versionado del archivo claro"]
  },
  {
    title: "Orientación y resistencia",
    items: ["Orientación elegida según cargas", "Capas alineadas con la función", "Soportes en zonas no críticas", "Caras visibles protegidas"]
  },
  {
    title: "Material y parámetros",
    items: ["Material adecuado al uso", "Temperatura y cama revisadas", "Relleno y paredes definidos", "Tolerancias validadas si hay encajes"]
  },
  {
    title: "Antes de imprimir",
    items: ["Cama limpia y nivelada", "Filamento seco y suficiente", "Tiempo y gramos estimados guardados", "Nombre de archivo identificable"]
  },
  {
    title: "Después de imprimir",
    items: ["Pieza revisada dimensionalmente", "Soportes retirados sin dañar zonas funcionales", "Defectos anotados", "Parámetros guardados para repetir"]
  }
];

const allItems = groups.flatMap((group) => group.items.map((item) => `${group.title}: ${item}`));

export function PrintChecklist() {
  const [checked, setChecked] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const progress = useMemo(() => Math.round((checked.length / allItems.length) * 100), [checked.length]);
  const remaining = allItems.length - checked.length;

  function toggle(item: string) {
    setChecked((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  }

  async function copyChecklist() {
    const text = groups.map((group) => {
      const lines = group.items.map((item) => `${checked.includes(`${group.title}: ${item}`) ? "[x]" : "[ ]"} ${item}`);
      return [group.title, ...lines].join("\n");
    }).join("\n\n");

    try {
      await navigator.clipboard.writeText(text);
      setMessage("Checklist copiada al portapapeles.");
    } catch {
      setMessage("No se pudo copiar automáticamente.");
    }
  }

  function downloadChecklist() {
    const text = groups.map((group) => {
      const lines = group.items.map((item) => `${checked.includes(`${group.title}: ${item}`) ? "[x]" : "[ ]"} ${item}`);
      return [group.title, ...lines].join("\n");
    }).join("\n\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "checklist-impresion-3d.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="grid gap-5">
          {groups.map((group) => (
            <section key={group.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">{group.title}</h2>
              <div className="mt-4 grid gap-3">
                {group.items.map((item) => {
                  const key = `${group.title}: ${item}`;
                  return (
                    <label key={key} className="flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                      <input className="mt-1 h-4 w-4 accent-blue-700" type="checkbox" checked={checked.includes(key)} onChange={() => toggle(key)} />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Progreso</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">{progress}%</h2>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-teal-600" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{remaining === 0 ? "Lista completa para imprimir con más control." : `Quedan ${remaining} puntos por revisar.`}</p>
          <div className="mt-5 grid gap-3">
            <button className="rounded-md bg-slate-950 px-4 py-3 text-sm font-black text-white hover:bg-blue-800" type="button" onClick={() => setChecked(allItems)}>
              Marcar todo
            </button>
            <button className="rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" type="button" onClick={() => setChecked([])}>
              Reiniciar
            </button>
            <button className="rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" type="button" onClick={copyChecklist}>
              Copiar checklist
            </button>
            <button className="rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700" type="button" onClick={downloadChecklist}>
              Descargar .txt
            </button>
          </div>
          {message ? <p className="mt-4 rounded-md bg-teal-50 p-3 text-sm font-semibold text-teal-800">{message}</p> : null}
        </aside>
      </div>
    </section>
  );
}
