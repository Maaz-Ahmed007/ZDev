'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { HiOutlineSquares2X2, HiArrowLongRight } from 'react-icons/hi2';
import {
    StatusBadge,
    GradientButton,
    OutlineButton,
    ScrollIndicator,
    FloatingShapes,
    HERO_SHAPES,
} from '@/components/ui';
import { gradients } from '@/lib/utils';

// ═══════════════════════════════════════════════════════════════
// KEYFRAMES
// ═══════════════════════════════════════════════════════════════

const HERO_KEYFRAMES = `
@keyframes hero-orbit-v {
  from { transform: translate(-50%,-50%) rotate(0deg) translateX(280px) rotate(0deg); }
  to { transform: translate(-50%,-50%) rotate(360deg) translateX(280px) rotate(-360deg); }
}
@keyframes hero-orbit-b {
  from { transform: translate(-50%,-50%) rotate(180deg) translateX(260px) rotate(-180deg); }
  to { transform: translate(-50%,-50%) rotate(540deg) translateX(260px) rotate(-540deg); }
}
@keyframes reality-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes title-glow {
  0%,100% { text-shadow: 0 0 40px rgba(160,120,245,0.12), 0 0 80px rgba(72,149,239,0.06); }
  50% { text-shadow: 0 0 60px rgba(160,120,245,0.2), 0 0 120px rgba(72,149,239,0.1); }
}
@keyframes hero-up {
  from { opacity:0; transform:translateY(20px); }
  to { opacity:1; transform:translateY(0); }
}
@keyframes hero-scale {
  from { opacity:0; transform:scale(0.95); }
  to { opacity:1; transform:scale(1); }
}
@keyframes glow-pulse {
  0%,100% { opacity:0.15; transform:scale(1); }
  50% { opacity:0.6; transform:scale(1.3); }
}

/* ── Mobile ── */
@keyframes m-glow-shift {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
@keyframes m-float-a {
  0%,100% { transform: translateY(0) rotate(12deg); }
  50% { transform: translateY(-12px) rotate(16deg); }
}
@keyframes m-float-b {
  0%,100% { transform: translateY(0) rotate(-8deg); }
  50% { transform: translateY(-8px) rotate(-5deg); }
}
@keyframes m-ring {
  0% { transform:scale(1); opacity:0.5; }
  100% { transform:scale(3); opacity:0; }
}
@keyframes m-dots-drift {
  0%,100% { transform: translateY(0); opacity: 0.3; }
  50% { transform: translateY(-6px); opacity: 0.7; }
}
@keyframes m-line-grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes m-card-shine {
  0% { left: -100%; }
  50%,100% { left: 200%; }
}
`;

// ═══════════════════════════════════════════════════════════════
// CURSOR GLOW — Lightweight, works via CSS custom properties
// ═══════════════════════════════════════════════════════════════

const CursorGlow: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const target = useRef({ x: 50, y: 50 });
    const current = useRef({ x: 50, y: 50 });
    const hovering = useRef(false);
    const raf = useRef(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            target.current = {
                x: ((e.clientX - r.left) / r.width) * 100,
                y: ((e.clientY - r.top) / r.height) * 100,
            };
            hovering.current = true;
        };

        const onLeave = () => {
            hovering.current = false;
            target.current = { x: 50, y: 50 };
        };

        const tick = () => {
            current.current.x += (target.current.x - current.current.x) * 0.05;
            current.current.y += (target.current.y - current.current.y) * 0.05;
            el.style.setProperty('--cx', `${current.current.x}%`);
            el.style.setProperty('--cy', `${current.current.y}%`);
            el.style.setProperty('--co', hovering.current ? '1' : '0');
            raf.current = requestAnimationFrame(tick);
        };

        el.addEventListener('mousemove', onMove, { passive: true });
        el.addEventListener('mouseleave', onLeave);
        raf.current = requestAnimationFrame(tick);

        return () => {
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
            cancelAnimationFrame(raf.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-[1]"
            aria-hidden="true"
        >
            {/* Large outer glow */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: 'clamp(500px, 45vw, 750px)',
                    height: 'clamp(500px, 45vw, 750px)',
                    left: 'var(--cx, 50%)',
                    top: 'var(--cy, 50%)',
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, rgba(160,120,245,0.09) 0%, rgba(72,149,239,0.04) 35%, transparent 65%)`,
                    opacity: 'var(--co, 0)',
                    transition: 'opacity 0.8s ease',
                    willChange: 'left, top',
                }}
            />
            {/* Tight inner glow */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: 'clamp(180px, 18vw, 300px)',
                    height: 'clamp(180px, 18vw, 300px)',
                    left: 'var(--cx, 50%)',
                    top: 'var(--cy, 50%)',
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, rgba(160,120,245,0.15) 0%, rgba(72,149,239,0.08) 40%, transparent 60%)`,
                    opacity: 'var(--co, 0)',
                    transition: 'opacity 0.5s ease',
                    willChange: 'left, top',
                }}
            />
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════
// REALITY TEXT
// ═══════════════════════════════════════════════════════════════

const RealityText: React.FC<{ isLoaded: boolean; className?: string }> = ({
    isLoaded,
    className,
}) => (
    <span className={`relative inline-block ${className || ''}`}>
        <span
            className="relative z-10"
            style={{
                background:
                    'linear-gradient(90deg, #c4a0ff 0%, #a078f5 15%, #7b9cf5 30%, #4895ef 45%, #60d4f5 55%, #4895ef 70%, #a078f5 85%, #c4a0ff 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                animation: 'reality-flow 6s ease-in-out infinite',
            }}
        >
            Reality
        </span>

        <span
            className="absolute inset-0 z-0 blur-2xl opacity-30 pointer-events-none select-none"
            aria-hidden="true"
            style={{
                background:
                    'linear-gradient(90deg, rgba(160,120,245,0.5), rgba(72,149,239,0.4), rgba(160,120,245,0.5))',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                animation: 'reality-flow 6s ease-in-out infinite',
            }}
        >
            Reality
        </span>

        <svg
            className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3"
            viewBox="0 0 200 8"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="hero-ul" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A078F5" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#4895EF" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#A078F5" stopOpacity="0.4" />
                </linearGradient>
            </defs>
            <path
                d="M0,4 Q50,7 100,4 T200,4"
                fill="none"
                stroke="url(#hero-ul)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                    strokeDasharray: 200,
                    strokeDashoffset: isLoaded ? 0 : 200,
                    transition: 'stroke-dashoffset 1s ease-out 1s',
                }}
            />
        </svg>
    </span>
);

// ═══════════════════════════════════════════════════════════════
// DESKTOP HERO
// ═══════════════════════════════════════════════════════════════

const DesktopHero: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => (
    <div className="hidden md:flex relative min-h-screen items-center justify-center overflow-hidden">
        {/* Ambient */}
        <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
        >
            <div
                className="absolute inset-0 opacity-25"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(var(--brand-violet-rgb),0.06) 0%, transparent 70%)',
                }}
            />
        </div>

        {/* Cursor glow */}
        <CursorGlow />

        {/* Orbs */}
        <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
        >
            <div className="absolute top-1/2 left-1/2 w-0 h-0">
                <div
                    className="absolute rounded-full"
                    style={{
                        width: 'clamp(300px,35vw,480px)',
                        height: 'clamp(300px,35vw,480px)',
                        background:
                            'radial-gradient(circle, rgba(160,120,245,0.22) 0%, rgba(160,120,245,0.06) 40%, transparent 65%)',
                        filter: 'blur(50px)',
                        animation: 'hero-orbit-v 35s linear infinite',
                        willChange: 'transform',
                    }}
                />
                <div
                    className="absolute rounded-full"
                    style={{
                        width: 'clamp(260px,30vw,420px)',
                        height: 'clamp(260px,30vw,420px)',
                        background:
                            'radial-gradient(circle, rgba(72,149,239,0.18) 0%, rgba(72,149,239,0.05) 40%, transparent 65%)',
                        filter: 'blur(50px)',
                        animation: 'hero-orbit-b 35s linear infinite',
                        willChange: 'transform',
                    }}
                />
            </div>
        </div>

        {/* Grid */}
        <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
        >
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
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

        {/* Grid glows */}
        <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
        >
            {[
                {
                    t: '28%',
                    l: '22%',
                    s: 6,
                    c: 'rgba(160,120,245,0.5)',
                    d: '0s',
                },
                {
                    t: '52%',
                    r: '28%',
                    s: 6,
                    c: 'rgba(72,149,239,0.4)',
                    d: '2s',
                },
                {
                    b: '32%',
                    l: '38%',
                    s: 4,
                    c: 'rgba(160,120,245,0.35)',
                    d: '1s',
                },
                {
                    t: '65%',
                    r: '42%',
                    s: 4,
                    c: 'rgba(72,149,239,0.3)',
                    d: '3s',
                },
            ].map((d, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        top: d.t,
                        left: d.l,
                        right: d.r,
                        bottom: d.b,
                        width: d.s,
                        height: d.s,
                        backgroundColor: d.c,
                        animation: `glow-pulse 6s ease-in-out infinite ${d.d}`,
                    }}
                />
            ))}
        </div>

        {/* Shapes */}
        <FloatingShapes shapes={HERO_SHAPES} />

        {/* Noise */}
        <div
            className="absolute inset-0 opacity-[0.012] pointer-events-none mix-blend-overlay"
            aria-hidden="true"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center px-6 py-16">
            <div
                style={{
                    animation: isLoaded
                        ? 'hero-scale 0.5s ease-out 0.15s both'
                        : 'none',
                }}
            >
                <StatusBadge
                    text="Available for hire"
                    visible={isLoaded}
                    className="mb-8"
                />
            </div>

            <h1
                className="font-black tracking-[-0.04em] mb-7 text-5xl lg:text-7xl xl:text-[5.8rem] leading-[1.05]"
                style={{
                    animation: isLoaded
                        ? 'hero-up 0.7s ease-out 0.3s both'
                        : 'none',
                }}
            >
                <span
                    className="block text-white"
                    style={{ animation: 'title-glow 6s ease-in-out infinite' }}
                >
                    Transform Ideas
                </span>
                <span className="block mt-2 lg:mt-3">
                    <span className="text-white">Into </span>
                    <RealityText isLoaded={isLoaded} />
                </span>
            </h1>

            <p
                className="max-w-lg mx-auto text-[15px] md:text-base text-gray-500 leading-relaxed mb-10"
                style={{
                    animation: isLoaded
                        ? 'hero-up 0.6s ease-out 0.5s both'
                        : 'none',
                }}
            >
                We design and build{' '}
                <span className="text-gray-300">standout websites</span> with
                creative layouts and seamless interactions—crafted to make your
                brand <span className="text-gray-300">unforgettable</span>.
            </p>

            <div
                className="flex flex-row items-center justify-center gap-4"
                style={{
                    animation: isLoaded
                        ? 'hero-up 0.5s ease-out 0.65s both'
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
);

// ═══════════════════════════════════════════════════════════════
// MOBILE HERO — Completely unique design
// ═══════════════════════════════════════════════════════════════

const MobileHero: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => (
    <div
        className="md:hidden relative overflow-hidden"
        style={{ minHeight: '100svh' }}
    >
        {/* ═══════ MOBILE BACKGROUND ═══════ */}
        <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
        >
            {/* Animated gradient mesh */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(ellipse 80% 50% at 10% 20%, rgba(160,120,245,0.14) 0%, transparent 55%),
            radial-gradient(ellipse 60% 60% at 90% 80%, rgba(72,149,239,0.12) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 50% 50%, rgba(160,120,245,0.05) 0%, transparent 40%)
          `,
                    backgroundSize: '200% 200%',
                    animation: 'm-glow-shift 16s ease-in-out infinite',
                }}
            />

            {/* Corner grids */}
            <div
                className="absolute top-0 left-0 w-20 h-20 opacity-[0.05]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
                    backgroundSize: '20px 20px',
                    maskImage:
                        'radial-gradient(ellipse at 0% 0%, black 30%, transparent 70%)',
                    WebkitMaskImage:
                        'radial-gradient(ellipse at 0% 0%, black 30%, transparent 70%)',
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

        {/* ═══════ FLOATING DECORATIONS ═══════ */}
        <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
        >
            {/* Floating card shape — top right */}
            <div
                className="absolute top-24 right-4"
                style={{
                    animation: isLoaded
                        ? 'm-float-a 8s ease-in-out infinite'
                        : 'none',
                }}
            >
                <div
                    className="relative w-12 h-12 rounded-xl overflow-hidden"
                    style={{
                        border: '1px solid rgba(160,120,245,0.12)',
                        background: 'rgba(160,120,245,0.04)',
                    }}
                >
                    {/* Shine sweep */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
                            style={{
                                animation:
                                    'm-card-shine 4s ease-in-out infinite 2s',
                            }}
                        />
                    </div>
                    {/* Inner dot */}
                    <div
                        className="absolute top-2 left-2 w-2 h-2 rounded-full"
                        style={{ background: 'rgba(160,120,245,0.3)' }}
                    />
                    <div
                        className="absolute bottom-2 right-2 w-3 h-1 rounded-full"
                        style={{ background: 'rgba(72,149,239,0.2)' }}
                    />
                </div>
            </div>

            {/* Floating diamond — mid right */}
            <div
                className="absolute top-[45%] right-6"
                style={{
                    animation: isLoaded
                        ? 'm-float-b 6s ease-in-out infinite 1s'
                        : 'none',
                }}
            >
                <div
                    className="w-6 h-6 rotate-45 rounded-sm"
                    style={{
                        border: '1px solid rgba(72,149,239,0.15)',
                        background: 'rgba(72,149,239,0.04)',
                    }}
                />
            </div>

            {/* Pulsing dot — bottom right */}
            <div className="absolute bottom-36 right-8">
                <div className="relative w-2.5 h-2.5">
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'rgba(160,120,245,0.5)' }}
                    />
                    <div
                        className="absolute inset-[-3px] rounded-full"
                        style={{
                            border: '1px solid rgba(160,120,245,0.3)',
                            animation: 'm-ring 3s ease-out infinite',
                        }}
                    />
                    <div
                        className="absolute inset-[-3px] rounded-full"
                        style={{
                            border: '1px solid rgba(160,120,245,0.2)',
                            animation: 'm-ring 3s ease-out infinite 1s',
                        }}
                    />
                </div>
            </div>

            {/* Scattered dots */}
            {[
                {
                    t: '30%',
                    l: '8%',
                    s: 3,
                    c: 'rgba(160,120,245,0.3)',
                    d: '0s',
                },
                {
                    t: '55%',
                    l: '12%',
                    s: 2,
                    c: 'rgba(72,149,239,0.25)',
                    d: '1.5s',
                },
                {
                    t: '72%',
                    r: '15%',
                    s: 2.5,
                    c: 'rgba(160,120,245,0.2)',
                    d: '0.8s',
                },
                {
                    t: '38%',
                    r: '30%',
                    s: 2,
                    c: 'rgba(72,149,239,0.3)',
                    d: '2.2s',
                },
            ].map((dot, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        top: dot.t,
                        left: dot.l,
                        right: dot.r,
                        width: dot.s,
                        height: dot.s,
                        backgroundColor: dot.c,
                        animation: `m-dots-drift 4s ease-in-out infinite ${dot.d}`,
                    }}
                />
            ))}

            {/* Vertical accent line — left side */}
            <div
                className="absolute left-5 top-[22%] w-px h-16 origin-top"
                style={{
                    background:
                        'linear-gradient(to bottom, rgba(160,120,245,0.25), transparent)',
                    animation: isLoaded
                        ? 'm-line-grow 0.8s ease-out 0.5s both'
                        : 'none',
                }}
            />
        </div>

        {/* ═══════ CONTENT ═══════ */}
        <div
            className="relative z-10 flex flex-col justify-center px-5 pt-20 pb-10"
            style={{ minHeight: '100svh' }}
        >
            {/* Badge */}
            <div
                className="mb-5"
                style={{
                    animation: isLoaded
                        ? 'hero-up 0.5s ease-out 0.1s both'
                        : 'none',
                }}
            >
                <StatusBadge text="Available for hire" visible={isLoaded} />
            </div>

            {/* Title */}
            <h1
                className="font-black tracking-[-0.035em] mb-4 leading-[1.08]"
                style={{
                    animation: isLoaded
                        ? 'hero-up 0.6s ease-out 0.2s both'
                        : 'none',
                }}
            >
                <span
                    className="block text-white text-[2rem]"
                    style={{ animation: 'title-glow 6s ease-in-out infinite' }}
                >
                    Transform
                </span>
                <span className="block text-white text-[2rem] mt-0.5">
                    Ideas Into
                </span>
                <span className="block mt-1 text-[2.2rem]">
                    <RealityText isLoaded={isLoaded} />
                </span>
            </h1>

            {/* Accent line */}
            <div
                className="w-10 h-[2px] rounded-full mb-4 origin-left"
                style={{
                    background: gradients.brandText,
                    animation: isLoaded
                        ? 'm-line-grow 0.6s ease-out 0.4s both'
                        : 'none',
                }}
            />

            {/* Subtitle */}
            <p
                className="text-[13px] text-gray-500 leading-relaxed max-w-[280px] mb-7"
                style={{
                    animation: isLoaded
                        ? 'hero-up 0.5s ease-out 0.45s both'
                        : 'none',
                }}
            >
                We design and build{' '}
                <span className="text-gray-300">standout websites</span> with
                creative layouts—crafted to make your brand{' '}
                <span className="text-gray-300">unforgettable</span>.
            </p>

            {/* CTAs */}
            <div
                className="flex flex-col gap-2.5 w-full max-w-[260px]"
                style={{
                    animation: isLoaded
                        ? 'hero-up 0.5s ease-out 0.6s both'
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
                    icon={<HiOutlineSquares2X2 className="w-3.5 h-3.5" />}
                    trailingIcon={<HiArrowLongRight className="w-3.5 h-3.5" />}
                >
                    Browse Store
                </OutlineButton>
            </div>

            {/* Bottom scroll hint — mobile specific */}
            <div
                className="mt-auto pt-8 flex items-center gap-2 opacity-40"
                style={{
                    animation: isLoaded
                        ? 'hero-up 0.4s ease-out 0.8s both'
                        : 'none',
                }}
            >
                <div className="w-4 h-7 rounded-full border border-gray-700 flex items-start justify-center pt-1">
                    <div
                        className="w-0.5 h-1.5 rounded-full bg-gray-500"
                        style={{
                            animation: 'm-dots-drift 2s ease-in-out infinite',
                        }}
                    />
                </div>
                <span className="text-[10px] text-gray-600 uppercase tracking-[0.15em]">
                    Scroll to explore
                </span>
            </div>
        </div>

        {/* Bottom fade */}
        <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
            style={{
                background:
                    'linear-gradient(to top, var(--bg-primary), transparent)',
            }}
        />
    </div>
);

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

const Hero: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => setIsLoaded(true));
        });
    }, []);

    return (
        <section id="hero" aria-label="Hero">
            <style dangerouslySetInnerHTML={{ __html: HERO_KEYFRAMES }} />
            <DesktopHero isLoaded={isLoaded} />
            <MobileHero isLoaded={isLoaded} />
        </section>
    );
};

export default Hero;
