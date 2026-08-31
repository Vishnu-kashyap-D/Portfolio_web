import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import { BackToBlog } from "@/components/blog/back-to-blog";

export default function ArticleNotFound() {
  return (
    <div className="relative flex min-h-screen flex-col font-sans text-foreground">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-32 text-center">
        <span className="font-mono text-sm text-muted-foreground">404</span>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Article not found</h1>
        <p className="max-w-md text-muted-foreground">
          The article you&apos;re looking for doesn&apos;t exist, or may have been moved.
        </p>
        <BackToBlog className="mt-4 text-base" />
      </main>
      <Footer />
    </div>
  );
}
