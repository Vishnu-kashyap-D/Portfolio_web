import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryBadge } from "@/components/blog/category-badge";
import { AchievementBadge } from "@/components/learning/achievement-badge";
import type { Certification } from "@/lib/certifications";

export function FeaturedCertification({ certification }: { certification: Certification }) {
  return (
    <Link href={`/blog/learning/${certification.slug}`} className="group block">
      <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
        Featured
      </span>
      <div className="rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-6 transition-colors hover:bg-card/80 md:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={certification.category} />
          {certification.achievement && <AchievementBadge achievement={certification.achievement} />}
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {certification.provider} · {certification.institution}
        </p>
        <h2 className="mt-1 text-2xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-3xl">
          {certification.title}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">{certification.description}</p>
        <div className="mt-4 text-sm text-muted-foreground">{certification.year}</div>
        <span className="mt-4 inline-flex w-fit items-center gap-1.5 font-medium text-primary">
          View Certification{" "}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
