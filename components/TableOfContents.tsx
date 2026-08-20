import type { Article } from "@/types/article";

export function TableOfContents({ headings }: { headings: Article["headings"] }) {
  if (headings.length === 0) return null;

  return (
    <details open className="group border border-slate-200 bg-white p-5 shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-950 [&::-webkit-details-marker]:hidden">
        En esta guía
        <span aria-hidden="true" className="text-base text-teal-700 group-open:rotate-45">+</span>
      </summary>
      <ol className="mt-4 grid gap-2.5 border-t border-slate-100 pt-4 text-sm leading-5 text-slate-600">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-3 text-xs" : ""}>
            <a className="hover:text-blue-700" href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </details>
  );
}
