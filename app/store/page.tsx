// app/store/page.tsx
import Footer from '@/components/ui/Footer';
import { RealityText, CursorGlow } from '@/components/ui';
import StoreGrid from '@/components/store/StoreGrid';

export const metadata = {
    title: 'Store | ZDev Templates & Projects',
    description: 'Browse our premium collection of Next.js templates, complete website architectures, and high-conversion UI kits.',
};

export default function StorePage() {
    return (
        <>
            <CursorGlow />
            <main className="min-h-screen pt-32 px-6">
                <div className="max-w-7xl mx-auto">
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
