"use client";

import React, { useState, useRef, useCallback } from "react";
import {
	HiOutlineEnvelope,
	HiOutlineMapPin,
	HiOutlinePhone,
} from "react-icons/hi2";
import {
	FiGithub,
	FiTwitter,
	FiLinkedin,
	FiDribbble,
	FiInstagram,
	FiArrowUpRight,
} from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";
import Link from "next/link";

/*
  ═══════════════════════════════════════════════════════════════
  DARK AURORA DESIGN SYSTEM - FOOTER
  ═══════════════════════════════════════════════════════════════
  
  COLOR PALETTE:
  --brand-violet:       #A078F5
  --brand-blue:         #4895EF
  --bg-primary:         #07070a
  --bg-elevated:        #0c0c10
  
  ═══════════════════════════════════════════════════════════════
*/

// Navigation Links Data
const footerLinks = {
	navigation: [
		{ name: "Work", href: "#work" },
		{ name: "Services", href: "#services" },
		{ name: "Templates", href: "#templates" },
		{ name: "About", href: "#about" },
		{ name: "Contact", href: "#contact" },
	],
	services: [
		{ name: "Web Development", href: "#" },
		{ name: "UI/UX Design", href: "#" },
		{ name: "Next.js Apps", href: "#" },
		{ name: "Template Design", href: "#" },
		{ name: "Consulting", href: "#" },
	],
	resources: [
		{ name: "Blog", href: "#" },
		{ name: "Free Templates", href: "#" },
		{ name: "Documentation", href: "#" },
		{ name: "Changelog", href: "#" },
	],
	legal: [
		{ name: "Privacy Policy", href: "#" },
		{ name: "Terms of Service", href: "#" },
		{ name: "License", href: "#" },
	],
};

// Social Links Data
const socialLinks = [
	{
		name: "GitHub",
		icon: FiGithub,
		href: "https://github.com",
		color: "#ffffff",
	},
	{
		name: "Twitter",
		icon: FiTwitter,
		href: "https://twitter.com",
		color: "#1DA1F2",
	},
	{
		name: "LinkedIn",
		icon: FiLinkedin,
		href: "https://linkedin.com",
		color: "#0A66C2",
	},
	{
		name: "Dribbble",
		icon: FiDribbble,
		href: "https://dribbble.com",
		color: "#EA4C89",
	},
	{
		name: "Instagram",
		icon: FiInstagram,
		href: "https://instagram.com",
		color: "#E4405F",
	},
];

// Floating Shapes for Footer (fewer, more subtle)
const footerShapes = [
	{
		type: "circle-outline",
		size: 10,
		top: "15%",
		left: "5%",
		animation: "animate-float-drift",
		color: "rgba(160, 120, 245, 0.15)",
	},
	{
		type: "diamond-outline",
		size: 8,
		top: "25%",
		right: "8%",
		animation: "animate-spin-slow",
		color: "rgba(72, 149, 239, 0.12)",
	},
	{
		type: "circle-filled",
		size: 3,
		top: "40%",
		left: "15%",
		animation: "animate-blink-fade",
		color: "rgba(160, 120, 245, 0.3)",
	},
	{
		type: "square-outline",
		size: 6,
		bottom: "30%",
		right: "12%",
		animation: "animate-float-drift-alt",
		color: "rgba(72, 149, 239, 0.1)",
	},
	{
		type: "circle-filled",
		size: 2,
		bottom: "20%",
		left: "25%",
		animation: "animate-blink-fade-delayed",
		color: "rgba(160, 120, 245, 0.35)",
	},
	{
		type: "circle-filled",
		size: 2,
		top: "60%",
		right: "20%",
		animation: "animate-pulse-scale",
		color: "rgba(72, 149, 239, 0.25)",
	},
];

// Shape Renderer
const FloatingShape = ({ shape }: { shape: (typeof footerShapes)[0] }) => {
	const baseStyle: React.CSSProperties = {
		position: "absolute",
		top: shape.top,
		left: shape.left,
		right: shape.right,
		bottom: shape.bottom,
	};

	switch (shape.type) {
		case "circle-outline":
			return (
				<div
					className={shape.animation}
					style={{
						...baseStyle,
						width: shape.size,
						height: shape.size,
						borderRadius: "50%",
						border: `1px solid ${shape.color}`,
					}}
				/>
			);
		case "circle-filled":
			return (
				<div
					className={shape.animation}
					style={{
						...baseStyle,
						width: shape.size,
						height: shape.size,
						borderRadius: "50%",
						backgroundColor: shape.color,
					}}
				/>
			);
		case "square-outline":
			return (
				<div
					className={shape.animation}
					style={{
						...baseStyle,
						width: shape.size,
						height: shape.size,
						border: `1px solid ${shape.color}`,
					}}
				/>
			);
		case "diamond-outline":
			return (
				<div
					className={shape.animation}
					style={{
						...baseStyle,
						width: shape.size,
						height: shape.size,
						border: `1px solid ${shape.color}`,
						transform: "rotate(45deg)",
					}}
				/>
			);
		default:
			return null;
	}
};

// Social Icon Component with Hover Effect
const SocialIcon = ({ social }: { social: (typeof socialLinks)[0] }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<a
			href={social.href}
			target="_blank"
			rel="noopener noreferrer"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="relative p-2.5 rounded-lg border transition-all duration-300 ease-out group"
			style={{
				backgroundColor: isHovered
					? "rgba(255, 255, 255, 0.05)"
					: "rgba(255, 255, 255, 0.02)",
				borderColor: isHovered
					? "rgba(255, 255, 255, 0.15)"
					: "rgba(255, 255, 255, 0.05)",
				transform: isHovered
					? "scale(1.1) translateY(-2px)"
					: "scale(1) translateY(0)",
				boxShadow: isHovered
					? `0 0 20px 5px ${social.color}25`
					: "none",
			}}
			aria-label={social.name}>
			<social.icon
				className="w-5 h-5 transition-colors duration-300"
				style={{ color: isHovered ? social.color : "#6b7280" }}
			/>
		</a>
	);
};

// Newsletter Input Component
const NewsletterForm = () => {
	const [email, setEmail] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const inputRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!inputRef.current) return;
			const rect = inputRef.current.getBoundingClientRect();
			setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
		},
		[]
	);

	return (
		<div
			ref={inputRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="relative mt-4">
			{/* Cursor Glow */}
			<div
				className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-200"
				style={{
					opacity: isHovered ? 1 : 0,
					background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(160, 120, 245, 0.1), transparent 50%)`,
				}}
			/>

			{/* Input Container */}
			<div
				className="relative flex items-center rounded-full p-1 transition-all duration-300"
				style={{
					backgroundColor: "rgba(255, 255, 255, 0.03)",
					border: `1px solid ${
						isFocused
							? "rgba(160, 120, 245, 0.4)"
							: "rgba(255, 255, 255, 0.08)"
					}`,
					boxShadow: isFocused
						? "0 0 20px rgba(160, 120, 245, 0.15)"
						: "none",
				}}>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					placeholder="Enter your email"
					className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
				/>

				{/* Submit Button */}
				<button
					type="submit"
					onMouseMove={(e) => {
						const rect = e.currentTarget.getBoundingClientRect();
						const x = e.clientX - rect.left;
						const y = e.clientY - rect.top;
						e.currentTarget.style.setProperty(
							"--mouse-x",
							`${x}px`
						);
						e.currentTarget.style.setProperty(
							"--mouse-y",
							`${y}px`
						);
					}}
					className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm overflow-hidden transition-all duration-300"
					style={{
						background:
							"linear-gradient(135deg, var(--brand-violet) 0%, #7B5FD4 30%, var(--brand-blue) 60%, #7B5FD4 80%, var(--brand-violet) 100%)",
						backgroundSize: "200% 200%",
					}}>
					{/* Cursor Spotlight */}
					<div
						className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
						style={{
							background:
								"radial-gradient(60px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.25), transparent 50%)",
						}}
					/>

					{/* Shine Sweep */}
					<div className="absolute inset-0 overflow-hidden rounded-full">
						<div
							className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out skew-x-[-15deg]"
							style={{
								background:
									"linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
							}}
						/>
					</div>

					{/* Top Highlight */}
					<div
						className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						style={{
							background:
								"linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
						}}
					/>

					<span className="relative text-white text-sm z-10">
						Subscribe
					</span>
					<RiSendPlaneFill className="relative w-3.5 h-3.5 text-white z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
				</button>
			</div>
		</div>
	);
};

// Link Column Component
const LinkColumn = ({
	title,
	links,
}: {
	title: string;
	links: { name: string; href: string }[];
}) => {
	return (
		<div>
			<h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
				{title}
			</h4>
			<ul className="space-y-3">
				{links.map((link) => (
					<li key={link.name}>
						<a
							href={link.href}
							className="group inline-flex items-center gap-1 text-gray-500 hover:text-white text-sm transition-all duration-300">
							<span className="relative">
								{link.name}
								<span
									className="absolute left-0 -bottom-0.5 w-0 h-px group-hover:w-full transition-all duration-300"
									style={{
										background:
											"linear-gradient(90deg, var(--brand-violet), var(--brand-blue))",
									}}
								/>
							</span>
							<FiArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

// Back to Top Button
const BackToTopButton = () => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<a
			href="#"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="group relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300"
			style={{
				borderColor: isHovered
					? "rgba(160, 120, 245, 0.4)"
					: "rgba(255, 255, 255, 0.1)",
				backgroundColor: isHovered
					? "rgba(160, 120, 245, 0.05)"
					: "transparent",
			}}>
			{/* Arrow Icon */}
			<svg
				className="w-4 h-4 transition-transform duration-300"
				style={{
					color: isHovered ? "var(--brand-violet)" : "#6b7280",
					transform: isHovered ? "translateY(-2px)" : "translateY(0)",
				}}
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M5 10l7-7m0 0l7 7m-7-7v18"
				/>
			</svg>
			<span
				className="text-sm font-medium transition-colors duration-300"
				style={{
					color: isHovered ? "var(--brand-violet)" : "#6b7280",
				}}>
				Back to top
			</span>
		</a>
	);
};

// Main Footer Component
const Footer = () => {
	const [ctaMousePos, setCtaMousePos] = useState({ x: 0, y: 0 });
	const [isCtaHovered, setIsCtaHovered] = useState(false);
	const ctaRef = useRef<HTMLAnchorElement>(null);
	const currentYear = new Date().getFullYear();

	const handleCtaMouseMove = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			if (!ctaRef.current) return;
			const rect = ctaRef.current.getBoundingClientRect();
			setCtaMousePos({
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			});
		},
		[]
	);

	return (
		<footer
			className="relative overflow-hidden"
			style={{ backgroundColor: "var(--bg-primary)" }}>
			{/* ═══════ BACKGROUND ELEMENTS ═══════ */}

			{/* Top Gradient Border */}
			<div
				className="absolute top-0 left-0 right-0 h-px"
				style={{
					background:
						"linear-gradient(90deg, transparent, rgba(160, 120, 245, 0.3), rgba(72, 149, 239, 0.3), transparent)",
				}}
			/>

			{/* Ambient Gradient Orbs */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{/* Left Orb */}
				<div
					className="absolute -bottom-32 -left-32 w-100 h-100 rounded-full animate-float-drift"
					style={{
						background:
							"radial-gradient(circle, rgba(160, 120, 245, 0.08) 0%, transparent 60%)",
						filter: "blur(60px)",
					}}
				/>

				{/* Right Orb */}
				<div
					className="absolute -bottom-20 -right-20 w-75 h-75 rounded-full animate-float-drift-alt"
					style={{
						background:
							"radial-gradient(circle, rgba(72, 149, 239, 0.06) 0%, transparent 60%)",
						filter: "blur(50px)",
					}}
				/>
			</div>

			{/* Floating Shapes */}
			<div className="absolute inset-0 pointer-events-none">
				{footerShapes.map((shape, index) => (
					<FloatingShape key={index} shape={shape} />
				))}
			</div>

			{/* Grid Pattern (subtle) */}
			<div
				className="absolute inset-0 opacity-[0.015] pointer-events-none"
				style={{
					backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
					backgroundSize: "60px 60px",
					maskImage:
						"linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
					WebkitMaskImage:
						"linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
				}}
			/>

			{/* ═══════ MAIN CONTENT ═══════ */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
				{/* ═══════ TOP SECTION - CTA ═══════ */}
				<div className="py-16 border-b border-white/5">
					<div className="flex flex-col lg:flex-row items-center justify-between gap-8">
						{/* CTA Text */}
						<div className="text-center lg:text-left">
							<h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
								Let&apos;s Build Something
								<span
									className="ml-2"
									style={{
										background:
											"linear-gradient(90deg, var(--brand-violet), var(--brand-blue))",
										WebkitBackgroundClip: "text",
										backgroundClip: "text",
										color: "transparent",
									}}>
									Amazing
								</span>
							</h2>
							<p className="text-gray-500 text-base max-w-md">
								Have a project in mind? Let&apos;s discuss how we can
								bring your vision to life.
							</p>
						</div>

						{/* CTA Button */}
						<a
							ref={ctaRef}
							href="#contact"
							onMouseMove={handleCtaMouseMove}
							onMouseEnter={() => setIsCtaHovered(true)}
							onMouseLeave={() => setIsCtaHovered(false)}
							className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base overflow-hidden">
							{/* Gradient Background */}
							<div
								className="absolute inset-0 animate-btn-gradient"
								style={{
									background:
										"linear-gradient(135deg, var(--brand-violet) 0%, #7B5FD4 30%, var(--brand-blue) 60%, #7B5FD4 80%, var(--brand-violet) 100%)",
									backgroundSize: "200% 200%",
								}}
							/>

							{/* Cursor Spotlight - Same as Hero */}
							<div
								className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
								style={{
									opacity: isCtaHovered ? 1 : 0,
									background: `radial-gradient(100px circle at ${ctaMousePos.x}px ${ctaMousePos.y}px, rgba(255, 255, 255, 0.25), transparent 50%)`,
								}}
							/>

							{/* Glow */}
							<div
								className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-300"
								style={{
									background:
										"linear-gradient(135deg, var(--brand-violet), var(--brand-blue))",
									filter: "blur(20px)",
								}}
							/>

							{/* Shine Sweep */}
							<div className="absolute inset-0 overflow-hidden rounded-full">
								<div
									className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out skew-x-[-15deg]"
									style={{
										background:
											"linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
									}}
								/>
							</div>

							{/* Top Highlight */}
							<div
								className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								style={{
									background:
										"linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
								}}
							/>

							<span className="relative text-white z-10">
								Start a Project
							</span>
							<FiArrowUpRight className="relative w-5 h-5 text-white z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
						</a>
					</div>
				</div>

				{/* ═══════ MIDDLE SECTION - LINKS & NEWSLETTER ═══════ */}
				<div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
					{/* Brand & Newsletter Column */}
					<div className="lg:col-span-4">
						{/* Logo */}
						<Link
							href="/"
							className="group inline-flex items-center mb-6">
							<div className="relative">
								<span className="text-2xl font-bold tracking-tight">
									<span className="text-white">Z</span>
									<span className="text-gray-500 group-hover:text-white transition-colors duration-300">
										Dev
									</span>
								</span>

								{/* Animated Underline */}
								<div className="absolute -bottom-1 left-0 w-full h-0.5 overflow-hidden">
									<div
										className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
										style={{
											background:
												"linear-gradient(90deg, var(--brand-violet), var(--brand-blue))",
										}}
									/>
								</div>
							</div>

							{/* Animated Dot */}
							<div className="relative ml-1 mb-3">
								<span className="block w-1.5 h-1.5 rounded-full bg-(--brand-violet) group-hover:scale-125 transition-transform duration-300" />
								<span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-(--brand-violet) animate-ping opacity-50" />
							</div>
						</Link>

						<p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
							Crafting exceptional digital experiences with modern
							technologies. Specialized in Next.js, React, and
							creative web design.
						</p>

						{/* Newsletter */}
						<div>
							<h4 className="text-white font-semibold text-sm mb-2">
								Stay Updated
							</h4>
							<p className="text-gray-600 text-xs mb-3">
								Get notified about new templates and tips.
							</p>
							<NewsletterForm />
						</div>
					</div>

					{/* Navigation Links */}
					<div className="lg:col-span-2">
						<LinkColumn
							title="Navigation"
							links={footerLinks.navigation}
						/>
					</div>

					{/* Services Links */}
					<div className="lg:col-span-2">
						<LinkColumn
							title="Services"
							links={footerLinks.services}
						/>
					</div>

					{/* Resources Links */}
					<div className="lg:col-span-2">
						<LinkColumn
							title="Resources"
							links={footerLinks.resources}
						/>
					</div>

					{/* Contact Info */}
					<div className="lg:col-span-2">
						<h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
							Contact
						</h4>
						<ul className="space-y-4">
							<li>
								<a
									href="mailto:hello@zdev.com"
									className="group flex items-center gap-3 text-gray-500 hover:text-white transition-colors duration-300">
									<div
										className="p-2 rounded-lg border transition-all duration-300 group-hover:border-(--brand-violet)/30"
										style={{
											backgroundColor:
												"rgba(255,255,255,0.02)",
											borderColor:
												"rgba(255,255,255,0.05)",
										}}>
										<HiOutlineEnvelope className="w-4 h-4 group-hover:text-(--brand-violet) transition-colors duration-300" />
									</div>
									<span className="text-sm">
										hello@zdev.com
									</span>
								</a>
							</li>
							<li>
								<a
									href="tel:+1234567890"
									className="group flex items-center gap-3 text-gray-500 hover:text-white transition-colors duration-300">
									<div
										className="p-2 rounded-lg border transition-all duration-300 group-hover:border-(--brand-blue)/30"
										style={{
											backgroundColor:
												"rgba(255,255,255,0.02)",
											borderColor:
												"rgba(255,255,255,0.05)",
										}}>
										<HiOutlinePhone className="w-4 h-4 group-hover:text-(--brand-blue) transition-colors duration-300" />
									</div>
									<span className="text-sm">
										+1 (234) 567-890
									</span>
								</a>
							</li>
							<li>
								<div className="group flex items-center gap-3 text-gray-500">
									<div
										className="p-2 rounded-lg border"
										style={{
											backgroundColor:
												"rgba(255,255,255,0.02)",
											borderColor:
												"rgba(255,255,255,0.05)",
										}}>
										<HiOutlineMapPin className="w-4 h-4" />
									</div>
									<span className="text-sm">
										San Francisco, CA
									</span>
								</div>
							</li>
						</ul>
					</div>
				</div>

				{/* ═══════ BOTTOM SECTION - COPYRIGHT & SOCIALS ═══════ */}
				<div className="py-8 border-t border-white/5">
					<div className="flex flex-col md:flex-row items-center justify-between gap-6">
						{/* Copyright & Legal */}
						<div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
							<p className="text-gray-600 text-sm">
								© {currentYear} ZDev. All rights reserved.
							</p>

							{/* Legal Links */}
							<div className="flex items-center gap-4">
								{footerLinks.legal.map((link, index) => (
									<React.Fragment key={link.name}>
										{index > 0 && (
											<span className="text-gray-700">
												·
											</span>
										)}
										<a
											href={link.href}
											className="text-gray-600 hover:text-white text-sm transition-colors duration-300">
											{link.name}
										</a>
									</React.Fragment>
								))}
							</div>
						</div>

						{/* Social Links & Back to Top */}
						<div className="flex items-center gap-6">
							{/* Social Icons */}
							<div className="flex items-center gap-2">
								{socialLinks.map((social) => (
									<SocialIcon
										key={social.name}
										social={social}
									/>
								))}
							</div>

							{/* Divider */}
							<div className="hidden md:block w-px h-8 bg-white/10" />

							{/* Back to Top */}
							<BackToTopButton />
						</div>
					</div>
				</div>
			</div>

			{/* ═══════ DECORATIVE BOTTOM GLOW ═══════ */}
			<div
				className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
				style={{
					background:
						"linear-gradient(90deg, transparent, rgba(160, 120, 245, 0.2), rgba(72, 149, 239, 0.2), transparent)",
				}}
			/>
		</footer>
	);
};

export default Footer;