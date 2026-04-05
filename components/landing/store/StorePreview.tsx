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
            <div className="max-w-7xl mx-auto">
                
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
