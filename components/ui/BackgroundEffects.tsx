// components/ui/BackgroundEffects.tsx
'use client';

import React from 'react';

// ═══════════════════════════════════════════════════════════════
// Keyframes
// ═══════════════════════════════════════════════════════════════

const ORB_KEYFRAMES = `
@keyframes orbit-left {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(280px) rotate(0deg);
    opacity: 0.7; filter: blur(50px) brightness(1);
  }
  25% { opacity: 1; filter: blur(45px) brightness(1.3); }
  50% {
    transform: translate(-50%, -50%) rotate(180deg) translateX(280px) rotate(-180deg);
    opacity: 0.8; filter: blur(55px) brightness(1.1);
  }
  75% { opacity: 1; filter: blur(45px) brightness(1.25); }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(280px) rotate(-360deg);
    opacity: 0.7; filter: blur(50px) brightness(1);
  }
}
@keyframes orbit-right {
  0% {
    transform: translate(-50%, -50%) rotate(180deg) translateX(280px) rotate(-180deg);
    opacity: 0.6; filter: blur(50px) brightness(1);
  }
  25% { opacity: 0.95; filter: blur(45px) brightness(1.25); }
  50% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(280px) rotate(-360deg);
    opacity: 0.7; filter: blur(55px) brightness(1.1);
  }
  75% { opacity: 1; filter: blur(45px) brightness(1.3); }
  100% {
    transform: translate(-50%, -50%) rotate(540deg) translateX(280px) rotate(-540deg);
    opacity: 0.6; filter: blur(50px) brightness(1);
  }
}
@keyframes glow-soft {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
}
@keyframes glow-soft-delayed {
  0%, 100% { opacity: 0.25; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(1.2); }
}
`;

// ═══════════════════════════════════════════════════════════════
// Presets
// ═══════════════════════════════════════════════════════════════

type Preset = 'hero' | 'section' | 'footer';

interface BackgroundEffectsProps {
    preset?: Preset;
    showOrbs?: boolean;
    showGrid?: boolean;
    showNoise?: boolean;
    showGlows?: boolean;
    showAmbient?: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({
    preset = 'hero',
    showOrbs,
    showGrid,
    showNoise,
    showGlows,
    showAmbient,
}) => {
    // Defaults per preset
    const defaults: Record<
        Preset,
        {
            orbs: boolean;
            grid: boolean;
            noise: boolean;
            glows: boolean;
            ambient: boolean;
        }
    > = {
        hero: {
            orbs: true,
            grid: true,
            noise: true,
            glows: true,
            ambient: true,
        },
        section: {
            orbs: false,
            grid: true,
            noise: true,
            glows: false,
            ambient: true,
        },
        footer: {
            orbs: false,
            grid: true,
            noise: true,
            glows: false,
            ambient: true,
        },
    };

    const d = defaults[preset];
    const orbs = showOrbs ?? d.orbs;
    const grid = showGrid ?? d.grid;
    const noise = showNoise ?? d.noise;
    const glows = showGlows ?? d.glows;
    const ambient = showAmbient ?? d.ambient;

    return (
        <>
            {(orbs || glows) && (
                <style dangerouslySetInnerHTML={{ __html: ORB_KEYFRAMES }} />
            )}

            {/* Ambient gradient */}
            {ambient && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                >
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            background:
                                'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(var(--brand-violet-rgb), 0.06) 0%, transparent 70%)',
                        }}
                    />
                </div>
            )}

            {/* Orbital orbs — hero only */}
            {orbs && (
                <div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    aria-hidden="true"
                >
                    <div className="absolute top-1/2 left-1/2 w-0 h-0">
                        {/* Violet orb */}
                        <div
                            className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full"
                            style={{
                                background:
                                    'radial-gradient(circle, rgba(160,120,245,0.35) 0%, rgba(160,120,245,0.15) 35%, rgba(160,120,245,0.05) 55%, transparent 70%)',
                                animation: 'orbit-left 25s linear infinite',
                                willChange: 'transform, opacity, filter',
                            }}
                        />
                        {/* Blue orb */}
                        <div
                            className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full"
                            style={{
                                background:
                                    'radial-gradient(circle, rgba(72,149,239,0.30) 0%, rgba(72,149,239,0.12) 35%, rgba(72,149,239,0.04) 55%, transparent 70%)',
                                animation: 'orbit-right 25s linear infinite',
                                willChange: 'transform, opacity, filter',
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Grid pattern */}
            {grid && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                >
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
                            backgroundSize: '70px 70px',
                            maskImage:
                                preset === 'hero'
                                    ? 'radial-gradient(ellipse 70% 55% at 50% 50%, black 25%, transparent 75%)'
                                    : 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                            WebkitMaskImage:
                                preset === 'hero'
                                    ? 'radial-gradient(ellipse 70% 55% at 50% 50%, black 25%, transparent 75%)'
                                    : 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                        }}
                    />
                </div>
            )}

            {/* Grid intersection glows */}
            {glows && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                >
                    <div
                        className="absolute top-[28%] left-[22%] w-1.5 h-1.5 rounded-full"
                        style={{
                            backgroundColor: 'rgba(160,120,245,0.6)',
                            animation: 'glow-soft 5s ease-in-out infinite',
                        }}
                    />
                    <div
                        className="absolute top-[52%] right-[28%] w-1.5 h-1.5 rounded-full"
                        style={{
                            backgroundColor: 'rgba(72,149,239,0.5)',
                            animation:
                                'glow-soft-delayed 5s ease-in-out infinite',
                        }}
                    />
                    <div
                        className="absolute bottom-[32%] left-[38%] w-1 h-1 rounded-full"
                        style={{
                            backgroundColor: 'rgba(160,120,245,0.4)',
                            animation: 'glow-soft 5s ease-in-out infinite',
                        }}
                    />
                </div>
            )}

            {/* Noise texture */}
            {noise && (
                <div
                    className="absolute inset-0 opacity-[0.012] pointer-events-none mix-blend-overlay"
                    aria-hidden="true"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                />
            )}
        </>
    );
};

export default BackgroundEffects;
