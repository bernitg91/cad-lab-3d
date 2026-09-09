"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CadModel } from "@/components/CadModel";

const chapters = [
  { name: "Diseña", view: "Geometría CAD", title: "Todo empieza con una buena forma.", text: "Define cotas, relaciones y espesores. Un modelo bien construido te permite cambiar la pieza sin volver a empezar.", href: "/guia-cad-parametrico", link: "Aprender diseño CAD", note: "Base, taladros y alojamiento unidos en un mismo modelo." },
  { name: "Imprime", view: "Capas FDM", title: "Piensa también en cómo se fabrica.", text: "La orientación, las paredes y las capas cambian el resultado. Prepara la impresión desde el diseño, antes de abrir el laminador.", href: "/guia-impresion-3d-fdm", link: "Preparar una impresión", note: "Capas separadas para explicar la construcción en el eje Z." },
  { name: "Comprueba", view: "Pieza completa", title: "La medida real cierra el diseño.", text: "Una cota en pantalla no garantiza un ajuste. Imprime una probeta, mide y registra el resultado antes de fabricar la pieza definitiva.", href: "/laboratorio-tolerancias-fdm", link: "Descargar la probeta", note: "Modelo didáctico. No representa una pieza fabricada ni ensayada." }
];

export function CadExperience() {
  const section = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [manual, setManual] = useState(false);
  const [angle, setAngle] = useState(0);
  const chapter = chapters[stage];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update(); preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (manual || reduced) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!section.current || window.innerWidth < 900 || window.innerHeight <= 820) return;
        const rect = section.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(0.999, (88 - rect.top) / Math.max(1, rect.height - window.innerHeight + 88)));
        setStage(Math.floor(progress * 3));
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); };
  }, [manual, reduced]);

  return (
    <section ref={section} className="cad-experience" aria-label="Del diseño CAD a la impresión 3D">
      <div className="cad-sticky">
        <div className="cad-hero-grid">
          <div className="cad-hero-copy">
            <p className="cad-eyebrow"><span className="cad-dot" /> DISEÑO CAD · IMPRESIÓN 3D</p>
            <h1>De la idea.<br />Al modelo.<br /><span>A tu pieza.</span></h1>
            <p className="cad-hero-description">Aprende a diseñar piezas que puedas fabricar. Guías claras, herramientas útiles y decisiones explicadas paso a paso.</p>
            <div className="cad-actions">
              <Link className="cad-button cad-button-primary" href="/guias">Explorar las guías <span aria-hidden="true">↗</span></Link>
              <Link className="cad-text-link" href="/recursos">Ir a las herramientas <span aria-hidden="true">↗</span></Link>
            </div>
            <a href="#aprende" className="cad-scroll-link"><span aria-hidden="true">↓</span> Diseña. Imprime. Aprende.</a>
          </div>
          <div className="cad-model-panel">
            <div className="cad-model-topline"><span>LAB / BRIDA PARAMÉTRICA</span><span>{chapter.view}</span></div>
            <CadModel stage={stage} paused={paused || reduced} angle={angle} />
            <div className="cad-model-controls">
              <button type="button" onClick={() => setAngle((value) => value + 1)} aria-label="Girar el modelo 45 grados">Girar 45° <span aria-hidden="true">↻</span></button>
              {!reduced && <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Reanudar giro" : "Pausar giro"} <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button>}
            </div>
            <p className="cad-model-note">{chapter.note}</p>
          </div>
        </div>
        <div className="cad-process-bar">
          <div className="cad-stage-buttons" role="group" aria-label="Vista de la pieza">
            {chapters.map((item, index) => <button key={item.name} type="button" aria-pressed={stage === index} onClick={() => { setManual(true); setStage(index); }}><span className="cad-stage-number">0{index + 1}</span>{item.name}<span aria-hidden="true">↗</span></button>)}
          </div>
          <div className="cad-stage-description" aria-live="polite">
            <p>{chapter.title}</p>
            <Link href={chapter.href}>{chapter.link} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
