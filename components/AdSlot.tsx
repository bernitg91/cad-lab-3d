"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

type AdSlotProps = {
  clientId?: string;
  slot?: string;
  label?: string;
  className?: string;
};

export function AdSlot({ clientId, slot, label = "Publicidad", className = "" }: AdSlotProps) {
  const active = Boolean(clientId?.startsWith("ca-pub-") && slot && /^\d+$/.test(slot));

  useEffect(() => {
    if (!active) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense may be blocked by the browser; editorial content remains available.
    }
  }, [active, slot]);

  if (!active) return null;

  return (
    <aside className={`my-10 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 px-3 py-4 ${className}`} aria-label={label}>
      <p className="mb-3 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <ins
        className="adsbygoogle block min-h-[250px]"
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
