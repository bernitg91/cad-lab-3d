import Link from "next/link";
import type { CategorySlug } from "@/types/article";

export function ArticleNextStep({ slug, category }: { slug: string; category: CategorySlug }) {
  const item = /encajes|tolerancia/.test(slug)
    ? { title: "Comprueba el ajuste en una probeta", text: "Descarga el modelo editable de cinco agujeros y registra el ajuste con tu material y perfil.", href: "/laboratorio-tolerancias-fdm", label: "Abrir la práctica de tolerancias" }
    : category === "materiales"
      ? { title: "Pasa de las propiedades a tu pieza", text: "Introduce las condiciones de uso en el selector y contrasta sus opciones con la ficha técnica de la bobina.", href: "/selector-material-impresion-3d", label: "Utilizar el selector de material" }
      : category === "impresion-3d"
        ? { title: "Si la impresión falla, empieza por el síntoma", text: "Consulta qué revisar primero y qué muestra repetir para valorar el cambio.", href: "/solucionar-problemas-impresion-3d", label: "Abrir el diagnóstico de fallos" }
        : category === "simulacion-fem"
          ? { title: "Deja trazables las hipótesis", text: "Revisa cargas, apoyos y comprobaciones antes de utilizar la simulación para decidir.", href: "/guia-simulacion-fem", label: "Consultar la guía de simulación" }
          : category === "proyectos-universitarios"
            ? { title: "Prepara una entrega que se pueda revisar", text: "Conecta planos, decisiones y comprobaciones en la documentación de tu proyecto.", href: "/guia-documentacion-tecnica", label: "Organizar la documentación" }
            : { title: "Comprueba el modelo antes de fabricar", text: "Revisa las restricciones, las referencias y la exportación con un recorrido completo de CAD paramétrico.", href: "/guia-cad-parametrico", label: "Consultar el recorrido de CAD" };
  return <aside className="cad-next-step"><p className="cad-eyebrow">LLÉVALO A TU PROYECTO</p><h2>{item.title}</h2><p>{item.text}</p><Link href={item.href}>{item.label}</Link></aside>;
}
