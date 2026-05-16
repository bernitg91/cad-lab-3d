import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contacto",
  description: "Contacta con CAD Lab 3D para consultas, sugerencias de contenido o servicios de modelado 3D.",
  path: "/contacto"
});

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <p className="text-sm font-black uppercase tracking-wide text-teal-700">Contacto</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">Hablemos de CAD, impresión 3D o proyectos técnicos</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Envía consultas sobre modelado CAD, preparación de piezas, documentación técnica, colaboraciones o propuestas de contenido para CAD Lab 3D.
        </p>
        <div className="mt-8 grid gap-3 text-sm leading-6 text-slate-600">
          <p className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">Consultas de modelado CAD, revisión de piezas o preparación de archivos.</p>
          <p className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">Dudas sobre contenido, recursos, colaboraciones o propuestas de artículos.</p>
          <p className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">Documentación, renders y optimización para impresión 3D.</p>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
