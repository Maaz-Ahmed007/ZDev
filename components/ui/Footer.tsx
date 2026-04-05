// components/ui/Footer.tsx
'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { HiOutlineEnvelope, HiArrowUpRight, HiArrowUp } from 'react-icons/hi2';
import { RiSendPlaneFill } from 'react-icons/ri';
import Logo from '@/components/ui/Logo';
import { SocialIconRow } from '@/components/ui/SocialIcon';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import {
    cn,
    gradients,
    getRelativeMousePos,
    cursorSpotlight,
} from '@/lib/utils';
import { FOOTER_LINKS, BRAND } from '@/lib/constants';

// ═══════════════════════════════════════════════════════════════
// KEYFRAMES
// ═══════════════════════════════════════════════════════════════

const FOOTER_KEYFRAMES = `
@keyframes footer-line-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
@keyframes footer-scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
@keyframes footer-blink {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
`;

// ═══════════════════════════════════════════════════════════════
// CTA SECTION — Compact "Let's build together" bar
// ═══════════════════════════════════════════════════════════════

const FooterCTA: React.FC = () => {
    const ref = useRef<HTMLAnchorElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (!ref.current) return;
            requestAnimationFrame(() => {
                setMousePos(getRelativeMousePos(e, ref.current!));
            });
        },
        [],
    );

    return (
        <div className="relative py-10 sm:py-12 border-b border-white/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Text */}
                <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                        Ready to start?{' '}
                        <span
                            style={{
                                background: gradients.brandText,
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            Let&apos;s talk.
                        </span>
                    </h3>
                    <p className="text-gray-500 text-sm mt-1.5">
                        Share your vision — we&apos;ll make it real.
                    </p>
                </div>

                {/* CTA Button */}
                <Link
                    ref={ref}
                    href="/lets-talk"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full
                   font-semibold text-sm overflow-hidden shrink-0"
                >
                    {/* Gradient bg */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: gradients.brand,
                            backgroundSize: '200% 200%',
                        }}
                    />

                    {/* Cursor spotlight */}
                    <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                        style={{
                            opacity: hovered ? 1 : 0,
                            background: cursorSpotlight(mousePos.x, mousePos.y),
                        }}
                    />

                    {/* Glow */}
                    <div
                        className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                        style={{
                            background:
                                'linear-gradient(135deg, var(--brand-violet), var(--brand-blue))',
                            filter: 'blur(20px)',
                        }}
                    />

                    {/* Shine sweep */}
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                        <div
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                       transition-transform duration-700 ease-out skew-x-[-15deg]"
                            style={{ background: gradients.shine }}
                        />
                    </div>

                    <RiSendPlaneFill
                        className="relative z-10 w-4 h-4 text-white
            group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    />
                    <span className="relative z-10 text-white">
                        Start a Project
                    </span>
                    <HiArrowUpRight
                        className="relative z-10 w-4 h-4 text-white/70
            group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    />
                </Link>
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════
// LINK COLUMN — Compact
// ═══════════════════════════════════════════════════════════════

const LinkColumn: React.FC<{
    title: string;
    links: readonly { name: string; href: string }[];
    isPage?: boolean;
}> = ({ title, links, isPage = false }) => (
    <div>
        <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-600 font-semibold mb-3">
            {title}
        </h4>
        <ul className="space-y-2">
            {links.map((link) => {
                const inner = (
                    <span
                        className="group/link inline-flex items-center gap-1 text-gray-500
                        hover:text-white text-sm transition-all duration-300 cursor-pointer"
                    >
                        <span className="relative">
                            {link.name}
                            <span
                                className="absolute left-0 -bottom-0.5 w-0 h-px group-hover/link:w-full
                         transition-all duration-300"
                                style={{ background: gradients.brandText }}
                            />
                        </span>
                        <HiArrowUpRight
                            className="w-3 h-3 opacity-0 -translate-x-1
              group-hover/link:opacity-100 group-hover/link:translate-x-0
              transition-all duration-300"
                        />
                    </span>
                );

                return (
                    <li key={link.name}>
                        {isPage || link.href.startsWith('/') ? (
                            <Link href={link.href}>{inner}</Link>
                        ) : (
                            <a href={link.href}>{inner}</a>
                        )}
                    </li>
                );
            })}
        </ul>
    </div>
);

// ═══════════════════════════════════════════════════════════════
// BACK TO TOP
// ═══════════════════════════════════════════════════════════════

const BackToTop: React.FC = () => {
    const [hovered, setHovered] = useState(false);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <button
            onClick={scrollToTop}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full
               border transition-all duration-300"
            style={{
                borderColor: hovered
                    ? 'rgba(160,120,245,0.4)'
                    : 'rgba(255,255,255,0.08)',
                backgroundColor: hovered
                    ? 'rgba(160,120,245,0.05)'
                    : 'transparent',
            }}
            aria-label="Back to top"
        >
            <HiArrowUp
                className="w-3.5 h-3.5 transition-all duration-300"
                style={{
                    color: hovered ? 'var(--brand-violet)' : '#6b7280',
                    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                }}
            />
            <span
                className="text-xs font-medium transition-colors duration-300 hidden sm:inline"
                style={{ color: hovered ? 'var(--brand-violet)' : '#6b7280' }}
            >
                Top
            </span>
        </button>
    );
};

// ═══════════════════════════════════════════════════════════════
// MAIN FOOTER
// ═══════════════════════════════════════════════════════════════

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: FOOTER_KEYFRAMES }} />

            <footer
                className="relative overflow-hidden"
                style={{ backgroundColor: 'var(--bg-primary)' }}
            >
                {/* ═══════ TOP SEPARATOR ═══════ */}
                <div className="relative h-px">
                    <div
                        className="absolute inset-0"
                        style={{ background: gradients.separator }}
                    />
                    {/* Scanning light effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="h-full w-1/3"
                            style={{
                                background:
                                    'linear-gradient(90deg, transparent, rgba(160,120,245,0.6), transparent)',
                                animation:
                                    'footer-scan 4s ease-in-out infinite',
                            }}
                        />
                    </div>
                </div>

                {/* ═══════ BACKGROUND ═══════ */}
                <BackgroundEffects
                    preset="footer"
                    showGrid={true}
                    showNoise={true}
                />

                {/* ═══════ CONTENT ═══════ */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
                    {/* CTA Section */}
                    <FooterCTA />

                    {/* ═══════ MAIN GRID ═══════ */}
                    <div className="py-10 sm:py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6">
                        {/* Brand Column */}
                        <div className="col-span-2 sm:col-span-3 lg:col-span-4">
                            <Logo size="md" className="mb-4" />

                            <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-[280px]">
                                Modern web solutions built with cutting-edge
                                technologies. From concept to launch, we
                                deliver.
                            </p>

                            {/* Quick contact */}
                            <a
                                href={`mailto:${BRAND.email}`}
                                className="group inline-flex items-center gap-2 text-sm text-gray-500
                         hover:text-white transition-colors duration-300"
                            >
                                <HiOutlineEnvelope
                                    className="w-4 h-4 group-hover:text-[var(--brand-violet)]
                  transition-colors duration-300"
                                />
                                <span>{BRAND.email}</span>
                            </a>

                            {/* Social icons */}
                            <div className="mt-5">
                                <SocialIconRow size="sm" />
                            </div>
                        </div>

                        {/* Pages */}
                        <div className="lg:col-span-2">
                            <LinkColumn
                                title="Pages"
                                links={FOOTER_LINKS.pages}
                                isPage
                            />
                        </div>

                        {/* Sections */}
                        <div className="lg:col-span-2">
                            <LinkColumn
                                title="Sections"
                                links={FOOTER_LINKS.sections}
                            />
                        </div>

                        {/* Status & Info */}
                        <div className="col-span-2 sm:col-span-1 lg:col-span-4">
                            <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-600 font-semibold mb-3">
                                Status
                            </h4>

                            {/* Status indicators */}
                            <div className="space-y-3">
                                {/* System status */}
                                <div className="flex items-center gap-2.5">
                                    <span className="relative flex h-2 w-2">
                                        <span
                                            className="absolute inline-flex h-full w-full rounded-full"
                                            style={{
                                                backgroundColor: '#22c55e',
                                                animation:
                                                    'footer-blink 2s ease-in-out infinite',
                                            }}
                                        />
                                        <span
                                            className="relative inline-flex rounded-full h-2 w-2"
                                            style={{
                                                backgroundColor: '#22c55e',
                                            }}
                                        />
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        All systems operational
                                    </span>
                                </div>

                                {/* Availability */}
                                <div className="flex items-center gap-2.5">
                                    <span className="relative flex h-2 w-2">
                                        <span
                                            className="absolute inline-flex h-full w-full rounded-full"
                                            style={{
                                                backgroundColor: '#facc15',
                                                animation:
                                                    'footer-blink 2s ease-in-out infinite 0.5s',
                                            }}
                                        />
                                        <span
                                            className="relative inline-flex rounded-full h-2 w-2"
                                            style={{
                                                backgroundColor: '#facc15',
                                            }}
                                        />
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        Taking new projects
                                    </span>
                                </div>

                                {/* Response time */}
                                <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-white/5">
                                    <div
                                        className="w-8 h-1 rounded-full overflow-hidden"
                                        style={{
                                            backgroundColor:
                                                'rgba(255,255,255,0.05)',
                                        }}
                                    >
                                        <div
                                            className="h-full w-3/4 rounded-full"
                                            style={{
                                                background: gradients.brandText,
                                            }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-600">
                                        Avg. response: &lt;2hrs
                                    </span>
                                </div>
                            </div>

                            {/* Tech badge row */}
                            <div className="mt-5 flex flex-wrap gap-1.5">
                                {[
                                    'Next.js',
                                    'React',
                                    'TypeScript',
                                    'Tailwind',
                                ].map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-0.5 rounded text-[10px] font-medium"
                                        style={{
                                            backgroundColor:
                                                'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.06)',
                                            color: '#6b7280',
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ═══════ BOTTOM BAR ═══════ */}
                    <div className="py-5 border-t border-white/5">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            {/* Left: Copyright + Legal */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
                                <p className="text-gray-600 text-xs">
                                    © {currentYear} ZDev
                                </p>

                                <div className="flex items-center gap-3">
                                    {FOOTER_LINKS.legal.map((link, i) => (
                                        <React.Fragment key={link.name}>
                                            {i > 0 && (
                                                <span className="text-gray-800 text-xs">
                                                    ·
                                                </span>
                                            )}
                                            <Link
                                                href={link.href}
                                                className="text-gray-600 hover:text-gray-400 text-xs transition-colors duration-300"
                                            >
                                                {link.name}
                                            </Link>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Version + Back to top */}
                            <div className="flex items-center gap-4">
                                {/* Version indicator */}
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{
                                            backgroundColor:
                                                'var(--brand-violet)',
                                            animation:
                                                'footer-blink 3s ease-in-out infinite',
                                        }}
                                    />
                                    <span className="text-[10px] text-gray-700 font-mono tracking-wider">
                                        v1.0.0
                                    </span>
                                </div>

                                {/* Divider */}
                                <div className="w-px h-4 bg-white/5" />

                                <BackToTop />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════ BOTTOM GLOW LINE ═══════ */}
                <div className="relative h-px">
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                'linear-gradient(90deg, transparent 10%, rgba(160,120,245,0.15) 30%, rgba(72,149,239,0.15) 70%, transparent 90%)',
                            animation:
                                'footer-line-glow 4s ease-in-out infinite',
                        }}
                    />
                </div>
            </footer>
        </>
    );
};

export default Footer;
