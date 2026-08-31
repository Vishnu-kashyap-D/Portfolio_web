import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { BlogLearningTabs } from "@/components/learning/blog-learning-tabs";
import { getAllCategories, getAllPosts, getFeaturedPost, toSummary } from "@/lib/blog";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const title = `Blog | ${SITE_NAME}`;
const description =
  "Project write-ups, technical notes, and things I'm learning — computer vision, AI, and web development.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function BlogPage() {
  const posts = getAllPosts().map(toSummary);
  const categories = getAllCategories();
  const featured = getFeaturedPost();
  const featuredSummary = featured ? toSummary(featured) : undefined;

  return (
    <div className="relative min-h-screen font-sans text-foreground">
      <Navbar />
      <main>
        <BlogHero />
        <div className="container mx-auto px-4">
          <BlogLearningTabs active="articles" />
        </div>
        <div className="mt-8">
          <BlogExplorer posts={posts} categories={categories} featuredPost={featuredSummary} />
        </div>
        <div className="h-24" />
      </main>
      <Footer />
    </div>
  );
}
