export type StoreCategory = 'Templates' | 'Complete Projects';
export type LicenseType = 'Personal' | 'Commercial' | 'Extended';

export interface ProductHighlight {
    icon: string; // emoji or icon name
    title: string;
    description: string;
}

export interface ProductType {
    id: string;
    title: string;
    category: StoreCategory;
    price: number;
    originalPrice?: number;
    description: string;
    longDescription: string;
    image: string;
    screenshots: string[];
    tags: string[];
    highlights: ProductHighlight[];
    techStack: string[];
    license: LicenseType;
    livePreviewUrl?: string;
    isNew?: boolean;
    featured?: boolean;
}

export const STORE_PRODUCTS: ProductType[] = [
    {
        id: 't-1',
        title: 'Nexus UI Kit',
        category: 'Templates',
        price: 49,
        originalPrice: 79,
        description: 'A comprehensive modern dashboard UI kit with 100+ components built for Next.js 14 and Tailwind.',
        longDescription: `Nexus UI Kit is the ultimate starting point for building stunning admin dashboards and internal tools. With over 100 meticulously crafted components—including data tables, charts, modals, sidebars, and form elements—you get a complete design system out of the box.\n\nEvery component is fully responsive, supports dark mode natively, and follows accessibility best practices. The kit includes pre-built page templates for analytics dashboards, user management, settings panels, and more. Built with Next.js App Router and server components for blazing-fast performance.`,
        image: 'Dashboard Mockup.png',
        screenshots: ['nexus-overview.png', 'nexus-charts.png', 'nexus-forms.png', 'nexus-tables.png'],
        tags: ['Next.js', 'Tailwind', 'Framer Motion'],
        highlights: [
            { icon: '🧩', title: '100+ Components', description: 'Buttons, cards, modals, charts, tables, and more' },
            { icon: '🌙', title: 'Dark Mode Ready', description: 'Built-in light and dark theme support' },
            { icon: '📱', title: 'Fully Responsive', description: 'Looks perfect on every screen size' },
            { icon: '♿', title: 'Accessible', description: 'WCAG 2.1 compliant keyboard navigation' },
        ],
        techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Radix UI'],
        license: 'Commercial',
        livePreviewUrl: '#',
        isNew: true,
        featured: true,
    },
    {
        id: 't-2',
        title: 'Spectra Portfolio',
        category: 'Templates',
        price: 39,
        description: 'Minimalist and lightning-fast developer portfolio template featuring built-in MDX blogging.',
        longDescription: `Spectra Portfolio is a beautifully minimal portfolio template designed for developers, designers, and creatives who want their work to speak for itself. The clean, distraction-free layout puts your projects front and center.\n\nIncludes a fully-featured MDX blog with syntax highlighting, table of contents generation, and SEO optimization. The template scores 100/100 on Lighthouse out of the box, with optimized fonts, images, and zero layout shift.`,
        image: 'Portfolio Mockup.png',
        screenshots: ['spectra-home.png', 'spectra-blog.png', 'spectra-project.png'],
        tags: ['React', 'MDX', 'Vite'],
        highlights: [
            { icon: '⚡', title: 'Lightning Fast', description: 'Perfect Lighthouse score out of the box' },
            { icon: '✍️', title: 'MDX Blog', description: 'Write posts in Markdown with React components' },
            { icon: '🔍', title: 'SEO Optimized', description: 'Meta tags, sitemap, and structured data included' },
            { icon: '🎨', title: 'Customizable', description: 'Easy theming with CSS variables' },
        ],
        techStack: ['React', 'Vite', 'MDX', 'Tailwind CSS', 'Shiki'],
        license: 'Personal',
    },
    {
        id: 't-3',
        title: 'Aurora Commerce',
        category: 'Templates',
        price: 89,
        originalPrice: 129,
        description: 'Complete e-commerce starter kit with Stripe integration and secure headless checkout.',
        longDescription: `Aurora Commerce is a production-ready e-commerce template that handles the heavy lifting so you can focus on selling. It comes pre-wired with Stripe for payments, includes a beautiful product catalog, cart system, and a fully secure checkout flow.\n\nThe headless architecture means you can plug in any CMS or backend. Includes inventory management hooks, order confirmation emails via Resend, and a customer account dashboard. Every page is optimized for conversion with strategic CTA placement and trust signals.`,
        image: 'Commerce Mockup.png',
        screenshots: ['aurora-shop.png', 'aurora-cart.png', 'aurora-checkout.png', 'aurora-dashboard.png'],
        tags: ['Next.js', 'Stripe', 'Zustand', 'Prisma'],
        highlights: [
            { icon: '💳', title: 'Stripe Ready', description: 'Payments, subscriptions, and webhooks pre-configured' },
            { icon: '🛒', title: 'Full Cart System', description: 'Persistent cart with Zustand state management' },
            { icon: '📧', title: 'Email Flows', description: 'Order confirmations and receipts via Resend' },
            { icon: '🔒', title: 'Secure Checkout', description: 'PCI-compliant with fraud prevention' },
        ],
        techStack: ['Next.js 14', 'TypeScript', 'Stripe SDK', 'Zustand', 'Prisma', 'Resend'],
        license: 'Commercial',
        livePreviewUrl: '#',
        featured: true,
    },
    {
        id: 'p-1',
        title: 'Fintech SaaS Platform',
        category: 'Complete Projects',
        price: 899,
        description: 'Ready-to-deploy financial dashboard application complete with user authentication and database schemas.',
        longDescription: `A complete, production-grade fintech SaaS application ready for deployment. This is not a template—it is a fully functional financial dashboard with real-time data visualization, user authentication, role-based access control, and a complete database schema.\n\nIncludes Plaid integration for bank account linking, transaction categorization with AI, budget tracking, and exportable financial reports. The admin panel provides user management, analytics, and system monitoring. Built with security-first principles including encrypted data storage and audit logging.`,
        image: 'SaaS Platform Preview.png',
        screenshots: ['fintech-dashboard.png', 'fintech-transactions.png', 'fintech-reports.png', 'fintech-admin.png'],
        tags: ['Full Stack', 'Next.js', 'PostgreSQL', 'Auth.js'],
        highlights: [
            { icon: '🏦', title: 'Bank Integration', description: 'Plaid-powered account linking and syncing' },
            { icon: '🤖', title: 'AI Categorization', description: 'Smart transaction sorting and insights' },
            { icon: '🛡️', title: 'Enterprise Security', description: 'Encrypted storage, RBAC, and audit logs' },
            { icon: '📊', title: 'Real-Time Analytics', description: 'Live charts, budgets, and financial reports' },
        ],
        techStack: ['Next.js 14', 'PostgreSQL', 'Auth.js', 'Prisma', 'Plaid SDK', 'OpenAI', 'Docker'],
        license: 'Extended',
        isNew: true,
        featured: true,
    },
    {
        id: 'p-2',
        title: 'Real Estate Marketplace',
        category: 'Complete Projects',
        price: 1200,
        description: 'A fully functioning scalable property marketplace featuring advanced map filtering and realtor dashboards.',
        longDescription: `Launch your own real estate marketplace with this complete, scalable platform. Features include interactive map-based property search with filtering, virtual tour integration, agent profiles, and a comprehensive realtor dashboard for managing listings.\n\nThe platform supports multi-tenant architecture for agencies, automated listing syndication, lead management with CRM integration, and a mortgage calculator. Built as a monorepo with shared packages for maximum code reuse and maintainability.`,
        image: 'Marketplace Preview.png',
        screenshots: ['realestate-search.png', 'realestate-listing.png', 'realestate-agent.png', 'realestate-dashboard.png'],
        tags: ['Monorepo', 'Nest.js', 'React', 'MongoDB'],
        highlights: [
            { icon: '🗺️', title: 'Map Search', description: 'Interactive Mapbox-powered property exploration' },
            { icon: '🏠', title: 'Virtual Tours', description: '360° property walkthroughs and galleries' },
            { icon: '👤', title: 'Agent CRM', description: 'Lead tracking, messaging, and analytics' },
            { icon: '📈', title: 'Scalable', description: 'Multi-tenant architecture for agencies' },
        ],
        techStack: ['React', 'Nest.js', 'MongoDB', 'Redis', 'Mapbox', 'Socket.io', 'Docker'],
        license: 'Extended',
    },
    {
        id: 't-4',
        title: 'Landing Boost',
        category: 'Templates',
        price: 45,
        description: 'High-conversion landing page framework specifically designed for infoproducts and software betas.',
        longDescription: `Landing Boost is a conversion-optimized landing page framework built for founders, indie hackers, and marketers launching digital products. Every section is strategically designed based on proven conversion principles.\n\nIncludes 12 pre-built sections: hero with social proof, feature grids, pricing tables, testimonial carousels, FAQ accordions, and newsletter signup forms. The waitlist system is pre-wired with Resend for email collection and drip campaigns. A/B testing hooks are built in for optimizing your launch.`,
        image: 'Landing Boost.png',
        screenshots: ['landing-hero.png', 'landing-features.png', 'landing-pricing.png'],
        tags: ['React', 'Framer Motion', 'Resend'],
        highlights: [
            { icon: '🚀', title: '12 Ready Sections', description: 'Hero, features, pricing, testimonials and more' },
            { icon: '📬', title: 'Waitlist System', description: 'Email collection with Resend integration' },
            { icon: '🧪', title: 'A/B Testing', description: 'Built-in hooks for conversion optimization' },
            { icon: '🎯', title: 'Conversion First', description: 'Every pixel designed to convert visitors' },
        ],
        techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'Resend', 'Vercel Analytics'],
        license: 'Personal',
    },
];
