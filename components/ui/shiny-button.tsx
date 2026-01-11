import React from 'react';
import clsx from 'clsx';

type Variant = 'default' | 'green' | 'indigo' | 'red';

interface FancyButtonProps {
    icon: React.ReactNode;
    text: string;
    variant?: Variant;
    onClick?: () => void;
    className?: string;
    ariaLabel?: string;
}

const variantClasses: Record<Variant, string> = {
    default: `
    border-white/10 hover:border-white/30 
    bg-gradient-to-tr from-black/60 to-black/40 
    hover:bg-gradient-to-tr hover:from-white/10 hover:to-black/40 
    hover:shadow-white/20`,
    green: `
    border-green-500/20 hover:border-green-500/50 
    bg-gradient-to-tr from-black/60 to-black/40 
    hover:bg-gradient-to-tr hover:from-green-500/10 hover:to-black/40 
    hover:shadow-green-500/30`,
    indigo: `
    border-indigo-500/20 hover:border-indigo-500/50 
    bg-gradient-to-tr from-black/60 to-black/40 
    hover:bg-gradient-to-tr hover:from-indigo-500/10 hover:to-black/40 
    hover:shadow-indigo-500/30`,
    red: `
    border-red-500/20 hover:border-red-500/50 
    bg-gradient-to-tr from-black/60 to-black/40 
    hover:bg-gradient-to-tr hover:from-red-500/10 hover:to-black/40 
    hover:shadow-red-500/30`,
};

const glowGradientClasses: Record<Variant, string> = {
    default: 'via-white/10',
    green: 'via-green-400/20',
    indigo: 'via-indigo-400/20',
    red: 'via-red-400/20',
};

const ShinyButton: React.FC<FancyButtonProps> = ({
    icon,
    text,
    variant = 'default',
    onClick,
    className = '',
    ariaLabel,
}) => {
    return (
        <div
            onClick={onClick}
            aria-label={ariaLabel || text}
            className={clsx(
                'px-6 py-3 rounded-xl backdrop-blur-lg shadow-lg transition-all duration-300 ease-out cursor-default group relative overflow-hidden flex items-center gap-3 border',
                'hover:scale-105 active:scale-95 hover:shadow-xl',
                variantClasses[variant],
                className
            )}
        >
            <div
                className={clsx(
                    'absolute inset-0 bg-gradient-to-r from-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out',
                    glowGradientClasses[variant]
                )}
            />
            <div className="relative z-10 flex items-center justify-center text-lg">{icon}</div>
            <span className="relative z-10 text-base font-medium text-white/90">{text}</span>
        </div>
    );
};

export default ShinyButton;
