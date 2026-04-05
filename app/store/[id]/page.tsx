'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { HiOutlineArrowLeft, HiOutlineCheck, HiArrowTopRightOnSquare, HiOutlineShoppingCart } from 'react-icons/hi2';
import { STORE_PRODUCTS } from '@/lib/storeData';
import { RealityText, CursorGlow, Footer, GradientButton } from '@/components/ui';
import { STORE_KEYFRAMES } from '@/components/store/StoreKeyframes';
import ProductCard from '@/components/store/ProductCard';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const product = STORE_PRODUCTS.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    const relatedProducts = STORE_PRODUCTS
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: STORE_KEYFRAMES }} />
            <CursorGlow />
            
            <main className="relative min-h-screen pt-32 px-6 overflow-hidden">
                {/* ═══ BACKGROUND ═══ */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div
                        className="absolute"
                        style={{
                            top: '-10%',
                            left: '50%',
                            width: '1200px',
                            height: '800px',
                            marginLeft: '-600px',
                            background: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(160,120,245,0.15) 0%, rgba(72,149,239,0.06) 35%, transparent 65%)',
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(160,120,245,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(72,149,239,0.03) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                            animation: 'store-line-glow 8s ease-in-out infinite',
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Navigation */}
                    <div className="mb-12 flex items-center gap-4">
                        <Link 
                            href="/store" 
                            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
                        >
                            <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Store
                        </Link>
                        <span className="text-gray-600">/</span>
                        <span className="text-sm text-gray-500">{product.category}</span>
                    </div>

                    {/* Hero Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                        {/* Left: Preview */}
                        <div className="lg:col-span-7">
                            <div className="relative aspect-16/10 rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0c] group">
                                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-white/5 to-transparent opacity-40">
                                    <span className="text-white/20 text-sm tracking-[0.2em] uppercase font-bold">
                                        {product.title} Preview
                                    </span>
                                </div>
                                {product.isNew && (
                                    <div className="absolute top-6 left-6 z-20">
                                        <span className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-2xl">
                                            New Release
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Screenshot Thumbnails (simplified) */}
                            <div className="grid grid-cols-4 gap-4 mt-6">
                                {product.screenshots.map((s, i) => (
                                    <div 
                                        key={i} 
                                        className="aspect-4/3 rounded-xl border border-white/5 bg-white/2 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <div className="w-1/2 h-1/2 bg-white/5 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Info */}
                        <div className="lg:col-span-5 flex flex-col pt-4">
                            <div className="mb-8">
                                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                                    {product.title}
                                </h1>
                                <p className="text-xl text-gray-400 leading-relaxed font-medium">
                                    {product.description}
                                </p>
                            </div>

                            <div className="flex items-baseline gap-4 mb-10">
                                <span className="text-4xl font-bold text-white">${product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                                )}
                                <div className="ml-auto">
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        {product.license} License
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 mb-12">
                                <GradientButton href="#" icon={<HiOutlineShoppingCart className="w-5 h-5" />}>
                                    Purchase Template
                                </GradientButton>
                                {product.livePreviewUrl && (
                                    <Link 
                                        href={product.livePreviewUrl} 
                                        target="_blank"
                                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-all group"
                                    >
                                        <HiArrowTopRightOnSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Live Preview
                                    </Link>
                                )}
                            </div>

                            {/* Quick Highlights */}
                            <div className="space-y-4">
                                {product.highlights.slice(0, 3).map((h, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/2 border border-white/5">
                                        <span className="text-2xl">{h.icon}</span>
                                        <div>
                                            <h4 className="text-sm font-bold text-white mb-0.5">{h.title}</h4>
                                            <p className="text-xs text-gray-500 leading-tight">{h.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Detailed Content Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
                        {/* Long Description */}
                        <div className="lg:col-span-8">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-8 h-px bg-white/10" />
                                Deep Dive
                            </h2>
                            <div className="prose prose-invert max-w-none">
                                {product.longDescription.split('\n\n').map((para, i) => (
                                    <p key={i} className="text-lg text-gray-400 leading-relaxed mb-6">
                                        {para}
                                    </p>
                                ))}
                            </div>

                            {/* Tech Stack Grid */}
                            <div className="mt-16">
                                <h3 className="text-lg font-bold text-white mb-8">Built With Best Practices</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {product.techStack.map((tech, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/1 border border-white/3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-(--brand-violet)" />
                                            <span className="text-sm font-medium text-gray-300">{tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Side Sidebar: All Features */}
                        <div className="lg:col-span-4">
                             <div className="sticky top-32 p-8 rounded-3xl border border-white/10 bg-[#0a0a0c] shadow-2xl overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                                
                                <h3 className="text-xl font-bold text-white mb-8">What's Included?</h3>
                                <ul className="space-y-6">
                                    {product.highlights.map((h, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                                <HiOutlineCheck className="w-3.5 h-3.5 text-emerald-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white mb-1">{h.title}</h4>
                                                <p className="text-xs text-gray-500 leading-normal">{h.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-10 pt-10 border-t border-white/5">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Support</span>
                                        <span className="text-xs font-bold text-emerald-500 px-2 py-0.5 rounded bg-emerald-500/10">Active</span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        Every purchase includes lifetime updates and dedicated support via our discord community.
                                    </p>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mb-32">
                            <div className="flex items-end justify-between mb-12">
                                <div>
                                    <h2 className="text-3xl font-black text-white tracking-tight">You May Also Like</h2>
                                    <p className="text-gray-500 mt-2">More premium results from the {product.category} collection.</p>
                                </div>
                                <Link href="/store" className="text-sm font-bold text-(--brand-violet) hover:brightness-125 transition-all">
                                    View Marketplace →
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedProducts.map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
