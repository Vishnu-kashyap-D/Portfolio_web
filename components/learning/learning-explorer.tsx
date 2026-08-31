"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CertificationCard } from "@/components/learning/certification-card";
import { FeaturedCertification } from "@/components/learning/featured-certification";
import type { Certification } from "@/lib/certifications";

export function LearningExplorer({
  certifications,
  categories,
  featured,
}: {
  certifications: Certification[];
  categories: string[];
  featured?: Certification;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  const isDefaultView = search.trim() === "" && category === "All";

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = isDefaultView ? certifications.filter((c) => c.slug !== featured?.slug) : certifications;

    return base.filter((c) => {
      const matchesCategory = category === "All" || c.category === category;
      const haystack = [c.title, c.description, c.provider, c.institution, c.category, ...c.topics]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = !q || haystack.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [certifications, search, category, isDefaultView, featured?.slug]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <div className="container mx-auto px-4">
      <div className="relative max-w-lg">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search certifications..."
          aria-label="Search certifications"
          className="h-11 rounded-full pl-10 pr-9"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              category === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {isDefaultView && featured && (
        <div className="mt-12">
          <FeaturedCertification certification={featured} />
        </div>
      )}

      <div className="mt-12">
        {results.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((cert, i) => (
              <motion.div
                key={cert.slug}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : Math.min(i, 6) * 0.05 }}
                className="h-full"
              >
                <CertificationCard certification={cert} />
              </motion.div>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border py-20 text-center">
            <p className="text-lg font-semibold text-foreground">No certifications found</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Try a different search term or category — or reset the filters to see everything.
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
