// components/store/ProductCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { HiOutlineEye, HiOutlineShoppingCart } from 'react-icons/hi2';
import { ProductType } from '@/lib/storeData';

interface ProductCardProps {
    product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="group relative flex flex-col rounded-2xl bg-[#0a0a0c] border border-white/5 transition-all duration-500 hover:border-white/10 hover:bg-[#0c0c0f] h-full">
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-[#111115]">
                {/* Placeholder Image Block */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 bg-gradient-to-br from-white/5 to-transparent">
                     <span className="text-white/20 text-xs tracking-widest uppercase">{product.image}</span>
                </div>

                {/* Subdued overlay for image */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                {/* Badges */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
                    {product.isNew && (
                        <span className="w-fit rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                            New Release
                        </span>
                    )}
                    {product.featured && (
                        <span className="w-fit rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-500">
                            Featured
                        </span>
                    )}
                </div>

                {/* Hover Quick Actions */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 bg-gradient-to-t from-black/80 to-transparent">
                    <Link href={`/store/${product.id}`} className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20">
                        <HiOutlineEye className="h-4 w-4" />
                        Preview
                    </Link>
                    <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-gray-200">
                        <HiOutlineShoppingCart className="h-4 w-4" />
                        Buy
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <Link href={`/store/${product.id}`} className="inline-block group-hover:text-gray-200 text-xl font-bold tracking-tight text-white transition-colors">
                            {product.title}
                        </Link>
                        <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                            {product.description}
                        </p>
                    </div>
                    <div className="flex flex-col items-end text-right shrink-0">
                        <span className="text-lg font-bold text-white">${product.price}</span>
                        {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">
                                ${product.originalPrice}
                            </span>
                        )}
                    </div>
                </div>

                {/* Tags */}
                <div className="mt-auto pt-6 flex flex-wrap items-center gap-2">
                    {product.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-md border border-white/5 bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-gray-400 transition-colors group-hover:border-white/10 group-hover:text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                    {product.tags.length > 3 && (
                        <span className="text-[11px] font-medium text-gray-500">
                            +{product.tags.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
