import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CategoryBadge } from "@/components/blog/category-badge";
import { formatDate } from "@/lib/blog-format";
import type { BlogPostSummary } from "@/lib/blog";

export function FeaturedArticle({ post }: { post: BlogPostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
        Featured
      </span>
      <div className="grid grid-cols-1 gap-6 overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-sm transition-colors hover:bg-card/80 lg:grid-cols-2 lg:gap-0">
        <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
          <CategoryBadge category={post.category} className="w-fit" />
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-3xl">
            {post.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{post.description}</p>
          <div className="text-sm text-muted-foreground">
            {formatDate(post.date)} · {post.readingTime}
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 font-medium text-primary">
            Read Article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
