"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
	HiOutlineSparkles,
	HiOutlineSquares2X2,
	HiArrowLongRight,
} from "react-icons/hi2";
import { FiChevronRight } from "react-icons/fi";
import {
	SiNextdotjs,
	SiReact,
	SiTypescript,
	SiTailwindcss,
	SiFigma,
	SiFramer,
} from "react-icons/si";
import { RiSendPlaneFill } from "react-icons/ri";
import Link from "next/link";

/*
  ═══════════════════════════════════════════════════════════════
  COLOR PALETTE REFERENCE
  ═══════════════════════════════════════════════════════════════
  
  BRAND:
  --brand-violet:       #A078F5
  --brand-blue:         #4895EF
  
  TECH ICONS (on hover):
  --tech-nextjs:        #ffffff
  --tech-react:         #61dafb
  --tech-typescript:    #3178c6
  --tech-tailwind:      #06b6d4
  --tech-figma:         #f24e1e
  --tech-framer:        #bb4bff
  
  ═══════════════════════════════════════════════════════════════
*/

// Technology data with colors and shadow values
const technologies = [
	{
		icon: SiNextdotjs,
		name: "Next.js",
		color: "#ffffff",
		shadowColor: "rgba(255, 255, 255, 0.3)",
	},
	{
		icon: SiReact,
		name: "React",
		color: "#61dafb",
		shadowColor: "rgba(97, 218, 251, 0.4)",
	},
	{
		icon: SiTypescript,
		name: "TypeScript",
		color: "#3178c6",
		shadowColor: "rgba(49, 120, 198, 0.4)",
	},
	{
		icon: SiTailwindcss,
		name: "Tailwind",
		color: "#06b6d4",
		shadowColor: "rgba(6, 182, 212, 0.4)",
	},
	{
		icon: SiFigma,
		name: "Figma",
		color: "#f24e1e",
		shadowColor: "rgba(242, 78, 30, 0.4)",
	},
	{
		icon: SiFramer,
		name: "Framer",
		color: "#ffffff",
		shadowColor: "rgba(255, 255, 255, 0.3)",
	},
];

// Floating shapes configuration
const floatingShapes = [
	// Outlined shapes
	{
		type: "circle-outline",
		size: 12,
		top: "18%",
		left: "12%",
		animation: "animate-float-drift",
		delay: "0s",
		color: "rgba(160, 120, 245, 0.2)",
	},
	{
		type: "square-outline",
		size: 10,
		top: "25%",
		right: "15%",
		animation: "animate-float-drift-alt",
		delay: "-2s",
		color: "rgba(72, 149, 239, 0.15)",
	},
	{
		type: "diamond-outline",
		size: 14,
		bottom: "30%",
		left: "18%",
		animation: "animate-spin-slow",
		delay: "0s",
		color: "rgba(160, 120, 245, 0.12)",
	},
	{
		type: "triangle-outline",
		size: 11,
		top: "40%",
		right: "10%",
		animation: "animate-float-drift",
		delay: "-3s",
		color: "rgba(72, 149, 239, 0.18)",
	},
	{
		type: "circle-outline",
		size: 8,
		bottom: "25%",
		right: "22%",
		animation: "animate-blink-fade",
		delay: "-1s",
		color: "rgba(160, 120, 245, 0.25)",
	},
	{
		type: "hexagon-outline",
		size: 16,
		top: "55%",
		left: "8%",
		animation: "animate-spin-slow-reverse",
		delay: "0s",
		color: "rgba(72, 149, 239, 0.1)",
	},

	// Filled shapes
	{
		type: "circle-filled",
		size: 4,
		top: "22%",
		left: "25%",
		animation: "animate-blink-fade",
		delay: "0s",
		color: "rgba(160, 120, 245, 0.35)",
	},
	{
		type: "circle-filled",
		size: 3,
		top: "35%",
		right: "28%",
		animation: "animate-blink-fade-delayed",
		delay: "-1.5s",
		color: "rgba(72, 149, 239, 0.4)",
	},
	{
		type: "square-filled",
		size: 5,
		bottom: "40%",
		left: "30%",
		animation: "animate-pulse-scale",
		delay: "0s",
		color: "rgba(160, 120, 245, 0.25)",
	},
	{
		type: "circle-filled",
		size: 3,
		top: "48%",
		left: "15%",
		animation: "animate-float-orbit-small",
		delay: "0s",
		color: "rgba(72, 149, 239, 0.3)",
	},
	{
		type: "diamond-filled",
		size: 6,
		top: "30%",
		left: "40%",
		animation: "animate-blink-fade",
		delay: "-2s",
		color: "rgba(160, 120, 245, 0.2)",
	},
	{
		type: "circle-filled",
		size: 4,
		bottom: "35%",
		right: "12%",
		animation: "animate-pulse-scale",
		delay: "-1s",
		color: "rgba(72, 149, 239, 0.35)",
	},
	{
		type: "square-filled",
		size: 4,
		top: "60%",
		right: "35%",
		animation: "animate-blink-fade-delayed",
		delay: "0s",
		color: "rgba(160, 120, 245, 0.3)",
	},
	{
		type: "circle-filled",
		size: 2,
		top: "15%",
		right: "40%",
		animation: "animate-float-drift",
		delay: "-4s",
		color: "rgba(72, 149, 239, 0.45)",
	},

	// Additional small dots
	{
		type: "circle-filled",
		size: 2,
		top: "70%",
		left: "22%",
		animation: "animate-blink-fade",
		delay: "-3s",
		color: "rgba(160, 120, 245, 0.4)",
	},
	{
		type: "circle-filled",
		size: 3,
		bottom: "20%",
		left: "45%",
		animation: "animate-blink-fade-delayed",
		delay: "0s",
		color: "rgba(72, 149, 239, 0.3)",
	},
];

// Shape renderer component
const FloatingShape = ({ shape }: { shape: (typeof floatingShapes)[0] }) => {
	const baseStyle: React.CSSProperties = {
		position: "absolute",
		top: shape.top,
		left: shape.left,
		right: shape.right,
		bottom: shape.bottom,
		animationDelay: shape.delay,
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
		case "square-filled":
			return (
				<div
					className={shape.animation}
					style={{
						...baseStyle,
						width: shape.size,
						height: shape.size,
						backgroundColor: shape.color,
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
		case "diamond-filled":
			return (
				<div
					className={shape.animation}
					style={{
						...baseStyle,
						width: shape.size,
						height: shape.size,
						backgroundColor: shape.color,
						transform: "rotate(45deg)",
					}}
				/>
			);
		case "triangle-outline":
			return (
				<div
					className={shape.animation}
					style={{
						...baseStyle,
						width: 0,
						height: 0,
						borderLeft: `${shape.size / 2}px solid transparent`,
						borderRight: `${shape.size / 2}px solid transparent`,
						borderBottom: `${shape.size}px solid ${shape.color}`,
						background: "transparent",
					}}
				/>
			);
		case "hexagon-outline":
			return (
				<svg
					className={shape.animation}
					style={{
						...baseStyle,
						width: shape.size,
						height: shape.size,
					}}
					viewBox="0 0 24 24"
					fill="none"
					stroke={shape.color}
					strokeWidth="1">
					<polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
				</svg>
			);
		default:
			return null;
	}
};

// Technology Card Component
const TechCard = ({ tech }: { tech: (typeof technologies)[0] }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className="group relative flex flex-col items-center cursor-pointer"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			{/* Single Container with Icon - Glow Inside */}
			<div
				className="relative p-3 rounded-xl border transition-all duration-300 ease-out"
				style={{
					backgroundColor:
						isHovered ?
							"rgba(255, 255, 255, 0.06)"
						:	"rgba(255, 255, 255, 0.02)",
					borderColor:
						isHovered ?
							"rgba(255, 255, 255, 0.15)"
						:	"rgba(255, 255, 255, 0.05)",
					transform:
						isHovered ?
							"scale(1.1) translateY(-4px)"
						:	"scale(1) translateY(0)",
					boxShadow:
						isHovered ? `0 0 25px 8px ${tech.shadowColor}` : "none",
				}}>
				<tech.icon
					className="w-7 h-7 transition-colors duration-300 ease-out"
					style={{ color: isHovered ? tech.color : "#4b5563" }}
				/>
			</div>

			{/* Label */}
			<span
				className="mt-2 text-[10px] font-medium transition-all duration-300 ease-out"
				style={{
					color: "#4b5563",
					opacity: isHovered ? 1 : 0,
					transform: isHovered ? "translateY(0)" : "translateY(4px)",
				}}>
				{tech.name}
			</span>
		</div>
	);
};

const Hero = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	// Badge cursor tracking
	const [badgeMousePos, setBadgeMousePos] = useState({ x: 0, y: 0 });
	const [isBadgeHovered, setIsBadgeHovered] = useState(false);
	const badgeRef = useRef<HTMLDivElement>(null);

	// Button cursor tracking
	const [btnMousePos, setBtnMousePos] = useState({ x: 0, y: 0 });
	const [isBtnHovered, setIsBtnHovered] = useState(false);
	const btnRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		requestAnimationFrame(() => {
			setIsLoaded(true);
		});
	}, []);

	// Badge cursor tracking
	const handleBadgeMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!badgeRef.current) return;
			const rect = badgeRef.current.getBoundingClientRect();
			requestAnimationFrame(() => {
				setBadgeMousePos({
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				});
			});
		},
		[]
	);

	// Button cursor tracking
	const handleBtnMouseMove = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			if (!btnRef.current) return;
			const rect = btnRef.current.getBoundingClientRect();
			requestAnimationFrame(() => {
				setBtnMousePos({
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				});
			});
		},
		[]
	);

	return (
		<div
			className="relative min-h-screen overflow-hidden"
			style={{ backgroundColor: "var(--bg-primary)" }}>
			{/* ══════════════════════════════════════════════════════════
          		ANIMATED BACKGROUND
     		 ══════════════════════════════════════════════════════════ */}

			{/* Base Ambient Gradient */}
			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute inset-0 opacity-30"
					style={{
						background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(var(--brand-violet-rgb), 0.06) 0%, transparent 70%)`,
					}}
				/>
			</div>

			{/* Large Orbital Orbs */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className="absolute top-1/2 left-1/2 w-0 h-0">
					{/* Left Orb - Violet */}
					<div
						className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full animate-orbit-left"
						style={{
							background: `radial-gradient(circle, rgba(160, 120, 245, 0.35) 0%, rgba(160, 120, 245, 0.15) 35%, rgba(160, 120, 245, 0.05) 55%, transparent 70%)`,
							transformOrigin: "center center",
						}}
					/>

					{/* Right Orb - Blue */}
					<div
						className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full animate-orbit-right"
						style={{
							background: `radial-gradient(circle, rgba(72, 149, 239, 0.30) 0%, rgba(72, 149, 239, 0.12) 35%, rgba(72, 149, 239, 0.04) 55%, transparent 70%)`,
							transformOrigin: "center center",
						}}
					/>
				</div>
			</div>

			{/* Grid Pattern */}
			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
						backgroundSize: "70px 70px",
						maskImage:
							"radial-gradient(ellipse 70% 55% at 50% 50%, black 25%, transparent 75%)",
						WebkitMaskImage:
							"radial-gradient(ellipse 70% 55% at 50% 50%, black 25%, transparent 75%)",
					}}
				/>
			</div>

			{/* ═══════ FLOATING GEOMETRIC SHAPES ═══════ */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{floatingShapes.map((shape, index) => (
					<FloatingShape key={index} shape={shape} />
				))}
			</div>

			{/* Grid Intersection Glows */}
			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute top-[28%] left-[22%] w-1.5 h-1.5 rounded-full animate-glow-soft"
					style={{ backgroundColor: "rgba(160, 120, 245, 0.6)" }}
				/>
				<div
					className="absolute top-[52%] right-[28%] w-1.5 h-1.5 rounded-full animate-glow-soft-delayed"
					style={{ backgroundColor: "rgba(72, 149, 239, 0.5)" }}
				/>
				<div
					className="absolute bottom-[32%] left-[38%] w-1 h-1 rounded-full animate-glow-soft"
					style={{ backgroundColor: "rgba(160, 120, 245, 0.4)" }}
				/>
			</div>

			{/* Noise Texture */}
			<div
				className="absolute inset-0 opacity-[0.012] pointer-events-none mix-blend-overlay"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
				}}
			/>

			{/* ══════════════════════════════════════════════════════════
          		NAVBAR
      		══════════════════════════════════════════════════════════ */}
			<nav
				className={`relative z-50 px-6 lg:px-16 py-6 transform-gpu transition-all duration-500 ease-out
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					{/* ═══════ NEW MINIMAL LOGO - Only ZDev ═══════ */}
					<Link href="/" className="group relative flex items-center">
						{/* Logo Text with Animated Underline */}
						<div className="relative">
							<span className="text-2xl font-bold tracking-tight">
								<span
									className="transition-colors duration-300"
									style={{ color: "#ffffff" }}>
									Z
								</span>
								<span
									className="transition-colors duration-300"
									style={{ color: "rgba(255,255,255,0.5)" }}>
									Dev
								</span>
							</span>

							{/* Animated Underline */}
							<div className="absolute -bottom-1 left-0 w-full h-[2px] overflow-hidden">
								{/* Base line (subtle) */}
								<div
									className="absolute inset-0 opacity-20"
									style={{
										backgroundColor:
											"rgba(255,255,255,0.3)",
									}}
								/>
								{/* Animated gradient line */}
								<div
									className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
									style={{
										background:
											"linear-gradient(90deg, var(--brand-violet), var(--brand-blue))",
									}}
								/>
							</div>

							{/* Glow effect on hover */}
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10"
								style={{
									background:
										"linear-gradient(90deg, rgba(160,120,245,0.3), rgba(72,149,239,0.2))",
								}}
							/>
						</div>

						{/* Animated Dot */}
						<div className="relative ml-1 mb-3">
							<span
								className="block w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-125"
								style={{
									backgroundColor: "var(--brand-violet)",
								}}
							/>
							<span
								className="absolute inset-0 w-1.5 h-1.5 rounded-full animate-ping opacity-50"
								style={{
									backgroundColor: "var(--brand-violet)",
								}}
							/>
						</div>
					</Link>

					{/* Navigation Links */}
					<div className="hidden md:flex items-center gap-1">
						{["Work", "Services", "Templates", "About"].map(
							(item, index) => (
								<a
									key={item}
									href={`#${item.toLowerCase()}`}
									className={`relative px-4 py-2 text-gray-500 hover:text-white font-medium group
                  transform-gpu transition-all duration-300 ease-out
                  ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
									style={{
										transitionDelay: `${100 + index * 50}ms`,
									}}>
									<span className="relative z-10">
										{item}
									</span>

									{/* Hover Background */}
									<div
										className="absolute inset-0 rounded-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out"
										style={{
											backgroundColor:
												"rgba(255, 255, 255, 0.03)",
										}}
									/>

									{/* Bottom Indicator */}
									<div
										className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full group-hover:w-4 transition-all duration-300 ease-out"
										style={{
											background:
												"linear-gradient(90deg, var(--brand-violet), var(--brand-blue))",
										}}
									/>
								</a>
							)
						)}
					</div>

					{/* Nav CTA Button */}
					<a
						href="#contact"
						className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm group relative
              transform-gpu transition-all duration-300 ease-out overflow-hidden
              ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
						style={{ transitionDelay: "300ms" }}>
						{/* Border */}
						<div
							className="absolute inset-0 rounded-full p-[1px]"
							style={{
								background:
									"linear-gradient(90deg, rgba(160,120,245,0.4), rgba(72,149,239,0.4), rgba(160,120,245,0.4))",
							}}>
							<div
								className="w-full h-full rounded-full transition-colors duration-300"
								style={{ backgroundColor: "var(--bg-primary)" }}
							/>
						</div>

						{/* Hover Glow */}
						<div
							className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							style={{
								background:
									"linear-gradient(90deg, rgba(160,120,245,0.08), rgba(72,149,239,0.08))",
							}}
						/>

						{/* Content */}
						<RiSendPlaneFill className="relative w-3.5 h-3.5 text-gray-500 group-hover:text-(--brand-violet) group-hover:rotate-12 transition-all duration-300 ease-out z-10" />
						<span className="relative text-gray-400 group-hover:text-white transition-colors duration-300 z-10">
							Let&apos;s Talk
						</span>
						<HiArrowLongRight className="relative w-4 h-4 text-gray-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-10" />
					</a>

					{/* Mobile Menu Button */}
					<button className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg group transition-all duration-300 hover:bg-white/3">
						<div className="flex flex-col gap-[5px] items-center">
							<span className="block w-5 h-0.5 bg-gray-500 group-hover:bg-white group-hover:w-6 transition-all duration-300 ease-out rounded-full" />
							<span className="block w-6 h-0.5 bg-gray-500 group-hover:bg-white group-hover:w-4 transition-all duration-300 ease-out rounded-full" />
							<span className="block w-4 h-0.5 bg-gray-500 group-hover:bg-white group-hover:w-6 transition-all duration-300 ease-out rounded-full" />
						</div>
					</button>
				</div>
			</nav>

			{/* ══════════════════════════════════════════════════════════
				HERO CONTENT
			══════════════════════════════════════════════════════════ */}
			<main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-88px)] px-6 py-8">
				<div className="max-w-5xl mx-auto text-center flex flex-col items-center">
					{/* Cursor-Reactive Badge */}
					<div
						ref={badgeRef}
						onMouseMove={handleBadgeMouseMove}
						onMouseEnter={() => setIsBadgeHovered(true)}
						onMouseLeave={() => setIsBadgeHovered(false)}
						className={`relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8 cursor-default overflow-hidden
              border transition-all duration-300 ease-out
              ${isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}
						style={{
							transitionDelay: "200ms",
							borderColor:
								isBadgeHovered ?
									"rgba(250, 204, 21, 0.4)"
								:	"rgba(255, 255, 255, 0.1)",
							backgroundColor: "rgba(255, 255, 255, 0.02)",
						}}>
						{/* Yellow Cursor Spotlight */}
						<div
							className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
							style={{
								opacity: isBadgeHovered ? 1 : 0,
								background: `radial-gradient(120px circle at ${badgeMousePos.x}px ${badgeMousePos.y}px, rgba(250, 204, 21, 0.15), transparent 50%)`,
							}}
						/>

						{/* Green Dot */}
						<span className="relative flex h-2.5 w-2.5">
							<span
								className="absolute inline-flex h-full w-full rounded-full animate-ping"
								style={{
									backgroundColor:
										"var(--badge-green-bright)",
									opacity: isBadgeHovered ? 1 : 0.75,
								}}
							/>
							<span
								className="relative inline-flex rounded-full h-2.5 w-2.5 transition-all duration-300"
								style={{
									backgroundColor: "var(--badge-green)",
									boxShadow:
										isBadgeHovered ?
											"0 0 14px 5px rgba(74, 222, 128, 0.5)"
										:	"none",
								}}
							/>
						</span>

						{/* Text */}
						<span
							className="relative text-sm font-medium transition-colors duration-300"
							style={{
								color:
									isBadgeHovered ?
										"var(--badge-yellow)"
									:	"#9ca3af",
							}}>
							Available for hire
						</span>

						{/* Sparkle Icon */}
						<HiOutlineSparkles
							className="relative w-4 h-4 transition-all duration-300 ease-out"
							style={{
								color:
									isBadgeHovered ?
										"var(--badge-yellow)"
									:	"#4b5563",
								transform:
									isBadgeHovered ?
										"rotate(12deg) scale(1.1)"
									:	"rotate(0) scale(1)",
								opacity: isBadgeHovered ? 1 : 0.6,
							}}
						/>
					</div>

					{/* Main Title */}
					<h1
						className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] font-black leading-[0.9] tracking-[-0.04em] mb-6
              transform-gpu transition-all duration-700 ease-out
              ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
						style={{ transitionDelay: "350ms" }}>
						<span
							className="block text-white"
							style={{
								textShadow:
									"0 4px 50px rgba(160, 120, 245, 0.2)",
							}}>
							Transform Ideas
						</span>
						<span className="block mt-2 md:mt-3">
							<span className="text-white">Into </span>
							<span className="relative inline-block">
								{/* Gradient Text with Shimmer */}
								<span
									className="animate-gradient-shimmer"
									style={{
										background:
											"linear-gradient(90deg, var(--brand-violet) 0%, var(--brand-blue) 20%, var(--brand-violet-light) 40%, var(--brand-blue) 60%, var(--brand-violet) 80%, var(--brand-blue) 100%)",
										backgroundSize: "200% 100%",
										WebkitBackgroundClip: "text",
										backgroundClip: "text",
										color: "transparent",
									}}>
									Digital Reality
								</span>

								{/* Underline SVG */}
								<svg
									className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3"
									viewBox="0 0 200 8"
									preserveAspectRatio="none">
									<defs>
										<linearGradient
											id="underline-grad"
											x1="0%"
											y1="0%"
											x2="100%"
											y2="0%">
											<stop
												offset="0%"
												stopColor="#A078F5"
												stopOpacity="0.5"
											/>
											<stop
												offset="50%"
												stopColor="#4895EF"
												stopOpacity="0.6"
											/>
											<stop
												offset="100%"
												stopColor="#A078F5"
												stopOpacity="0.4"
											/>
										</linearGradient>
									</defs>
									<path
										d="M0,4 Q50,7 100,4 T200,4"
										fill="none"
										stroke="url(#underline-grad)"
										strokeWidth="2"
										strokeLinecap="round"
										style={{
											strokeDasharray: 200,
											strokeDashoffset:
												isLoaded ? 0 : 200,
											transition:
												"stroke-dashoffset 1s ease-out 0.8s",
										}}
									/>
								</svg>
							</span>
						</span>
					</h1>

					{/* Subtitle */}
					<p
						className={`max-w-lg mx-auto text-[15px] md:text-base text-gray-500 leading-relaxed mb-9
              transform-gpu transition-all duration-500 ease-out
              ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
						style={{ transitionDelay: "500ms" }}>
						I design and build{" "}
						<span className="text-gray-300">standout websites</span>{" "}
						with creative layouts and seamless interactions—crafted
						to make your brand
						<span className="text-gray-300"> unforgettable</span>.
					</p>

					{/* CTA Buttons */}
					<div
						className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4
              transform-gpu transition-all duration-500 ease-out
              ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
						style={{ transitionDelay: "650ms" }}>
						{/* Primary CTA Button */}
						<a
							ref={btnRef}
							href="#work"
							onMouseMove={handleBtnMouseMove}
							onMouseEnter={() => setIsBtnHovered(true)}
							onMouseLeave={() => setIsBtnHovered(false)}
							className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm overflow-hidden">
							{/* Gradient Background */}
							<div
								className="absolute inset-0 animate-btn-gradient"
								style={{
									background:
										"linear-gradient(135deg, var(--brand-violet) 0%, #7B5FD4 30%, var(--brand-blue) 60%, #7B5FD4 80%, var(--brand-violet) 100%)",
									backgroundSize: "200% 200%",
								}}
							/>

							{/* Cursor Spotlight */}
							<div
								className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
								style={{
									opacity: isBtnHovered ? 1 : 0,
									background: `radial-gradient(100px circle at ${btnMousePos.x}px ${btnMousePos.y}px, rgba(255, 255, 255, 0.25), transparent 50%)`,
								}}
							/>

							{/* Glow Effect */}
							<div
								className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-300"
								style={{
									background:
										"linear-gradient(135deg, var(--brand-violet) 0%, var(--brand-blue) 100%)",
									filter: "blur(20px)",
								}}
							/>

							{/* Shine Sweep */}
							<div className="absolute inset-0 overflow-hidden rounded-full">
								<div
									className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out skew-x-[-15deg]"
									style={{
										background:
											"linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
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

							{/* Content */}
							<span className="relative text-white z-10">
								Explore My Work
							</span>
							<FiChevronRight className="relative w-4 h-4 text-white z-10 group-hover:translate-x-1 transition-transform duration-300" />
						</a>

						{/* Secondary CTA Button */}
						<a
							href="#templates"
							className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm overflow-hidden">
							{/* Border */}
							<div
								className="absolute inset-0 rounded-full p-[1px]"
								style={{
									background:
										"linear-gradient(90deg, rgba(160,120,245,0.3), rgba(72,149,239,0.3), rgba(160,120,245,0.3))",
								}}>
								<div
									className="w-full h-full rounded-full transition-colors duration-300"
									style={{
										backgroundColor: "var(--bg-primary)",
									}}
								/>
							</div>

							{/* Hover Glow */}
							<div
								className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								style={{
									background:
										"linear-gradient(90deg, rgba(160,120,245,0.1), rgba(72,149,239,0.1))",
									filter: "blur(15px)",
								}}
							/>

							{/* Inner Fill */}
							<div
								className="absolute inset-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
								style={{
									background:
										"linear-gradient(90deg, rgba(160,120,245,0.06), rgba(72,149,239,0.06))",
								}}
							/>

							{/* Particles */}
							<div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
								<div
									className="absolute top-1/2 left-1/4 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-particle-up transition-opacity duration-300"
									style={{
										backgroundColor:
											"rgba(160, 120, 245, 0.5)",
									}}
								/>
								<div
									className="absolute top-1/3 right-1/4 w-0.5 h-0.5 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-particle-up-delayed transition-opacity duration-300"
									style={{
										backgroundColor:
											"rgba(72, 149, 239, 0.5)",
									}}
								/>
							</div>

							{/* Content */}
							<HiOutlineSquares2X2 className="relative w-4 h-4 text-gray-500 group-hover:text-[var(--brand-violet)] group-hover:rotate-90 transition-all duration-400 ease-out z-10" />
							<span className="relative text-gray-400 group-hover:text-white transition-colors duration-300 z-10">
								Browse Templates
							</span>
							<HiArrowLongRight className="relative w-4 h-4 text-gray-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-10" />
						</a>
					</div>

					{/* ═══════ TECHNOLOGIES (Fixed Hover) ═══════ */}
					<div
						className={`mt-16 pt-10 border-t w-full max-w-2xl
              transform-gpu transition-all duration-500 ease-out
              ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
						style={{
							transitionDelay: "800ms",
							borderColor: "rgba(255, 255, 255, 0.05)",
						}}>
						<p className="text-gray-600 text-xs uppercase tracking-[0.2em] mb-8 font-medium">
							Built With
						</p>

						<div className="flex items-center justify-center gap-x-14 md:gap-8 flex-wrap">
							{technologies.map((tech) => (
								<TechCard key={tech.name} tech={tech} />
							))}
						</div>
					</div>
				</div>
			</main>

			{/* ══════════════════════════════════════════════════════════
          SCROLL INDICATOR
      ══════════════════════════════════════════════════════════ */}
			<div
				className={`hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 z-20 transform-gpu
          transition-all duration-500 ease-out
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
				style={{ transitionDelay: "1000ms" }}>
				<a
					href="#work"
					className="group flex flex-col items-center gap-2">
					<span className="text-gray-600 text-[9px] uppercase tracking-[0.25em] font-medium group-hover:text-gray-400 transition-colors duration-300">
						Scroll
					</span>

					{/* Mouse Icon */}
					<div className="relative w-5 h-8 rounded-full border-2 border-gray-700 group-hover:border-gray-500 transition-colors duration-300 flex items-start justify-center pt-1.5">
						<div className="w-1 h-1.5 rounded-full bg-gray-500 group-hover:bg-(--brand-violet) animate-scroll-mouse transition-colors duration-300" />
					</div>

					{/* Animated Line */}
					<div
						className="relative w-px h-6 overflow-hidden rounded-full"
						style={{
							background:
								"linear-gradient(to bottom, rgba(55, 65, 81, 0.5), transparent)",
						}}>
						<div
							className="absolute top-0 left-0 w-full h-2 rounded-full animate-scroll-line"
							style={{
								background:
									"linear-gradient(to bottom, var(--brand-violet), transparent)",
							}}
						/>
					</div>
				</a>
			</div>
		</div>
	);
};

export default Hero;
