import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  category: string;
  tags: string[];
  author: string;
  readingTime: string;
  featured: boolean;
  coverImage: string;
  published: boolean;
  githubUrl?: string;
  liveUrl?: string;
  reportUrl?: string;
  technologies?: string[];
  stats?: { value: string; label: string }[];
  content: string;
}

export type BlogPostSummary = Omit<BlogPost, "content">;

function readPostFile(filename: string): BlogPost {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    updatedDate: data.updatedDate ? new Date(data.updatedDate).toISOString() : undefined,
    category: data.category ?? "General",
    tags: data.tags ?? [],
    author: data.author ?? "Vishnu Kashyap D",
    readingTime: readingTime(content).text,
    featured: Boolean(data.featured),
    coverImage: data.coverImage ?? "/blog/placeholder-cover.svg",
    published: data.published !== false,
    githubUrl: data.githubUrl,
    liveUrl: data.liveUrl,
    reportUrl: data.reportUrl,
    technologies: data.technologies,
    stats: data.stats,
    content,
  };
}

function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
}

let cache: BlogPost[] | null = null;

export function toSummary({ content, ...summary }: BlogPost): BlogPostSummary {
  void content;
  return summary;
}

export function getAllPosts(): BlogPost[] {
  if (cache) return cache;
  const posts = getAllSlugs()
    .map(readPostFile)
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  cache = posts;
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) ?? posts[0];
}

export function getAllCategories(): string[] {
  const categories = new Set(getAllPosts().map((p) => p.category));
  return Array.from(categories);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);

  const scored = others.map((candidate) => {
    let score = 0;
    if (candidate.category === post.category) score += 2;
    score += candidate.tags.filter((t) => post.tags.includes(t)).length;
    return { candidate, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.candidate);
}

export function getAdjacentPosts(slug: string): { prev?: BlogPost; next?: BlogPost } {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return {
    prev: posts[index + 1],
    next: posts[index - 1],
  };
}
