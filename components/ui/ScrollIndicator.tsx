// components/ui/ScrollIndicator.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const SCROLL_KEYFRAMES = `
@keyframes scroll-dot {
  0% { opacity: 1; transform: translateY(0); }
  50% { opacity: 0.5; transform: translateY(4px); }
  100% { opacity: 0; transform: translateY(8px); }
}
@keyframes scroll-line {
  0% { transform: translateY(-100%); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(400%); opacity: 0; }
}
`;

interface ScrollIndicatorProps {
    targetId?: string;
    visible?: boolean;
    className?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
    targetId = 'work',
    visible = true,
    className,
}) => {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: SCROLL_KEYFRAMES }} />
            <div
                className={cn(
                    'hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 z-20',
                    'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    visible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4',
                    className,
                )}
            >
                <a
                    href={`#${targetId}`}
                    className="group flex flex-col items-center gap-2"
                >
                    <span
                        className="text-gray-600 text-[9px] uppercase tracking-[0.25em] font-medium
                         group-hover:text-gray-400 transition-colors duration-300"
                    >
                        Scroll
                    </span>

                    {/* Mouse icon */}
                    <div
                        className="relative w-5 h-8 rounded-full border-2 border-gray-700
                        group-hover:border-gray-500 transition-colors duration-300
                        flex items-start justify-center pt-1.5"
                    >
                        <div
                            className="w-1 h-1.5 rounded-full bg-gray-500
                        group-hover:bg-[var(--brand-violet)] transition-colors duration-300"
                            style={{
                                animation:
                                    'scroll-dot 1.5s ease-in-out infinite',
                            }}
                        />
                    </div>

                    {/* Animated line */}
                    <div
                        className="relative w-px h-6 overflow-hidden rounded-full"
                        style={{
                            background:
                                'linear-gradient(to bottom, rgba(55,65,81,0.5), transparent)',
                        }}
                    >
                        <div
                            className="absolute top-0 left-0 w-full h-2 rounded-full"
                            style={{
                                background:
                                    'linear-gradient(to bottom, var(--brand-violet), transparent)',
                                animation:
                                    'scroll-line 1.8s ease-in-out infinite',
                            }}
                        />
                    </div>
                </a>
            </div>
        </>
    );
};

export default ScrollIndicator;
