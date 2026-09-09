"use client";

import { useState } from "react";

export function CopyLinkButton() {
  const [message, setMessage] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");

  async function copyLink() {
    const url = window.location.origin + window.location.pathname;
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Enlace copiado.");
      setFallbackUrl("");
    } catch {
      setMessage("Selecciona y copia el enlace de este campo.");
      setFallbackUrl(url);
    }
  }

  return (
    <div className="grid gap-2">
    <button
      type="button"
      onClick={copyLink}
      className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700"
    >
      Copiar enlace
    </button>
    <p role="status" className="text-sm text-slate-600">{message}</p>
    {fallbackUrl && <input aria-label="Enlace del artículo para copiar" readOnly value={fallbackUrl} className="min-w-0 rounded-md border border-slate-300 p-2 text-sm" onFocus={(event) => event.currentTarget.select()} />}
    </div>
  );
}
