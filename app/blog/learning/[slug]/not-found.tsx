import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CertificationNotFound() {
  return (
    <div className="relative flex min-h-screen flex-col font-sans text-foreground">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-32 text-center">
        <span className="font-mono text-sm text-muted-foreground">404</span>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Certification not found</h1>
        <p className="max-w-md text-muted-foreground">
          The certification you&apos;re looking for doesn&apos;t exist, or may have been moved.
        </p>
        <Link
          href="/blog/learning"
          className="mt-4 inline-flex items-center gap-1.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Learning
        </Link>
      </main>
      <Footer />
    </div>
  );
}
