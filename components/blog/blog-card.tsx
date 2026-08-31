import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { CategoryBadge } from "@/components/blog/category-badge";
import { formatDate } from "@/lib/blog-format";
import type { BlogPostSummary } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPostSummary }) {
  return (
    <li className="list-none group h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
          <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
          <div className="relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] bg-card/50 backdrop-blur-sm shadow-sm transition-colors hover:bg-card/80">
            <div className="relative aspect-video w-full shrink-0 overflow-hidden border-b-[0.75px] border-border bg-muted">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <CategoryBadge category={post.category} className="w-fit" />
              <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground text-balance">
                {post.title}
              </h3>
              <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
              <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                <span>
                  {formatDate(post.date)} · {post.readingTime}
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Read <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
