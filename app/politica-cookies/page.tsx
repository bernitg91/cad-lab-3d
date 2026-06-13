import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Política de cookies",
  description: "Información sobre cookies técnicas, analítica de Vercel, publicidad de Google y gestión del consentimiento en CAD Lab 3D.",
  path: "/politica-cookies"
});

export default function CookiesPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-slate-950">Política de cookies</h1>
      <div className="article-body mt-8">
        <p>
          CAD Lab 3D utiliza tecnologías técnicas y de medición para mantener el sitio y conocer el rendimiento de sus páginas. El código de Google AdSense puede estar presente para verificar el dominio y mostrar publicidad únicamente cuando el sitio sea autorizado.
        </p>
        <p><strong>Última actualización:</strong> 13 de junio de 2026.</p>
        <h2>Cookies técnicas</h2>
        <p>Ayudan al funcionamiento básico del sitio y a recordar preferencias esenciales.</p>
        <h2>Cookies analíticas</h2>
        <p>
          Vercel Web Analytics se utiliza para entender qué contenidos resultan más útiles, detectar problemas de navegación y mejorar la estructura editorial. La información se consulta de forma agregada.
        </p>
        <h2>Gestión del consentimiento</h2>
        <p>
          El consentimiento para cookies no esenciales se gestiona mediante las herramientas disponibles para usuarios del Espacio Económico Europeo, Reino Unido y Suiza, de acuerdo con la normativa aplicable. Si el sitio muestra anuncios de Google, debe usarse una plataforma de gestión del consentimiento compatible con los requisitos vigentes de Google para esos territorios.
        </p>
        <h2>Cookies publicitarias y Google</h2>
        <p>
          Google AdSense puede usar cookies y tecnologías similares para personalizar anuncios, limitar la frecuencia de visualización, medir anuncios y evitar fraude una vez aprobado el sitio. Google y otros proveedores externos pueden usar cookies para publicar anuncios basados en visitas anteriores a este sitio u otros sitios. Puedes consultar y gestionar opciones de consentimiento cuando el mensaje correspondiente esté disponible.
        </p>
        <h2>Cómo cambiar preferencias</h2>
        <p>
          Además de las opciones de consentimiento que aparezcan en el sitio, puedes revisar la configuración de privacidad del navegador para bloquear, eliminar o limitar cookies. Si bloqueas cookies no esenciales, el contenido seguirá siendo accesible, aunque algunas mediciones o funciones externas podrían no operar igual.
        </p>
      </div>
    </section>
  );
}
