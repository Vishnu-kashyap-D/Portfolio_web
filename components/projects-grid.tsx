"use client";

import { useState } from "react";
import { Shield, Music, Sprout, Scan, Trophy, ArrowUpRight, ArrowLeft, ArrowRight, Database } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

export function ProjectsGrid() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 2;

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

    return (
        <div className="relative">
            {/* Navigation Buttons */}
            <div className="absolute -top-24 right-0 flex gap-2 z-20">
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 bg-transparent border-white/20 hover:bg-white/10" onClick={prevSlide}>
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 bg-transparent border-white/20 hover:bg-white/10" onClick={nextSlide}>
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            <div className="overflow-hidden min-h-[34rem]">
                <AnimatePresence mode="wait">
                    {currentSlide === 0 ? (
                        <motion.ul
                            key="slide-1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2"
                        >
                            {/* 1. Safe Vision */}
                            <GridItem
                                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                                icon={<Shield className="h-4 w-4" />}
                                title="Safe Vision"
                                description="Real-time assault detection (92% accuracy) with Blockchain evidence transfer."
                                link="https://github.com/UmashankarGouda/SafeVision"
                            />

                            {/* 2. Krishi Sakhi */}
                            <GridItem
                                area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                                icon={<Sprout className="h-4 w-4" />}
                                title="Krishi Sakhi"
                                description="AI Farming Assistant supporting Malayalam voice + text with >95% ASR accuracy."
                                link="https://github.com/Vishnu-kashyap-D/sih25074"
                            />

                            {/* 3. Music Genre Classification */}
                            <GridItem
                                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                                icon={<Music className="h-4 w-4" />}
                                title="SongSense"
                                description="Music Genre Classifier, Audio signal processing & spectral analysis model achieving 88.4% accuracy."
                                link="https://github.com/Vishnu-kashyap-D/Music_genre1"
                            />

                            {/* 4. Crop Disease Detection */}
                            <GridItem
                                area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                                icon={<Scan className="h-4 w-4" />}
                                title="Crop Disease Detection"
                                description="Deep learning CNN-based model reaching 85-90% classification accuracy on leaf datasets."
                                link="#"
                            />

                            {/* 5. More Projects (Moved from Slide 2) */}
                            <GridItem
                                area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                                icon={<ArrowRight className="h-4 w-4" />}
                                title="More Projects"
                                description="Constantly building and exploring new technologies. Check GitHub for latest updates."
                                link="https://github.com/Vishnu-kashyap-D"
                            />
                        </motion.ul>
                    ) : (
                        <motion.ul
                            key="slide-2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2"
                        >
                            {/* Placeholder for more projects from resume */}
                            {/* 6. Cricket Turf/Pitch Booking Website */}
                            <GridItem
                                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                                icon={<Database className="h-4 w-4" />}
                                title="Cricket Turf Booking"
                                description="Full-stack booking system with DBMS for real-time turf slot reservations and user management."
                                link="#"
                            />

                            {/* 7. Nutritional Suggestion Website */}
                            <GridItem
                                area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                                icon={<Sprout className="h-4 w-4" />}
                                title="Nutritional Suggestion App"
                                description="Responsive web app generating personalized diet plans based on BMI and user metrics."
                                link="#"
                            />

                            {/* 8. Key Achievements (Moved from Slide 1) */}
                            <GridItem
                                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                                icon={<Trophy className="h-4 w-4" />}
                                title="Key Achievements"
                                description="Winner of 4+ Hackathons & CTF Championships. Active Open Source contributor."
                                link="#"
                            />
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
    link?: string;
}

const GridItem = ({ area, icon, title, description, link = "#" }: GridItemProps) => {
    const isLink = link !== "#";
    const Content = (
        <>
            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background/50 backdrop-blur-sm p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6 transition-colors hover:bg-background/80">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="flex justify-between items-start">
                            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
                                {icon}
                            </div>
                            {isLink && <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-50" />}
                        </div>
                        <div className="space-y-3">
                            <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                                {title}
                            </h3>
                            <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <li className={cn("min-h-[14rem] list-none group", area)}>
            {isLink ? (
                <Link href={link} target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
                    {Content}
                </Link>
            ) : (
                <div className="h-full select-none cursor-default">{Content}</div>
            )}
        </li>
    );
};
