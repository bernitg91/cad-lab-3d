import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Aviso legal",
  description: "Aviso legal de CAD Lab 3D sobre titularidad, contenido, propiedad intelectual y responsabilidad.",
  path: "/aviso-legal"
});

export default function LegalNoticePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-slate-950">Aviso legal</h1>
      <div className="article-body mt-8">
        <p>
          CAD Lab 3D es una web informativa sobre CAD, diseño industrial, impresión 3D, simulación y documentación técnica. Esta página resume las condiciones generales de uso del sitio.
        </p>
        <h2>Titularidad</h2>
        <p>
          La identificación completa del titular se completará con los datos legales reales que correspondan. Para consultas sobre el sitio, utiliza la página de contacto.
        </p>
        <h2>Contenido</h2>
        <p>
          Los artículos de CAD Lab 3D tienen finalidad educativa. Las recomendaciones sobre diseño, materiales o fabricación deben verificarse en cada proyecto real.
        </p>
        <h2>Propiedad intelectual</h2>
        <p>
          Salvo indicación contraria, los textos, recursos y elementos visuales pertenecen al titular de la web o se publican con permiso.
        </p>
        <h2>Responsabilidad</h2>
        <p>
          CAD Lab 3D no se responsabiliza de usos incorrectos de la información, errores de fabricación, decisiones técnicas sin validación o daños derivados de aplicar el contenido sin criterio profesional.
        </p>
      </div>
    </section>
  );
}
