"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GitHubCalendar } from "react-github-calendar";

interface GithubHeatmapProps {
    className?: string;
}

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export function GithubHeatmap({ className }: GithubHeatmapProps) {
    const explicitTheme = {
        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['#171717', '#172554', '#1e40af', '#3b82f6', '#22d3ee'], // Matched to the previous blue/cyan theme
    };

    // react-github-calendar only fetches on mount, so force a remount on an
    // interval to pick up new contributions without a page reload.
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setRefreshKey((k) => k + 1), REFRESH_INTERVAL_MS);
        return () => clearInterval(id);
    }, []);

    return (
        <div
            className={cn(
                "w-full h-full rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-white/5 p-5 flex flex-col",
                className
            )}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-white">GitHub</h3>
                <Link
                    href="https://github.com/Vishnu-kashyap-D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-neutral-500 hover:text-cyan-400 transition-colors group"
                >
                    Profile
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
            </div>

            <div className="flex-1 flex items-center overflow-x-auto custom-scrollbar text-white">
                <div className="min-w-[600px] w-full">
                    <GitHubCalendar
                        key={refreshKey}
                        username="Vishnu-kashyap-D"
                        colorScheme="dark"
                        theme={explicitTheme}
                        fontSize={10}
                        blockSize={8}
                        blockMargin={2}
                        showColorLegend={false}
                        showTotalCount={false}
                    />
                </div>
            </div>
        </div>
    );
}
