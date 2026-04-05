export type StoreCategory = 'Templates' | 'Complete Projects';

export interface ProductType {
    id: string;
    title: string;
    category: StoreCategory;
    price: number;
    originalPrice?: number;
    description: string;
    image: string;
    tags: string[];
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
        image: 'Dashboard Mockup.png',
        tags: ['Next.js', 'Tailwind', 'Framer Motion'],
        isNew: true,
        featured: true,
    },
    {
        id: 't-2',
        title: 'Spectra Portfolio',
        category: 'Templates',
        price: 39,
        description: 'Minimalist and lightning-fast developer portfolio template featuring built-in MDX blogging.',
        image: 'Portfolio Mockup.png',
        tags: ['React', 'MDX', 'Vite'],
    },
    {
        id: 't-3',
        title: 'Aurora Commerce',
        category: 'Templates',
        price: 89,
        originalPrice: 129,
        description: 'Complete e-commerce starter kit with Stripe integration and secure headless checkout.',
        image: 'Commerce Mockup.png',
        tags: ['Next.js', 'Stripe', 'Zustand', 'Prisma'],
        featured: true,
    },
    {
        id: 'p-1',
        title: 'Fintech SaaS Platform',
        category: 'Complete Projects',
        price: 899,
        description: 'Ready-to-deploy financial dashboard application complete with user authentication and database schemas.',
        image: 'SaaS Platform Preview.png',
        tags: ['Full Stack', 'Next.js', 'PostgreSQL', 'Auth.js'],
        isNew: true,
        featured: true,
    },
    {
        id: 'p-2',
        title: 'Real Estate Marketplace',
        category: 'Complete Projects',
        price: 1200,
        description: 'A fully functioning scalable property marketplace featuring advanced map filtering and realtor dashboards.',
        image: 'Marketplace Preview.png',
        tags: ['Monorepo', 'Nest.js', 'React', 'MongoDB'],
    },
    {
        id: 't-4',
        title: 'Landing Boost',
        category: 'Templates',
        price: 45,
        description: 'High-conversion landing page framework specifically designed for infoproducts and software betas.',
        image: 'Landing Boost.png',
        tags: ['React', 'Framer Motion', 'Resend'],
    },
];
