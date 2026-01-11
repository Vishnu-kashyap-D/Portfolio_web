"use client";

import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import AnoAI from "@/components/ui/animated-shader-background";
import { RevealText } from "@/components/ui/reveal-text";
import { AboutSlider, AboutCardData } from "@/components/ui/about-slider"; // Import the new slider
import { ProjectsGrid } from "@/components/projects-grid";
import { SkillsSection } from "@/components/skills-section";
import { GithubSection } from "@/components/github-section";
import { ContactSection } from "@/components/contact-section";
import Image from "next/image";
import { Github, Linkedin, Instagram, Mail, Twitter } from "lucide-react";

// Data for the About Slider
const aboutCards: AboutCardData[] = [
  {
    id: 1,
    type: "profile",
    content: {
      bio: "I am an enthusiastic AI & ML Engineer with a robust foundation in Computer Vision, Deep Learning, and Open Source development. My expertise lies in architecting social-impact AI solutions and driving innovation within open-source ecosystems. With a proven track record of 4+ hackathon victories and CTF wins, I combine technical excellence with leadership, having organized large-scale technical events and mentored thriving student communities.",
      name: "Vishnu Kashyap D",
      email: "vishnukashyapd@gmail.com", // Assuming/Placeholder
      location: "Bangalore, India",
      availability: "Open to opportunities",
      socials: [
        { platform: "LinkedIn", url: "https://linkedin.com/in/vishnu-kashyap-d", icon: <Linkedin className="w-5 h-5" /> },
        { platform: "GitHub", url: "https://github.com/VishnuKashyapD", icon: <Github className="w-5 h-5" /> },
        { platform: "Instagram", url: "https://instagram.com", icon: <Instagram className="w-5 h-5" /> }, // Placeholder
      ]
    }
  },
  {
    id: 2,
    type: "social",
    content: {
      socials: [
        { platform: "LinkedIn", handle: "@vishnu-kashyap-d", url: "https://linkedin.com/in/vishnu-kashyap-d", icon: <Linkedin className="w-6 h-6" /> },
        { platform: "GitHub", handle: "@VishnuKashyapD", url: "https://github.com/VishnuKashyapD", icon: <Github className="w-6 h-6" /> },
        { platform: "Email", handle: "vishnukashyapd@gmail.com", url: "mailto:vishnukashyapd@gmail.com", icon: <Mail className="w-6 h-6" /> },
        { platform: "Instagram", handle: "@vishnu", url: "https://instagram.com", icon: <Instagram className="w-6 h-6" /> },
      ]
    }
  }
];

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans text-foreground">
      {/* Background Shader */}
      <AnoAI />

      {/* Navbar */}
      <Navbar />

      <main className="relative z-10 flex flex-col gap-20 pb-20">

        {/* Section 1: Hero */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Decorative Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03] select-none">
            <h1 className="text-[15vw] font-black leading-none text-center">
              AI &amp; ML
              <br />
              ENGINEER
            </h1>
          </div>

          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Text */}
            <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <RevealText
                text="VISHNU KASHYAP D"
                fontSize="text-4xl md:text-6xl"
                textColor="text-foreground"
                overlayColor="text-primary"
              />
              <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-lg">
                Building the future with <span className="font-semibold text-primary">AI</span> &amp; <span className="font-semibold text-primary">Machine Learning</span>.
              </p>
              <div className="flex gap-4 pt-4">
                <a href="#projects" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
                  View Work
                </a>
                <a href="/RESUME.VK.pdf" className="border border-input bg-background hover:bg-muted px-8 py-3 rounded-full font-medium transition-colors">
                  Resume
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-[380px] h-[500px] md:w-[600px] md:h-[800px] animate-float">
                {/* Image Mask/Frame */}
                <div className="absolute inset-0 transition-transform hover:scale-105 duration-500">
                  <Image
                    src="/hero-nobg.png"
                    alt="Vishnu Casual"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: About & Achievements */}
        <section id="about" className="container mx-auto px-4 min-h-screen py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Formal Profile */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="relative w-[320px] md:w-[420px] mx-auto aspect-[3/4] rounded-2xl overflow-hidden bg-transparent">
                <Image
                  src="/photo-nobg-clean.png"
                  alt="Vishnu Formal"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

              </div>
            </div>

            {/* Right: About Slider */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <AboutSlider cards={aboutCards} />
            </div>

          </div>
        </section>

        {/* Section 2.5: Skills */}
        <SkillsSection />

        {/* Section 2.75: Open Source */}
        <GithubSection />

        {/* Section 3: Projects */}
        <section id="projects" className="container mx-auto py-24 px-4 relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-lg">
              A selection of my work in AI, Computer Vision, and Web Development.
            </p>
          </div>
          <ProjectsGrid />
        </section>

        {/* Section 4: Contact */}
        <ContactSection />

      </main>
      <Footer />
    </div>
  );
}
