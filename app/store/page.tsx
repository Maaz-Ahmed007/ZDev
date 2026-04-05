// app/store/page.tsx
import Footer from '@/components/ui/Footer';
import { RealityText, CursorGlow } from '@/components/ui';
import StoreGrid from '@/components/store/StoreGrid';
import { STORE_KEYFRAMES } from '@/components/store/StoreKeyframes';

export const metadata = {
    title: 'Store | ZDev Templates & Projects',
    description: 'Browse our premium collection of Next.js templates, complete website architectures, and high-conversion UI kits.',
};

export default function StorePage() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: STORE_KEYFRAMES }} />
            <CursorGlow />
            
            <main className="relative min-h-screen pt-32 px-6 overflow-hidden">
                {/* ═══ DESKTOP BACKGROUND ═══ */}
                <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
                    {/* Pulsing Mesh Orbs */}
                    <div
                        className="absolute"
                        style={{
                            top: '5%',
                            left: '55%',
                            width: '900px',
                            height: '600px',
                            background: 'radial-gradient(ellipse, rgba(160,120,245,0.18) 0%, rgba(72,149,239,0.06) 40%, transparent 70%)',
                            animation: 'store-drift-a 20s ease-in-out infinite',
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            top: '40%',
                            left: '-10%',
                            width: '700px',
                            height: '700px',
                            background: 'radial-gradient(circle, rgba(72,149,239,0.12) 0%, rgba(160,120,245,0.04) 45%, transparent 75%)',
                            animation: 'store-drift-b 25s ease-in-out infinite 2s',
                        }}
                    />
                    
                    {/* Floating Geometric Shapes */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute border border-white/10"
                            style={{
                                top: `${20 + i * 15}%`,
                                left: `${10 + (i % 3) * 30}%`,
                                width: `${20 + (i % 3) * 10}px`,
                                height: `${20 + (i % 3) * 10}px`,
                                borderRadius: i % 2 === 0 ? '4px' : '50%',
                                transform: `rotate(${i * 45}deg)`,
                                animation: `store-shape-float ${10 + i * 2}s ease-in-out infinite ${i * 0.5}s`,
                            }}
                        />
                    ))}

                    {/* Animated Cross-Grid */}
                    <div
                        className="absolute inset-x-0 top-0 h-full"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(160,120,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(72,149,239,0.04) 1px, transparent 1px)',
                            backgroundSize: '80px 80px',
                            animation: 'store-line-glow 10s ease-in-out infinite',
                        }}
                    />
                </div>

                {/* ═══ MOBILE BACKGROUND ═══ */}
                <div className="md:hidden absolute inset-0 pointer-events-none" aria-hidden="true">
                    {/* Vertical Gradient Beam */}
                    <div 
                        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-40"
                        style={{
                            background: 'linear-gradient(to bottom, transparent, rgba(160,120,245,0.08), transparent)',
                            animation: 'm-store-beam 6s ease-in-out infinite',
                        }}
                    />
                    {/* Pulsing Dots */}
                    <div 
                        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-(--brand-violet)/10 blur-2xl"
                        style={{ animation: 'm-store-pulse 8s ease-in-out infinite' }}
                    />
                    <div 
                        className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"
                        style={{ animation: 'm-store-pulse 10s ease-in-out infinite 1s' }}
                    />
                    {/* Scaled Floating Shapes */}
                    <div className="absolute top-[15%] right-[10%] w-4 h-4 border border-white/20 rotate-45" style={{ animation: 'store-shape-float 12s infinite' }} />
                    <div className="absolute top-[60%] left-[5%] w-6 h-6 border border-white/10 rounded-full" style={{ animation: 'store-shape-float-alt 15s infinite 2s' }} />
                </div>

                {/* Top Separator Accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Store Hero */}
                    <header className="mb-16 md:mb-24 mt-10 md:mt-16 max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
                            Digital <RealityText /> <br /> Marketplace
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
                            Stop building from scratch. Launch faster with our production-ready templates, full-stack projects, and perfectly scaled UI kits tailored for modern businesses.
                        </p>
                    </header>

                    {/* Interactive Grid & Filters */}
                    <StoreGrid />
                </div>
            </main>
            <Footer />
        </>
    );
}
