"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface LeetcodeStatsProps {
    className?: string;
}

const USERNAME = "Vishnu_Kashyap_D";
const PROFILE_URL = `https://leetcode.com/u/${USERNAME}/`;

interface Stats {
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    easyTotal: number;
    mediumSolved: number;
    mediumTotal: number;
    hardSolved: number;
    hardTotal: number;
    ranking: number | null;
}

function DifficultyBar({
    label,
    solved,
    total,
    colorClass,
}: {
    label: string;
    solved: number;
    total: number;
    colorClass: string;
}) {
    const pct = total > 0 ? Math.min(100, (solved / total) * 100) : 0;
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm">
                <span className="text-neutral-300">{label}</span>
                <span className="text-neutral-400 tabular-nums">
                    {solved} / {total}
                </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <div className={cn("h-full rounded-full", colorClass)} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

export function LeetcodeStats({ className }: LeetcodeStatsProps) {
    const [stats, setStats] = useState<Stats | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const res = await fetch(`/api/leetcode?username=${USERNAME}`);
                if (!res.ok) throw new Error("request failed");
                const data = await res.json();
                if (!cancelled) {
                    setStats(data);
                    setFailed(false);
                }
            } catch {
                if (!cancelled) setFailed(true);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className={cn("w-full relative", className)}>
            {/* Header with Title */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-8 gap-8 relative z-50">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300 tracking-wider">
                            COMPETITIVE PROGRAMMING
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Problem Solving
                    </h2>
                    <p className="text-neutral-400 max-w-lg">
                        Snapshot of my LeetCode progress across difficulty levels.
                    </p>
                </div>
            </div>

            {/* Stats Card */}
            <div className="w-full p-6 md:p-8 rounded-3xl bg-neutral-900/50 backdrop-blur-sm border border-white/5 relative text-white">
                {stats ? (
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        <div className="flex flex-col items-center md:items-start gap-1 shrink-0">
                            <div className="text-5xl font-bold tabular-nums">{stats.totalSolved}</div>
                            <div className="text-sm text-neutral-400">
                                of {stats.totalQuestions} problems solved
                            </div>
                            {stats.ranking && (
                                <div className="text-xs text-neutral-500 mt-2">
                                    Rank #{stats.ranking.toLocaleString()}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-4 w-full max-w-sm">
                            <DifficultyBar
                                label="Easy"
                                solved={stats.easySolved}
                                total={stats.easyTotal}
                                colorClass="bg-green-500"
                            />
                            <DifficultyBar
                                label="Medium"
                                solved={stats.mediumSolved}
                                total={stats.mediumTotal}
                                colorClass="bg-amber-500"
                            />
                            <DifficultyBar
                                label="Hard"
                                solved={stats.hardSolved}
                                total={stats.hardTotal}
                                colorClass="bg-red-500"
                            />
                        </div>
                    </div>
                ) : failed ? (
                    <p className="text-neutral-400 text-sm py-6 text-center md:text-left">
                        Live stats are unavailable right now — check out the full profile below.
                    </p>
                ) : (
                    <p className="text-neutral-500 text-sm py-6 text-center md:text-left">Loading stats…</p>
                )}
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row justify-end items-center mt-6 gap-4">
                <Link
                    href={PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-neutral-500 hover:text-amber-400 transition-colors group"
                >
                    View full profile on LeetCode
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
            </div>
        </div>
    );
}
