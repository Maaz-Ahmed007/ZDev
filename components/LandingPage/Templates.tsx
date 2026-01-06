"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
	HiOutlineStar,
	HiStar,
	HiOutlineEye,
	HiOutlineShoppingCart,
	HiOutlineSparkles,
	HiOutlineFire,
	HiOutlineCheckBadge,
} from "react-icons/hi2";
import { FiChevronRight, FiLayers } from "react-icons/fi";
import { RiShoppingBag3Line } from "react-icons/ri";

/*
  ═══════════════════════════════════════════════════════════════
  DARK AURORA - TEMPLATES SECTION (STORE SHOWCASE)
  ═══════════════════════════════════════════════════════════════
  
  Visual Distinction:
  - Different accent color treatment (more gold/amber highlights)
  - Store/marketplace atmosphere
  - Premium product presentation
  - 3D perspective cards
  - Spotlight effects on featured template
  
  ═══════════════════════════════════════════════════════════════
*/

// Template Data
const templates = [
	{
		id: 1,
		name: "Zenith Pro",
		tagline: "Premium Dashboard Template",
		description:
			"A comprehensive admin dashboard with 50+ components, dark/light modes, and real-time analytics integration.",
		price: 79,
		originalPrice: 129,
		image: "/templates/zenith-pro.jpg",
		category: "Dashboard",
		rating: 4.9,
		reviews: 128,
		sales: 1240,
		badge: "Best Seller",
		badgeColor: "amber",
		featured: true,
		tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma"],
		previewUrl: "#",
		purchaseUrl: "#",
		screens: 3, // Number of preview screens
	},
	{
		id: 2,
		name: "Starter Portfolio",
		tagline: "Developer Portfolio Template",
		description:
			"Minimal and elegant portfolio template perfect for developers and designers to showcase their work.",
		price: 49,
		originalPrice: null,
		image: "/templates/starter-portfolio.jpg",
		category: "Portfolio",
		rating: 4.8,
		reviews: 86,
		sales: 890,
		badge: "Popular",
		badgeColor: "violet",
		featured: false,
		tags: ["Next.js", "MDX", "Tailwind CSS"],
		previewUrl: "#",
		purchaseUrl: "#",
		screens: 2,
	},
	{
		id: 3,
		name: "Commerce Kit",
		tagline: "E-commerce Starter Kit",
		description:
			"Full-featured e-commerce template with Stripe integration, product management, and checkout flow.",
		price: 99,
		originalPrice: 149,
		image: "/templates/commerce-kit.jpg",
		category: "E-commerce",
		rating: 4.9,
		reviews: 64,
		sales: 520,
		badge: "New",
		badgeColor: "emerald",
		featured: false,
		tags: ["Next.js", "Stripe", "Sanity", "Tailwind CSS"],
		previewUrl: "#",
		purchaseUrl: "#",
		screens: 3,
	},
	{
		id: 4,
		name: "SaaS Landing",
		tagline: "High-Converting Landing Page",
		description:
			"Modern SaaS landing page template with stunning animations and conversion-optimized sections.",
		price: 39,
		originalPrice: null,
		image: "/templates/saas-landing.jpg",
		category: "Landing Page",
		rating: 4.7,
		reviews: 112,
		sales: 1580,
		badge: null,
		badgeColor: null,
		featured: false,
		tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
		previewUrl: "#",
		purchaseUrl: "#",
		screens: 2,
	},
];

// Stats Data
const stats = [
	{ value: "5,000+", label: "Happy Customers" },
	{ value: "25+", label: "Premium Templates" },
	{ value: "4.9", label: "Average Rating" },
	{ value: "24/7", label: "Support" },
];

// Get badge icon and styles
const getBadgeConfig = (badge: string | null, color: string | null) => {
	switch (badge) {
		case "Best Seller":
			return {
				icon: HiOutlineFire,
				bg: "rgba(251, 191, 36, 0.15)",
				border: "rgba(251, 191, 36, 0.3)",
				text: "#fbbf24",
				glow: "rgba(251, 191, 36, 0.3)",
			};
		case "Popular":
			return {
				icon: HiOutlineStar,
				bg: "rgba(160, 120, 245, 0.15)",
				border: "rgba(160, 120, 245, 0.3)",
				text: "var(--brand-violet)",
				glow: "rgba(160, 120, 245, 0.3)",
			};
		case "New":
			return {
				icon: HiOutlineSparkles,
				bg: "rgba(52, 211, 153, 0.15)",
				border: "rgba(52, 211, 153, 0.3)",
				text: "#34d399",
				glow: "rgba(52, 211, 153, 0.3)",
			};
		default:
			return null;
	}
};

// Floating Shapes (with more gold/amber accents for store vibe)
const floatingShapes = [
	{
		type: "circle-outline",
		size: 12,
		top: "8%",
		left: "6%",
		animation: "animate-float-drift",
		color: "rgba(251, 191, 36, 0.1)",
	},
	{
		type: "diamond-outline",
		size: 10,
		top: "15%",
		right: "5%",
		animation: "animate-spin-slow",
		color: "rgba(160, 120, 245, 0.08)",
	},
	{
		type: "circle-filled",
		size: 3,
		top: "25%",
		left: "10%",
		animation: "animate-blink-fade",
		color: "rgba(251, 191, 36, 0.25)",
	},
	{
		type: "square-outline",
		size: 8,
		top: "40%",
		right: "8%",
		animation: "animate-float-drift-alt",
		color: "rgba(72, 149, 239, 0.06)",
	},
	{
		type: "circle-filled",
		size: 4,
		top: "55%",
		left: "4%",
		animation: "animate-blink-fade-delayed",
		color: "rgba(160, 120, 245, 0.2)",
	},
	{
		type: "hexagon-outline",
		size: 14,
		top: "65%",
		right: "4%",
		animation: "animate-spin-slow-reverse",
		color: "rgba(251, 191, 36, 0.06)",
	},
	{
		type: "circle-filled",
		size: 2,
		top: "80%",
		left: "12%",
		animation: "animate-pulse-scale",
		color: "rgba(72, 149, 239, 0.25)",
	},
	{
		type: "diamond-outline",
		size: 10,
		bottom: "10%",
		right: "10%",
		animation: "animate-float-drift",
		color: "rgba(160, 120, 245, 0.08)",
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

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
	const fullStars = Math.floor(rating);
	const hasHalf = rating % 1 >= 0.5;

	return (
		<div className="flex items-center gap-0.5">
			{[...Array(5)].map((_, i) => (
				<HiStar
					key={i}
					className="w-3.5 h-3.5"
					style={{
						color:
							i < fullStars
								? "#fbbf24"
								: i === fullStars && hasHalf
								? "#fbbf24"
								: "#374151",
					}}
				/>
			))}
		</div>
	);
};

// Screen Preview Mockup Component
const ScreenPreview = ({
	isHovered,
	screens,
}: {
	isHovered: boolean;
	screens: number;
}) => {
	return (
		<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
			{/* Desktop Screen */}
			<div
				className="relative w-[70%] h-[75%] rounded-lg overflow-hidden transition-all duration-700 ease-out"
				style={{
					backgroundColor: "rgba(20, 20, 25, 0.95)",
					border: "1px solid rgba(255, 255, 255, 0.1)",
					transform: isHovered
						? "perspective(1000px) rotateY(-5deg) scale(1.02)"
						: "perspective(1000px) rotateY(0deg) scale(1)",
					boxShadow: isHovered
						? "20px 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(160, 120, 245, 0.1)"
						: "10px 10px 30px rgba(0, 0, 0, 0.3)",
				}}>
				{/* Browser Bar */}
				<div
					className="flex items-center gap-1.5 px-3 py-2 border-b"
					style={{
						backgroundColor: "rgba(30, 30, 35, 0.9)",
						borderColor: "rgba(255, 255, 255, 0.05)",
					}}>
					<div className="w-2 h-2 rounded-full bg-red-500/70" />
					<div className="w-2 h-2 rounded-full bg-yellow-500/70" />
					<div className="w-2 h-2 rounded-full bg-green-500/70" />
					<div
						className="ml-3 flex-1 h-4 rounded"
						style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
					/>
				</div>

				{/* Content Area */}
				<div
					className="p-4 h-full"
					style={{
						background:
							"linear-gradient(135deg, rgba(160, 120, 245, 0.1) 0%, rgba(72, 149, 239, 0.05) 100%)",
					}}>
					{/* Placeholder Content Lines */}
					<div className="space-y-3">
						<div className="w-1/3 h-2 rounded bg-white/10" />
						<div className="w-2/3 h-2 rounded bg-white/5" />
						<div className="w-1/2 h-2 rounded bg-white/5" />
						<div className="mt-6 grid grid-cols-3 gap-2">
							<div className="h-12 rounded bg-white/5" />
							<div className="h-12 rounded bg-white/5" />
							<div className="h-12 rounded bg-white/5" />
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Screen (appears on hover) */}
			{screens >= 2 && (
				<div
					className="absolute bottom-4 right-4 w-[20%] h-[50%] rounded-lg overflow-hidden transition-all duration-500 ease-out"
					style={{
						backgroundColor: "rgba(20, 20, 25, 0.95)",
						border: "1px solid rgba(255, 255, 255, 0.1)",
						opacity: isHovered ? 1 : 0,
						transform: isHovered
							? "translateX(0) rotate(3deg)"
							: "translateX(20px) rotate(3deg)",
						boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.4)",
					}}>
					<div
						className="flex items-center justify-center py-1 border-b"
						style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}>
						<div className="w-8 h-1 rounded-full bg-white/20" />
					</div>
					<div
						className="p-2 h-full"
						style={{
							background:
								"linear-gradient(135deg, rgba(72, 149, 239, 0.1) 0%, rgba(160, 120, 245, 0.05) 100%)",
						}}>
						<div className="space-y-2">
							<div className="w-full h-1.5 rounded bg-white/10" />
							<div className="w-2/3 h-1.5 rounded bg-white/5" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

// Featured Template Card (Large Spotlight)
const FeaturedTemplateCard = ({
	template,
	isVisible,
}: {
	template: (typeof templates)[0];
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

	const badgeConfig = getBadgeConfig(template.badge, template.badgeColor);

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10 rounded-3xl cursor-pointer transition-all duration-700 ease-out
        ${
			isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
		}`}
			style={{
				background:
					"linear-gradient(135deg, rgba(251, 191, 36, 0.03) 0%, rgba(160, 120, 245, 0.02) 50%, rgba(72, 149, 239, 0.02) 100%)",
				border: `1px solid ${
					isHovered
						? "rgba(251, 191, 36, 0.3)"
						: "rgba(255, 255, 255, 0.06)"
				}`,
				boxShadow: isHovered
					? "0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 0 80px rgba(251, 191, 36, 0.08)"
					: "0 10px 40px -15px rgba(0, 0, 0, 0.3)",
			}}>
			{/* Cursor Spotlight */}
			<div
				className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
				style={{
					opacity: isHovered ? 1 : 0,
					background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(251, 191, 36, 0.06), transparent 50%)`,
				}}
			/>

			{/* Corner Glow */}
			<div
				className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none transition-opacity duration-500"
				style={{
					background:
						"radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 60%)",
					filter: "blur(40px)",
					opacity: isHovered ? 1 : 0.3,
				}}
			/>

			{/* Featured Badge */}
			<div
				className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full"
				style={{
					backgroundColor: "rgba(251, 191, 36, 0.15)",
					border: "1px solid rgba(251, 191, 36, 0.3)",
				}}>
				<HiOutlineCheckBadge
					className="w-4 h-4"
					style={{ color: "#fbbf24" }}
				/>
				<span
					className="text-xs font-semibold"
					style={{ color: "#fbbf24" }}>
					Featured
				</span>
			</div>

			{/* Image/Preview Section */}
			<div className="relative aspect-4/3 rounded-2xl overflow-hidden order-1 lg:order-2">
				{/* Preview Mockup */}
				<ScreenPreview
					isHovered={isHovered}
					screens={template.screens}
				/>

				{/* Overlay Gradient */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background:
							"linear-gradient(to top, rgba(7, 7, 10, 0.3) 0%, transparent 50%)",
					}}
				/>

				{/* Quick Actions (appear on hover) */}
				<div
					className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-3 transition-all duration-500"
					style={{
						opacity: isHovered ? 1 : 0,
						transform: isHovered
							? "translateY(0)"
							: "translateY(10px)",
					}}>
					<a
						href={template.previewUrl}
						className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium backdrop-blur-sm transition-all duration-300"
						style={{
							backgroundColor: "rgba(255, 255, 255, 0.1)",
							border: "1px solid rgba(255, 255, 255, 0.15)",
							color: "#ffffff",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor =
								"rgba(255, 255, 255, 0.15)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor =
								"rgba(255, 255, 255, 0.1)";
						}}>
						<HiOutlineEye className="w-4 h-4" />
						<span>Live Preview</span>
					</a>
				</div>
			</div>

			{/* Content Section */}
			<div className="relative z-10 flex flex-col justify-center order-2 lg:order-1">
				{/* Category & Badge */}
				<div className="flex items-center gap-3 mb-4">
					<span
						className="px-3 py-1 rounded-full text-xs font-medium"
						style={{
							backgroundColor: "rgba(160, 120, 245, 0.1)",
							color: "var(--brand-violet)",
							border: "1px solid rgba(160, 120, 245, 0.2)",
						}}>
						{template.category}
					</span>

					{badgeConfig && (
						<span
							className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
							style={{
								backgroundColor: badgeConfig.bg,
								color: badgeConfig.text,
								border: `1px solid ${badgeConfig.border}`,
							}}>
							<badgeConfig.icon className="w-3.5 h-3.5" />
							{template.badge}
						</span>
					)}
				</div>

				{/* Title */}
				<h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
					{template.name}
				</h3>

				{/* Tagline */}
				<p
					className="text-lg font-medium mb-4"
					style={{ color: "var(--brand-violet-light)" }}>
					{template.tagline}
				</p>

				{/* Description */}
				<p className="text-gray-400 leading-relaxed mb-6">
					{template.description}
				</p>

				{/* Tags */}
				<div className="flex flex-wrap gap-2 mb-6">
					{template.tags.map((tag) => (
						<span
							key={tag}
							className="px-2.5 py-1 rounded-md text-xs font-medium"
							style={{
								backgroundColor: "rgba(255, 255, 255, 0.03)",
								color: "#9ca3af",
								border: "1px solid rgba(255, 255, 255, 0.05)",
							}}>
							{tag}
						</span>
					))}
				</div>

				{/* Rating & Sales */}
				<div className="flex items-center gap-6 mb-8">
					<div className="flex items-center gap-2">
						<StarRating rating={template.rating} />
						<span className="text-sm text-gray-400">
							{template.rating} ({template.reviews} reviews)
						</span>
					</div>
					<div className="flex items-center gap-1.5 text-sm text-gray-500">
						<RiShoppingBag3Line className="w-4 h-4" />
						<span>{template.sales.toLocaleString()} sales</span>
					</div>
				</div>

				{/* Price & CTA */}
				<div className="flex items-center gap-6">
					{/* Price */}
					<div className="flex items-baseline gap-3">
						<span className="text-4xl font-bold text-white">
							${template.price}
						</span>
						{template.originalPrice && (
							<span className="text-lg text-gray-500 line-through">
								${template.originalPrice}
							</span>
						)}
					</div>

					{/* Purchase Button */}
					<PurchaseButton href={template.purchaseUrl} />
				</div>
			</div>
		</div>
	);
};

// Regular Template Card
const TemplateCard = ({
	template,
	index,
	isVisible,
}: {
	template: (typeof templates)[0];
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

	const badgeConfig = getBadgeConfig(template.badge, template.badgeColor);

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out
        ${
			isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
		}`}
			style={{
				transitionDelay: `${(index + 1) * 150}ms`,
				backgroundColor: "rgba(255, 255, 255, 0.02)",
				border: `1px solid ${
					isHovered
						? "rgba(160, 120, 245, 0.3)"
						: "rgba(255, 255, 255, 0.05)"
				}`,
				transform: isHovered ? "translateY(-8px)" : "translateY(0)",
				boxShadow: isHovered
					? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 50px rgba(160, 120, 245, 0.1)"
					: "0 4px 20px -5px rgba(0, 0, 0, 0.2)",
			}}>
			{/* Cursor Spotlight */}
			<div
				className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
				style={{
					opacity: isHovered ? 1 : 0,
					background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(160, 120, 245, 0.08), transparent 50%)`,
				}}
			/>

			{/* Image Section */}
			<div className="relative aspect-16/10 overflow-hidden">
				{/* Preview Mockup */}
				<ScreenPreview
					isHovered={isHovered}
					screens={template.screens}
				/>

				{/* Badge */}
				{badgeConfig && (
					<div
						className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
						style={{
							backgroundColor: badgeConfig.bg,
							color: badgeConfig.text,
							border: `1px solid ${badgeConfig.border}`,
							boxShadow: `0 0 15px ${badgeConfig.glow}`,
						}}>
						<badgeConfig.icon className="w-3 h-3" />
						{template.badge}
					</div>
				)}

				{/* Category Badge */}
				<div
					className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						color: "#d1d5db",
						border: "1px solid rgba(255, 255, 255, 0.1)",
					}}>
					{template.category}
				</div>

				{/* Quick Actions */}
				<div
					className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 transition-all duration-500"
					style={{
						opacity: isHovered ? 1 : 0,
						transform: isHovered
							? "translateY(0)"
							: "translateY(10px)",
					}}>
					<a
						href={template.previewUrl}
						className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium backdrop-blur-sm transition-all duration-300"
						style={{
							backgroundColor: "rgba(255, 255, 255, 0.1)",
							border: "1px solid rgba(255, 255, 255, 0.15)",
							color: "#ffffff",
						}}>
						<HiOutlineEye className="w-3.5 h-3.5" />
						Preview
					</a>
					<a
						href={template.purchaseUrl}
						className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium backdrop-blur-sm transition-all duration-300"
						style={{
							backgroundColor: "rgba(160, 120, 245, 0.3)",
							border: "1px solid rgba(160, 120, 245, 0.4)",
							color: "#ffffff",
						}}>
						<HiOutlineShoppingCart className="w-3.5 h-3.5" />
						Purchase
					</a>
				</div>

				{/* Bottom Gradient */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background:
							"linear-gradient(to top, rgba(7, 7, 10, 0.9) 0%, transparent 50%)",
					}}
				/>
			</div>

			{/* Content Section */}
			<div className="p-5">
				{/* Title & Price Row */}
				<div className="flex items-start justify-between mb-3">
					<div>
						<h4 className="text-lg font-bold text-white mb-1 group-hover:text-white transition-colors duration-300">
							{template.name}
						</h4>
						<p className="text-sm text-gray-500">
							{template.tagline}
						</p>
					</div>
					<div className="text-right">
						<span className="text-xl font-bold text-white">
							${template.price}
						</span>
						{template.originalPrice && (
							<span className="block text-sm text-gray-500 line-through">
								${template.originalPrice}
							</span>
						)}
					</div>
				</div>

				{/* Rating & Sales */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<StarRating rating={template.rating} />
						<span className="text-xs text-gray-500">
							({template.reviews})
						</span>
					</div>
					<span className="text-xs text-gray-500">
						{template.sales.toLocaleString()} sales
					</span>
				</div>

				{/* Tags (show first 2) */}
				<div className="flex flex-wrap gap-1.5 mt-4">
					{template.tags.slice(0, 3).map((tag) => (
						<span
							key={tag}
							className="px-2 py-0.5 rounded text-[10px] font-medium"
							style={{
								backgroundColor: "rgba(255, 255, 255, 0.03)",
								color: "#6b7280",
								border: "1px solid rgba(255, 255, 255, 0.05)",
							}}>
							{tag}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

// Purchase Button with Cursor Tracking
const PurchaseButton = ({ href }: { href: string }) => {
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
			href={href}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300">
			{/* Gradient Background */}
			<div
				className="absolute inset-0 animate-btn-gradient"
				style={{
					background:
						"linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, var(--brand-violet) 70%, #fbbf24 100%)",
					backgroundSize: "200% 200%",
				}}
			/>

			{/* Cursor Spotlight */}
			<div
				className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
				style={{
					opacity: isHovered ? 1 : 0,
					background: `radial-gradient(80px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.3), transparent 50%)`,
				}}
			/>

			{/* Glow */}
			<div
				className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-300"
				style={{
					background:
						"linear-gradient(135deg, #fbbf24, var(--brand-violet))",
					filter: "blur(15px)",
				}}
			/>

			{/* Shine Sweep */}
			<div className="absolute inset-0 overflow-hidden rounded-full">
				<div
					className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out skew-x-[-15deg]"
					style={{
						background:
							"linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
					}}
				/>
			</div>

			<HiOutlineShoppingCart className="relative w-4 h-4 text-white z-10" />
			<span className="relative text-white z-10">Purchase Now</span>
		</a>
	);
};

// Browse All Button
const BrowseAllButton = ({ isVisible }: { isVisible: boolean }) => {
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
			href="#all-templates"
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base overflow-hidden transition-all duration-700 ease-out
        ${
			isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
		}`}
			style={{ transitionDelay: "600ms" }}>
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

			<FiLayers className="relative w-5 h-5 text-white z-10" />
			<span className="relative text-white z-10">
				Browse All Templates
			</span>
			<FiChevronRight className="relative w-5 h-5 text-white z-10 group-hover:translate-x-1 transition-transform duration-300" />
		</a>
	);
};

// Stat Card Component
const StatCard = ({
	stat,
	index,
	isVisible,
}: {
	stat: (typeof stats)[0];
	index: number;
	isVisible: boolean;
}) => {
	return (
		<div
			className={`text-center p-6 rounded-xl transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
			style={{
				transitionDelay: `${index * 100 + 400}ms`,
				backgroundColor: "rgba(255, 255, 255, 0.02)",
				border: "1px solid rgba(255, 255, 255, 0.05)",
			}}>
			<div
				className="text-3xl md:text-4xl font-bold mb-2"
				style={{
					background:
						"linear-gradient(90deg, var(--brand-violet), var(--brand-blue))",
					WebkitBackgroundClip: "text",
					backgroundClip: "text",
					color: "transparent",
				}}>
				{stat.value}
			</div>
			<div className="text-sm text-gray-500">{stat.label}</div>
		</div>
	);
};

// Main Templates Section Component
const Templates = () => {
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

	const featuredTemplate = templates.find((t) => t.featured);
	const otherTemplates = templates.filter((t) => !t.featured);

	return (
		<section
			id="templates"
			ref={sectionRef}
			className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
			style={{ backgroundColor: "var(--bg-primary)" }}>
			{/* ═══════ BACKGROUND ELEMENTS ═══════ */}

			{/* Top Border with Gold Accent */}
			<div
				className="absolute top-0 left-0 right-0 h-px"
				style={{
					background:
						"linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), rgba(160, 120, 245, 0.2), rgba(72, 149, 239, 0.2), transparent)",
				}}
			/>

			{/* Ambient Orbs - More Golden Tones */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{/* Large Gold Orb */}
				<div
					className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] animate-float-drift"
					style={{
						background:
							"radial-gradient(ellipse, rgba(251, 191, 36, 0.08) 0%, transparent 60%)",
						filter: "blur(80px)",
					}}
				/>
				<div
					className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full animate-float-drift-alt"
					style={{
						background:
							"radial-gradient(circle, rgba(160, 120, 245, 0.06) 0%, transparent 60%)",
						filter: "blur(70px)",
					}}
				/>
				<div
					className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full animate-float-drift"
					style={{
						background:
							"radial-gradient(circle, rgba(72, 149, 239, 0.05) 0%, transparent 60%)",
						filter: "blur(80px)",
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
					className={`text-center mb-16 transition-all duration-1000 ease-out
            ${
				isVisible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-10"
			}`}>
					{/* Store Badge */}
					<div
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
						style={{
							background:
								"linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(160, 120, 245, 0.1))",
							border: "1px solid rgba(251, 191, 36, 0.2)",
						}}>
						<RiShoppingBag3Line
							className="w-4 h-4"
							style={{ color: "#fbbf24" }}
						/>
						<span
							className="text-xs font-medium uppercase tracking-wider"
							style={{
								background:
									"linear-gradient(90deg, #fbbf24, var(--brand-violet))",
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								color: "transparent",
							}}>
							Template Store
						</span>
					</div>

					{/* Title */}
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
						<span className="text-white">Premium </span>
						<span
							className="relative inline-block"
							style={{
								background:
									"linear-gradient(90deg, #fbbf24, var(--brand-violet), var(--brand-blue))",
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								color: "transparent",
							}}>
							Templates
							<svg
								className="absolute -bottom-2 left-0 w-full h-3"
								viewBox="0 0 200 8"
								preserveAspectRatio="none">
								<path
									d="M0,4 Q50,8 100,4 T200,4"
									fill="none"
									stroke="url(#templates-underline)"
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
										id="templates-underline"
										x1="0%"
										y1="0%"
										x2="100%"
										y2="0%">
										<stop
											offset="0%"
											stopColor="#fbbf24"
											stopOpacity="0.5"
										/>
										<stop
											offset="50%"
											stopColor="#A078F5"
											stopOpacity="0.4"
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
						Launch faster with production-ready templates. Each
						template is
						<span className="text-gray-300">
							{" "}
							carefully crafted
						</span>
						,
						<span className="text-gray-300">
							{" "}
							fully customizable
						</span>
						, and
						<span className="text-gray-300">
							{" "}
							built for performance
						</span>
						.
					</p>
				</div>

				{/* ═══════ STATS BAR ═══════ */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
					{stats.map((stat, index) => (
						<StatCard
							key={stat.label}
							stat={stat}
							index={index}
							isVisible={isVisible}
						/>
					))}
				</div>

				{/* ═══════ FEATURED TEMPLATE ═══════ */}
				{featuredTemplate && (
					<div className="mb-12">
						<FeaturedTemplateCard
							template={featuredTemplate}
							isVisible={isVisible}
						/>
					</div>
				)}

				{/* ═══════ OTHER TEMPLATES GRID ═══════ */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
					{otherTemplates.map((template, index) => (
						<TemplateCard
							key={template.id}
							template={template}
							index={index}
							isVisible={isVisible}
						/>
					))}
				</div>

				{/* ═══════ BROWSE ALL CTA ═══════ */}
				<div className="text-center">
					<BrowseAllButton isVisible={isVisible} />
				</div>
			</div>

			{/* Bottom Decorative Line */}
			<div
				className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-px"
				style={{
					background:
						"linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.15), rgba(160, 120, 245, 0.15), transparent)",
				}}
			/>
		</section>
	);
};

export default Templates;
