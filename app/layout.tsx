import type { Metadata } from 'next';
import { Inter, Syne, Oswald } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: 'Portfolio | Full Stack Developer',
  description: 'Creative Developer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} ${oswald.variable} bg-background text-foreground antialiased overflow-x-hidden`}>
        {/* Global Texture */}
        <div className="grain-overlay" />
        
        {/* Interactive Elements */}
        <CustomCursor />
        <Navbar />
        <SmoothScroll />
        
        {/* Main Content */}
        <main className="relative z-10 w-full overflow-hidden">
            {children}
        </main>
      </body>
    </html>
  );
}
