import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-xl font-black text-white">CAD Lab 3D</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Guías prácticas sobre CAD, diseño industrial, impresión 3D y documentación técnica para estudiantes y makers exigentes.
          </p>
          <p className="mt-5 text-xs text-slate-500">© {new Date().getFullYear()} CAD Lab 3D. Contenido educativo y recursos técnicos actualizados de forma periódica.</p>
        </div>
        <div>
          <p className="font-bold text-white">Guías principales</p>
          <ul className="mt-3 grid gap-2 text-sm text-slate-400">
            <li><Link className="hover:text-white" href="/guia-impresion-3d-fdm">Impresión 3D FDM</Link></li>
            <li><Link className="hover:text-white" href="/guia-materiales-fdm">Materiales FDM</Link></li>
            <li><Link className="hover:text-white" href="/guia-cad-parametrico">CAD paramétrico</Link></li>
            <li><Link className="hover:text-white" href="/guia-simulacion-fem">Simulación FEM</Link></li>
            <li><Link className="hover:text-white" href="/guia-documentacion-tecnica">Documentación técnica</Link></li>
            <li><Link className="hover:text-white" href="/categorias">Todas las categorías</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-white">Proyecto</p>
          <ul className="mt-3 grid gap-2 text-sm text-slate-400">
            <li><Link className="hover:text-white" href="/guias">Guías</Link></li>
            <li><Link className="hover:text-white" href="/guia-impresion-3d-fdm">Guía impresión 3D FDM</Link></li>
            <li><Link className="hover:text-white" href="/recursos">Recursos</Link></li>
            <li><Link className="hover:text-white" href="/casos-practicos-impresion-3d">Casos prácticos</Link></li>
            <li><Link className="hover:text-white" href="/glosario">Glosario técnico</Link></li>
            <li><Link className="hover:text-white" href="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
            <li><Link className="hover:text-white" href="/metodologia">Metodología editorial</Link></li>
            <li><Link className="hover:text-white" href="/fuentes">Fuentes técnicas</Link></li>
            <li><Link className="hover:text-white" href="/calculadora-precio-impresion-3d">Calculadora 3D</Link></li>
            <li><Link className="hover:text-white" href="/selector-material-impresion-3d">Selector material FDM</Link></li>
            <li><Link className="hover:text-white" href="/servicios">Servicios</Link></li>
            <li><Link className="hover:text-white" href="/impresion-3d-personalizada">Impresión 3D personalizada</Link></li>
            <li><Link className="hover:text-white" href="/contacto">Contacto</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 text-xs leading-6 text-slate-500 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <p>
            Contenido informativo y educativo. Revisa siempre requisitos, materiales y condiciones reales antes de fabricar o presentar un proyecto técnico.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            <li><Link className="hover:text-white" href="/politica-privacidad">Política de privacidad</Link></li>
            <li><Link className="hover:text-white" href="/politica-cookies">Política de cookies</Link></li>
            <li><Link className="hover:text-white" href="/aviso-legal">Aviso legal</Link></li>
            <li><Link className="hover:text-white" href="/metodologia">Metodología</Link></li>
            <li><Link className="hover:text-white" href="/fuentes">Fuentes</Link></li>
            <li><Link className="hover:text-white" href="/preguntas-frecuentes">FAQ</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
