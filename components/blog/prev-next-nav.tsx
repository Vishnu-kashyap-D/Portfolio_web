import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

export function PrevNextNav({ prev, next }: { prev?: BlogPost; next?: BlogPost }) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Article navigation" className="grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col gap-1 rounded-2xl border border-border p-5 transition-colors hover:bg-muted/50"
        >
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Previous
          </span>
          <span className="font-semibold text-foreground group-hover:text-primary">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col gap-1 rounded-2xl border border-border p-5 text-right transition-colors hover:bg-muted/50 sm:items-end"
        >
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
            Next <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="font-semibold text-foreground group-hover:text-primary">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
