// components/landing/hero/MobileHero.tsx
'use client';

import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { HiOutlineSquares2X2, HiArrowLongRight } from 'react-icons/hi2';
import { GradientButton, OutlineButton } from '@/components/ui';
import StatusBadge from '@/components/ui/StatusBadge';
import { RealityText } from '@/components/ui';
import { gradients } from '@/lib/utils';

interface Props {
    isLoaded: boolean;
}

/* Scattered ambient dots */
const DOTS = [
    { top: '32%', left: '6%', s: 3, c: 'rgba(160,120,245,0.3)', d: '0s' },
    { top: '58%', left: '10%', s: 2.5, c: 'rgba(72,149,239,0.25)', d: '1.4s' },
    { top: '74%', right: '14%', s: 2, c: 'rgba(160,120,245,0.2)', d: '0.7s' },
    { top: '42%', right: '28%', s: 2, c: 'rgba(72,149,239,0.28)', d: '2.1s' },
    { top: '20%', right: '18%', s: 1.5, c: 'rgba(160,120,245,0.2)', d: '1.8s' },
] as const;

const MobileHero: React.FC<Props> = React.memo(({ isLoaded }) => (
    <div
        className="md:hidden relative overflow-hidden flex flex-col"
        style={{ minHeight: '100svh', backgroundColor: 'var(--bg-primary)' }}
    >
        {/* ═══ BACKGROUND ═══ */}
        <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
        >
            {/* Animated gradient mesh */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(ellipse 85% 50% at 50% 10%, rgba(160,120,245,0.13) 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 20% 80%, rgba(72,149,239,0.10)  0%, transparent 50%),
            radial-gradient(ellipse 55% 40% at 80% 60%, rgba(160,120,245,0.07) 0%, transparent 45%)
          `,
                    backgroundSize: '200% 200%',
                    animation: 'm-bg-shift 18s ease-in-out infinite',
                }}
            />

            {/* Subtle grid — top center only */}
            <div
                className="absolute top-0 left-0 right-0 h-40 opacity-[0.04]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
                    backgroundSize: '30px 30px',
                    maskImage: 'linear-gradient(to bottom, black, transparent)',
                    WebkitMaskImage:
                        'linear-gradient(to bottom, black, transparent)',
                }}
            />

            {/* Noise */}
            <div
                className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>

        {/* ═══ DECORATIONS ═══ */}
        <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
        >
            {/* Small orbiting dot — top area */}
            <div className="absolute top-[18%] left-1/2 -translate-x-1/2">
                <div className="relative w-2 h-2">
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'rgba(160,120,245,0.4)',
                            animation: 'm-orbit-small 5s linear infinite',
                        }}
                    />
                </div>
            </div>

            {/* Floating card — right */}
            <div
                className="absolute top-[22%] right-5"
                style={{
                    animation: isLoaded
                        ? 'm-float 9s ease-in-out infinite'
                        : 'none',
                }}
            >
                <div
                    className="relative w-14 h-14 rounded-2xl overflow-hidden"
                    style={{
                        border: '1px solid rgba(160,120,245,0.10)',
                        background: 'rgba(160,120,245,0.04)',
                    }}
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -skew-x-12"
                            style={{
                                animation:
                                    'm-card-shine 5s ease-in-out infinite 3s',
                            }}
                        />
                    </div>
                    <div
                        className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full"
                        style={{ background: 'rgba(160,120,245,0.3)' }}
                    />
                    <div
                        className="absolute bottom-2.5 right-2.5 w-4 h-1 rounded-full"
                        style={{ background: 'rgba(72,149,239,0.2)' }}
                    />
                </div>
            </div>

            {/* Pulsing rings — bottom right */}
            <div className="absolute bottom-[22%] right-7">
                <div className="relative w-3 h-3">
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'rgba(160,120,245,0.45)' }}
                    />
                    {[0, 1].map((i) => (
                        <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                inset: `-${4 + i * 3}px`,
                                border: '1px solid rgba(160,120,245,0.25)',
                                animation: `m-ring-out 3s ease-out infinite ${i * 1.1}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Diamond outline — mid left */}
            <div
                className="absolute top-[48%] left-5"
                style={{
                    animation: isLoaded
                        ? 'm-float 7s ease-in-out infinite 2s'
                        : 'none',
                }}
            >
                <div
                    className="w-7 h-7 rotate-45 rounded-sm"
                    style={{
                        border: '1px solid rgba(72,149,239,0.13)',
                        background: 'rgba(72,149,239,0.03)',
                    }}
                />
            </div>

            {/* Scattered dots */}
            {DOTS.map((d, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        top: d.top,
                        left: (d as any).left,
                        right: (d as any).right,
                        width: d.s,
                        height: d.s,
                        backgroundColor: d.c,
                        animation: `m-dot-drift 4.5s ease-in-out infinite ${d.d}`,
                    }}
                />
            ))}

            {/* Vertical line accent */}
            <div
                className="absolute left-6 top-[25%] w-px origin-top"
                style={{
                    height: 60,
                    background:
                        'linear-gradient(to bottom, rgba(160,120,245,0.3), transparent)',
                    animation: isLoaded
                        ? 'm-line-draw 0.8s ease-out 0.5s both'
                        : 'none',
                }}
            />
        </div>

        {/* ═══ CONTENT — centered ═══ */}
        <div
            className="relative z-10 flex-1 flex flex-col items-center justify-center
                    text-center px-6 py-20"
        >
            {/* Badge */}
            <div
                style={{
                    animation: isLoaded
                        ? 'fade-scale 0.5s ease-out 0.1s both'
                        : 'none',
                }}
                className="mb-6"
            >
                <StatusBadge text="Available for hire" visible={isLoaded} />
            </div>

            {/* Title */}
            <h1
                className="font-black tracking-[-0.035em] text-white w-full"
                style={{
                    fontSize: 'clamp(3rem, 12vw, 4.5rem)',
                    lineHeight: 1.05,
                    marginBottom: '1.25rem',
                    animation: isLoaded
                        ? 'fade-up 0.65s ease-out 0.2s both'
                        : 'none',
                    overflow: 'visible',
                }}
            >
                <span
                    className="block"
                    style={{ animation: 'title-glow 6s ease-in-out infinite' }}
                >
                    Transform Ideas
                </span>
                <span
                    className="block"
                    style={{ marginTop: '0.1em', paddingBottom: '0.2em' }}
                >
                    <span className="text-white">Into </span>
                    <RealityText isLoaded={isLoaded} />
                </span>
            </h1>

            {/* Accent line */}
            <div
                className="h-[2px] rounded-full origin-center mb-5"
                style={{
                    width: 40,
                    background: gradients.brandText,
                    animation: isLoaded
                        ? 'm-line-draw 0.6s ease-out 0.45s both'
                        : 'none',
                }}
            />

            {/* Subtitle */}
            <p
                className="text-[13.5px] text-gray-500 leading-relaxed max-w-[300px] mb-8"
                style={{
                    animation: isLoaded
                        ? 'fade-up 0.55s ease-out 0.5s both'
                        : 'none',
                }}
            >
                We design and build{' '}
                <span className="text-gray-300">standout websites</span> crafted
                to make your brand{' '}
                <span className="text-gray-300">unforgettable</span>.
            </p>

            {/* CTAs */}
            <div
                className="flex flex-col gap-3 w-full max-w-[260px]"
                style={{
                    animation: isLoaded
                        ? 'fade-up 0.5s ease-out 0.65s both'
                        : 'none',
                }}
            >
                <GradientButton
                    href="#work"
                    size="sm"
                    className="w-full justify-center"
                >
                    <span>Explore Our Work</span>
                    <FiChevronRight className="w-3.5 h-3.5" />
                </GradientButton>

                <OutlineButton
                    href="/store"
                    size="sm"
                    className="w-full justify-center"
                    icon={
                        <HiOutlineSquares2X2 className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-500" />
                    }
                    trailingIcon={<HiArrowLongRight className="w-3.5 h-3.5" />}
                >
                    Browse Store
                </OutlineButton>
            </div>

            {/* Swipe hint */}
            <div
                className="mt-10 flex flex-col items-center opacity-60"
                style={{
                    animation: isLoaded
                        ? 'fade-up 0.4s ease-out 0.85s both'
                        : 'none',
                }}
            >
                <div className="flex flex-col items-center -space-y-1 mb-1">
                    <svg className="w-4 h-4 text-gray-400" style={{ animation: 'm-swipe-pulse 2s infinite' }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                    <svg className="w-4 h-4 text-gray-500" style={{ animation: 'm-swipe-pulse 2s infinite 0.2s' }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                    <svg className="w-4 h-4 text-gray-600" style={{ animation: 'm-swipe-pulse 2s infinite 0.4s' }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-medium">
                    SWIPE UP
                </span>
            </div>
        </div>

        {/* Bottom fade */}
        <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10"
            style={{
                background:
                    'linear-gradient(to top, var(--bg-primary), transparent)',
            }}
        />
    </div>
));

MobileHero.displayName = 'MobileHero';
export default MobileHero;
