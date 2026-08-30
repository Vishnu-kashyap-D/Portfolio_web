"use client";

import React from "react";
import dynamic from "next/dynamic";

const GithubHeatmap = dynamic(
    () => import("@/components/ui/github-heatmap").then((mod) => mod.GithubHeatmap),
    { ssr: false }
);

const LeetcodeStats = dynamic(
    () => import("@/components/ui/leetcode-stats").then((mod) => mod.LeetcodeStats),
    { ssr: false }
);

export function CodingActivitySection() {
    return (
        <section id="coding-activity" className="container mx-auto py-24 px-4 relative z-10">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-900/10 blur-[120px] rounded-full -z-10" />

            <div className="mb-8">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">Coding Activity</h2>
                <p className="text-muted-foreground text-lg">
                    A snapshot of my problem solving and open-source contributions.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <LeetcodeStats />
                <GithubHeatmap />
            </div>
        </section>
    );
}
