import { HiArrowLongLeft } from 'react-icons/hi2';
import { OutlineButton } from '@/components/ui';
import { RealityText } from '@/components/ui';

export default function NotFound() {
    return (
        <main className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 text-center">
            {/* Background elements */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(circle at 50% 40%, rgba(160,120,245,0.06) 0%, transparent 60%)',
                    }}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto mt-[-5vh]">
                {/* Visual 404 */}
                <h1 className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/10 mb-2 select-none">
                    404
                </h1>

                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                    Page Not <RealityText />
                </h2>

                <p className="text-gray-400 text-sm md:text-base mb-10 max-w-md mx-auto">
                    The page you are looking for might have been removed, had
                    its name changed, or is temporarily unavailable.
                </p>

                <OutlineButton
                    href="/"
                    icon={
                        <HiArrowLongLeft className="w-5 h-5 group-hover:text-white transition-colors" />
                    }
                >
                    Back to Homepage
                </OutlineButton>
            </div>
        </main>
    );
}
