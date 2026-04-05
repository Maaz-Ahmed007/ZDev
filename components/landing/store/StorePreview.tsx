// components/landing/store/StorePreview.tsx
'use client';

import React, { useState } from 'react';
import { RealityText, GradientButton } from '@/components/ui';
import ProductCard from '@/components/store/ProductCard';
import { STORE_PRODUCTS, StoreCategory } from '@/lib/storeData';
import { HiArrowLongRight } from 'react-icons/hi2';

type TabType = 'All' | StoreCategory;

const StorePreview: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('All');

    // Only show a limited preview (e.g. top 6 items) on the landing page
    const filteredProducts = STORE_PRODUCTS.filter((product) => {
        if (activeTab === 'All') return true;
        return product.category === activeTab;
    }).slice(0, 6);

    return (
        <section id="store-preview" className="relative w-full py-32 px-6 overflow-hidden">
            {/* ═══ STORE PREVIEW BACKGROUND ═══ */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {/* Top spotlight — brighter */}
                <div
                    className="absolute"
                    style={{
                        top: '-15%',
                        left: '50%',
                        width: '1000px',
                        height: '700px',
                        marginLeft: '-500px',
                        background: 'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(160,120,245,0.16) 0%, rgba(72,149,239,0.08) 35%, transparent 65%)',
                    }}
                />
                {/* Animated cross-grid */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(160,120,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(72,149,239,0.04) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                        animation: 'store-line-glow 8s ease-in-out infinite',
                    }}
                />
                {/* Drifting violet mesh light — left */}
                <div
                    className="absolute"
                    style={{
                        top: '25%',
                        left: '-3%',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(160,120,245,0.12) 0%, rgba(160,120,245,0.03) 40%, transparent 65%)',
                        animation: 'store-drift-a 15s ease-in-out infinite',
                        willChange: 'transform',
                    }}
                />
                {/* Drifting blue mesh light — right */}
                <div
                    className="absolute"
                    style={{
                        top: '45%',
                        right: '-5%',
                        width: '450px',
                        height: '450px',
                        background: 'radial-gradient(circle, rgba(72,149,239,0.10) 0%, rgba(72,149,239,0.03) 40%, transparent 65%)',
                        animation: 'store-drift-b 18s ease-in-out infinite',
                        willChange: 'transform',
                    }}
                />
                {/* Bottom gradient fade into next section */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-32"
                    style={{
                        background: 'linear-gradient(to top, var(--bg-primary), transparent)',
                    }}
                />
                {/* Top separator line */}
                <div
                    className="absolute top-0 left-[10%] right-[10%] h-px"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(160,120,245,0.15), rgba(72,149,239,0.15), transparent)',
                    }}
                />
            </div>


            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-3">
                            The Marketplace
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Explore Your <RealityText /> <span className="block mt-2">Store</span>
                        </h2>
                        <p className="mt-4 text-lg text-gray-400">
                            Jumpstart your next big idea. Browse our premium collection of polished templates and fully functional turnkey projects.
                        </p>
                    </div>

                    {/* Tabs / Filters */}
                    <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        {(['All', 'Templates', 'Complete Projects'] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                                    activeTab === tab
                                        ? 'bg-white text-black shadow-lg scale-[1.02]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                        <div key={product.id} className="opacity-0 translate-y-8" style={{ animation: `fade-up 0.5s ease-out ${(index * 0.15)}s forwards` }}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 flex justify-center">
                    <GradientButton href="/store" icon={<HiArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                        View Full Store
                    </GradientButton>
                </div>
            </div>
        </section>
    );
};

export default StorePreview;
