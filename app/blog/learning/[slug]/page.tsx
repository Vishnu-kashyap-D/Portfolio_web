import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import { CategoryBadge } from "@/components/blog/category-badge";
import { AchievementBadge } from "@/components/learning/achievement-badge";
import { CertificateActions } from "@/components/learning/certificate-actions";
import {
  certifications,
  getAdjacentCertifications,
  getCertificationBySlug,
} from "@/lib/certifications";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return certifications.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cert = getCertificationBySlug(slug);
  if (!cert) return {};

  const url = `${SITE_URL}/blog/learning/${cert.slug}`;
  const title = `${cert.title} — Vishnu Kashyap | ${SITE_NAME}`;

  return {
    title,
    description: cert.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${cert.title} — Vishnu Kashyap`,
      description: cert.description,
      url,
      siteName: SITE_NAME,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${cert.title} — Vishnu Kashyap`,
      description: cert.description,
    },
  };
}

export default async function CertificationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cert = getCertificationBySlug(slug);
  if (!cert) notFound();

  const { prev, next } = getAdjacentCertifications(slug);
  const subtitle = cert.institution ?? cert.instructor;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: cert.title,
    description: cert.description,
    credentialCategory: cert.category,
    recognizedBy: { "@type": "Organization", name: cert.institution ?? cert.provider },
  };

  return (
    <div className="relative min-h-screen font-sans text-foreground">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="pt-28 pb-20 md:pt-36">
        <div className="container mx-auto px-4">
          <Link
            href="/blog/learning"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learning
          </Link>

          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={cert.category} />
              {cert.achievement && <AchievementBadge achievement={cert.achievement} />}
            </div>

            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {cert.provider}
              {subtitle ? ` · ${subtitle}` : ""}
              {cert.year ? ` · ${cert.year}` : ""}
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl text-balance">
              {cert.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{cert.description}</p>

            <div className="mt-6">
              <CertificateActions certificateUrl={cert.certificateUrl} verificationUrl={cert.verificationUrl} />
            </div>

            {cert.certificateImage && (
              <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-3xl border border-border bg-muted">
                <Image
                  src={cert.certificateImage}
                  alt={`${cert.title} certificate`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover"
                />
              </div>
            )}

            {cert.groupItems && cert.groupItems.length > 0 && (
              <div className="mt-10 border-t border-border pt-8">
                <h2 className="text-xl font-bold tracking-tight text-foreground">What This Covers</h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {cert.groupItems.map((item) => (
                    <li
                      key={item.label}
                      className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-center text-sm font-medium text-foreground"
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 border-t border-border pt-8">
              <h2 className="text-xl font-bold tracking-tight text-foreground">What I Learned</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                {cert.whatILearned.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {cert.topics.length > 0 && (
              <div className="mt-10 border-t border-border pt-8">
                <h2 className="text-xl font-bold tracking-tight text-foreground">Key Topics</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cert.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 border-t border-border pt-8">
              <h2 className="text-xl font-bold tracking-tight text-foreground">How It Supports My Growth</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{cert.growthNote}</p>
            </div>

            {cert.relatedProjects && cert.relatedProjects.length > 0 && (
              <div className="mt-10 border-t border-border pt-8">
                <h2 className="text-xl font-bold tracking-tight text-foreground">Related Skill Area</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {cert.relatedProjects.map((project) => (
                    <a
                      key={project.title}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {project.title}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {(prev || next) && (
            <div className="mx-auto mt-16 max-w-5xl">
              <nav
                aria-label="Certification navigation"
                className="grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2"
              >
                {prev ? (
                  <Link
                    href={`/blog/learning/${prev.slug}`}
                    className="group flex flex-col gap-1 rounded-2xl border border-border p-5 transition-colors hover:bg-muted/50"
                  >
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <ArrowLeft className="h-3.5 w-3.5" /> Previous
                    </span>
                    <span className="font-semibold text-foreground group-hover:text-primary">{prev.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link
                    href={`/blog/learning/${next.slug}`}
                    className="group flex flex-col gap-1 rounded-2xl border border-border p-5 text-right transition-colors hover:bg-muted/50 sm:items-end"
                  >
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      Next <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-semibold text-foreground group-hover:text-primary">{next.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
              </nav>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}
