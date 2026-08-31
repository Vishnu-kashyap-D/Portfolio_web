import type { Heading } from "@/lib/blog-format";

export function ReportToc({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="mt-10 rounded-2xl border border-border bg-card/30 p-6">
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Contents</span>
      <ol className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
        {headings.map((heading, i) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className="group flex items-baseline gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
              <span className="group-hover:underline">{heading.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
