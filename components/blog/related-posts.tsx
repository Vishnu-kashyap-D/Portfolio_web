import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPostSummary } from "@/lib/blog";

export function RelatedPosts({ posts }: { posts: BlogPostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="border-t border-border pt-10">
      <h2 id="related-heading" className="mb-6 text-xl font-bold tracking-tight text-foreground">
        Related Articles
      </h2>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </ul>
    </section>
  );
}
