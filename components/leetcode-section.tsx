"use client";

import React from "react";
import dynamic from "next/dynamic";

const LeetcodeStats = dynamic(
    () => import("@/components/ui/leetcode-stats").then((mod) => mod.LeetcodeStats),
    { ssr: false }
);

export function LeetcodeSection() {
    return (
        <section className="container mx-auto py-24 px-4 relative z-10">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-amber-900/20 blur-[120px] rounded-full -z-10" />

            <LeetcodeStats />
        </section>
    );
}
