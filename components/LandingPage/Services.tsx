"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
	HiOutlineCodeBracket,
	HiOutlinePaintBrush,
	HiOutlineDevicePhoneMobile,
	HiOutlineRocketLaunch,
	HiOutlineCube,
	HiOutlineSparkles,
	HiOutlineCheck,
	HiOutlineLightBulb,
	HiOutlineChatBubbleLeftRight,
	HiOutlineDocumentText,
	HiOutlineWrenchScrewdriver,
	HiOutlineArrowPath,
} from "react-icons/hi2";
import { FiChevronRight } from "react-icons/fi";
import {
	SiNextdotjs,
	SiReact,
	SiTypescript,
	SiTailwindcss,
	SiFigma,
	SiFramer,
	SiNodedotjs,
	SiPrisma,
	SiSupabase,
	SiStripe,
	SiVercel,
	SiSanity,
} from "react-icons/si";

/*
  ═══════════════════════════════════════════════════════════════
  DARK AURORA - SERVICES SECTION
  ═══════════════════════════════════════════════════════════════
  
  Layout Structure:
  1. Section Header
  2. Main Services Grid (3 cards)
  3. Process Timeline (4 steps)
  4. Benefits Grid (6 items)
  5. Tech Stack Showcase
  6. CTA Block
  
  ═══════════════════════════════════════════════════════════════
*/

// Services Data
const services = [
	{
		id: 1,
		icon: HiOutlineCodeBracket,
		title: "Web Development",
		subtitle: "Full-Stack Solutions",
		description:
			"Custom web applications built with modern technologies. From simple landing pages to complex SaaS platforms, I deliver scalable and performant solutions.",
		features: [
			"Next.js & React Applications",
			"API Development & Integration",
			"Database Design & Management",
			"Performance Optimization",
		],
		gradient: "from-violet-500 to-purple-600",
	},
	{
		id: 2,
		icon: HiOutlinePaintBrush,
		title: "UI/UX Design",
		subtitle: "Creative Interfaces",
		description:
			"Stunning visual designs that captivate users and drive engagement. I create intuitive interfaces that blend aesthetics with functionality.",
		features: [
			"Custom UI Design Systems",
			"Interactive Prototypes",
			"Responsive Layouts",
			"Motion & Micro-interactions",
		],
		gradient: "from-blue-500 to-cyan-500",
	},
	{
		id: 3,
		icon: HiOutlineCube,
		title: "Template Design",
		subtitle: "Ready-to-Use Solutions",
		description:
			"Premium, customizable templates for various use cases. Launch faster with professionally designed, production-ready templates.",
		features: [
			"Next.js Starter Kits",
			"Dashboard Templates",
			"Landing Page Templates",
			"E-commerce Solutions",
		],
		gradient: "from-purple-500 to-pink-500",
	},
];

// Process Steps
const processSteps = [
	{
		number: "01",
		icon: HiOutlineChatBubbleLeftRight,
		title: "Discovery",
		description:
			"We discuss your vision, goals, and requirements to understand your project needs.",
	},
	{
		number: "02",
		icon: HiOutlineLightBulb,
		title: "Strategy",
		description:
			"I create a detailed plan including wireframes, tech stack decisions, and timelines.",
	},
	{
		number: "03",
		icon: HiOutlineWrenchScrewdriver,
		title: "Development",
		description:
			"Building your project with clean code, regular updates, and iterative feedback.",
	},
	{
		number: "04",
		icon: HiOutlineRocketLaunch,
		title: "Launch",
		description:
			"Thorough testing, deployment, and post-launch support to ensure success.",
	},
];

// Benefits
const benefits = [
	{
		icon: HiOutlineSparkles,
		title: "Pixel Perfect",
		description:
			"Every detail matters. I ensure designs are implemented with precision.",
	},
	{
		icon: HiOutlineRocketLaunch,
		title: "Fast Performance",
		description:
			"Optimized code for lightning-fast load times and smooth interactions.",
	},
	{
		icon: HiOutlineDevicePhoneMobile,
		title: "Fully Responsive",
		description: "Seamless experience across all devices and screen sizes.",
	},
	{
		icon: HiOutlineDocumentText,
		title: "Clean Code",
		description:
			"Well-structured, documented code that's easy to maintain.",
	},
	{
		icon: HiOutlineArrowPath,
		title: "Ongoing Support",
		description:
			"Continued assistance and updates after project completion.",
	},
	{
		icon: HiOutlineCheck,
		title: "On-Time Delivery",
		description: "Reliable timelines with clear communication throughout.",
	},
];

// Tech Stack
const techStack = [
	{ icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
	{ icon: SiReact, name: "React", color: "#61dafb" },
	{ icon: SiTypescript, name: "TypeScript", color: "#3178c6" },
	{ icon: SiTailwindcss, name: "Tailwind", color: "#06b6d4" },
	{ icon: SiFigma, name: "Figma", color: "#f24e1e" },
	{ icon: SiFramer, name: "Framer", color: "#bb4bff" },
	{ icon: SiNodedotjs, name: "Node.js", color: "#339933" },
	{ icon: SiPrisma, name: "Prisma", color: "#2d3748" },
	{ icon: SiSupabase, name: "Supabase", color: "#3ecf8e" },
	{ icon: SiStripe, name: "Stripe", color: "#635bff" },
	{ icon: SiVercel, name: "Vercel", color: "#ffffff" },
	{ icon: SiSanity, name: "Sanity", color: "#f03e2f" },
];

// Floating Shapes
const floatingShapes = [
	{
		type: "circle-outline",
		size: 14,
		top: "5%",
		left: "5%",
		animation: "animate-float-drift",
		color: "rgba(160, 120, 245, 0.1)",
	},
	{
		type: "diamond-outline",
		size: 10,
		top: "12%",
		right: "8%",
		animation: "animate-spin-slow",
		color: "rgba(72, 149, 239, 0.08)",
	},
	{
		type: "circle-filled",
		size: 3,
		top: "20%",
		left: "12%",
		animation: "animate-blink-fade",
		color: "rgba(160, 120, 245, 0.3)",
	},
	{
		type: "square-outline",
		size: 8,
		top: "35%",
		right: "5%",
		animation: "animate-float-drift-alt",
		color: "rgba(72, 149, 239, 0.06)",
	},
	{
		type: "circle-filled",
		size: 4,
		top: "50%",
		left: "4%",
		animation: "animate-blink-fade-delayed",
		color: "rgba(160, 120, 245, 0.25)",
	},
	{
		type: "hexagon-outline",
		size: 16,
		top: "60%",
		right: "6%",
		animation: "animate-spin-slow-reverse",
		color: "rgba(72, 149, 239, 0.05)",
	},
	{
		type: "circle-filled",
		size: 2,
		top: "75%",
		left: "10%",
		animation: "animate-pulse-scale",
		color: "rgba(160, 120, 245, 0.35)",
	},
	{
		type: "diamond-outline",
		size: 12,
		bottom: "15%",
		right: "4%",
		animation: "animate-float-drift",
		color: "rgba(72, 149, 239, 0.08)",
	},
	{
		type: "circle-filled",
		size: 3,
		bottom: "8%",
		left: "8%",
		animation: "animate-blink-fade",
		color: "rgba(160, 120, 245, 0.2)",
	},
];

// Shape Renderer
const FloatingShape = ({ shape }: { shape: (typeof floatingShapes)[0] }) => {
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

// Service Card Component
const ServiceCard = ({
	service,
	index,
	isVisible,
}: {
	service: (typeof services)[0];
	index: number;
	isVisible: boolean;
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const cardRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!cardRef.current) return;
			const rect = cardRef.current.getBoundingClientRect();
			requestAnimationFrame(() => {
				setMousePos({
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				});
			});
		},
		[]
	);

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`group relative rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
			style={{
				transitionDelay: `${index * 150}ms`,
				backgroundColor: "rgba(255, 255, 255, 0.02)",
				border: `1px solid ${isHovered ? "rgba(160, 120, 245, 0.3)" : "rgba(255, 255, 255, 0.05)"}`,
				transform: isHovered ? "translateY(-8px)" : "translateY(0)",
				boxShadow:
					isHovered ?
						"0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 50px rgba(160, 120, 245, 0.1)"
					:	"0 4px 20px -5px rgba(0, 0, 0, 0.2)",
			}}>
			{/* Cursor Spotlight */}
			<div
				className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-0"
				style={{
					opacity: isHovered ? 1 : 0,
					background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(160, 120, 245, 0.08), transparent 50%)`,
				}}
			/>

			{/* Top Gradient Line */}
			<div
				className="absolute top-0 left-6 right-6 h-px transition-opacity duration-500"
				style={{
					opacity: isHovered ? 1 : 0,
					background: `linear-gradient(90deg, transparent, var(--brand-violet), var(--brand-blue), transparent)`,
				}}
			/>

			{/* Service Number */}
			<div
				className="absolute top-6 right-6 text-5xl font-black pointer-events-none select-none transition-all duration-500"
				style={{
					color: "transparent",
					WebkitTextStroke:
						isHovered ?
							"1px rgba(160, 120, 245, 0.3)"
						:	"1px rgba(255, 255, 255, 0.05)",
				}}>
				{String(index + 1).padStart(2, "0")}
			</div>

			{/* Icon */}
			<div
				className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500"
				style={{
					background:
						isHovered ?
							"linear-gradient(135deg, rgba(160, 120, 245, 0.2), rgba(72, 149, 239, 0.1))"
						:	"rgba(255, 255, 255, 0.03)",
					border: `1px solid ${isHovered ? "rgba(160, 120, 245, 0.3)" : "rgba(255, 255, 255, 0.05)"}`,
					boxShadow:
						isHovered ?
							"0 0 30px rgba(160, 120, 245, 0.2)"
						:	"none",
				}}>
				<service.icon
					className="w-7 h-7 transition-colors duration-300"
					style={{
						color: isHovered ? "var(--brand-violet)" : "#6b7280",
					}}
				/>
			</div>

			{/* Subtitle */}
			<p
				className="text-xs font-medium uppercase tracking-widest mb-2 transition-colors duration-300"
				style={{ color: isHovered ? "var(--brand-blue)" : "#6b7280" }}>
				{service.subtitle}
			</p>

			{/* Title */}
			<h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-300">
				{service.title}
			</h3>

			{/* Description */}
			<p className="text-gray-500 text-sm leading-relaxed mb-6">
				{service.description}
			</p>

			{/* Features List */}
			<ul className="space-y-2.5">
				{service.features.map((feature, i) => (
					<li
						key={i}
						className="flex items-center gap-3 text-sm transition-all duration-300"
						style={{
							color: isHovered ? "#d1d5db" : "#6b7280",
							transitionDelay: `${i * 50}ms`,
						}}>
						<span
							className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
							style={{
								backgroundColor:
									isHovered ?
										"rgba(160, 120, 245, 0.15)"
									:	"rgba(255, 255, 255, 0.03)",
								border: `1px solid ${isHovered ? "rgba(160, 120, 245, 0.3)" : "rgba(255, 255, 255, 0.05)"}`,
							}}>
							<HiOutlineCheck
								className="w-3 h-3 transition-colors duration-300"
								style={{
									color:
										isHovered ?
											"var(--brand-violet)"
										:	"#6b7280",
								}}
							/>
						</span>
						{feature}
					</li>
				))}
			</ul>

			{/* Bottom Arrow Indicator */}
			<div
				className="absolute bottom-6 right-6 transition-all duration-500"
				style={{
					opacity: isHovered ? 1 : 0,
					transform:
						isHovered ? "translateX(0)" : "translateX(-10px)",
				}}>
				<div
					className="w-10 h-10 rounded-full flex items-center justify-center"
					style={{
						backgroundColor: "rgba(160, 120, 245, 0.1)",
						border: "1px solid rgba(160, 120, 245, 0.2)",
					}}>
					<FiChevronRight
						className="w-5 h-5"
						style={{ color: "var(--brand-violet)" }}
					/>
				</div>
			</div>
		</div>
	);
};

// Process Step Component
const ProcessStep = ({
	step,
	index,
	isLast,
	isVisible,
}: {
	step: (typeof processSteps)[0];
	index: number;
	isLast: boolean;
	isVisible: boolean;
}) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={`relative flex flex-col items-center transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
			style={{ transitionDelay: `${index * 150 + 300}ms` }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			{/* Step Number & Icon */}
			<div className="relative mb-6">
				{/* Outer Ring */}
				<div
					className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500"
					style={{
						backgroundColor:
							isHovered ?
								"rgba(160, 120, 245, 0.1)"
							:	"rgba(255, 255, 255, 0.02)",
						border: `2px solid ${isHovered ? "rgba(160, 120, 245, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
						boxShadow:
							isHovered ?
								"0 0 40px rgba(160, 120, 245, 0.2)"
							:	"none",
					}}>
					<step.icon
						className="w-8 h-8 transition-all duration-300"
						style={{
							color:
								isHovered ? "var(--brand-violet)" : "#6b7280",
							transform: isHovered ? "scale(1.1)" : "scale(1)",
						}}
					/>
				</div>

				{/* Step Number Badge */}
				<div
					className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
					style={{
						background:
							isHovered ?
								"linear-gradient(135deg, var(--brand-violet), var(--brand-blue))"
							:	"rgba(255, 255, 255, 0.05)",
						color: isHovered ? "#ffffff" : "#6b7280",
						border: `1px solid ${isHovered ? "transparent" : "rgba(255, 255, 255, 0.1)"}`,
					}}>
					{step.number}
				</div>
			</div>

			{/* Content */}
			<div className="text-center max-w-[200px]">
				<h4
					className="text-lg font-semibold mb-2 transition-colors duration-300"
					style={{ color: isHovered ? "#ffffff" : "#e5e7eb" }}>
					{step.title}
				</h4>
				<p className="text-sm text-gray-500 leading-relaxed">
					{step.description}
				</p>
			</div>

			{/* Connecting Line (not on last item) */}
			{!isLast && (
				<div className="hidden lg:block absolute top-10 left-[calc(50%+50px)] w-[calc(100%-20px)] h-px">
					<div
						className="w-full h-full"
						style={{
							background:
								"linear-gradient(90deg, rgba(160, 120, 245, 0.3), rgba(72, 149, 239, 0.1))",
						}}
					/>
					{/* Animated Dot */}
					<div
						className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full animate-process-dot"
						style={{
							backgroundColor: "var(--brand-violet)",
							boxShadow: "0 0 10px var(--brand-violet)",
						}}
					/>
				</div>
			)}
		</div>
	);
};

// Benefit Card Component
const BenefitCard = ({
	benefit,
	index,
	isVisible,
}: {
	benefit: (typeof benefits)[0];
	index: number;
	isVisible: boolean;
}) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={`group relative p-5 rounded-xl cursor-default transition-all duration-500 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
			style={{
				transitionDelay: `${index * 100 + 500}ms`,
				backgroundColor:
					isHovered ? "rgba(255, 255, 255, 0.03)" : "transparent",
				border: `1px solid ${isHovered ? "rgba(160, 120, 245, 0.2)" : "rgba(255, 255, 255, 0.03)"}`,
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			{/* Icon */}
			<div
				className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-300"
				style={{
					backgroundColor:
						isHovered ?
							"rgba(160, 120, 245, 0.15)"
						:	"rgba(255, 255, 255, 0.02)",
					border: `1px solid ${isHovered ? "rgba(160, 120, 245, 0.25)" : "rgba(255, 255, 255, 0.05)"}`,
					boxShadow:
						isHovered ?
							"0 0 20px rgba(160, 120, 245, 0.15)"
						:	"none",
				}}>
				<benefit.icon
					className="w-5 h-5 transition-colors duration-300"
					style={{
						color: isHovered ? "var(--brand-violet)" : "#6b7280",
					}}
				/>
			</div>

			{/* Title */}
			<h4
				className="text-base font-semibold mb-2 transition-colors duration-300"
				style={{ color: isHovered ? "#ffffff" : "#d1d5db" }}>
				{benefit.title}
			</h4>

			{/* Description */}
			<p className="text-sm text-gray-500 leading-relaxed">
				{benefit.description}
			</p>
		</div>
	);
};

// Tech Stack Item Component
const TechItem = ({ tech }: { tech: (typeof techStack)[0] }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className="group flex flex-col items-center cursor-pointer"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div
				className="p-3 rounded-xl transition-all duration-300 ease-out"
				style={{
					backgroundColor:
						isHovered ?
							"rgba(255, 255, 255, 0.05)"
						:	"rgba(255, 255, 255, 0.02)",
					border: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.03)"}`,
					transform:
						isHovered ?
							"scale(1.1) translateY(-4px)"
						:	"scale(1) translateY(0)",
					boxShadow: isHovered ? `0 0 20px ${tech.color}30` : "none",
				}}>
				<tech.icon
					className="w-6 h-6 transition-colors duration-300"
					style={{ color: isHovered ? tech.color : "#6b7280" }}
				/>
			</div>
			<span
				className="mt-2 text-[10px] font-medium transition-all duration-300"
				style={{
					color: isHovered ? "#9ca3af" : "transparent",
					opacity: isHovered ? 1 : 0,
				}}>
				{tech.name}
			</span>
		</div>
	);
};

// CTA Button with Cursor Tracking
const CTAButton = ({ isVisible }: { isVisible: boolean }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const btnRef = useRef<HTMLAnchorElement>(null);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			if (!btnRef.current) return;
			const rect = btnRef.current.getBoundingClientRect();
			setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
		},
		[]
	);

	return (
		<a
			ref={btnRef}
			href="#contact"
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base overflow-hidden transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
			style={{ transitionDelay: "800ms" }}>
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
					opacity: isHovered ? 1 : 0,
					background: `radial-gradient(100px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.25), transparent 50%)`,
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

			<span className="relative text-white z-10">Start a Project</span>
			<FiChevronRight className="relative w-5 h-5 text-white z-10 group-hover:translate-x-1 transition-transform duration-300" />
		</a>
	);
};

// Main Services Section Component
const Services = () => {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section
			id="services"
			ref={sectionRef}
			className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
			style={{ backgroundColor: "var(--bg-primary)" }}>
			{/* ═══════ BACKGROUND ELEMENTS ═══════ */}

			{/* Top Border */}
			<div
				className="absolute top-0 left-0 right-0 h-px"
				style={{
					background:
						"linear-gradient(90deg, transparent, rgba(160, 120, 245, 0.2), rgba(72, 149, 239, 0.2), transparent)",
				}}
			/>

			{/* Ambient Orbs */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div
					className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full animate-float-drift"
					style={{
						background:
							"radial-gradient(circle, rgba(160, 120, 245, 0.06) 0%, transparent 60%)",
						filter: "blur(80px)",
					}}
				/>
				<div
					className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full animate-float-drift-alt"
					style={{
						background:
							"radial-gradient(circle, rgba(72, 149, 239, 0.05) 0%, transparent 60%)",
						filter: "blur(70px)",
					}}
				/>
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
					style={{
						background:
							"radial-gradient(circle, rgba(160, 120, 245, 0.03) 0%, transparent 50%)",
						filter: "blur(100px)",
					}}
				/>
			</div>

			{/* Floating Shapes */}
			<div className="absolute inset-0 pointer-events-none">
				{floatingShapes.map((shape, index) => (
					<FloatingShape key={index} shape={shape} />
				))}
			</div>

			{/* Grid Pattern */}
			<div
				className="absolute inset-0 opacity-[0.015] pointer-events-none"
				style={{
					backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
					backgroundSize: "80px 80px",
				}}
			/>

			{/* ═══════ CONTENT ═══════ */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
				{/* ═══════ SECTION HEADER ═══════ */}
				<div
					className={`text-center mb-20 transition-all duration-1000 ease-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
					{/* Label Badge */}
					<div
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
						style={{
							backgroundColor: "rgba(160, 120, 245, 0.1)",
							border: "1px solid rgba(160, 120, 245, 0.2)",
						}}>
						<span className="relative flex h-2 w-2">
							<span
								className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
								style={{
									backgroundColor: "var(--brand-violet)",
								}}
							/>
							<span
								className="relative inline-flex rounded-full h-2 w-2"
								style={{
									backgroundColor: "var(--brand-violet)",
								}}
							/>
						</span>
						<span
							className="text-xs font-medium uppercase tracking-wider"
							style={{ color: "var(--brand-violet)" }}>
							What I Offer
						</span>
					</div>

					{/* Title */}
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
						<span className="text-white">Services & </span>
						<span
							className="relative inline-block"
							style={{
								background:
									"linear-gradient(90deg, var(--brand-violet), var(--brand-blue))",
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								color: "transparent",
							}}>
							Expertise
							<svg
								className="absolute -bottom-2 left-0 w-full h-3"
								viewBox="0 0 200 8"
								preserveAspectRatio="none">
								<path
									d="M0,4 Q50,8 100,4 T200,4"
									fill="none"
									stroke="url(#services-underline)"
									strokeWidth="2"
									strokeLinecap="round"
									style={{
										strokeDasharray: 200,
										strokeDashoffset: isVisible ? 0 : 200,
										transition:
											"stroke-dashoffset 1s ease-out 0.5s",
									}}
								/>
								<defs>
									<linearGradient
										id="services-underline"
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
											offset="100%"
											stopColor="#4895EF"
											stopOpacity="0.3"
										/>
									</linearGradient>
								</defs>
							</svg>
						</span>
					</h2>

					{/* Subtitle */}
					<p className="max-w-2xl mx-auto text-gray-500 text-base md:text-lg leading-relaxed">
						From concept to deployment, I provide end-to-end
						solutions to help
						<span className="text-gray-300">
							{" "}
							bring your digital vision to life
						</span>
						.
					</p>
				</div>

				{/* ═══════ SERVICES GRID ═══════ */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
					{services.map((service, index) => (
						<ServiceCard
							key={service.id}
							service={service}
							index={index}
							isVisible={isVisible}
						/>
					))}
				</div>

				{/* ═══════ PROCESS SECTION ═══════ */}
				<div className="mb-24">
					{/* Process Header */}
					<div
						className={`text-center mb-16 transition-all duration-700 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
						style={{ transitionDelay: "200ms" }}>
						<h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
							How I Work
						</h3>
						<p className="text-gray-500 max-w-lg mx-auto">
							A streamlined process designed to deliver
							exceptional results efficiently.
						</p>
					</div>

					{/* Process Steps */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
						{processSteps.map((step, index) => (
							<ProcessStep
								key={step.number}
								step={step}
								index={index}
								isLast={index === processSteps.length - 1}
								isVisible={isVisible}
							/>
						))}
					</div>
				</div>

				{/* ═══════ BENEFITS GRID ═══════ */}
				<div className="mb-24">
					{/* Benefits Header */}
					<div
						className={`text-center mb-12 transition-all duration-700 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
						style={{ transitionDelay: "400ms" }}>
						<h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
							Why Work With Me
						</h3>
						<p className="text-gray-500 max-w-lg mx-auto">
							Quality, reliability, and attention to detail in
							every project.
						</p>
					</div>

					{/* Benefits Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{benefits.map((benefit, index) => (
							<BenefitCard
								key={benefit.title}
								benefit={benefit}
								index={index}
								isVisible={isVisible}
							/>
						))}
					</div>
				</div>

				{/* ═══════ TECH STACK ═══════ */}
				<div
					className={`mb-16 transition-all duration-700 ease-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
					style={{ transitionDelay: "600ms" }}>
					{/* Tech Header */}
					<div className="text-center mb-10">
						<h3 className="text-xl font-semibold text-white mb-2">
							Technologies I Use
						</h3>
						<p className="text-gray-600 text-sm">
							Modern tools for modern solutions
						</p>
					</div>

					{/* Tech Grid */}
					<div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
						{techStack.map((tech) => (
							<TechItem key={tech.name} tech={tech} />
						))}
					</div>
				</div>

				{/* ═══════ CTA BLOCK ═══════ */}
				<div
					className={`text-center pt-8 border-t transition-all duration-700 ease-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
					style={{
						transitionDelay: "700ms",
						borderColor: "rgba(255, 255, 255, 0.05)",
					}}>
					<h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
						Ready to Get Started?
					</h3>
					<p className="text-gray-500 max-w-md mx-auto mb-8">
						Let&apos;s discuss your project and create something amazing
						together.
					</p>
					<CTAButton isVisible={isVisible} />
				</div>
			</div>

			{/* Bottom Decorative Line */}
			<div
				className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-px"
				style={{
					background:
						"linear-gradient(90deg, transparent, rgba(160, 120, 245, 0.15), rgba(72, 149, 239, 0.15), transparent)",
				}}
			/>
		</section>
	);
};

export default Services;
