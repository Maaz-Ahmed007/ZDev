// lib/utils.ts

/**
 * Conditionally join class names together.
 */
export function cn(
    ...classes: (string | boolean | undefined | null)[]
): string {
    return classes.filter(Boolean).join(' ');
}

/**
 * Get mouse position relative to an element.
 */
export function getRelativeMousePos(
    e: React.MouseEvent,
    element: HTMLElement,
): { x: number; y: number } {
    const rect = element.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
    };
}

/**
 * Generate a stagger delay for entrance animations.
 * Returns inline style object with transitionDelay.
 */
export function staggerDelay(
    index: number,
    baseMs: number = 100,
    offsetMs: number = 0,
) {
    return { transitionDelay: `${offsetMs + index * baseMs}ms` };
}

/**
 * Gradient string helpers to keep components DRY.
 */
export const gradients = {
    brand: 'linear-gradient(135deg, var(--brand-violet) 0%, #7B5FD4 35%, var(--brand-blue) 65%, var(--brand-violet) 100%)',
    brandText: 'linear-gradient(90deg, var(--brand-violet), var(--brand-blue))',
    brandBorder:
        'linear-gradient(90deg, rgba(160,120,245,0.4), rgba(72,149,239,0.4), rgba(160,120,245,0.4))',
    brandBorderSubtle:
        'linear-gradient(90deg, rgba(160,120,245,0.3), rgba(72,149,239,0.3), rgba(160,120,245,0.3))',
    brandGlow:
        'linear-gradient(90deg, rgba(160,120,245,0.08), rgba(72,149,239,0.08))',
    shine: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
    topHighlight:
        'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    separator:
        'linear-gradient(90deg, transparent, rgba(160,120,245,0.3), rgba(72,149,239,0.3), transparent)',
} as const;

/**
 * Cursor spotlight radial gradient generator.
 */
export function cursorSpotlight(
    x: number,
    y: number,
    radius: number = 100,
    color: string = 'rgba(255, 255, 255, 0.25)',
): string {
    return `radial-gradient(${radius}px circle at ${x}px ${y}px, ${color}, transparent 50%)`;
}
