import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Política de privacidad",
  description: "Política de privacidad de CAD Lab 3D con información sobre contacto, cookies, publicidad de terceros y Google AdSense.",
  path: "/politica-privacidad"
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        CAD Lab 3D es un proyecto informativo sobre CAD, diseño industrial, impresión 3D y documentación técnica. Esta política explica qué datos pueden tratarse al navegar por el sitio, usar formularios o interactuar con servicios de terceros.
      </p>
      <h2>Responsable del sitio</h2>
      <p>
        La identificación completa del responsable se completará con los datos legales reales que correspondan. Para consultas de privacidad, utiliza la página de contacto.
      </p>
      <h2>Datos que podrían tratarse</h2>
      <p>
        Pueden tratarse datos de contacto enviados mediante formularios, preferencias de cookies, datos anónimos de uso, dirección IP aproximada, datos técnicos del navegador y datos derivados de servicios de analítica o publicidad.
      </p>
      <h2>Finalidad del tratamiento</h2>
      <p>
        Los datos se utilizan para responder consultas, mejorar el contenido, analizar rendimiento editorial, proteger el sitio y gestionar publicidad o enlaces recomendados de forma transparente cuando existan.
      </p>
      <h2>Cookies, publicidad y proveedores externos</h2>
      <p>
        La web utiliza Google AdSense y puede utilizar otros proveedores publicitarios o de analítica. Google y otros proveedores externos pueden usar cookies para medir visitas, mostrar anuncios personalizados o no personalizados y evaluar rendimiento publicitario según el consentimiento aplicable.
      </p>
      <h2>Enlaces de afiliado</h2>
      <p>
        Algunos contenidos podrían incluir enlaces recomendados o de afiliado. Cuando se activen, se indicará de forma visible y transparente.
      </p>
      <h2>Contenido informativo</h2>
      <p>
        El contenido publicado tiene finalidad educativa. Las decisiones de fabricación, simulación, material o seguridad deben validarse según el contexto real de cada proyecto.
      </p>
      <h2>Derechos</h2>
      <p>
        Puedes solicitar información, rectificación o supresión de datos utilizando la página de contacto. Esta política deberá completarse con los datos legales del responsable antes de iniciar una actividad comercial plena.
      </p>
    </LegalPage>
  );
}

function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-slate-950">{title}</h1>
      <div className="article-body mt-8">{children}</div>
    </section>
  );
}
