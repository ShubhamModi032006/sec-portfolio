import type { Metadata } from 'next';
import { Inter, Syne, Oswald } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import JsonLd from '@/components/seo/JsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: {
    default: 'Shubham Modi | Full Stack Developer & MERN Expert',
    template: '%s | Shubham Modi'
  },
  description: 'Shubham Modi is a Full Stack Developer based in India, specializing in MERN stack, Next.js, and C++ for scalable web applications.',
  keywords: ['Shubham Modi', 'Full Stack Developer', 'MERN Stack', 'React Developer', 'Next.js Portfolio', 'Freelance Web Developer India'],
  authors: [{ name: 'Shubham Modi', url: 'https://shubhammodi.netlify.app' }],
  creator: 'Shubham Modi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shubhammodi.netlify.app',
    title: 'Shubham Modi | Full Stack Developer & MERN Expert',
    description: 'Shubham Modi is a Full Stack Developer based in India, specializing in MERN stack, Next.js, and C++ for scalable web applications.',
    siteName: 'Shubham Modi Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shubham Modi Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubham Modi | Full Stack Developer & MERN Expert',
    description: 'Shubham Modi is a Full Stack Developer based in India, specializing in MERN stack, Next.js, and C++ for scalable web applications.',
    images: ['/og-image.jpg'],
    creator: '@shubham_modi_cg'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} ${oswald.variable} bg-background text-foreground antialiased overflow-x-hidden`}>
        <JsonLd />
        {/* Global Texture */}
        <div className="grain-overlay" />

        {/* Interactive Elements */}
        <CustomCursor />
        <Navbar />
        <SmoothScroll />

        {/* Main Content */}
        <main className="relative z-10 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
