// app/lets-talk/page.tsx
import Footer from '@/components/ui/Footer';

export default function LetsTalkPage() {
    return (
        <>
            <main className="min-h-screen pt-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-white">
                        Let&apos;s Talk
                    </h1>
                    <p className="text-gray-500 mt-4">
                        Connect with us, share your project details — coming
                        soon.
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}
