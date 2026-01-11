"use client";

import { cn } from "@/lib/utils";

interface CircleProps {
    className?: string;
    children?: React.ReactNode;
    reverse?: boolean;
}

export function InnerCircle({ className, children, reverse }: CircleProps) {
    return (
        <>
            <div className={cn("absolute flex size-[200px] animate-spin-slow rounded-full border border-white/10", reverse && "animate-spin-slow-reverse", className)}>
                {children}
            </div>
        </>
    );
}

export function OuterCircle({ className, children, reverse }: CircleProps) {
    return (
        <>
            <div className={cn("absolute flex size-[400px] animate-spin-slow rounded-full border border-white/10", reverse && "animate-spin-slow-reverse", className)}>
                {children}
            </div>
        </>
    );
}

interface OrbitingIconProps {
    className?: string;
    radius: number;
    duration?: number;
    delay?: number;
    reverse?: boolean;
    children?: React.ReactNode;
}

export function OrbitingIcon({ className, radius, duration = 20, delay = 0, reverse, children }: OrbitingIconProps) {
    const cssDuration = `${duration}s`;
    const cssDelay = `-${delay}s`;
    const rotationDirection = reverse ? 1 : -1;

    return (
        <div
            className={cn("absolute flex h-full w-full items-center justify-center pointer-events-none", className)}
            style={{
                transform: `rotate(${delay * 20}deg)`, // Initial offset
            }}
        >
            <div
                className="absolute flex items-center justify-center p-2 rounded-full border border-white/10 bg-black/10 backdrop-blur-sm"
                style={{
                    transform: `translate(${radius}px) rotate(${-delay * 20}deg)`, // Counter rotate to keep upright if needed, or primarily to position on circle
                }}
            >
                {children}
            </div>
        </div>
    );
}
