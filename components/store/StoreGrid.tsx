// components/store/StoreGrid.tsx
'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { STORE_PRODUCTS, StoreCategory } from '@/lib/storeData';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const CATEGORIES: StoreCategory[] = ['Templates', 'Complete Projects'];

export default function StoreGrid() {
    const [activeCategory, setActiveCategory] = useState<StoreCategory | 'All'>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = useMemo(() => {
        return STORE_PRODUCTS.filter((product) => {
            const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
            const query = searchQuery.toLowerCase();
            const matchesSearch = product.title.toLowerCase().includes(query) || product.tags.some(tag => tag.toLowerCase().includes(query));
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <div className="w-full pb-32">
            {/* Top Bar Filters & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                {/* Categories */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                            activeCategory === 'All'
                                ? 'bg-white text-black shadow-lg scale-[1.02]'
                                : 'text-gray-400 bg-white/5 hover:text-white hover:bg-white/10 border border-white/5'
                        }`}
                    >
                        All Products
                    </button>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 border ${
                                activeCategory === cat
                                    ? 'bg-white text-black border-transparent shadow-lg scale-[1.02]'
                                    : 'text-gray-400 bg-transparent border-white/5 hover:text-white hover:border-white/10'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80 group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <HiMagnifyingGlass className="w-4 h-4 text-gray-500 group-focus-within:text-[var(--brand-violet)] transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search products, tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[var(--brand-violet)] focus:border-[var(--brand-violet)] transition-all drop-shadow-sm"
                    />
                </div>
            </div>

            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                    Showing <span className="text-white font-medium">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'result' : 'results'}
                </p>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredProducts.map((product, index) => (
                        <div 
                            key={product.id} 
                            className="h-full opacity-0 translate-y-8" 
                            style={{ animation: `fade-up 0.5s ease-out ${index * 0.1}s forwards` }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-24 text-center border border-white/5 rounded-3xl bg-white/[0.01]">
                    <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                    <p className="text-gray-500">We couldn't find anything matching your search criteria.</p>
                    <button 
                        onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                        className="mt-6 text-sm text-[var(--brand-violet)] hover:text-white transition-colors underline underline-offset-4"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}
