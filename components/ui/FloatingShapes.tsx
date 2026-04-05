// components/ui/FloatingShapes.tsx
'use client';

import React, { useMemo } from 'react';

// ═══════════════════════════════════════════════════════════════
// Shape type definition
// ═══════════════════════════════════════════════════════════════

export interface ShapeConfig {
    type:
        | 'circle-outline'
        | 'circle-filled'
        | 'square-outline'
        | 'square-filled'
        | 'diamond-outline'
        | 'diamond-filled'
        | 'triangle-outline'
        | 'hexagon-outline';
    size: number;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    animationType:
        | 'drift'
        | 'drift-alt'
        | 'orbit'
        | 'blink'
        | 'blink-delayed'
        | 'pulse'
        | 'spin'
        | 'spin-reverse';
    delay?: string;
    color: string;
}

// ═══════════════════════════════════════════════════════════════
// Keyframes — injected once
// ═══════════════════════════════════════════════════════════════

const SHAPE_KEYFRAMES = `
@keyframes shape-drift {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(8px, -12px) rotate(5deg); }
  50% { transform: translate(-5px, -8px) rotate(-3deg); }
  75% { transform: translate(10px, 5px) rotate(4deg); }
}
@keyframes shape-drift-alt {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-10px, 8px) rotate(-5deg); }
  50% { transform: translate(6px, 12px) rotate(3deg); }
  75% { transform: translate(-8px, -6px) rotate(-4deg); }
}
@keyframes shape-orbit {
  0% { transform: rotate(0deg) translateX(15px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(15px) rotate(-360deg); }
}
@keyframes shape-blink {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.6; }
}
@keyframes shape-blink-delayed {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.5; }
}
@keyframes shape-pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.3); opacity: 0.6; }
}
@keyframes shape-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes shape-spin-reverse {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}
`;

const ANIMATION_MAP: Record<ShapeConfig['animationType'], string> = {
    drift: 'shape-drift 8s ease-in-out infinite',
    'drift-alt': 'shape-drift-alt 10s ease-in-out infinite',
    orbit: 'shape-orbit 12s linear infinite',
    blink: 'shape-blink 4s ease-in-out infinite',
    'blink-delayed': 'shape-blink-delayed 5s ease-in-out infinite',
    pulse: 'shape-pulse 3s ease-in-out infinite',
    spin: 'shape-spin 20s linear infinite',
    'spin-reverse': 'shape-spin-reverse 25s linear infinite',
};

// ═══════════════════════════════════════════════════════════════
// Single Shape Renderer
// ═══════════════════════════════════════════════════════════════

const Shape: React.FC<{ config: ShapeConfig }> = React.memo(({ config }) => {
    const baseStyle: React.CSSProperties = {
        position: 'absolute',
        top: config.top,
        left: config.left,
        right: config.right,
        bottom: config.bottom,
        animation: ANIMATION_MAP[config.animationType],
        animationDelay: config.delay || '0s',
        willChange: 'transform, opacity',
    };

    switch (config.type) {
        case 'circle-outline':
            return (
                <div
                    style={{
                        ...baseStyle,
                        width: config.size,
                        height: config.size,
                        borderRadius: '50%',
                        border: `1px solid ${config.color}`,
                    }}
                />
            );

        case 'circle-filled':
            return (
                <div
                    style={{
                        ...baseStyle,
                        width: config.size,
                        height: config.size,
                        borderRadius: '50%',
                        backgroundColor: config.color,
                    }}
                />
            );

        case 'square-outline':
            return (
                <div
                    style={{
                        ...baseStyle,
                        width: config.size,
                        height: config.size,
                        border: `1px solid ${config.color}`,
                    }}
                />
            );

        case 'square-filled':
            return (
                <div
                    style={{
                        ...baseStyle,
                        width: config.size,
                        height: config.size,
                        backgroundColor: config.color,
                    }}
                />
            );

        case 'diamond-outline':
            return (
                <div
                    style={{
                        ...baseStyle,
                        width: config.size,
                        height: config.size,
                        border: `1px solid ${config.color}`,
                        transform: 'rotate(45deg)',
                    }}
                />
            );

        case 'diamond-filled':
            return (
                <div
                    style={{
                        ...baseStyle,
                        width: config.size,
                        height: config.size,
                        backgroundColor: config.color,
                        transform: 'rotate(45deg)',
                    }}
                />
            );

        case 'triangle-outline':
            return (
                <div
                    style={{
                        ...baseStyle,
                        width: 0,
                        height: 0,
                        borderLeft: `${config.size / 2}px solid transparent`,
                        borderRight: `${config.size / 2}px solid transparent`,
                        borderBottom: `${config.size}px solid ${config.color}`,
                        background: 'transparent',
                    }}
                />
            );

        case 'hexagon-outline':
            return (
                <svg
                    style={{
                        ...baseStyle,
                        width: config.size,
                        height: config.size,
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={config.color}
                    strokeWidth="1"
                >
                    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                </svg>
            );

        default:
            return null;
    }
});

Shape.displayName = 'Shape';

// ═══════════════════════════════════════════════════════════════
// Preset shape configs for different sections
// ═══════════════════════════════════════════════════════════════

export const HERO_SHAPES: ShapeConfig[] = [
    {
        type: 'circle-outline',
        size: 12,
        top: '18%',
        left: '12%',
        animationType: 'drift',
        color: 'rgba(160,120,245,0.2)',
    },
    {
        type: 'square-outline',
        size: 10,
        top: '25%',
        right: '15%',
        animationType: 'drift-alt',
        delay: '-2s',
        color: 'rgba(72,149,239,0.15)',
    },
    {
        type: 'diamond-outline',
        size: 14,
        bottom: '30%',
        left: '18%',
        animationType: 'spin',
        color: 'rgba(160,120,245,0.12)',
    },
    {
        type: 'triangle-outline',
        size: 11,
        top: '40%',
        right: '10%',
        animationType: 'drift',
        delay: '-3s',
        color: 'rgba(72,149,239,0.18)',
    },
    {
        type: 'circle-outline',
        size: 8,
        bottom: '25%',
        right: '22%',
        animationType: 'blink',
        delay: '-1s',
        color: 'rgba(160,120,245,0.25)',
    },
    {
        type: 'hexagon-outline',
        size: 16,
        top: '55%',
        left: '8%',
        animationType: 'spin-reverse',
        color: 'rgba(72,149,239,0.1)',
    },
    {
        type: 'circle-filled',
        size: 4,
        top: '22%',
        left: '25%',
        animationType: 'blink',
        color: 'rgba(160,120,245,0.35)',
    },
    {
        type: 'circle-filled',
        size: 3,
        top: '35%',
        right: '28%',
        animationType: 'blink-delayed',
        delay: '-1.5s',
        color: 'rgba(72,149,239,0.4)',
    },
    {
        type: 'square-filled',
        size: 5,
        bottom: '40%',
        left: '30%',
        animationType: 'pulse',
        color: 'rgba(160,120,245,0.25)',
    },
    {
        type: 'circle-filled',
        size: 3,
        top: '48%',
        left: '15%',
        animationType: 'orbit',
        color: 'rgba(72,149,239,0.3)',
    },
    {
        type: 'diamond-filled',
        size: 6,
        top: '30%',
        left: '40%',
        animationType: 'blink',
        delay: '-2s',
        color: 'rgba(160,120,245,0.2)',
    },
    {
        type: 'circle-filled',
        size: 4,
        bottom: '35%',
        right: '12%',
        animationType: 'pulse',
        delay: '-1s',
        color: 'rgba(72,149,239,0.35)',
    },
    {
        type: 'square-filled',
        size: 4,
        top: '60%',
        right: '35%',
        animationType: 'blink-delayed',
        color: 'rgba(160,120,245,0.3)',
    },
    {
        type: 'circle-filled',
        size: 2,
        top: '15%',
        right: '40%',
        animationType: 'drift',
        delay: '-4s',
        color: 'rgba(72,149,239,0.45)',
    },
    {
        type: 'circle-filled',
        size: 2,
        top: '70%',
        left: '22%',
        animationType: 'blink',
        delay: '-3s',
        color: 'rgba(160,120,245,0.4)',
    },
    {
        type: 'circle-filled',
        size: 3,
        bottom: '20%',
        left: '45%',
        animationType: 'blink-delayed',
        color: 'rgba(72,149,239,0.3)',
    },
];

export const FOOTER_SHAPES: ShapeConfig[] = [
    {
        type: 'circle-outline',
        size: 10,
        top: '15%',
        left: '5%',
        animationType: 'drift',
        color: 'rgba(160,120,245,0.15)',
    },
    {
        type: 'diamond-outline',
        size: 8,
        top: '25%',
        right: '8%',
        animationType: 'spin',
        color: 'rgba(72,149,239,0.12)',
    },
    {
        type: 'circle-filled',
        size: 3,
        top: '40%',
        left: '15%',
        animationType: 'blink',
        color: 'rgba(160,120,245,0.3)',
    },
    {
        type: 'square-outline',
        size: 6,
        bottom: '30%',
        right: '12%',
        animationType: 'drift-alt',
        color: 'rgba(72,149,239,0.1)',
    },
    {
        type: 'circle-filled',
        size: 2,
        bottom: '20%',
        left: '25%',
        animationType: 'blink-delayed',
        color: 'rgba(160,120,245,0.35)',
    },
    {
        type: 'circle-filled',
        size: 2,
        top: '60%',
        right: '20%',
        animationType: 'pulse',
        color: 'rgba(72,149,239,0.25)',
    },
];

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

interface FloatingShapesProps {
    shapes: ShapeConfig[];
}

const FloatingShapes: React.FC<FloatingShapesProps> = ({ shapes }) => {
    const memoizedShapes = useMemo(() => shapes, [shapes]);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: SHAPE_KEYFRAMES }} />
            <div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                aria-hidden="true"
            >
                {memoizedShapes.map((shape, i) => (
                    <Shape key={i} config={shape} />
                ))}
            </div>
        </>
    );
};

export default FloatingShapes;
