import type { Metadata } from "next";
import Image from "next/image";
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
          <figure className="border border-slate-300 bg-[#eef2f6] p-3">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
              <Image
                src="/images/impresion-3d-personalizada/panel-prototipo-tecnico-fdm.jpg"
                alt="Mano sosteniendo un panel técnico gris impreso en 3D"
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-slate-300 p-4 text-sm leading-6 text-slate-600">
              Fotografía propia de una pieza del cuaderno. Permite observar el panel y sus relieves; no demuestra material, rigidez ni precisión dimensional.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <section className="border-t-2 border-slate-950 pt-5">
            <h2 className="font-display text-3xl font-black text-slate-950">Qué sí encontrarás</h2>
            <ul className="mt-5 grid gap-3 text-base leading-7 text-slate-600">
              <li>Guías de CAD, impresión FDM, materiales y documentación.</li>
              <li>Herramientas sencillas para estimar y revisar antes de fabricar.</li>
              <li>Fotografías propias con observaciones limitadas a lo visible.</li>
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
          <Link className="border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:border-blue-400" href="/casos-practicos-impresion-3d">Ver las piezas fotografiadas</Link>
          <Link className="border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:border-blue-400" href="/contacto">Contacto</Link>
        </div>
      </section>
    </>
  );
}
