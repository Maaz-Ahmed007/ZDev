import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/ui';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'ZDev | Web Development Agency',
    description:
        'We design and build standout websites, web apps, and templates with modern technologies. Next.js, React, TypeScript specialists.',
    keywords: [
        'web development',
        'Next.js',
        'React',
        'web agency',
        'templates',
        'UI/UX',
    ],
    openGraph: {
        title: 'ZDev | Web Development Agency',
        description: 'Transform ideas into reality with modern web solutions.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} antialiased`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
