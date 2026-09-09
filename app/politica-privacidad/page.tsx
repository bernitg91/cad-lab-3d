import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

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
      <p><strong>Última actualización:</strong> 9 de septiembre de 2026.</p>
      <h2>Responsable del sitio</h2>
      <p>
        El responsable del sitio es {siteConfig.authorName}, titular de CAD Lab 3D. Para consultas relacionadas con privacidad, contenido o ejercicio de derechos, utiliza la página de contacto o escribe a <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
      <h2>Datos que podrían tratarse</h2>
      <p>
        Al contactar, puedes facilitar nombre, dirección de correo y el contenido de tu consulta. El formulario prepara el mensaje localmente y no lo envía a un servidor de CAD Lab 3D: solo lo recibimos si decides enviarlo desde tu aplicación de correo. No adjuntes datos sensibles que no sean necesarios para la consulta. La navegación puede generar datos técnicos, como dirección IP y características del navegador, tratados por los proveedores de alojamiento, medición y publicidad según su función.
      </p>
      <h2>Finalidad del tratamiento</h2>
      <p>
        Los datos se utilizan para responder consultas, mejorar el contenido, analizar rendimiento editorial, proteger el sitio y gestionar publicidad o enlaces recomendados de forma transparente cuando existan.
      </p>
      <h2>Base jurídica</h2>
      <p>Las consultas sobre un servicio se atienden para aplicar las medidas precontractuales que solicitas. Las comunicaciones generales y correcciones se gestionan por el interés legítimo de responder a quien se dirige voluntariamente al responsable. La seguridad técnica se apoya en el interés legítimo de mantener disponible el sitio. Las cookies y finalidades publicitarias que requieren consentimiento se activan según las opciones que elijas en el panel de Google. Retirar ese consentimiento no afecta a su tratamiento lícito anterior.</p>
      <h2>Conservación</h2>
      <p>Los correos se conservan durante el tiempo necesario para gestionar la consulta y su seguimiento. Si originan una relación contractual o una reclamación, se conservará la información necesaria durante los plazos legales que correspondan; cumplida esa finalidad, se eliminará o bloqueará cuando exista una obligación legal. Las preferencias de consentimiento y los datos técnicos de los proveedores siguen los criterios de conservación descritos en sus políticas enlazadas. No se crea una cuenta de usuario por utilizar las calculadoras.</p>
      <h2>Destinatarios y proveedores</h2>
      <p>El responsable recibe las consultas a través de Google Gmail. Vercel proporciona el alojamiento y la medición de visitas; Google presta las funciones de publicidad y consentimiento cuando están disponibles. Estos servicios pueden procesar datos fuera del Espacio Económico Europeo; sus políticas describen las transferencias y garantías aplicables. Los proveedores publicitarios concretos pueden consultarse en el mensaje de consentimiento. No se comunican las consultas a terceros para sus propias campañas comerciales; podrían facilitarse datos a las autoridades cuando exista una obligación legal.</p>
      <h2>Cookies, publicidad y proveedores externos</h2>
      <p>
        La web utiliza Vercel Web Analytics para conocer visitas y rendimiento de páginas mediante datos agregados y anonimizados, sin crear perfiles individuales ni utilizar cookies de analítica. También puede cargar el código de Google AdSense para verificar el dominio y, cuando Google lo autorice, mostrar publicidad. Google y otros proveedores externos pueden usar cookies o tecnologías similares para medir visitas, evitar fraude, mostrar anuncios personalizados o no personalizados y evaluar rendimiento publicitario según el consentimiento aplicable.
      </p>
      <p>
        Los proveedores externos, incluido Google, pueden utilizar cookies para publicar anuncios basados en visitas anteriores a este sitio u otros sitios. El uso de cookies publicitarias permite a Google y a sus partners mostrar anuncios en función de esas visitas. Los usuarios pueden gestionar la publicidad personalizada desde la configuración de anuncios de Google y desde las opciones de consentimiento disponibles.
      </p>
      <p>
        En usuarios del Espacio Económico Europeo, Reino Unido y Suiza, la publicidad personalizada y otras cookies no esenciales deben gestionarse mediante una plataforma o mecanismo de consentimiento compatible con la normativa aplicable y con los requisitos de Google cuando se muestren anuncios.
      </p>
      <p>Puedes consultar <a href="https://policies.google.com/technologies/partner-sites?hl=es">cómo utiliza Google la información de los sitios que usan sus servicios</a>, su <a href="https://policies.google.com/privacy?hl=es">política de privacidad</a> y <a href="https://myadcenter.google.com/">Mi centro de anuncios</a> para gestionar la personalización. La información sobre medición sin cookies está en la <a href="https://vercel.com/docs/analytics/privacy-policy">documentación de privacidad de Vercel Web Analytics</a>. El mensaje de consentimiento de Google, cuando esté disponible, permite consultar los proveedores y revisar las opciones aplicables.</p>
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
        Puedes solicitar acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad cuando proceda, escribiendo a <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Indica el derecho que quieres ejercer y los datos que permitan localizar tu comunicación. Si es necesario verificar tu identidad, se solicitará solo la información proporcionada al caso. Puedes retirar el consentimiento publicitario desde <a href="/politica-cookies">Opciones de privacidad</a>. No utilizamos el contenido de tus consultas para adoptar decisiones exclusivamente automatizadas con efectos jurídicos.
      </p>
      <p>Si consideras que no se han atendido tus derechos, puedes presentar una reclamación ante la <a href="https://www.aepd.es/">Agencia Española de Protección de Datos</a> o la autoridad de control competente.</p>
      <h2>Cambios en esta política</h2>
      <p>
        Esta política se actualizará cuando cambien los servicios de medición, publicidad, formularios o tratamiento de datos. La fecha de revisión se indicará al inicio de la página.
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
