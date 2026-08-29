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
        <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs">
                <span className="text-neutral-300">{label}</span>
                <span className="text-neutral-500 tabular-nums">
                    {solved}/{total}
                </span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
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
        <div
            className={cn(
                "w-full h-full rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-white/5 p-5 flex flex-col",
                className
            )}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-white">LeetCode</h3>
                <Link
                    href={PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-neutral-500 hover:text-amber-400 transition-colors group"
                >
                    Profile
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
            </div>

            {stats ? (
                <div className="flex flex-col gap-4 flex-1 justify-center">
                    <div>
                        <div className="text-3xl font-bold text-white tabular-nums leading-none">
                            {stats.totalSolved}
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">
                            of {stats.totalQuestions} solved
                            {stats.ranking ? ` · Rank #${stats.ranking.toLocaleString()}` : ""}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <DifficultyBar label="Easy" solved={stats.easySolved} total={stats.easyTotal} colorClass="bg-green-500" />
                        <DifficultyBar label="Medium" solved={stats.mediumSolved} total={stats.mediumTotal} colorClass="bg-amber-500" />
                        <DifficultyBar label="Hard" solved={stats.hardSolved} total={stats.hardTotal} colorClass="bg-red-500" />
                    </div>
                </div>
            ) : failed ? (
                <p className="text-neutral-500 text-xs flex-1 flex items-center">Live stats unavailable right now.</p>
            ) : (
                <p className="text-neutral-500 text-xs flex-1 flex items-center">Loading…</p>
            )}
        </div>
    );
}
