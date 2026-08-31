"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlogCard } from "@/components/blog/blog-card";
import { FeaturedArticle } from "@/components/blog/featured-article";
import type { BlogPostSummary } from "@/lib/blog";

type Sort = "latest" | "oldest" | "featured";

const SORT_OPTIONS: { value: Sort; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "featured", label: "Featured" },
];

export function BlogExplorer({
  posts,
  categories,
  featuredPost,
}: {
  posts: BlogPostSummary[];
  categories: string[];
  featuredPost?: BlogPostSummary;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<Sort>("latest");
  const shouldReduceMotion = useReducedMotion();

  const isDefaultView = search.trim() === "" && category === "All" && sort === "latest";

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = isDefaultView ? posts.filter((p) => p.slug !== featuredPost?.slug) : posts;

    const filtered = base.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesSearch =
        !q ||
        [post.title, post.description, post.category, ...post.tags].join(" ").toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sort === "featured") {
        const featuredDelta = Number(b.featured) - Number(a.featured);
        return featuredDelta !== 0 ? featuredDelta : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [posts, search, category, sort, isDefaultView, featuredPost?.slug]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("latest");
  };

  return (
    <div className="container mx-auto px-4">
      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          aria-label="Search articles"
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

      {/* Categories + Sort */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
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

        <div className="flex items-center gap-1 self-start rounded-full border border-border p-1 sm:self-auto">
          {SORT_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              type="button"
              size="sm"
              variant={sort === opt.value ? "secondary" : "ghost"}
              className="rounded-full"
              aria-pressed={sort === opt.value}
              onClick={() => setSort(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured article (default view only) */}
      {isDefaultView && featuredPost && (
        <div className="mt-12">
          <FeaturedArticle post={featuredPost} />
        </div>
      )}

      {/* Results grid */}
      <div className="mt-12">
        {results.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : Math.min(i, 6) * 0.05 }}
                className="h-full"
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border py-20 text-center">
            <p className="text-lg font-semibold text-foreground">No articles found</p>
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
