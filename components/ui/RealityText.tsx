// components/ui/RealityText.tsx
'use client';

import React from 'react';

interface Props {
    isLoaded?: boolean;
    className?: string;
}

const RealityText: React.FC<Props> = React.memo(({ isLoaded = true, className = '' }) => (
    <span className={`relative inline-block ${className}`}>
        {/* Gradient text */}
        <span
            className="relative z-10 block pr-[0.15em] pb-[0.05em]"
            style={{
                background: `linear-gradient(90deg,
          #c4a0ff 0%,  #a078f5 15%, #7b9cf5 30%,
          #4895ef 45%, #60d4f5 55%, #4895ef 68%,
          #a078f5 82%, #c4a0ff 100%
        )`,
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                animation: 'reality-flow 6s ease-in-out infinite',
            }}
        >
            Reality
        </span>

        {/* Soft glow layer — same text, blurred */}
        <span
            className="absolute inset-0 z-0 blur-xl opacity-25 pointer-events-none select-none pr-[0.15em] pb-[0.05em]"
            aria-hidden="true"
            style={{
                background: `linear-gradient(90deg,
          rgba(160,120,245,0.6), rgba(72,149,239,0.5), rgba(160,120,245,0.6)
        )`,
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                animation: 'reality-flow 6s ease-in-out infinite',
            }}
        >
            Reality
        </span>

        {/* Curved underline */}
        <svg
            className="absolute left-0 w-[calc(100%-0.15em)]"
            style={{ bottom: '-6px', height: '10px' }}
            viewBox="0 0 200 8"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="ul-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A078F5" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#4895EF" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#A078F5" stopOpacity="0.4" />
                </linearGradient>
            </defs>
            <path
                d="M0,4 Q50,7.5 100,4 T200,4"
                fill="none"
                stroke="url(#ul-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                    strokeDasharray: 200,
                    strokeDashoffset: isLoaded ? 0 : 200,
                    transition: 'stroke-dashoffset 1.1s ease-out 0.9s',
                }}
            />
        </svg>
    </span>
));

RealityText.displayName = 'RealityText';
export default RealityText;
