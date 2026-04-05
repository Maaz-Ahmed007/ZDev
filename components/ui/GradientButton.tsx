// components/ui/GradientButton.tsx
'use client';

import React, { useRef, useState, useCallback } from 'react';
import {
    cn,
    getRelativeMousePos,
    cursorSpotlight,
    gradients,
} from '@/lib/utils';

interface GradientButtonProps {
    href: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    external?: boolean;
}

const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm gap-2',
    md: 'px-6 py-3 text-sm gap-2.5',
    lg: 'px-8 py-4 text-base gap-3',
};

const GradientButton: React.FC<GradientButtonProps> = ({
    href,
    children,
    icon,
    size = 'md',
    className,
    external = false,
}) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (!ref.current) return;
            const pos = getRelativeMousePos(e, ref.current);
            setMousePos(pos);
        },
        [],
    );

    const linkProps = external
        ? { target: '_blank' as const, rel: 'noopener noreferrer' }
        : {};

    return (
        <a
            ref={ref}
            href={href}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                'group relative inline-flex items-center justify-center rounded-full font-semibold overflow-hidden',
                sizeStyles[size],
                className,
            )}
            {...linkProps}
        >
            {/* Static gradient background */}
            <div
                className="absolute inset-0"
                style={{
                    background: gradients.brand,
                    backgroundSize: '200% 200%',
                }}
            />

            {/* Cursor spotlight */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: cursorSpotlight(mousePos.x, mousePos.y),
                    transition: 'opacity 0.25s ease',
                }}
            />

            {/* Subtle outer glow */}
            <div
                className="absolute inset-0 opacity-30 group-hover:opacity-60"
                style={{
                    background:
                        'linear-gradient(135deg, var(--brand-violet), var(--brand-blue))',
                    filter: 'blur(20px)',
                    transition: 'opacity 0.4s ease',
                }}
            />

            {/* Shine sweep */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
                <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full skew-x-[-15deg]"
                    style={{
                        background: gradients.shine,
                        transition:
                            'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
                    }}
                />
            </div>

            {/* Content */}
            <span className="relative z-10 text-white inline-flex items-center gap-2">
                {children}
            </span>
            {icon && <span className="relative z-10 text-white">{icon}</span>}
        </a>
    );
};

export default GradientButton;
