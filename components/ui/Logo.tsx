// components/ui/Logo.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeMap = {
    sm: { text: 'text-xl', dot: 'w-1 h-1' },
    md: { text: 'text-2xl', dot: 'w-1.5 h-1.5' },
    lg: { text: 'text-3xl', dot: 'w-2 h-2' },
};

const Logo: React.FC<LogoProps> = ({ size = 'md', className }) => {
    const s = sizeMap[size];

    return (
        <Link
            href="/"
            className={cn('group relative flex items-center', className)}
        >
            <div className="relative">
                <span className={cn(s.text, 'font-bold tracking-tight')}>
                    <span className="text-white transition-colors duration-300">
                        Z
                    </span>
                    <span className="text-white/50 group-hover:text-white/80 transition-colors duration-300">
                        Dev
                    </span>
                </span>

                {/* Animated underline */}
                <div className="absolute -bottom-1 left-0 w-full h-[2px] overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                    />
                    <div
                        className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100
                       transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                            background:
                                'linear-gradient(90deg, var(--brand-violet), var(--brand-blue))',
                        }}
                    />
                </div>

                {/* Hover glow */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100
                     transition-opacity duration-500 blur-lg -z-10"
                    style={{
                        background:
                            'linear-gradient(90deg, rgba(160,120,245,0.3), rgba(72,149,239,0.2))',
                    }}
                />
            </div>

            {/* Animated dot */}
            <div className="relative ml-1 mb-3">
                <span
                    className={cn(
                        s.dot,
                        'block rounded-full transition-all duration-300 group-hover:scale-125',
                    )}
                    style={{ backgroundColor: 'var(--brand-violet)' }}
                />
                <span
                    className={cn(
                        s.dot,
                        'absolute inset-0 rounded-full animate-ping opacity-40',
                    )}
                    style={{ backgroundColor: 'var(--brand-violet)' }}
                />
            </div>
        </Link>
    );
};

export default Logo;
