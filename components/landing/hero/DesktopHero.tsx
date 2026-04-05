'use client';

import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { HiOutlineSquares2X2, HiArrowLongRight } from 'react-icons/hi2';
import {
    GradientButton,
    OutlineButton,
    ScrollIndicator,
} from '@/components/ui';
import StatusBadge from '@/components/ui/StatusBadge';
import { RealityText } from '@/components/ui';

interface Props {
    isLoaded: boolean;
}

const DesktopHero: React.FC<Props> = React.memo(({ isLoaded }) => (
    <div className="hidden md:flex relative min-h-screen items-center justify-center overflow-hidden">
        {/* ═══ DARK SUN — core glow ═══ */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* Outer halo */}
            <div
                className="absolute"
                style={{
                    top: '50%',
                    left: '50%',
                    width: 'clamp(700px, 75vw, 1200px)',
                    height: 'clamp(700px, 75vw, 1200px)',
                    marginLeft: 'clamp(-600px, -37.5vw, -350px)',
                    marginTop: 'clamp(-600px, -37.5vw, -350px)',
                    background: `
                        radial-gradient(circle at center,
                            rgba(160,120,245,0.22) 0%,
                            rgba(130,105,230,0.12) 20%,
                            rgba(72,149,239,0.06) 40%,
                            transparent 65%)
                    `,
                    animation: 'sun-pulse 10s ease-in-out infinite',
                    willChange: 'transform, opacity',
                }}
            />
            {/* Inner bright core */}
            <div
                className="absolute"
                style={{
                    top: '50%',
                    left: '50%',
                    width: 'clamp(200px, 22vw, 350px)',
                    height: 'clamp(200px, 22vw, 350px)',
                    marginLeft: 'clamp(-175px, -11vw, -100px)',
                    marginTop: 'clamp(-175px, -11vw, -100px)',
                    background: `
                        radial-gradient(circle at center,
                            rgba(200,180,255,0.35) 0%,
                            rgba(160,120,245,0.20) 30%,
                            rgba(120,100,220,0.08) 55%,
                            transparent 80%)
                    `,
                    animation: 'sun-pulse 10s ease-in-out infinite',
                    willChange: 'transform, opacity',
                }}
            />
        </div>

        {/* ═══ SUN RAYS — slowly rotating conic beams ═══ */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
                className="absolute"
                style={{
                    top: '50%',
                    left: '50%',
                    width: 'clamp(800px, 80vw, 1400px)',
                    height: 'clamp(800px, 80vw, 1400px)',
                    background: `conic-gradient(
                        from 0deg,
                        transparent 0deg,
                        rgba(160,120,245,0.06) 5deg,
                        transparent 15deg,
                        transparent 45deg,
                        rgba(72,149,239,0.05) 50deg,
                        transparent 60deg,
                        transparent 90deg,
                        rgba(160,120,245,0.05) 95deg,
                        transparent 105deg,
                        transparent 135deg,
                        rgba(72,149,239,0.04) 140deg,
                        transparent 150deg,
                        transparent 180deg,
                        rgba(160,120,245,0.06) 185deg,
                        transparent 195deg,
                        transparent 225deg,
                        rgba(72,149,239,0.05) 230deg,
                        transparent 240deg,
                        transparent 270deg,
                        rgba(160,120,245,0.04) 275deg,
                        transparent 285deg,
                        transparent 315deg,
                        rgba(72,149,239,0.05) 320deg,
                        transparent 330deg,
                        transparent 360deg
                    )`,
                    maskImage: 'radial-gradient(circle, transparent 8%, black 15%, black 45%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle, transparent 8%, black 15%, black 45%, transparent 70%)',
                    animation: 'sun-rays-spin 120s linear infinite',
                    willChange: 'transform',
                }}
            />
        </div>

        {/* ═══ ORBITING FLARES — desynchronized glow ═══ */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 w-0 h-0">
                {/* Violet flare — 6s glow cycle */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: 'clamp(220px, 28vw, 420px)',
                        height: 'clamp(220px, 28vw, 420px)',
                        background: 'radial-gradient(circle, rgba(160,120,245,0.30) 0%, rgba(160,120,245,0.08) 35%, transparent 65%)',
                        animation: 'orb-orbit-a 35s linear infinite, orb-glow-a 6s ease-in-out infinite',
                        willChange: 'transform, opacity',
                    }}
                />
                {/* Blue flare — 9s glow cycle (different rhythm) */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: 'clamp(200px, 24vw, 380px)',
                        height: 'clamp(200px, 24vw, 380px)',
                        background: 'radial-gradient(circle, rgba(72,149,239,0.28) 0%, rgba(72,149,239,0.07) 35%, transparent 65%)',
                        animation: 'orb-orbit-b 35s linear infinite, orb-glow-b 9s ease-in-out infinite',
                        willChange: 'transform, opacity',
                    }}
                />
            </div>
        </div>

        {/* ═══ Subtle grid ═══ */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />
        </div>

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
                <span className="block">
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
