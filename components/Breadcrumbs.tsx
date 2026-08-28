import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Migas de pan" className="text-sm font-semibold text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link className="hover:text-blue-700" href="/">Inicio</Link></li>
        {items.map((item) => (
          <li key={item.label} className={`items-center gap-2 ${item.href ? "flex" : "hidden sm:flex"}`}>
            <span aria-hidden="true">/</span>
            {item.href ? <Link className="hover:text-blue-700" href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
