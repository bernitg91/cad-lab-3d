"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <label className="grid gap-2 text-sm font-bold text-slate-700">
        Nombre
        <input required name="name" className="h-11 rounded-md border border-slate-300 px-3 text-base font-normal outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700">
        Email
        <input required type="email" name="email" className="h-11 rounded-md border border-slate-300 px-3 text-base font-normal outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700">
        Motivo
        <select name="reason" className="h-11 rounded-md border border-slate-300 px-3 text-base font-normal outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
          <option>Consulta general</option>
          <option>Servicio de modelado 3D</option>
          <option>Colaboración</option>
          <option>Sugerencia de contenido</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700">
        Mensaje
        <textarea required name="message" rows={6} className="rounded-md border border-slate-300 px-3 py-2 text-base font-normal outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
      </label>
      <button className="rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-blue-800" type="submit">
        Enviar mensaje
      </button>
      {sent ? (
        <p role="status" className="rounded-md bg-teal-50 p-3 text-sm font-semibold text-teal-800">
          Gracias. Tu consulta ha quedado registrada en esta sesión.
        </p>
      ) : null}
    </form>
  );
}
