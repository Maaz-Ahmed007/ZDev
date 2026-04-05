'use client';

import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { HiOutlineSquares2X2, HiArrowLongRight } from 'react-icons/hi2';
import {
    GradientButton,
    OutlineButton,
    ScrollIndicator,
    FloatingShapes,
    HERO_SHAPES,
} from '@/components/ui';
import StatusBadge from '@/components/ui/StatusBadge';
import { RealityText } from '@/components/ui';

interface Props {
    isLoaded: boolean;
}

/* Dot positions for grid intersection glows */
const GRID_DOTS = [
    {
        top: '28%',
        left: '22%',
        size: 6,
        color: 'rgba(160,120,245,0.5)',
        delay: '0s',
    },
    {
        top: '52%',
        right: '28%',
        size: 6,
        color: 'rgba(72,149,239,0.4)',
        delay: '2s',
    },
    {
        bottom: '32%',
        left: '38%',
        size: 4,
        color: 'rgba(160,120,245,0.35)',
        delay: '1s',
    },
    {
        top: '65%',
        right: '42%',
        size: 4,
        color: 'rgba(72,149,239,0.3)',
        delay: '3s',
    },
] as const;

const DesktopHero: React.FC<Props> = React.memo(({ isLoaded }) => (
    <div className="hidden md:flex relative min-h-screen items-center justify-center overflow-hidden">
        {/* ── Ambient base ── */}
        <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
        >
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(var(--brand-violet-rgb),0.06) 0%, transparent 70%)',
                }}
            />
        </div>

        {/* ── Cursor glow global now ── */}

        {/* ── Orbital orbs ── */}
        <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
        >
            <div className="absolute top-1/2 left-1/2 w-0 h-0">
                {[
                    {
                        anim: 'orb-left',
                        dur: '38s',
                        w: 'clamp(300px,34vw,470px)',
                        col: 'rgba(160,120,245,',
                    },
                    {
                        anim: 'orb-right',
                        dur: '38s',
                        w: 'clamp(250px,28vw,400px)',
                        col: 'rgba(72,149,239,',
                    },
                ].map((o, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: o.w,
                            height: o.w,
                            background: `radial-gradient(circle,${o.col}0.20) 0%,${o.col}0.06) 40%,transparent 65%)`,
                            filter: 'blur(52px)',
                            animation: `${o.anim} ${o.dur} linear infinite`,
                            willChange: 'transform',
                        }}
                    />
                ))}
            </div>
        </div>

        {/* ── Grid ── */}
        <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
        >
            <div
                className="absolute inset-0"
                style={{
                    opacity: 0.025,
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
                    backgroundSize: '70px 70px',
                    maskImage:
                        'radial-gradient(ellipse 70% 55% at 50% 50%,black 20%,transparent 75%)',
                    WebkitMaskImage:
                        'radial-gradient(ellipse 70% 55% at 50% 50%,black 20%,transparent 75%)',
                }}
            />
        </div>

        {/* ── Grid glows ── */}
        <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
        >
            {GRID_DOTS.map((d, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        top: (d as any).top,
                        left: (d as any).left,
                        right: (d as any).right,
                        bottom: (d as any).bottom,
                        width: d.size,
                        height: d.size,
                        backgroundColor: d.color,
                        animation: `glow-breathe 6s ease-in-out infinite ${d.delay}`,
                        willChange: 'opacity, transform',
                    }}
                />
            ))}
        </div>

        {/* ── Floating shapes ── */}
        <FloatingShapes shapes={HERO_SHAPES} />

        {/* ── Noise ── */}
        <div
            className="absolute inset-0 opacity-[0.012] pointer-events-none mix-blend-overlay"
            aria-hidden="true"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
        />

        {/* ── Content ── */}
        <div
            className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center
                    text-center px-6 py-20"
        >
            {/* Badge */}
            <div
                style={{
                    animation: isLoaded
                        ? 'fade-scale 0.5s ease-out 0.15s both'
                        : 'none',
                }}
            >
                <StatusBadge
                    text="Available for hire"
                    visible={isLoaded}
                    className="mb-8"
                />
            </div>

            {/* Title — overflow visible so nothing clips */}
            <h1
                className="font-black tracking-[-0.04em] text-white w-full"
                style={{
                    fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                    lineHeight: 1.05,
                    marginBottom: '1.75rem',
                    animation: isLoaded
                        ? 'fade-up 0.7s ease-out 0.3s both'
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
                    style={{ marginTop: '0.15em', paddingBottom: '0.18em' }}
                >
                    <span className="text-white">Into </span>
                    <RealityText isLoaded={isLoaded} />
                </span>
            </h1>

            {/* Subtitle */}
            <p
                className="max-w-[480px] text-[15px] md:text-base text-gray-500 leading-relaxed"
                style={{
                    marginBottom: '2.25rem',
                    animation: isLoaded
                        ? 'fade-up 0.6s ease-out 0.5s both'
                        : 'none',
                }}
            >
                We design and build{' '}
                <span className="text-gray-300">standout websites</span> with
                creative layouts and seamless interactions—crafted to make your
                brand <span className="text-gray-300">unforgettable</span>.
            </p>

            {/* CTAs */}
            <div
                className="flex flex-row items-center justify-center gap-4"
                style={{
                    animation: isLoaded
                        ? 'fade-up 0.5s ease-out 0.65s both'
                        : 'none',
                }}
            >
                <GradientButton href="#work" size="md">
                    <span>Explore Our Work</span>
                    <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </GradientButton>

                <OutlineButton
                    href="/store"
                    size="md"
                    icon={
                        <HiOutlineSquares2X2 className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                    }
                    trailingIcon={<HiArrowLongRight className="w-4 h-4" />}
                >
                    Browse Store
                </OutlineButton>
            </div>
        </div>

        <ScrollIndicator targetId="work" visible={isLoaded} />
    </div>
));

DesktopHero.displayName = 'DesktopHero';
export default DesktopHero;
