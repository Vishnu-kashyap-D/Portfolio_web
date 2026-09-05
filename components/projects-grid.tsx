"use client";

import Image from "next/image";
import { Shield, Music, Sprout, Scan, Trophy, ArrowUpRight, ArrowRight, Database, Bot, Github, ExternalLink } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ProjectsGrid() {
    return (
        <div className="relative space-y-4">
            {/* Flagship projects with real homepage screenshots */}
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* 1. Safe Vision */}
                <GridItem
                    icon={<Shield className="h-4 w-4" />}
                    title="Safe Vision"
                    description="Real-time assault detection (92% accuracy) with Blockchain evidence transfer."
                    link="https://github.com/UmashankarGouda/SafeVision"
                    image="/projects/safe-vision-demo.png"
                    imageAlt="Safe Vision surveillance app detecting suspicious behavior and flagging it in real time on a live video feed"
                />

                {/* 2. Krishi Sakhi */}
                <GridItem
                    icon={<Sprout className="h-4 w-4" />}
                    title="Krishi Sakhi"
                    description="AI Farming Assistant supporting Malayalam voice + text with >95% ASR accuracy."
                    link="https://github.com/Vishnu-kashyap-D/sih25074"
                    image="/projects/krishi-sakhi-homepage.png"
                    imageAlt="Krishi Sakhi homepage showing the AI farming assistant welcome screen and feature cards"
                />

                {/* 3. Music Genre Classification */}
                <GridItem
                    icon={<Music className="h-4 w-4" />}
                    title="SongSense"
                    description="Music Genre Classifier, Audio signal processing & spectral analysis model achieving 88.4% accuracy."
                    link="https://github.com/Vishnu-kashyap-D/Music_Genre_Classification"
                    image="/projects/songsense-homepage.png"
                    imageAlt="SongSense homepage showing the audio upload and live recording interface"
                />

                {/* 4. Crop Disease Detection */}
                <GridItem
                    icon={<Scan className="h-4 w-4" />}
                    title="Crop Disease Detection"
                    description="Deep learning CNN-based model reaching 85-90% classification accuracy on leaf datasets."
                    link="#"
                    image="/projects/crop-disease-leaf.jpg"
                    imageAlt="Close-up of a leaf showing visible disease spots, representative of the crop disease classification dataset"
                />

                {/* 5. PrepBot */}
                <GridItem
                    icon={<Bot className="h-4 w-4" />}
                    title="PrepBot — Personal Placement Mentor"
                    description="AI-powered placement prep chatbot covering HR interviews, resume building, aptitude & DSA rounds, and company-specific strategies."
                    githubUrl="https://github.com/Vishnu-kashyap-D/PrepBot-Flinders"
                    liveUrl="https://prep-bot-flinders.vercel.app/"
                    image="/projects/prepbot-homepage.png"
                    imageAlt="PrepBot landing page with the 'Crack Your Campus Placement with PrepBot' hero heading and Start Chatting button"
                />

                {/* 6. Cricket Turf/Pitch Booking Website */}
                <GridItem
                    icon={<Database className="h-4 w-4" />}
                    title="Cricket Turf Booking"
                    description="Full-stack booking system with DBMS for real-time turf slot reservations and user management."
                    link="https://github.com/Vishnu-kashyap-D/Cricket_pitch-turf-booking"
                    image="/projects/cricket-turf-booking-homepage.png"
                    imageAlt="Cricket Turf Booking homepage with a hero banner and a Book Now call to action"
                />

                {/* 7. Nutritional Suggestion Website */}
                <GridItem
                    icon={<Sprout className="h-4 w-4" />}
                    title="Nutritional Suggestion App"
                    description="Responsive web app generating personalized diet plans based on BMI and user metrics."
                    link="#"
                />
            </ul>

            {/* Remaining projects */}
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-12">
                {/* 8. More Projects */}
                <GridItem
                    area="md:col-span-12"
                    icon={<ArrowRight className="h-4 w-4" />}
                    title="More Projects"
                    description="Constantly building and exploring new technologies. Check GitHub for latest updates."
                    link="https://github.com/Vishnu-kashyap-D"
                />

                {/* 9. Key Achievements */}
                <GridItem
                    area="md:col-span-12"
                    icon={<Trophy className="h-4 w-4" />}
                    title="Key Achievements"
                    description="Winner of 4+ Hackathons & CTF Championships. Active Open Source contributor."
                    link="#"
                />
            </ul>
        </div>
    );
}

interface GridItemProps {
    area?: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
    link?: string;
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
    imageAlt?: string;
}

const GridItem = ({ area, icon, title, description, link = "#", githubUrl, liveUrl, image, imageAlt }: GridItemProps) => {
    // Most cards are a single full-card link (matches every existing
    // project). A card can opt into two separate actions instead by passing
    // githubUrl/liveUrl — cards that don't pass them render exactly as before.
    const hasDualActions = Boolean(githubUrl || liveUrl);
    const isLink = !hasDualActions && link !== "#";
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
                <div className="relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] bg-background/50 backdrop-blur-sm shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] transition-colors hover:bg-background/80">
                    {image && (
                        <div className="relative w-full aspect-video shrink-0 overflow-hidden border-b-[0.75px] border-border bg-muted">
                            <Image
                                src={image}
                                alt={imageAlt ?? `${title} homepage screenshot`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                                className="object-cover object-top"
                            />
                        </div>
                    )}
                    <div className={cn("relative flex flex-1 flex-col justify-between gap-3 p-6", image && "gap-2")}>
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
                            {hasDualActions && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {githubUrl && (
                                        <Button asChild variant="outline" size="sm">
                                            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                                <Github /> GitHub
                                            </a>
                                        </Button>
                                    )}
                                    {liveUrl && (
                                        <Button asChild variant="outline" size="sm">
                                            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink /> Live Demo
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <li className={cn("min-h-[14rem] list-none group", image && "min-h-[22rem]", area)}>
            {isLink ? (
                <Link href={link} target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
                    {Content}
                </Link>
            ) : hasDualActions ? (
                <div className="h-full">{Content}</div>
            ) : (
                <div className="h-full select-none cursor-default">{Content}</div>
            )}
        </li>
    );
};
