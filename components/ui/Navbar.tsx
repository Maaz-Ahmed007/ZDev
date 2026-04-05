'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	HiArrowLongRight,
	HiXMark,
	HiOutlineUser,
	HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FiChevronRight } from 'react-icons/fi';
import Logo from '@/components/ui/Logo';
import { SocialIconRow } from '@/components/ui/SocialIcon';
import {
	cn,
	gradients,
	getRelativeMousePos,
	cursorSpotlight,
} from '@/lib/utils';

// ═══════════════════════════════════════════════════════════════
// ALL STYLES — Single source, no conflicts
// ═══════════════════════════════════════════════════════════════

const NAVBAR_STYLES = `
/* ── Base Nav ── */
.nav-root {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  transition: padding 0.5s cubic-bezier(0.22,1,0.36,1),
              background-color 0.5s ease,
              border-color 0.5s ease,
              backdrop-filter 0.5s ease;
}

.nav-root.nav-hidden {
  opacity: 0;
  transform: translateY(-16px);
}

.nav-root.nav-visible {
  opacity: 1;
  transform: translateY(0);
  transition: padding 0.5s cubic-bezier(0.22,1,0.36,1),
              background-color 0.5s ease,
              border-color 0.5s ease,
              backdrop-filter 0.5s ease,
              opacity 0.5s ease,
              transform 0.5s cubic-bezier(0.22,1,0.36,1);
}

.nav-glow-line {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(160,120,245,0.2), rgba(72,149,239,0.2), transparent);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.nav-root.nav-scrolled .nav-glow-line {
  opacity: 1;
}

/* ── Nav Links ── */
.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: #6b7280;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

.nav-link-bg {
  position: absolute;
  inset: 0;
  border-radius: 0.5rem;
  background: rgba(255,255,255,0.03);
  transform: scale(0.92);
  opacity: 0;
  transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
              opacity 0.35s ease;
}

.nav-link:hover .nav-link-bg,
.nav-link.active .nav-link-bg {
  transform: scale(1);
  opacity: 1;
}

.nav-link-label {
  position: relative;
  z-index: 1;
  transition: color 0.35s ease;
}

.nav-link:hover .nav-link-label,
.nav-link.active .nav-link-label {
  color: #ffffff;
}

.nav-link-indicator {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  height: 2px;
  width: 0;
  border-radius: 9999px;
  background: linear-gradient(90deg, var(--brand-violet), var(--brand-blue));
  transition: width 0.35s cubic-bezier(0.22,1,0.36,1);
}

.nav-link:hover .nav-link-indicator,
.nav-link.active .nav-link-indicator {
  width: 16px;
}

.nav-link-page-dot {
  position: absolute;
  top: 2px;
  right: 4px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--brand-violet);
  opacity: 0.5;
}

/* ── Auth Buttons ── */
.nav-auth-login {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: color 0.35s ease, background-color 0.35s ease;
}

.nav-auth-login:hover {
  color: #ffffff;
  background-color: rgba(255,255,255,0.03);
}

.nav-auth-signup {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--brand-violet-light);
  background: rgba(160,120,245,0.08);
  border: 1px solid rgba(160,120,245,0.15);
  transition: color 0.35s ease, background-color 0.35s ease, border-color 0.35s ease;
}

.nav-auth-signup:hover {
  color: #ffffff;
  background: rgba(160,120,245,0.15);
  border-color: rgba(160,120,245,0.3);
}

/* ── CTA Button ── */
.nav-cta {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.875rem;
  overflow: hidden;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

.nav-cta-border {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  padding: 1px;
  background: linear-gradient(90deg, rgba(160,120,245,0.4), rgba(72,149,239,0.4), rgba(160,120,245,0.4));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.nav-cta-fill {
  position: absolute;
  inset: 1px;
  border-radius: 9999px;
  background: linear-gradient(90deg, rgba(160,120,245,0.06), rgba(72,149,239,0.04));
  opacity: 0;
  transition: opacity 0.35s ease;
}

.nav-cta:hover .nav-cta-fill {
  opacity: 1;
}

.nav-cta-icon {
  position: relative;
  z-index: 1;
  color: #6b7280;
  transition: color 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
}

.nav-cta:hover .nav-cta-icon {
  color: var(--brand-violet);
  transform: rotate(12deg);
}

.nav-cta-label {
  position: relative;
  z-index: 1;
  color: #9ca3af;
  transition: color 0.35s ease;
}

.nav-cta:hover .nav-cta-label {
  color: #ffffff;
}

.nav-cta-arrow {
  position: relative;
  z-index: 1;
  color: #4b5563;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
}

.nav-cta:hover .nav-cta-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* ── Status Dot ── */
@keyframes nav-status-ping {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.2); opacity: 0; }
}

.nav-status-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  z-index: 20;
}

.nav-status-ping {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #22c55e;
  animation: nav-status-ping 2s ease-out infinite;
}

.nav-status-solid {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid var(--bg-primary);
}

/* ── Hamburger ── */
.hamburger {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.hamburger:hover {
  background: rgba(255,255,255,0.03);
  border-color: rgba(255,255,255,0.08);
}

.hamburger-line {
  display: block;
  height: 2px;
  border-radius: 9999px;
  background: #6b7280;
  transition: width 0.35s cubic-bezier(0.22,1,0.36,1),
              transform 0.35s cubic-bezier(0.22,1,0.36,1),
              opacity 0.25s ease,
              background-color 0.3s ease;
}

.hamburger:hover .hamburger-line {
  background: #ffffff;
}

/* ── Mobile Menu ── */
@keyframes mobile-overlay-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes mobile-panel-in {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes mobile-panel-out {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}

@keyframes mobile-item-in {
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 100;
}

.mobile-panel {
  position: fixed;
  top: 0; right: 0;
  height: 100%;
  width: 85%;
  max-width: 380px;
  background: var(--bg-elevated);
  z-index: 101;
}

.mobile-panel-glow {
  position: absolute;
  top: 0; left: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(160,120,245,0.25), rgba(72,149,239,0.25), transparent);
}

.mobile-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  text-decoration: none;
  border: 1px solid transparent;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}

.mobile-link:hover,
.mobile-link:active {
  background: rgba(255,255,255,0.03);
}

.mobile-link.active {
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.08);
}

.mobile-link-bar {
  width: 3px;
  height: 20px;
  border-radius: 9999px;
  background: linear-gradient(to bottom, var(--brand-violet), var(--brand-blue));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mobile-link.active .mobile-link-bar,
.mobile-link:hover .mobile-link-bar {
  opacity: 1;
}

.mobile-link:hover .mobile-link-bar {
  opacity: 0.4;
}

.mobile-link.active .mobile-link-bar {
  opacity: 1;
}

.mobile-link-name {
  font-weight: 500;
  color: #9ca3af;
  transition: color 0.3s ease;
}

.mobile-link.active .mobile-link-name,
.mobile-link:hover .mobile-link-name {
  color: #ffffff;
}

.mobile-link-chevron {
  color: #4b5563;
  transition: color 0.3s ease, transform 0.3s ease;
}

.mobile-link:hover .mobile-link-chevron {
  color: #9ca3af;
  transform: translateX(2px);
}

.mobile-link.active .mobile-link-chevron {
  color: var(--brand-violet);
}
`;

// ═══════════════════════════════════════════════════════════════
// NAV CONFIG
// ═══════════════════════════════════════════════════════════════

interface NavLink {
	name: string;
	href: string;
	isPage?: boolean;
}

const NAV_ITEMS: NavLink[] = [
	{ name: 'Store', href: '/store', isPage: true },
	{ name: 'Work', href: '/work', isPage: true },
];

// ═══════════════════════════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════════════════════════

const MobileMenu: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	pathname: string;
}> = ({ isOpen, onClose, pathname }) => {
	const [closing, setClosing] = useState(false);

	const handleClose = useCallback(() => {
		setClosing(true);
		setTimeout(() => {
			setClosing(false);
			onClose();
		}, 280);
	}, [onClose]);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	if (!isOpen && !closing) return null;

	return (
		<div className="md:hidden">
			{/* Overlay */}
			<div
				className="mobile-overlay"
				onClick={handleClose}
				style={{
					animation: closing
						? 'mobile-overlay-in 0.25s ease reverse forwards'
						: 'mobile-overlay-in 0.3s ease forwards',
				}}
			/>

			{/* Panel */}
			<div
				className="mobile-panel"
				style={{
					animation: closing
						? 'mobile-panel-out 0.28s cubic-bezier(0.4,0,1,1) forwards'
						: 'mobile-panel-in 0.35s cubic-bezier(0.22,1,0.36,1) forwards',
				}}
			>
				<div className="mobile-panel-glow" />

				{/* Header */}
				<div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
					<Logo size="sm" />
					<button
						onClick={handleClose}
						className="w-9 h-9 flex items-center justify-center rounded-lg
                     border border-white/10 hover:border-white/20 hover:bg-white/5
                     transition-all duration-300"
						aria-label="Close menu"
					>
						<HiXMark className="w-5 h-5 text-gray-400" />
					</button>
				</div>

				{/* Links */}
				<nav className="px-5 py-5">
					<p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold mb-3 px-1">
						Navigation
					</p>
					<div className="space-y-1">
						{NAV_ITEMS.map((link, i) => {
							const isActive = link.isPage
								? pathname === link.href
								: false;
							const El = link.isPage ? Link : 'a';

							return (
								<El
									key={link.name}
									href={link.href}
									onClick={handleClose}
									className={cn(
										'mobile-link',
										isActive && 'active',
									)}
									style={{
										animation: `mobile-item-in 0.35s ease-out ${120 + i * 50}ms both`,
									}}
								>
									<div className="flex items-center gap-3">
										<div className="mobile-link-bar" />
										<span className="mobile-link-name">
											{link.name}
										</span>
										{link.isPage && (
											<span
												className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
												style={{
													background:
														'rgba(160,120,245,0.1)',
													color: 'var(--brand-violet)',
													border: '1px solid rgba(160,120,245,0.15)',
												}}
											>
												Page
											</span>
										)}
									</div>
									<FiChevronRight className="mobile-link-chevron w-4 h-4" />
								</El>
							);
						})}
					</div>
				</nav>

				{/* Auth */}
				<div className="px-5 py-4 border-t border-white/5">
					<p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold mb-3 px-1">
						Account
					</p>
					<div
						className="space-y-2"
						style={{
							animation:
								'mobile-item-in 0.35s ease-out 400ms both',
						}}
					>
						<Link
							href="/login"
							onClick={handleClose}
							className="nav-auth-login w-full justify-center"
						>
							<HiOutlineArrowRightOnRectangle className="w-5 h-5" />
							<span>Log In</span>
						</Link>
						<Link
							href="/signup"
							onClick={handleClose}
							className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl
                       font-semibold text-sm text-white"
							style={{
								background: gradients.brand,
								backgroundSize: '200% 200%',
							}}
						>
							<HiOutlineUser className="w-4 h-4" />
							Create Account
						</Link>
					</div>
				</div>

				{/* Bottom */}
				<div
					className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-white/5"
					style={{
						animation: 'mobile-item-in 0.35s ease-out 500ms both',
					}}
				>
					<Link
						href="/lets-talk"
						onClick={handleClose}
						className="nav-cta w-full justify-center mb-4"
					>
						<div className="nav-cta-border" />
						<div className="nav-cta-fill" />
						<RiSendPlaneFill className="nav-cta-icon w-3.5 h-3.5" />
						<span className="nav-cta-label">Let&apos;s Talk</span>
						<HiArrowLongRight className="nav-cta-arrow w-4 h-4" />
					</Link>
					<div className="flex justify-center">
						<SocialIconRow size="sm" />
					</div>
				</div>
			</div>
		</div>
	);
};

// ═══════════════════════════════════════════════════════════════
// MAIN NAVBAR
// ═══════════════════════════════════════════════════════════════

const NavStyles = React.memo(() => (
	<style dangerouslySetInnerHTML={{ __html: NAVBAR_STYLES }} />
));

const Navbar: React.FC = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();

	// CTA spotlight
	const ctaRef = useRef<HTMLAnchorElement>(null);
	const spotlightRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		requestAnimationFrame(() =>
			requestAnimationFrame(() => setIsLoaded(true)),
		);
	}, []);

	useEffect(() => {
		let ticking = false;
		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					setScrolled(window.scrollY > 20);
					ticking = false;
				});
				ticking = true;
			}
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const handleCtaMove = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			if (!ctaRef.current || !spotlightRef.current) return;
			const pos = getRelativeMousePos(e, ctaRef.current);
			spotlightRef.current.style.background = cursorSpotlight(
				pos.x,
				pos.y,
				80,
				'rgba(160,120,245,0.12)',
			);
		},
		[],
	);

	const handleCtaMouseEnter = useCallback(() => {
		if (spotlightRef.current) spotlightRef.current.style.opacity = '1';
	}, []);

	const handleCtaMouseLeave = useCallback(() => {
		if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
	}, []);

	return (
		<>
			<NavStyles />

			<nav
				className={cn(
					'nav-root px-4 sm:px-6 lg:px-16',
					isLoaded ? 'nav-visible' : 'nav-hidden',
					scrolled && 'nav-scrolled',
				)}
				style={{
					padding: scrolled ? '0.65rem 1rem' : '1.1rem 1rem',
					backgroundColor: scrolled
						? 'rgba(7,7,10,0.88)'
						: 'transparent',
					borderBottom: scrolled
						? '1px solid rgba(255,255,255,0.04)'
						: '1px solid transparent',
					backdropFilter: scrolled
						? 'blur(12px)'
						: 'none',
					WebkitBackdropFilter: scrolled
						? 'blur(12px)'
						: 'none',
				}}
			>
				<div className="nav-glow-line" />

				<div className="max-w-7xl mx-auto flex items-center justify-between">
					{/* Logo */}
					<Logo size="md" />

					{/* Desktop Links */}
					<div className="hidden md:flex items-center gap-0.5">
						{NAV_ITEMS.map((link) => {
							const isActive = link.isPage
								? pathname === link.href
								: false;
							const El = link.isPage ? Link : 'a';

							return (
								<El
									key={link.name}
									href={link.href}
									className={cn(
										'nav-link',
										isActive && 'active',
									)}
								>
									<div className="nav-link-bg" />
									<span className="nav-link-label">
										{link.name}
									</span>
									<div className="nav-link-indicator" />
									{link.isPage && (
										<span className="nav-link-page-dot" />
									)}
								</El>
							);
						})}
					</div>

					{/* Desktop Right */}
					<div className="hidden md:flex items-center gap-2.5">
						{/* Auth */}
						<Link href="/login" className="nav-auth-login">
							<HiOutlineArrowRightOnRectangle className="w-4 h-4" />
							<span>Log In</span>
						</Link>

						<Link href="/signup" className="nav-auth-signup">
							<HiOutlineUser className="w-3.5 h-3.5" />
							<span>Sign Up</span>
						</Link>

						<div className="w-px h-4 bg-white/8 ml-1" />

						{/* Let's Talk */}
						<Link
							ref={ctaRef}
							href="/lets-talk"
							className="nav-cta"
							onMouseMove={handleCtaMove}
							onMouseEnter={handleCtaMouseEnter}
							onMouseLeave={handleCtaMouseLeave}
						>
							<div className="nav-cta-border" />
							<div className="nav-cta-fill" />

							{/* Cursor spotlight */}
							<div
								ref={spotlightRef}
								className="absolute inset-0 rounded-full pointer-events-none"
								style={{
									opacity: 0,
									transition: 'opacity 0.3s ease',
								}}
							/>

							<RiSendPlaneFill className="nav-cta-icon w-3.5 h-3.5" />
							<span className="nav-cta-label">
								Let&apos;s Talk
							</span>
							<HiArrowLongRight className="nav-cta-arrow w-4 h-4" />

							{/* Status dot */}
							<span className="nav-status-dot">
								<span className="nav-status-ping" />
								<span className="nav-status-solid" />
							</span>
						</Link>
					</div>

					{/* Hamburger */}
					<button
						className="hamburger flex items-center justify-center md:hidden"
						onClick={() => setMobileOpen(!mobileOpen)}
						aria-label="Menu"
					>
						<div className="flex flex-col gap-[5px] items-center">
							<span
								className="hamburger-line"
								style={{ width: mobileOpen ? 20 : 20 }}
							/>
							<span
								className="hamburger-line"
								style={{
									width: mobileOpen ? 0 : 24,
									opacity: mobileOpen ? 0 : 1,
								}}
							/>
							<span
								className="hamburger-line"
								style={{ width: mobileOpen ? 20 : 16 }}
							/>
						</div>
					</button>
				</div>
			</nav>

			<MobileMenu
				isOpen={mobileOpen}
				onClose={() => setMobileOpen(false)}
				pathname={pathname}
			/>
		</>
	);
};

export default Navbar;
