// components/ui/TechStack.tsx
'use client';

import React, { useState } from 'react';
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiFigma,
    SiFramer,
} from 'react-icons/si';
import { TECHNOLOGIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Icon mapping (keeps icons out of constants — they're not serializable)
const TECH_ICONS: Record<
    string,
    React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
    'Next.js': SiNextdotjs,
    React: SiReact,
    TypeScript: SiTypescript,
    Tailwind: SiTailwindcss,
    Figma: SiFigma,
    Framer: SiFramer,
};

// Single card
const TechCard: React.FC<{ tech: (typeof TECHNOLOGIES)[number] }> = ({
    tech,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = TECH_ICONS[tech.name];
    if (!Icon) return null;

    return (
        <div
            className="group relative flex flex-col items-center cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="relative p-3 rounded-xl border transition-all duration-300 ease-out"
                style={{
                    backgroundColor: isHovered
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(255,255,255,0.02)',
                    borderColor: isHovered
                        ? 'rgba(255,255,255,0.15)'
                        : 'rgba(255,255,255,0.05)',
                    transform: isHovered
                        ? 'scale(1.1) translateY(-4px)'
                        : 'scale(1) translateY(0)',
                    boxShadow: isHovered
                        ? `0 0 25px 8px ${tech.shadowColor}`
                        : 'none',
                }}
            >
                <Icon
                    className="w-7 h-7 transition-colors duration-300 ease-out"
                    style={{ color: isHovered ? tech.color : '#4b5563' }}
                />
            </div>

            <span
                className="mt-2 text-[10px] font-medium transition-all duration-300 ease-out"
                style={{
                    color: '#4b5563',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
                }}
            >
                {tech.name}
            </span>
        </div>
    );
};

// Main component
interface TechStackProps {
    visible?: boolean;
    className?: string;
}

const TechStack: React.FC<TechStackProps> = ({ visible = true, className }) => {
    return (
        <div
            className={cn(
                'pt-10 border-t w-full max-w-2xl transition-all duration-500 ease-out',
                visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4',
                className,
            )}
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
            <p className="text-gray-600 text-xs uppercase tracking-[0.2em] mb-8 font-medium text-center">
                Built With
            </p>

            <div className="flex items-center justify-center gap-x-14 md:gap-8 flex-wrap">
                {TECHNOLOGIES.map((tech) => (
                    <TechCard key={tech.name} tech={tech} />
                ))}
            </div>
        </div>
    );
};

export default TechStack;
