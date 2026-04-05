// components/ui/OutlineButton.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { cn, gradients } from '@/lib/utils';

interface OutlineButtonProps {
    href: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    external?: boolean;
}

const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
};

const OUTLINE_STYLES = `
  .outline-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.625rem;
    border-radius: 9999px;
    font-weight: 600;
    overflow: hidden;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }

  .outline-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    padding: 1px;
    background: linear-gradient(90deg, rgba(160,120,245,0.3), rgba(72,149,239,0.3), rgba(160,120,245,0.3));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .outline-btn::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 9999px;
    background: linear-gradient(90deg, rgba(160,120,245,0.08), rgba(72,149,239,0.06));
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .outline-btn:hover::after {
    opacity: 1;
  }

  .outline-btn-icon {
    color: #6b7280;
    transition: color 0.4s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .outline-btn:hover .outline-btn-icon {
    color: var(--brand-violet);
  }

  .outline-btn-text {
    color: #9ca3af;
    transition: color 0.4s ease;
  }

  .outline-btn:hover .outline-btn-text {
    color: #ffffff;
  }

  .outline-btn-trail {
    color: #4b5563;
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .outline-btn:hover .outline-btn-trail {
    opacity: 1;
    transform: translateX(0);
  }
`;

const OutlineButton: React.FC<OutlineButtonProps> = ({
    href,
    children,
    icon,
    trailingIcon,
    size = 'md',
    className,
    external = false,
}) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    const Component = isInternal && !external ? Link : 'a';

    const linkProps = external
        ? { target: '_blank' as const, rel: 'noopener noreferrer' }
        : {};

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: OUTLINE_STYLES }} />
            <Component
                href={href}
                className={cn('outline-btn', sizeStyles[size], className)}
                {...linkProps}
            >
                {icon && (
                    <span className="outline-btn-icon relative z-10 inline-flex">
                        {icon}
                    </span>
                )}

                <span className="outline-btn-text relative z-10">
                    {children}
                </span>

                {trailingIcon && (
                    <span className="outline-btn-trail relative z-10 inline-flex">
                        {trailingIcon}
                    </span>
                )}
            </Component>
        </>
    );
};

export default OutlineButton;
