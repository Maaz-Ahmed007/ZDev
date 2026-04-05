import Hero from '@/components/landing/Hero';
import StorePreview from '@/components/landing/store/StorePreview';
import Footer from '@/components/ui/Footer';
import { CursorGlow } from '@/components/ui';

export default function LandingPage() {
    return (
        <>
            <CursorGlow />
            <main>
                <Hero />
                <StorePreview />
            </main>
            <Footer />
        </>
    );
}
