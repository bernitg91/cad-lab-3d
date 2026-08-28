import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre mí",
  description: "Sobre CAD Lab 3D: CAD, impresión 3D, simulación y desarrollo de producto.",
  path: "/sobre-mi"
});

export default function AboutPage() {
  const hasPublicName = siteConfig.authorName !== siteConfig.name;

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-16">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-800">Quién escribe</p>
            <h1 className="mt-4 font-display text-5xl font-black leading-[0.94] text-slate-950 sm:text-6xl">CAD Lab 3D es mi cuaderno público de trabajo</h1>
            <div className="mt-6 space-y-4 text-lg leading-8 text-slate-600">
              <p>
                {hasPublicName ? <>Me llamo {siteConfig.authorName} y soy</> : <>Soy</>} estudiante de Ingeniería en Diseño Industrial, con interés en CAD, impresión 3D FDM, simulación y desarrollo de producto. Esta web no intenta parecer una revista ni un laboratorio comercial.
              </p>
              <p>
                La uso para ordenar preguntas que aparecen al preparar una pieza o una entrega: por qué no encaja, qué orientación tiene sentido, qué debe quedar registrado y qué todavía no puedo afirmar.
              </p>
            </div>
          </div>
          <aside aria-label="Criterio editorial de la bitácora" className="border border-slate-300 bg-[#091625] text-white">
            <div className="flex items-center justify-between border-b border-white/20 px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300 sm:px-6">
              <span>Bitácora · criterio 01</span>
              <span className="text-slate-400">Documento vivo</span>
            </div>
            <div className="p-5 sm:p-6 lg:p-7">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-300">Antes de publicar</p>
              <h2 className="mt-3 font-display text-4xl font-black leading-[0.96]">Una nota debe mostrar también sus límites.</h2>
              <dl className="mt-7 divide-y divide-white/20 border-y border-white/20">
                <div className="grid gap-2 py-4 sm:grid-cols-[118px_1fr] sm:gap-5">
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-300">Qué documenta</dt>
                  <dd className="text-sm leading-6 text-slate-300">El problema, la decisión tomada, la fuente consultada y la información disponible.</dd>
                </div>
                <div className="grid gap-2 py-4 sm:grid-cols-[118px_1fr] sm:gap-5">
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-300">Qué no afirma</dt>
                  <dd className="text-sm leading-6 text-slate-300">Ensayos no realizados, precisión no medida ni experiencia profesional que no existe.</dd>
                </div>
                <div className="grid gap-2 py-4 sm:grid-cols-[118px_1fr] sm:gap-5">
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-300">Cómo se revisa</dt>
                  <dd className="text-sm leading-6 text-slate-300">Se comprueban enlaces, fechas, unidades y límites; una corrección queda integrada en la guía.</dd>
                </div>
              </dl>
              <p className="mt-5 border-l-2 border-orange-500 pl-4 font-mono text-[10px] font-semibold uppercase leading-5 tracking-[0.12em] text-slate-300">Estado editorial · publicable cuando distingue dato, inferencia y pendiente</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <section className="border-t-2 border-slate-950 pt-5">
            <h2 className="font-display text-3xl font-black text-slate-950">Qué sí encontrarás</h2>
            <ul className="mt-5 grid gap-3 text-base leading-7 text-slate-600">
              <li>Guías de CAD, impresión FDM, materiales y documentación.</li>
              <li>Herramientas sencillas para estimar y revisar antes de fabricar.</li>
              <li>Casos prácticos con observaciones limitadas a la evidencia disponible.</li>
              <li>Fuentes oficiales y enlaces para comprobar la información.</li>
            </ul>
          </section>
          <section className="border-t-2 border-orange-600 pt-5">
            <h2 className="font-display text-3xl font-black text-slate-950">Qué no voy a fingir</h2>
            <ul className="mt-5 grid gap-3 text-base leading-7 text-slate-600">
              <li>Ensayos, medidas o materiales que no se hayan conservado.</li>
              <li>Certificaciones, testimonios o experiencia profesional inexistente.</li>
              <li>Una cifra universal cuando depende de máquina, perfil y geometría.</li>
              <li>Que una ilustración editorial sea una prueba realizada en el taller.</li>
            </ul>
          </section>
        </div>

        <section className="mt-12 grid gap-8 border-y border-slate-300 py-8 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-display text-4xl font-black leading-none text-slate-950">Cómo uso este cuaderno</h2>
          <div className="space-y-4 text-base leading-7 text-slate-600">
            <p>Cuando preparo un artículo, intento responder a una sola tarea y separar la recomendación general de aquello que exigiría una prueba real. Si el contenido se solapa con otra guía, prefiero consolidarlo.</p>
            <p>Las revisiones corrigen enlaces, límites y explicaciones. Una fecha de revisión no significa que se haya realizado un ensayo nuevo; cuando exista evidencia propia, deberá aparecer junto al método y los datos.</p>
            <p>Puedes consultar <Link className="font-bold text-blue-800" href="/metodologia">cómo preparo el contenido</Link>, revisar las <Link className="font-bold text-blue-800" href="/fuentes">fuentes técnicas</Link> o escribir a <a className="font-bold text-blue-800" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-blue-800" href="/guias">Empezar por las guías</Link>
          <Link className="border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:border-blue-400" href="/casos-practicos-impresion-3d">Revisar los casos prácticos</Link>
          <Link className="border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:border-blue-400" href="/contacto">Contacto</Link>
        </div>
      </section>
    </>
  );
}
