import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { BackToBlog } from "@/components/blog/back-to-blog";
import { CategoryBadge } from "@/components/blog/category-badge";
import { ArticleContent } from "@/components/blog/article-content";
import { ShareMenu } from "@/components/blog/share-menu";
import { PrevNextNav } from "@/components/blog/prev-next-nav";
import { RelatedPosts } from "@/components/blog/related-posts";
import { formatDate } from "@/lib/blog-format";
import { getAdjacentPosts, getAllPosts, getPostBySlug, getRelatedPosts, toSummary } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { Github, ExternalLink } from "lucide-react";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.coverImage.startsWith("http") ? post.coverImage : `${SITE_URL}${post.coverImage}`;
  const title = `${post.title} | ${SITE_NAME}`;

  return {
    title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedDate ?? post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);
  const related = getRelatedPosts(post).map(toSummary);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.coverImage.startsWith("http") ? post.coverImage : `${SITE_URL}${post.coverImage}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
    author: { "@type": "Person", name: post.author },
    image: imageUrl,
    mainEntityOfPage: url,
    keywords: post.tags.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const badges = post.technologies?.length ? post.technologies : post.tags;

  return (
    <div className="relative min-h-screen font-sans text-foreground">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="pt-28 pb-20 md:pt-36">
        <div className="container mx-auto px-4">
          <BackToBlog className="mb-8" />

          <header className="mx-auto max-w-3xl">
            <CategoryBadge category={post.category} />
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl text-balance">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          <div className="relative mx-auto mt-10 aspect-video w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-muted">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <ArticleContent content={post.content} />

            {badges && badges.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
                {badges.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {(post.githubUrl || post.liveUrl) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {post.githubUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a href={post.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github /> View on GitHub
                    </a>
                  </Button>
                )}
                {post.liveUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a href={post.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink /> Live Demo
                    </a>
                  </Button>
                )}
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
              <BackToBlog />
              <ShareMenu url={url} title={post.title} />
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-5xl space-y-16">
            <PrevNextNav prev={prev} next={next} />
            <RelatedPosts posts={related} />
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
