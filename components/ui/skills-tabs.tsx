"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Tab {
    id: string;
    label: string;
}

interface SkillsTabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
}

export function SkillsTabs({ tabs, activeTab, onTabChange }: SkillsTabsProps) {
    return (
        <div className="flex space-x-1 rounded-full bg-secondary/50 p-1 backdrop-blur-sm">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                        "relative rounded-full px-4 py-1.5 text-sm font-medium transition focus-visible:outline-2",
                        activeTab === tab.id ? "text-white" : "text-muted-foreground hover:text-white"
                    )}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                >
                    {activeTab === tab.id && (
                        <motion.span
                            layoutId="bubble"
                            className="absolute inset-0 z-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mix-blend-overlay" // mix-blend to allow text to show? No, easier to just place it behind
                            style={{ borderRadius: 9999 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    {activeTab === tab.id && (
                        <motion.span
                            layoutId="bubble-bg"
                            className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg"
                            style={{ borderRadius: 9999 }}
                            initial={false}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-20">{tab.label}</span>
                </button>
            ))}
        </div>
    );
}
