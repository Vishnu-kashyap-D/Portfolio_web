export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface Heading {
  text: string;
  slug: string;
}

// Pulls top-level (##) headings directly out of the raw markdown so a table
// of contents can be built server-side, without re-walking the rendered tree.
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  for (const line of markdown.split("\n")) {
    const match = /^##\s+(.+)$/.exec(line.trim());
    if (match) {
      const text = match[1].replace(/[*_`]/g, "").trim();
      headings.push({ text, slug: slugify(text) });
    }
  }
  return headings;
}
