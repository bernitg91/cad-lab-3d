import { slugifyHeading } from "@/lib/articles";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const external = /^https?:\/\//.test(linkMatch[2]);
      return (
        <a
          key={index}
          className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900"
          href={linkMatch[2]}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
        >
          {linkMatch[1]}
        </a>
      );
    }

    return part;
  });
}

function parseTable(block: string) {
  const rows = block
    .trim()
    .split(/\r?\n/)
    .map((row) => row.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));

  if (rows.length < 2 || !rows[1].every((cell) => /^:?-{3,}:?$/.test(cell))) return null;

  return { headers: rows[0], rows: rows.slice(2) };
}

export function MarkdownContent({ content }: { content: string }) {
  const blocks = content.split(/\r?\n(?:\r?\n)+/);

  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        const table = parseTable(block);

        if (table) {
          return (
            <div className="table-scroll" key={index} role="region" aria-label="Tabla de datos técnicos" tabIndex={0}>
              <table>
                <thead>
                  <tr>{table.headers.map((header, cellIndex) => <th key={cellIndex}>{renderInline(header)}</th>)}</tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {table.headers.map((_, cellIndex) => <td key={cellIndex}>{renderInline(row[cellIndex] ?? "")}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.startsWith("### ")) {
          const text = block.replace("### ", "");
          return (
            <h3 id={slugifyHeading(text)} key={index}>
              {renderInline(text)}
            </h3>
          );
        }

        if (block.startsWith("## ")) {
          const text = block.replace("## ", "");
          return (
            <h2 id={slugifyHeading(text)} key={index}>
              {renderInline(text)}
            </h2>
          );
        }

        if (block.startsWith("> ")) {
          return <blockquote key={index}>{renderInline(block.replace(/^> /gm, ""))}</blockquote>;
        }

        if (block.match(/^- /m)) {
          return (
            <ul key={index}>
              {block.split(/\r?\n/).map((item) => (
                <li key={item}>{renderInline(item.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        }

        if (block.match(/^\d+\. /m)) {
          return (
            <ol key={index}>
              {block.split(/\r?\n/).map((item) => (
                <li key={item}>{renderInline(item.replace(/^\d+\. /, ""))}</li>
              ))}
            </ol>
          );
        }

        return <p key={index}>{renderInline(block)}</p>;
      })}
    </div>
  );
}
