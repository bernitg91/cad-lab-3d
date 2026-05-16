import type { Article } from "@/types/article";

export function TableOfContents({ headings }: { headings: Article["headings"] }) {
  if (headings.length === 0) return null;

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-slate-950">Índice</p>
      <ol className="mt-3 grid gap-2 text-sm text-slate-600">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-3" : ""}>
            <a className="hover:text-blue-700" href={`#${heading.id}`}>
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
