'use client';

import { useEffect } from 'react';
import {
    HiOutlineExclamationTriangle,
    HiArrowPath,
    HiHome,
} from 'react-icons/hi2';
import { OutlineButton } from '@/components/ui';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service if needed
        console.error(error);
    }, [error]);

    return (
        <main className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 text-center">
            {/* Background glowing effect for error context */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background:
                            'radial-gradient(ellipse at 50% 40%, rgba(239,68,68,0.15) 0%, transparent 60%)', // red tint
                    }}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                    <HiOutlineExclamationTriangle className="w-10 h-10 text-red-400" />
                </div>

                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                    Something went wrong!
                </h2>

                <p className="text-gray-400 text-sm md:text-base mb-10">
                    An unexpected error has occurred while trying to process
                    your request. We've been notified and are looking into it.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <button
                        onClick={() => reset()}
                        className="group relative inline-flex items-center justify-center rounded-full font-semibold overflow-hidden px-6 py-3 text-sm gap-2.5 transition-transform active:scale-95"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 transition-colors" />
                        <span className="relative z-10 text-white inline-flex items-center gap-2">
                            <HiArrowPath className="w-4 h-4" />
                            Try again
                        </span>
                    </button>

                    <OutlineButton
                        href="/"
                        icon={<HiHome className="w-4 h-4" />}
                    >
                        Return Home
                    </OutlineButton>
                </div>
            </div>
        </main>
    );
}
