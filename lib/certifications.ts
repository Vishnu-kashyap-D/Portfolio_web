export interface RelatedProject {
  title: string;
  url: string;
}

export interface CertificationGroupItem {
  label: string;
}

export interface Certification {
  id: string;
  slug: string;
  title: string;
  provider: string;
  institution?: string;
  instructor?: string;
  achievement?: string;
  year?: number;
  category: string;
  description: string;
  topics: string[];
  whatILearned: string[];
  growthNote: string;
  certificateUrl?: string;
  verificationUrl?: string;
  certificateImage?: string;
  relatedProjects?: RelatedProject[];
  groupItems?: CertificationGroupItem[];
  featured?: boolean;
}

// Source of truth for the Certifications & Learning section. Add a new
// certification by adding an entry here — the Learning hub and detail
// pages render automatically, no component changes required.
export const certifications: Certification[] = [
  {
    id: "nptel-llm",
    slug: "introduction-to-large-language-models",
    title: "Introduction to Large Language Models",
    provider: "NPTEL",
    institution: "IIT Madras",
    achievement: "Elite",
    year: 2026,
    category: "AI / ML",
    description:
      "A foundational course on large language models — how modern language models are built, trained, and applied, covering the concepts behind today's generative AI systems.",
    topics: ["Large Language Models", "Generative AI", "Language Modeling", "Modern NLP", "AI Applications"],
    whatILearned: [
      "The core ideas behind how large language models represent and generate language",
      "How generative AI systems fit into the broader landscape of modern NLP",
      "The kinds of applications LLMs are being used for today",
    ],
    growthNote:
      "This directly extends my existing focus on AI and computer vision into language-based AI — a natural next step given where the field is heading, and where a lot of my own project curiosity already sits.",
    certificateUrl: "",
    verificationUrl: "",
    certificateImage: "",
    relatedProjects: [{ title: "Krishi Sakhi", url: "https://github.com/Vishnu-kashyap-D/sih25074" }],
    featured: true,
  },
  {
    id: "nptel-leadership",
    slug: "leadership-and-team-effectiveness",
    title: "Leadership and Team Effectiveness",
    provider: "NPTEL",
    institution: "IIT Roorkee",
    achievement: "Elite",
    year: 2026,
    category: "Leadership",
    description:
      "A course on the fundamentals of leadership and what makes teams work well together — covering the human and organizational side of building things, alongside the technical side.",
    topics: ["Leadership", "Team Effectiveness", "Collaboration"],
    whatILearned: [
      "Principles behind effective leadership and team dynamics",
      "How collaboration and communication shape a team's output",
    ],
    growthNote:
      "Technical skill only gets you so far — this rounds out the collaboration and organizing experience I've picked up running hackathons and mentoring student communities, with a more structured foundation underneath it.",
    certificateUrl: "",
    verificationUrl: "",
    certificateImage: "",
  },
  {
    id: "coursera-supervised-ml",
    slug: "supervised-machine-learning",
    title: "Supervised Machine Learning",
    provider: "Coursera",
    instructor: "Andrew Ng",
    category: "Machine Learning",
    description:
      "A foundational machine learning course covering supervised learning — regression and classification models, and how to evaluate whether a model is actually working.",
    topics: ["Regression", "Classification", "Model Evaluation", "Feature-Based Prediction"],
    whatILearned: [
      "Core supervised learning techniques: regression and classification",
      "How to evaluate and reason about a trained model's performance",
      "The fundamentals that underpin most applied machine learning work",
    ],
    growthNote:
      "This is the theoretical backbone behind the classification and detection work in my computer vision projects — the fundamentals here show up directly in how I think about model design.",
    certificateUrl: "",
    verificationUrl: "",
    certificateImage: "",
    relatedProjects: [
      { title: "Safe Vision", url: "https://github.com/UmashankarGouda/SafeVision" },
      { title: "SongSense", url: "https://github.com/Vishnu-kashyap-D/Music_Genre_Classification" },
    ],
  },
  {
    id: "oracle-cloud-foundations",
    slug: "oracle-cloud-foundations",
    title: "Oracle Cloud Foundations",
    provider: "Oracle",
    category: "Cloud",
    description:
      "Foundational coursework covering core cloud computing concepts and the fundamentals of Oracle's cloud platform.",
    topics: ["Cloud Computing Fundamentals"],
    whatILearned: ["Core cloud computing concepts and how a cloud platform is structured"],
    growthNote:
      "Most of what I build eventually needs to run somewhere other than my own machine — this fills in the cloud fundamentals I don't get from project work alone.",
    certificateUrl: "",
    verificationUrl: "",
    certificateImage: "",
  },
  {
    id: "infosys-springboard",
    slug: "infosys-springboard",
    title: "Infosys Springboard",
    provider: "Infosys Springboard",
    category: "Software Engineering",
    description:
      "A set of foundational courses covering programming and professional software practice, spanning Python, software engineering fundamentals, and project management.",
    topics: ["Python", "Software Engineering", "Project Management"],
    whatILearned: [
      "Python fundamentals and applied programming practice",
      "Core software engineering principles and practices",
      "Project management fundamentals for planning and running technical work",
    ],
    growthNote:
      "This is the practical, day-to-day layer underneath everything else — writing solid Python, following good engineering practice, and planning work like a project rather than just a script.",
    certificateUrl: "",
    verificationUrl: "",
    certificateImage: "",
    groupItems: [{ label: "Python" }, { label: "Software Engineering" }, { label: "Project Management" }],
  },
];

export function getAllCertifications(): Certification[] {
  return [...certifications].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return (b.year ?? 0) - (a.year ?? 0);
  });
}

export function getCertificationBySlug(slug: string): Certification | undefined {
  return certifications.find((c) => c.slug === slug);
}

export function getFeaturedCertification(): Certification | undefined {
  return certifications.find((c) => c.featured) ?? certifications[0];
}

export function getAllCertificationCategories(): string[] {
  return Array.from(new Set(certifications.map((c) => c.category)));
}

export function getAdjacentCertifications(slug: string): { prev?: Certification; next?: Certification } {
  const all = getAllCertifications();
  const index = all.findIndex((c) => c.slug === slug);
  if (index === -1) return {};
  return { prev: all[index + 1], next: all[index - 1] };
}
