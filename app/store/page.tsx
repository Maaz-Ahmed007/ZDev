// app/store/page.tsx
import Footer from '@/components/ui/Footer';

export default function StorePage() {
    return (
        <>
            <main className="min-h-screen pt-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-white">Store</h1>
                    <p className="text-gray-500 mt-4">
                        Templates, projects & more — coming soon.
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}
