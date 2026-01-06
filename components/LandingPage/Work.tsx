"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { FiChevronRight, FiGithub, FiExternalLink } from "react-icons/fi";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";

/*
  ═══════════════════════════════════════════════════════════════
  DARK AURORA - WORK SECTION (SHOWCASE LAYOUT)
  ═══════════════════════════════════════════════════════════════
  
  Layout: Alternating editorial cards with large numbers
  Supports: 2 or 3 projects
  Features:
  - 3D tilt effect on hover
  - Cursor tracking spotlight
  - Large decorative project numbers
  - Alternating left/right layout
  - Connecting animated line between projects
  
  ═══════════════════════════════════════════════════════════════
*/

// Project Data - Update with your actual projects
const projects = [
	{
		id: 1,
		title: "Project Name One",
		subtitle: "Web Application",
		description:
			"A brief description of your project. Explain what it does, the problem it solves, and what makes it unique. Keep it concise but impactful.",
		image: "/projects/project-1.jpg",
		tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
		liveUrl: "#",
		githubUrl: "#",
		year: "2024",
	},
	{
		id: 2,
		title: "Project Name Two",
		subtitle: "E-commerce Platform",
		description:
			"Another amazing project description. Highlight the key features and technologies used to build this exceptional digital experience.",
		image: "/projects/project-2.jpg",
		tags: ["Next.js", "Stripe", "Sanity CMS"],
		liveUrl: "#",
		githubUrl: "#",
		year: "2024",
	},
	{
		id: 3,
		title: "Project Name Three",
		subtitle: "SaaS Dashboard",
		description:
			"Description for your third project. Showcase the creativity and technical skills that went into building this solution.",
		image: "/projects/project-3.jpg",
		tags: ["React", "Node.js", "PostgreSQL"],
		liveUrl: "#",
		githubUrl: null, // No GitHub link for this one
		year: "2023",
	},
];

// Floating Shapes
const floatingShapes = [
	{
		type: "circle-outline",
		size: 16,
		top: "8%",
		left: "4%",
		animation: "animate-float-drift",
		color: "rgba(160, 120, 245, 0.1)",
	},
	{
		type: "diamond-outline",
		size: 12,
		top: "15%",
		right: "6%",
		animation: "animate-spin-slow",
		color: "rgba(72, 149, 239, 0.08)",
	},
	{
		type: "circle-filled",
		size: 4,
		top: "25%",
		left: "10%",
		animation: "animate-blink-fade",
		color: "rgba(160, 120, 245, 0.3)",
	},
	{
		type: "square-outline",
		size: 10,
		top: "45%",
		right: "4%",
		animation: "animate-float-drift-alt",
		color: "rgba(72, 149, 239, 0.06)",
	},
	{
		type: "circle-filled",
		size: 3,
		top: "55%",
		left: "6%",
		animation: "animate-blink-fade-delayed",
		color: "rgba(160, 120, 245, 0.25)",
	},
	{
		type: "circle-filled",
		size: 2,
		top: "70%",
		right: "12%",
		animation: "animate-pulse-scale",
		color: "rgba(72, 149, 239, 0.2)",
	},
	{
		type: "hexagon-outline",
		size: 20,
		bottom: "12%",
		left: "3%",
		animation: "animate-spin-slow-reverse",
		color: "rgba(160, 120, 245, 0.05)",
	},
	{
		type: "circle-filled",
		size: 3,
		bottom: "20%",
		right: "8%",
		animation: "animate-blink-fade",
		color: "rgba(72, 149, 239, 0.2)",
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

// Project Card Component with 3D Tilt Effect
const ProjectCard = ({
	project,
	index,
	isReversed,
	isVisible,
}: {
	project: (typeof projects)[0];
	index: number;
	isReversed: boolean;
	isVisible: boolean;
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const cardRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!cardRef.current) return;

			const rect = cardRef.current.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			// Calculate tilt (max 8 degrees)
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			const tiltX = ((y - centerY) / centerY) * -8;
			const tiltY = ((x - centerX) / centerX) * 8;

			requestAnimationFrame(() => {
				setMousePos({ x, y });
				setTilt({ x: tiltX, y: tiltY });
			});
		},
		[]
	);

	const handleMouseLeave = () => {
		setIsHovered(false);
		setTilt({ x: 0, y: 0 });
	};

	const projectNumber = String(index + 1).padStart(2, "0");

	return (
		<div
			className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 transition-all duration-1000 ease-out
        ${isReversed ? "lg:flex-row-reverse" : ""}
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
			style={{ transitionDelay: `${index * 200}ms` }}>
			{/* Large Decorative Number */}
			<div
				className={`absolute top-0 ${isReversed ? "lg:-right-4 xl:-right-8" : "lg:-left-4 xl:-left-8"} 
          hidden lg:block pointer-events-none select-none z-0`}>
				<span
					className="text-[12rem] xl:text-[16rem] font-black leading-none tracking-tighter"
					style={{
						color: "transparent",
						WebkitTextStroke: "1px rgba(160, 120, 245, 0.1)",
					}}>
					{projectNumber}
				</span>
			</div>

			{/* Image Container */}
			<div
				ref={cardRef}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={handleMouseLeave}
				className="relative w-full lg:w-[55%] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer group"
				style={{
					transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
					transition: "transform 0.3s ease-out",
				}}>
				{/* Card Border */}
				<div
					className="absolute inset-0 rounded-2xl transition-all duration-500 z-20 pointer-events-none"
					style={{
						border: `1px solid ${isHovered ? "rgba(160, 120, 245, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
						boxShadow:
							isHovered ?
								"0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(160, 120, 245, 0.15)"
							:	"0 10px 40px -15px rgba(0, 0, 0, 0.3)",
					}}
				/>

				{/* Cursor Spotlight */}
				<div
					className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
					style={{
						opacity: isHovered ? 1 : 0,
						background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(160, 120, 245, 0.12), transparent 50%)`,
					}}
				/>

				{/* Image Background Placeholder */}
				<div
					className="absolute inset-0 transition-transform duration-700 ease-out"
					style={{
						background: `linear-gradient(135deg, rgba(160, 120, 245, 0.15) 0%, rgba(72, 149, 239, 0.1) 50%, rgba(160, 120, 245, 0.05) 100%)`,
						transform: isHovered ? "scale(1.08)" : "scale(1)",
					}}
				/>

				{/* Uncomment when you have actual images */}
				{/* <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
        /> */}

				{/* Decorative Grid Overlay */}
				<div
					className="absolute inset-0 opacity-[0.04] pointer-events-none"
					style={{
						backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
						backgroundSize: "40px 40px",
					}}
				/>

				{/* Bottom Gradient Overlay */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background:
							"linear-gradient(to top, rgba(7, 7, 10, 0.8) 0%, rgba(7, 7, 10, 0.2) 40%, transparent 100%)",
					}}
				/>

				{/* Mobile Project Number */}
				<div className="absolute top-4 left-4 lg:hidden z-20">
					<span
						className="text-5xl font-black"
						style={{
							color: "transparent",
							WebkitTextStroke: "1px rgba(160, 120, 245, 0.4)",
						}}>
						{projectNumber}
					</span>
				</div>

				{/* Year Badge */}
				<div
					className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
					style={{
						backgroundColor:
							isHovered ?
								"rgba(160, 120, 245, 0.2)"
							:	"rgba(255, 255, 255, 0.05)",
						color:
							isHovered ? "var(--brand-violet-light)" : "#9ca3af",
						border: `1px solid ${isHovered ? "rgba(160, 120, 245, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
						backdropFilter: "blur(10px)",
					}}>
					{project.year}
				</div>

				{/* Action Buttons - Appear on Hover */}
				<div
					className="absolute bottom-4 right-4 z-20 flex items-center gap-2 transition-all duration-500"
					style={{
						opacity: isHovered ? 1 : 0,
						transform:
							isHovered ? "translateY(0)" : "translateY(10px)",
					}}>
					{project.githubUrl && (
						<a
							href={project.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="p-2.5 rounded-lg backdrop-blur-sm transition-all duration-300"
							style={{
								backgroundColor: "rgba(255, 255, 255, 0.1)",
								border: "1px solid rgba(255, 255, 255, 0.1)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor =
									"rgba(255, 255, 255, 0.15)";
								e.currentTarget.style.borderColor =
									"rgba(255, 255, 255, 0.2)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor =
									"rgba(255, 255, 255, 0.1)";
								e.currentTarget.style.borderColor =
									"rgba(255, 255, 255, 0.1)";
							}}>
							<FiGithub className="w-4 h-4 text-white" />
						</a>
					)}
					<a
						href={project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="p-2.5 rounded-lg backdrop-blur-sm transition-all duration-300"
						style={{
							backgroundColor: "rgba(160, 120, 245, 0.2)",
							border: "1px solid rgba(160, 120, 245, 0.3)",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor =
								"rgba(160, 120, 245, 0.3)";
							e.currentTarget.style.borderColor =
								"rgba(160, 120, 245, 0.5)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor =
								"rgba(160, 120, 245, 0.2)";
							e.currentTarget.style.borderColor =
								"rgba(160, 120, 245, 0.3)";
						}}>
						<FiExternalLink className="w-4 h-4 text-white" />
					</a>
				</div>

				{/* Corner Accents */}
				<div
					className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg pointer-events-none transition-all duration-500 z-20"
					style={{
						borderColor:
							isHovered ?
								"rgba(160, 120, 245, 0.5)"
							:	"rgba(255, 255, 255, 0.1)",
					}}
				/>
				<div
					className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 rounded-br-lg pointer-events-none transition-all duration-500 z-20"
					style={{
						borderColor:
							isHovered ?
								"rgba(72, 149, 239, 0.5)"
							:	"rgba(255, 255, 255, 0.1)",
					}}
				/>
			</div>

			{/* Content */}
			<div
				className={`relative w-full lg:w-[45%] ${isReversed ? "lg:text-right" : "lg:text-left"}`}>
				{/* Subtitle */}
				<p
					className="text-sm font-medium uppercase tracking-widest mb-3"
					style={{ color: "var(--brand-violet)" }}>
					{project.subtitle}
				</p>

				{/* Title */}
				<h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
					{project.title}
				</h3>

				{/* Description */}
				<p className="text-gray-400 text-base leading-relaxed mb-6 max-w-lg">
					{project.description}
				</p>

				{/* Tags */}
				<div
					className={`flex flex-wrap gap-2 mb-8 ${isReversed ? "lg:justify-end" : "lg:justify-start"}`}>
					{project.tags.map((tag) => (
						<span
							key={tag}
							className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300"
							style={{
								backgroundColor: "rgba(160, 120, 245, 0.08)",
								color: "#9ca3af",
								border: "1px solid rgba(160, 120, 245, 0.15)",
							}}>
							{tag}
						</span>
					))}
				</div>

				{/* View Project Link */}
				<a
					href={project.liveUrl}
					className="group/link inline-flex items-center gap-2 text-base font-medium transition-all duration-300"
					style={{ color: "var(--brand-violet)" }}
					onMouseEnter={(e) => {
						e.currentTarget.style.color =
							"var(--brand-violet-light)";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.color = "var(--brand-violet)";
					}}>
					<span>View Project</span>
					<HiOutlineArrowTopRightOnSquare className="w-5 h-5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
				</a>
			</div>
		</div>
	);
};

// Connecting Line Between Projects
const ConnectingLine = ({ isVisible }: { isVisible: boolean }) => {
	return (
		<div className="hidden lg:flex justify-center py-8">
			<div
				className="relative w-px h-24 overflow-hidden"
				style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
				{/* Animated Glow */}
				<div
					className="absolute top-0 left-0 w-full h-8 animate-scroll-line"
					style={{
						background:
							"linear-gradient(to bottom, var(--brand-violet), transparent)",
						opacity: isVisible ? 1 : 0,
						transition: "opacity 0.5s ease-out",
					}}
				/>

				{/* Center Dot */}
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
					style={{
						backgroundColor: "var(--brand-violet)",
						boxShadow: "0 0 10px rgba(160, 120, 245, 0.5)",
					}}
				/>
			</div>
		</div>
	);
};

// View All Button
const ViewAllButton = ({ isVisible }: { isVisible: boolean }) => {
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
		<div
			className={`flex justify-center mt-16 transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
			style={{ transitionDelay: "600ms" }}>
			<a
				ref={btnRef}
				href="#all-projects"
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base overflow-hidden transition-all duration-300">
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

				<span className="relative text-white z-10">
					View All Projects
				</span>
				<FiChevronRight className="relative w-5 h-5 text-white z-10 group-hover:translate-x-1 transition-transform duration-300" />
			</a>
		</div>
	);
};

// Main Work Section Component
const Work = () => {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	// Intersection Observer
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

	// Use only the number of projects you want to display
	const displayedProjects = projects.slice(0, 3); // Change to 2 if needed

	return (
		<section
			id="work"
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
					className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full animate-float-drift"
					style={{
						background:
							"radial-gradient(circle, rgba(160, 120, 245, 0.05) 0%, transparent 60%)",
						filter: "blur(80px)",
						transform: "translateX(40%)",
					}}
				/>
				<div
					className="absolute bottom-20 left-0 w-[500px] h-[500px] rounded-full animate-float-drift-alt"
					style={{
						background:
							"radial-gradient(circle, rgba(72, 149, 239, 0.04) 0%, transparent 60%)",
						filter: "blur(70px)",
						transform: "translateX(-40%)",
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
					backgroundSize: "100px 100px",
				}}
			/>

			{/* ═══════ CONTENT ═══════ */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
				{/* Section Header */}
				<div
					className={`text-center mb-20 lg:mb-28 transition-all duration-1000 ease-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
					{/* Section Label */}
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
							Featured Work
						</span>
					</div>

					{/* Title */}
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
						<span className="text-white">Projects I&apos;m </span>
						<span
							className="relative inline-block"
							style={{
								background:
									"linear-gradient(90deg, var(--brand-violet), var(--brand-blue))",
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								color: "transparent",
							}}>
							Proud Of
							{/* Underline */}
							<svg
								className="absolute -bottom-2 left-0 w-full h-3"
								viewBox="0 0 200 8"
								preserveAspectRatio="none">
								<path
									d="M0,4 Q50,8 100,4 T200,4"
									fill="none"
									stroke="url(#work-underline-grad)"
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
										id="work-underline-grad"
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
					<p className="max-w-xl mx-auto text-gray-500 text-base md:text-lg leading-relaxed">
						A selection of my recent work. Each project represents a
						unique challenge and a creative solution.
					</p>
				</div>

				{/* Projects */}
				<div className="space-y-8 lg:space-y-0">
					{displayedProjects.map((project, index) => (
						<React.Fragment key={project.id}>
							<ProjectCard
								project={project}
								index={index}
								isReversed={index % 2 !== 0}
								isVisible={isVisible}
							/>

							{/* Connecting Line (not after last project) */}
							{index < displayedProjects.length - 1 && (
								<ConnectingLine isVisible={isVisible} />
							)}
						</React.Fragment>
					))}
				</div>

				{/* View All Button */}
				<ViewAllButton isVisible={isVisible} />
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

export default Work;
