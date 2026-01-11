"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Github, Linkedin, Instagram, Mail, FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type AboutCardData = {
    id: string | number;
    type: "profile" | "social";
    content: {
        bio?: string;
        name?: string;
        email?: string;
        location?: string;
        availability?: string;
        socials?: {
            platform: string;
            url: string;
            icon: React.ReactNode;
            handle?: string;
        }[];
    };
};

interface AboutSliderProps {
    cards: AboutCardData[];
    className?: string;
}

export const AboutSlider = ({ cards, className }: AboutSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<"left" | "right">("right");

    const activeCard = cards[currentIndex];

    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    const handlePrev = () => {
        setDirection("left");
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const variants = {
        enter: (direction: "left" | "right") => ({
            x: direction === "right" ? 50 : -50,
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction: "left" | "right") => ({
            x: direction === "right" ? -50 : 50,
            opacity: 0,
        }),
    };

    return (
        <div className={cn("relative w-full min-h-[500px] bg-card/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 pt-20 md:p-12 md:pt-24 overflow-hidden", className)}>

            {/* Navigation - Absolute Top Right */}
            <div className="absolute top-6 right-6 flex gap-2 z-20">
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 bg-transparent border-white/20 hover:bg-white/10" onClick={handlePrev}>
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 bg-transparent border-white/20 hover:bg-white/10" onClick={handleNext}>
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            <div className="h-full flex flex-col justify-center">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="w-full"
                    >
                        {activeCard.type === "profile" && (
                            <div className="flex flex-col gap-8">
                                <div className="space-y-6">
                                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                        {activeCard.content.bio}
                                    </p>
                                </div>

                                <div className="h-px w-full bg-border/50" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Name</span>
                                        <h4 className="text-xl font-semibold">{activeCard.content.name}</h4>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Email</span>
                                        <h4 className="text-xl font-semibold">{activeCard.content.email}</h4>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Location</span>
                                        <h4 className="text-xl font-semibold">{activeCard.content.location}</h4>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Availability</span>
                                        <h4 className="text-xl font-semibold text-green-500">{activeCard.content.availability}</h4>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                                    <a href="/RESUME.VK.pdf" download className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                                        Download Resume <Download className="w-4 h-4" />
                                    </a>
                                    <div className="flex gap-4">
                                        {activeCard.content.socials?.map((social, idx) => (
                                            <a key={idx} href={social.url} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/20 transition-colors border border-white/10">
                                                {social.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeCard.type === "social" && (
                            <div className="flex flex-col gap-8 items-center justify-center text-center min-h-[400px]">
                                <h3 className="text-3xl md:text-4xl font-bold">Connect With Me</h3>
                                <p className="text-xl text-muted-foreground max-w-lg">
                                    Feel free to reach out for collaborations, opportunities, or just to say hi!
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mt-8">
                                    {activeCard.content.socials?.map((social, idx) => (
                                        <a key={idx} href={social.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10 group">
                                            <div className="p-3 bg-primary/20 rounded-full text-primary group-hover:scale-110 transition-transform">
                                                {social.icon}
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold text-lg">{social.platform}</div>
                                                <div className="text-sm text-muted-foreground">{social.handle}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Indicator */}
            <div className="absolute top-6 left-6 text-sm font-mono text-muted-foreground">
                {String(currentIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
            </div>
        </div>
    );
};
