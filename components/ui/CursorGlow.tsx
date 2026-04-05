// components/ui/CursorGlow.tsx
'use client';

import React, { useEffect, useRef } from 'react';

// Highly optimized global cursor glow using mouse tracking and hardware-accelerated transforms
const CursorGlow: React.FC = React.memo(() => {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only run on desktop devices
        if (window.matchMedia('(max-width: 768px)').matches) return;
        
        const glow = glowRef.current;
        if (!glow) return;

        let tx = window.innerWidth / 2;
        let ty = window.innerHeight / 2;
        let cx = tx;
        let cy = ty;
        let active = false;
        let rafId = 0;

        const onMove = (e: MouseEvent) => {
            tx = e.clientX;
            ty = e.clientY;
            
            // Check if cursor is over navbar, footer, or explicitly ignored elements
            const target = e.target as HTMLElement;
            if (target && target.closest) {
                const ignored = target.closest('nav, footer, .no-global-glow');
                active = !ignored;
            } else {
                active = true;
            }
        };

        const onLeave = () => {
            active = false;
        };

        const tick = () => {
            // Smooth lerp for buttery animation without React re-renders
            cx += (tx - cx) * 0.15;
            cy += (ty - cy) * 0.15;

            // Use 3D transform for hardware acceleration (layout/paint bypass)
            glow.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
            glow.style.opacity = active ? '1' : '0';

            rafId = requestAnimationFrame(tick);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        document.body.addEventListener('mouseleave', onLeave);
        rafId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', onMove);
            document.body.removeEventListener('mouseleave', onLeave);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            className="hidden md:block fixed inset-0 pointer-events-none z-40 overflow-hidden"
            aria-hidden="true"
        >
            <div
                ref={glowRef}
                className="absolute top-0 left-0 pointer-events-none rounded-full mix-blend-screen"
                style={{
                    width: '600px',
                    height: '600px',
                    marginLeft: '-300px',
                    marginTop: '-300px',
                    background: `
                        radial-gradient(circle at center, 
                            rgba(160, 120, 245, 0.12) 0%, 
                            rgba(72, 149, 239, 0.08) 35%, 
                            transparent 65%)
                    `,
                    opacity: 0,
                    transition: 'opacity 0.4s ease-out',
                    willChange: 'transform, opacity',
                }}
            />
            {/* Core intense glow */}
            <div
                className="absolute top-1/2 left-1/2 pointer-events-none rounded-full mix-blend-screen"
                style={{
                    width: '200px',
                    height: '200px',
                    marginLeft: '-100px',
                    marginTop: '-100px',
                    background: `
                        radial-gradient(circle at center, 
                            rgba(160, 120, 245, 0.15) 0%, 
                            transparent 70%)
                    `,
                }}
            />
        </div>
    );
});

CursorGlow.displayName = 'CursorGlow';
export default CursorGlow;
