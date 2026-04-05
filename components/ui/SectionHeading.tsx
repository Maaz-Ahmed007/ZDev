// components/ui/SectionHeading.tsx
'use client';

import React from 'react';
import { cn, gradients } from '@/lib/utils';

interface SectionHeadingProps {
    label?: string;
    title: string;
    highlight?: string;
    description?: string;
    align?: 'left' | 'center';
    className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
    label,
    title,
    highlight,
    description,
    align = 'center',
    className,
}) => {
    return (
        <div
            className={cn(
                'mb-16',
                align === 'center' && 'text-center',
                align === 'left' && 'text-left',
                className,
            )}
        >
            {/* Top label / tag */}
            {label && (
                <div
                    className={cn(
                        'inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6',
                        'border text-xs font-semibold uppercase tracking-[0.2em]',
                    )}
                    style={{
                        borderColor: 'rgba(160, 120, 245, 0.2)',
                        backgroundColor: 'rgba(160, 120, 245, 0.05)',
                        color: 'var(--brand-violet)',
                    }}
                >
                    {/* Animated dot */}
                    <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                            backgroundColor: 'var(--brand-violet)',
                            boxShadow: '0 0 8px rgba(160, 120, 245, 0.5)',
                        }}
                    />
                    {label}
                </div>
            )}

            {/* Title with optional gradient highlight */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                {title}
                {highlight && (
                    <>
                        {' '}
                        <span
                            style={{
                                background: gradients.brandText,
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            {highlight}
                        </span>
                    </>
                )}
            </h2>

            {/* Description */}
            {description && (
                <p
                    className={cn(
                        'mt-4 text-gray-500 text-base md:text-lg leading-relaxed',
                        align === 'center' && 'max-w-2xl mx-auto',
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeading;
