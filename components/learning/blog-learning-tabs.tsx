import Link from "next/link";
import { cn } from "@/lib/utils";

export function BlogLearningTabs({ active }: { active: "articles" | "learning" }) {
  return (
    <nav aria-label="Blog sections" className="flex w-fit gap-1 rounded-full border border-border p-1">
      <Link
        href="/blog"
        aria-current={active === "articles" ? "page" : undefined}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
          active === "articles"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        Articles
      </Link>
      <Link
        href="/blog/learning"
        aria-current={active === "learning" ? "page" : undefined}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
          active === "learning"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        Certifications &amp; Learning
      </Link>
    </nav>
  );
}
