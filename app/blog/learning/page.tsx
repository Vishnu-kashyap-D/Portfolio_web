import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import { LearningHero } from "@/components/learning/learning-hero";
import { LearningExplorer } from "@/components/learning/learning-explorer";
import { BlogLearningTabs } from "@/components/learning/blog-learning-tabs";
import { getAllCertifications, getAllCertificationCategories, getFeaturedCertification } from "@/lib/certifications";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const title = `Certifications & Learning | ${SITE_NAME}`;
const description =
  "Certifications and courses across AI, machine learning, large language models, cloud, software engineering, and leadership.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/blog/learning` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/blog/learning`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function LearningPage() {
  const certifications = getAllCertifications();
  const categories = getAllCertificationCategories();
  const featured = getFeaturedCertification();

  return (
    <div className="relative min-h-screen font-sans text-foreground">
      <Navbar />
      <main>
        <LearningHero />
        <div className="container mx-auto px-4">
          <BlogLearningTabs active="learning" />
        </div>
        <div className="mt-8">
          <LearningExplorer certifications={certifications} categories={categories} featured={featured} />
        </div>
        <div className="h-24" />
      </main>
      <Footer />
    </div>
  );
}
