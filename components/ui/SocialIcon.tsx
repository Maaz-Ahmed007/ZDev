// components/ui/SocialIcon.tsx
'use client';

import React, { useState } from 'react';
import {
    FiGithub,
    FiTwitter,
    FiLinkedin,
    FiDribbble,
    FiInstagram,
} from 'react-icons/fi';
import { SOCIAL_LINKS } from '@/lib/constants';

// Icon mapping
const SOCIAL_ICONS: Record<
    string,
    React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
    GitHub: FiGithub,
    Twitter: FiTwitter,
    LinkedIn: FiLinkedin,
    Dribbble: FiDribbble,
    Instagram: FiInstagram,
};

interface SocialIconProps {
    social: (typeof SOCIAL_LINKS)[number];
    size?: 'sm' | 'md';
}

const sizeStyles = {
    sm: { wrapper: 'p-2', icon: 'w-4 h-4' },
    md: { wrapper: 'p-2.5', icon: 'w-5 h-5' },
};

const SocialIcon: React.FC<SocialIconProps> = ({ social, size = 'md' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = SOCIAL_ICONS[social.name];
    if (!Icon) return null;

    const s = sizeStyles[size];

    return (
        <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative ${s.wrapper} rounded-lg border transition-all duration-300 ease-out`}
            style={{
                backgroundColor: isHovered
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(255,255,255,0.02)',
                borderColor: isHovered
                    ? 'rgba(255,255,255,0.15)'
                    : 'rgba(255,255,255,0.05)',
                transform: isHovered
                    ? 'scale(1.1) translateY(-2px)'
                    : 'scale(1) translateY(0)',
                boxShadow: isHovered
                    ? `0 0 20px 5px ${social.color}25`
                    : 'none',
            }}
            aria-label={social.name}
        >
            <Icon
                className={`${s.icon} transition-colors duration-300`}
                style={{ color: isHovered ? social.color : '#6b7280' }}
            />
        </a>
    );
};

export default SocialIcon;

// Export a row of all social icons
export const SocialIconRow: React.FC<{ size?: 'sm' | 'md' }> = ({
    size = 'md',
}) => (
    <div className="flex items-center gap-2">
        {SOCIAL_LINKS.map((social) => (
            <SocialIcon key={social.name} social={social} size={size} />
        ))}
    </div>
);
