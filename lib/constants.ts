// lib/constants.ts

// ═══════════════════════════════════════════════════════════════
// NAVIGATION - Updated for multi-page app
// ═══════════════════════════════════════════════════════════════

export const NAV_LINKS = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Store', href: '/store' },
    { name: 'Progress', href: '/progress' },
] as const;

// ═══════════════════════════════════════════════════════════════
// SOCIAL LINKS
// ═══════════════════════════════════════════════════════════════

export const SOCIAL_LINKS = [
    { name: 'GitHub', href: 'https://github.com', color: '#ffffff' },
    { name: 'Twitter', href: 'https://twitter.com', color: '#1DA1F2' },
    { name: 'LinkedIn', href: 'https://linkedin.com', color: '#0A66C2' },
    { name: 'Dribbble', href: 'https://dribbble.com', color: '#EA4C89' },
    { name: 'Instagram', href: 'https://instagram.com', color: '#E4405F' },
] as const;

// ═══════════════════════════════════════════════════════════════
// FOOTER LINKS - Compact & Precise
// ═══════════════════════════════════════════════════════════════

export const FOOTER_LINKS = {
    pages: [
        { name: 'Home', href: '/' },
        { name: 'Store', href: '/store' },
        { name: 'Progress', href: '/progress' },
        { name: "Let's Talk", href: '/lets-talk' },
    ],
    sections: [
        { name: 'Work', href: '#work' },
        { name: 'Services', href: '#services' },
        { name: 'Templates', href: '#templates' },
    ],
    legal: [
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
    ],
} as const;

// ═══════════════════════════════════════════════════════════════
// TECHNOLOGIES
// ═══════════════════════════════════════════════════════════════

export const TECHNOLOGIES = [
    {
        name: 'Next.js',
        color: '#ffffff',
        shadowColor: 'rgba(255, 255, 255, 0.3)',
    },
    { name: 'React', color: '#61dafb', shadowColor: 'rgba(97, 218, 251, 0.4)' },
    {
        name: 'TypeScript',
        color: '#3178c6',
        shadowColor: 'rgba(49, 120, 198, 0.4)',
    },
    {
        name: 'Tailwind',
        color: '#06b6d4',
        shadowColor: 'rgba(6, 182, 212, 0.4)',
    },
    { name: 'Figma', color: '#f24e1e', shadowColor: 'rgba(242, 78, 30, 0.4)' },
    {
        name: 'Framer',
        color: '#ffffff',
        shadowColor: 'rgba(255, 255, 255, 0.3)',
    },
] as const;

// ═══════════════════════════════════════════════════════════════
// BRAND
// ═══════════════════════════════════════════════════════════════

export const BRAND = {
    name: 'ZDev',
    tagline: 'Modern Web Solutions',
    email: 'hello@zdev.com',
    phone: '+1 (234) 567-890',
    location: 'San Francisco, CA',
} as const;
