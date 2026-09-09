import Link from "next/link";

const destinations = [
  { title: "Resolver un fallo", detail: "Primera capa, hilos, deformación o encajes", href: "/solucionar-problemas-impresion-3d" },
  { title: "Comparar materiales", detail: "PLA, PETG, TPU y materiales técnicos", href: "/guia-materiales-fdm" },
  { title: "Calcular una pieza", detail: "Coste, tiempo y consumo de material", href: "/calculadora-precio-impresion-3d" },
  { title: "Empezar con CAD", detail: "Del croquis definido al archivo para imprimir", href: "/guia-cad-parametrico" }
];

export function TaskRoutes() {
  return <nav className="cad-task-routes" aria-label="Encuentra una respuesta">
    <p>¿Qué necesitas hacer?</p>
    <div>{destinations.map(item => <Link href={item.href} key={item.href}><strong>{item.title}</strong><span>{item.detail}</span></Link>)}</div>
  </nav>;
}
