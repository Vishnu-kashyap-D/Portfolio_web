"use client";
import React, { useState } from "react";
import OrbitingSkills from "@/components/ui/orbiting-skills";
import ShinyButton from "@/components/ui/shiny-button";
import { SkillsTabs } from "@/components/ui/skills-tabs";
import { motion, AnimatePresence } from "motion/react";
import {
    SiPython, SiC, SiCplusplus, SiMysql, SiLatex, SiHtml5, SiCss3,
    SiTensorflow, SiPytorch, SiScikitlearn, SiOpencv, SiReact, SiTailwindcss, SiPandas,
    SiDocker, SiGooglecloud, SiGit, SiGithub, SiLinux, SiNotion, SiDavinciresolve, SiCanva, SiNodedotjs
} from "react-icons/si";
import { BiNetworkChart, BiBrain, BiVideo } from "react-icons/bi";
import { Globe, Code, Scan, Cloud } from "lucide-react";


// Skill Data Structure
const skillsData = {
    languages: [
        { name: "Python", icon: <SiPython className="text-blue-400" /> },
        { name: "C", icon: <SiC className="text-blue-600" /> },
        { name: "C++", icon: <SiCplusplus className="text-blue-700" /> },
        { name: "SQL", icon: <SiMysql className="text-orange-500" /> },
        { name: "MATLAB", icon: <Code className="text-orange-600" /> }, // Fallback to Code
        { name: "LaTeX", icon: <SiLatex className="text-white" /> }, // LaTeX often white/black
        { name: "HTML", icon: <SiHtml5 className="text-orange-600" /> },
        { name: "CSS", icon: <SiCss3 className="text-blue-500" /> },
    ],
    frameworks: [
        { name: "TensorFlow", icon: <SiTensorflow className="text-orange-500" /> },
        { name: "PyTorch", icon: <SiPytorch className="text-red-500" /> },
        { name: "scikit-learn", icon: <SiScikitlearn className="text-orange-400" /> },
        { name: "OpenCV", icon: <SiOpencv className="text-green-500" /> },
        { name: "YOLO", icon: <Scan className="text-blue-500" /> }, // Fallback to Scan
        { name: "MediaPipe", icon: <BiNetworkChart className="text-teal-400" /> }, // Fallback/Best fit
        { name: "React", icon: <SiReact className="text-cyan-400" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
        { name: "Pandas", icon: <SiPandas className="text-purple-600" /> },
    ],
    tools: [
        { name: "Docker", icon: <SiDocker className="text-blue-500" /> },
        { name: "Azure", icon: <Cloud className="text-blue-600" /> }, // Fallback to Cloud
        { name: "GCP", icon: <SiGooglecloud className="text-red-500" /> },
        { name: "Git", icon: <SiGit className="text-orange-600" /> },
        { name: "GitHub", icon: <SiGithub className="text-white" /> },
        { name: "Linux", icon: <SiLinux className="text-yellow-400" /> },
        { name: "VS Code", icon: <Code className="text-blue-500" /> }, // Fallback to Code
        { name: "Notion", icon: <SiNotion className="text-white" /> },
        { name: "DaVinci Resolve", icon: <SiDavinciresolve className="text-purple-500" /> },
        { name: "Canva", icon: <SiCanva className="text-cyan-400" /> },
    ],
    domains: [
        { name: "Computer Vision", icon: <SiOpencv className="text-green-500" /> },
        { name: "NLP", icon: <BiBrain className="text-yellow-500" /> },
        { name: "Deep Learning", icon: <BiBrain className="text-yellow-500" /> }, // Reusing Brain
        { name: "Web Dev", icon: <Globe className="text-blue-400" /> },
        { name: "Video Editing", icon: <BiVideo className="text-purple-400" /> },
    ],
};

const tabs = [
    { id: "languages", label: "Languages" },
    { id: "frameworks", label: "Frameworks" },
    { id: "tools", label: "Tools" },
    { id: "domains", label: "Domains" },
];

export function SkillsSection() {
    const [activeTab, setActiveTab] = useState("languages");

    return (
        <section id="skills" className="container mx-auto py-24 px-4 relative z-10 min-h-[600px] flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center md:text-left">Technical Arsenal</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* LEFT SIDE: Skills Categories & Tabs */}
                <div className="flex flex-col items-center md:items-start space-y-8">

                    {/* Tabs */}
                    <SkillsTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* Dynamic Content */}
                    <div className="relative w-full min-h-[200px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-wrap gap-4 justify-center md:justify-start"
                            >
                                {/* @ts-ignore */}
                                {skillsData[activeTab].map((skill: any) => (
                                    <ShinyButton
                                        key={skill.name}
                                        text={skill.name}
                                        icon={skill.icon}
                                        variant={
                                            activeTab === 'languages' ? 'red' :
                                                activeTab === 'frameworks' ? 'indigo' :
                                                    activeTab === 'tools' ? 'green' : 'default'
                                        }
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

                {/* RIGHT SIDE: Orbiting Animation */}
                <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center border-l-0 lg:border-l border-white/5">
                    <OrbitingSkills />
                </div>

            </div>
        </section>
    );
}
