import Hero from '@/components/landing/Hero';
import Footer from '@/components/ui/Footer';
import { CursorGlow } from '@/components/ui';

export default function LandingPage() {
    return (
        <>
            <CursorGlow />
            <main>
                <Hero />
            </main>
            <Footer />
        </>
    );
}
