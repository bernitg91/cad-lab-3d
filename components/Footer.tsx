import Image from "next/image";
import Link from "next/link";

const learningLinks = [
  ["CAD paramétrico", "/guia-cad-parametrico"],
  ["Impresión 3D FDM", "/guia-impresion-3d-fdm"],
  ["Materiales FDM", "/guia-materiales-fdm"],
  ["Simulación FEM", "/guia-simulacion-fem"],
  ["Documentación técnica", "/guia-documentacion-tecnica"]
];

const resourceLinks = [
  ["Calculadora de precio", "/calculadora-precio-impresion-3d"],
  ["Calculadora de peso", "/calculadora-peso-pieza-3d"],
  ["Selector de material", "/selector-material-impresion-3d"],
  ["Checklist de impresión", "/checklist-impresion-3d"],
  ["Casos prácticos", "/casos-practicos-impresion-3d"]
];

const projectLinks = [
  ["Sobre CAD Lab 3D", "/sobre-mi"],
  ["Metodología editorial", "/metodologia"],
  ["Fuentes técnicas", "/fuentes"],
  ["Servicios", "/servicios"],
  ["Contacto", "/contacto"]
];

function FooterLinks({ items }: { items: string[][] }) {
  return (
    <ul className="mt-4 grid gap-2.5 text-sm text-slate-400">
      {items.map(([label, href]) => (
        <li key={href}><Link className="hover:text-cyan-300" href={href}>{label}</Link></li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#091625] text-slate-200">
      <div className="blueprint-grid">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="CAD Lab 3D, inicio">
              <Image src="/brand/cadlab3d-mark.webp" alt="" width={54} height={54} className="h-14 w-14 object-contain" />
              <span>
                <span className="block font-display text-2xl font-black uppercase tracking-wide text-white">CAD Lab 3D</span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-cyan-300">Diseña · fabrica · comprueba</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Publicación técnica en español sobre CAD, diseño para fabricación, impresión 3D y validación de proyectos. Explicamos decisiones, límites y formas de comprobar el resultado.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white">Aprende</p>
            <FooterLinks items={learningLinks} />
          </div>
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white">Utiliza</p>
            <FooterLinks items={resourceLinks} />
          </div>
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white">Confianza</p>
            <FooterLinks items={projectLinks} />
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs leading-6 text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} CAD Lab 3D · Contenido educativo; valida siempre materiales, medidas y requisitos reales.</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            <li><Link className="hover:text-white" href="/politica-privacidad">Privacidad</Link></li>
            <li><Link className="hover:text-white" href="/politica-cookies">Cookies</Link></li>
            <li><Link className="hover:text-white" href="/aviso-legal">Aviso legal</Link></li>
            <li><Link className="hover:text-white" href="/contacto">Contacto</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
