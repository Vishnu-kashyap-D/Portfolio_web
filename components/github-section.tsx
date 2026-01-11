"use client";

import React from "react";
import { GithubHeatmap } from "@/components/ui/github-heatmap";

export function GithubSection() {
    return (
        <section className="container mx-auto py-24 px-4 relative z-10">
            {/* Background Glow - Updated to Blue/Cyan */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-900/20 blur-[120px] rounded-full -z-10" />

            <GithubHeatmap />
        </section>
    );
}
