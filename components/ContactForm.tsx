"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  contactEmail: string;
  defaultReason?: string;
};

export function ContactForm({ contactEmail, defaultReason = "Consulta general" }: ContactFormProps) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const reason = String(form.get("reason") || defaultReason);
    const message = String(form.get("message") || "");
    const subject = `Consulta CAD Lab 3D - ${reason}`;
    const body = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Motivo: ${reason}`,
      "",
      "Mensaje:",
      message
    ].join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <p className="rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-600">
        El formulario prepara un correo para que puedas revisarlo antes de enviarlo. También puedes escribir directamente a{" "}
        <a className="font-bold text-blue-700 hover:text-blue-900" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
        .
      </p>
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
        <select name="reason" defaultValue={defaultReason} className="h-11 rounded-md border border-slate-300 px-3 text-base font-normal outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
          <option>Consulta general</option>
          <option>Servicio de modelado 3D</option>
          <option>Impresión 3D personalizada</option>
          <option>Colaboración</option>
          <option>Sugerencia de contenido</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700">
        Mensaje
        <textarea required name="message" rows={6} className="rounded-md border border-slate-300 px-3 py-2 text-base font-normal outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
      </label>
      <button className="rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-blue-800" type="submit">
        Preparar email
      </button>
      {sent ? (
        <p role="status" className="rounded-md bg-teal-50 p-3 text-sm font-semibold text-teal-800">
          Se ha preparado el correo en tu aplicación de email. Revísalo y envíalo desde allí.
        </p>
      ) : null}
    </form>
  );
}
