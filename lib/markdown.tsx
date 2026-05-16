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
      return (
        <a key={index} className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4" href={linkMatch[2]}>
          {linkMatch[1]}
        </a>
      );
    }

    return part;
  });
}

export function MarkdownContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className="article-body">
      {blocks.map((block, index) => {
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
              {block.split("\n").map((item) => (
                <li key={item}>{renderInline(item.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        }

        if (block.match(/^\d+\. /m)) {
          return (
            <ol key={index}>
              {block.split("\n").map((item) => (
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
