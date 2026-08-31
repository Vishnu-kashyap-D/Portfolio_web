"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import AnoAI from "@/components/ui/animated-shader-background";
import { RevealText } from "@/components/ui/reveal-text";
import { AboutSlider, AboutCardData } from "@/components/ui/about-slider"; // Import the new slider
import { ProjectsGrid } from "@/components/projects-grid";
import { SkillsSection } from "@/components/skills-section";
import { CodingActivitySection } from "@/components/coding-activity-section";
import { ContactSection } from "@/components/contact-section";
import Image from "next/image";
import { Github, Linkedin, Instagram, Mail, Twitter } from "lucide-react";

const WebSwingGame = dynamic(
    () => import("@/components/ui/web-swing-game").then((mod) => mod.WebSwingGame),
    { ssr: false }
);

// Data for the About Slider
const aboutCards: AboutCardData[] = [
  {
    id: 1,
    type: "profile",
    content: {
      bio: "I am an enthusiastic AI & ML Engineer with a robust foundation in Computer Vision, Deep Learning, and Open Source development. My expertise lies in architecting social-impact AI solutions and driving innovation within open-source ecosystems. With a proven track record of 4+ hackathon victories and CTF wins, I combine technical excellence with leadership, having organized large-scale technical events and mentored thriving student communities.",
      name: "Vishnu Kashyap D",
      email: "vishnukashyapd18@gmail.com",
      location: "Bangalore, India",
      availability: "Open to opportunities",
      socials: [
        { platform: "LinkedIn", url: "https://linkedin.com/in/vishnu-kashyap-d", icon: <Linkedin className="w-5 h-5" /> },
        { platform: "GitHub", url: "https://github.com/Vishnu-kashyap-D", icon: <Github className="w-5 h-5" /> },
        { platform: "Instagram", url: "https://www.instagram.com/vishnukashyapd18/", icon: <Instagram className="w-5 h-5" /> },
      ]
    }
  },
  {
    id: 2,
    type: "social",
    content: {
      socials: [
        { platform: "LinkedIn", handle: "@vishnu-kashyap-d", url: "https://linkedin.com/in/vishnu-kashyap-d", icon: <Linkedin className="w-6 h-6" /> },
        { platform: "GitHub", handle: "@Vishnu-kashyap-D", url: "https://github.com/Vishnu-kashyap-D", icon: <Github className="w-6 h-6" /> },
        { platform: "Email", handle: "vishnukashyapd18@gmail.com", url: "mailto:vishnukashyapd18@gmail.com", icon: <Mail className="w-6 h-6" /> },
        { platform: "Instagram", handle: "@vishnukashyapd18", url: "https://www.instagram.com/vishnukashyapd18/", icon: <Instagram className="w-6 h-6" /> },
      ]
    }
  }
];

export default function Home() {
  const heroFlipRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroFlipProgress } = useScroll({
    target: heroFlipRef,
    offset: ["start start", "end end"],
  });
  const heroRotateX = useTransform(heroFlipProgress, [0, 1], [0, -180]);
  const frontPointerEvents = useTransform(heroFlipProgress, (v) => (v < 0.5 ? "auto" : "none"));
  const backPointerEvents = useTransform(heroFlipProgress, (v) => (v < 0.5 ? "none" : "auto"));
  const hingeShadowOpacity = useTransform(heroFlipProgress, [0, 0.5, 1], [0, 0.5, 0]);

  return (
    <div className="relative min-h-screen font-sans text-foreground">
      {/* Background Shader */}
      <AnoAI />

      {/* Navbar */}
      <Navbar />

      <main className="relative z-10 flex flex-col gap-20 pb-20">

        {/* Section 1: Hero card-flips over to reveal About on its back face */}
        <div ref={heroFlipRef} className="relative" style={{ height: "220vh" }}>
          {/* Anchor for #about-anchor nav links: sits exactly where the flip finishes */}
          <div id="about-anchor" className="absolute left-0 w-px h-px pointer-events-none" style={{ top: "calc(100% - 100vh)" }} />

          <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: 2000 }}>
            <motion.div
              className="relative w-full h-full"
              style={{
                rotateX: heroRotateX,
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {/* Front face: Home */}
              <motion.section
                id="home"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  pointerEvents: frontPointerEvents,
                }}
                className="absolute inset-0 h-full flex items-center justify-center overflow-hidden isolate"
              >
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
                      <a href="/Vishnu_Kashyap_Resume.pdf" className="border border-input bg-background hover:bg-muted px-8 py-3 rounded-full font-medium transition-colors">
                        Resume
                      </a>
                    </div>
                  </div>

                  {/* Right Image (restored) */}
                  <div className="order-1 lg:order-2 flex justify-center">
                    <div className="relative w-[380px] h-[500px] md:w-[600px] md:h-[800px] animate-float">
                      {/* Image Mask/Frame */}
                      <div className="absolute inset-0 transition-transform hover:scale-105 duration-500">
                        <Image
                          src="/photo-nobg.png"
                          alt="Vishnu Spider-Man"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                      {/* Decorative Elements */}
                      <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
                      <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Back face: About & Achievements */}
              <motion.section
                id="about"
                style={{
                  rotateX: 180,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  pointerEvents: backPointerEvents,
                }}
                className="absolute inset-0 h-full overflow-y-auto isolate"
              >
                <div className="container mx-auto px-4 min-h-full flex items-center py-16">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

                    {/* Left: Formal Profile */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                      <div className="relative w-[320px] md:w-[420px] mx-auto mt-20 md:mt-28">
                        {/* Spider-Man perched in the corner */}
                        <div className="absolute bottom-full right-0 md:right-2 w-14 md:w-[5.5rem] z-20 pointer-events-none select-none drop-shadow-2xl">
                          <Image
                            src="/spiderman-corner.png"
                            alt="Spider-Man crouched in the corner, holding Captain America's shield"
                            width={529}
                            height={588}
                            className="w-full h-auto object-contain"
                          />
                        </div>

                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-transparent">
                          <Image
                            src="/profile.jpg"
                            alt="Vishnu Formal"
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right: About Slider */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                      <AboutSlider cards={aboutCards} />
                    </div>

                  </div>
                </div>
              </motion.section>

              {/* Hinge shading to sell the physical page-turn */}
              <motion.div
                className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/0 via-black/60 to-black/0"
                style={{ opacity: hingeShadowOpacity }}
              />
            </motion.div>
          </div>
        </div>

        {/* Section 2.5: Skills */}
        <SkillsSection />

        {/* Section 2.6: Mini Game */}
        <section id="web-swing" className="container mx-auto px-4 relative z-10">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">Web-Slinger Break</h2>
            <p className="text-muted-foreground text-lg">
              Swing through the skyline — click/tap to shoot a web, click again to let go.
            </p>
          </div>
          <WebSwingGame />
        </section>

        {/* Section 2.75: Coding Activity */}
        <CodingActivitySection />

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
