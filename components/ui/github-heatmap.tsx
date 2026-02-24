"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GitHubCalendar } from "react-github-calendar";

interface GithubHeatmapProps {
    className?: string;
}

export function GithubHeatmap({ className }: GithubHeatmapProps) {
    const explicitTheme = {
        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['#171717', '#172554', '#1e40af', '#3b82f6', '#22d3ee'], // Matched to the previous blue/cyan theme
    };

    return (
        <div className={cn("w-full relative", className)}>
            {/* Header with Title */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-8 gap-8 relative z-50">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 tracking-wider">
                            GITHUB CONTRIBUTIONS & ACTIVITY
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Open Source
                    </h2>
                    <p className="text-neutral-400 max-w-lg">
                        Snapshot of my open-source activity and contributions from GitHub over the last year.
                    </p>
                </div>
            </div>

            {/* Heatmap Card */}
            <div className="w-full p-6 md:p-8 rounded-3xl bg-neutral-900/50 backdrop-blur-sm border border-white/5 relative overflow-x-auto custom-scrollbar flex justify-center text-white">
                <div className="min-w-[800px] flex justify-center py-4">
                    <GitHubCalendar
                        username="Vishnu-kashyap-D"
                        colorScheme="dark"
                        theme={explicitTheme}
                        fontSize={12}
                        blockSize={12}
                        blockMargin={4}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row justify-end items-center mt-6 gap-4">
                <Link
                    href="https://github.com/Vishnu-kashyap-D"
                    target="_blank"
                    className="flex items-center gap-2 text-xs text-neutral-500 hover:text-cyan-400 transition-colors group"
                >
                    View full profile on GitHub
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
            </div>
        </div>
    );
}
