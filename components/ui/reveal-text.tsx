"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface RevealTextProps {
    text?: string;
    textColor?: string;
    overlayColor?: string;
    fontSize?: string;
    letterDelay?: number;
    overlayDelay?: number;
    overlayDuration?: number;
    springDuration?: number;
    letterImages?: string[];
}

export function RevealText({
    text = "VISHNU",
    textColor = "text-foreground",
    overlayColor = "text-primary",
    fontSize = "text-6xl md:text-9xl",
    letterDelay = 0.08,
    overlayDelay = 0.05,
    overlayDuration = 0.4,
    springDuration = 600,
    letterImages = [
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
        "https://images.unsplash.com/photo-1531297461136-82lw9z1l3715?w=800&q=80",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    ]
}: RevealTextProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => { setShowOverlay(true); }, (text.length * letterDelay * 1000) + springDuration);
        return () => clearTimeout(timer);
    }, [text.length, letterDelay, springDuration]);

    return (
        <div className="flex relative cursor-default select-none">
            {text.split("").map((letter, index) => (
                <motion.span
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`${fontSize} font-black tracking-tighter relative overflow-hidden ${letter === " " ? "w-4 md:w-8" : ""}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        delay: index * letterDelay,
                        type: "spring",
                        damping: 12,
                        stiffness: 200,
                    }}
                >
                    <motion.span className={`absolute inset-0 ${textColor}`} animate={{ opacity: hoveredIndex === index ? 0 : 1 }}>
                        {letter}
                    </motion.span>
                    <motion.span
                        className="text-transparent bg-clip-text bg-cover"
                        style={{ backgroundImage: `url('${letterImages[index % letterImages.length]}')` }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    >
                        {letter}
                    </motion.span>
                    {showOverlay && (
                        <motion.span
                            className={`absolute inset-0 ${overlayColor}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 1, 0] }}
                            transition={{ delay: index * overlayDelay, duration: overlayDuration, times: [0, 0.1, 0.7, 1] }}
                        >
                            {letter}
                        </motion.span>
                    )}
                </motion.span>
            ))}
        </div>
    );
}
