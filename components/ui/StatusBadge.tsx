// components/ui/StatusBadge.tsx
'use client';

import React, { useRef, useState, useCallback } from 'react';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { cn, getRelativeMousePos, cursorSpotlight } from '@/lib/utils';

interface StatusBadgeProps {
    text?: string;
    visible?: boolean;
    className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
    text = 'Available for hire',
    visible = true,
    className,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!ref.current || !spotlightRef.current) return;
            const pos = getRelativeMousePos(e, ref.current);
            spotlightRef.current.style.background = cursorSpotlight(
                pos.x,
                pos.y,
                120,
                'rgba(160,120,245,0.15)', // violet spotlight
            );
        },
        [],
    );

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
                setIsHovered(true);
                if (spotlightRef.current) spotlightRef.current.style.opacity = '1';
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
            }}
            className={cn(
                'relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full cursor-default overflow-hidden',
                'border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                visible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-4 scale-95',
                className,
            )}
            style={{
                borderColor: isHovered
                    ? 'rgba(160, 120, 245, 0.4)' // violet border
                    : 'rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.02)',
            }}
        >
            {/* Cursor spotlight (violet) */}
            <div
                ref={spotlightRef}
                className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
                style={{
                    opacity: 0,
                }}
            />

            {/* Green status dot */}
            <span className="relative flex h-2.5 w-2.5">
                <span
                    className="absolute inline-flex h-full w-full rounded-full animate-ping"
                    style={{
                        backgroundColor: '#4ade80',
                        opacity: isHovered ? 1 : 0.75,
                    }}
                />
                <span
                    className="relative inline-flex rounded-full h-2.5 w-2.5 transition-all duration-300"
                    style={{
                        backgroundColor: '#22c55e',
                        boxShadow: isHovered
                            ? '0 0 14px 5px rgba(74,222,128,0.5)'
                            : 'none',
                    }}
                />
            </span>

            {/* Text */}
            <span
                className="relative text-sm font-medium transition-colors duration-300"
                style={{ color: isHovered ? '#a078f5' : '#9ca3af' }}
            >
                {text}
            </span>

            {/* Sparkle */}
            <HiOutlineSparkles
                className="relative w-4 h-4 transition-all duration-300 ease-out"
                style={{
                    color: isHovered ? '#a078f5' : '#4b5563',
                    transform: isHovered
                        ? 'rotate(12deg) scale(1.1)'
                        : 'rotate(0) scale(1)',
                    opacity: isHovered ? 1 : 0.6,
                }}
            />
        </div>
    );
};

export default StatusBadge;
