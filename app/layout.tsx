import type { Metadata } from 'next';
import { Inter, Syne, Oswald } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { DotCursor } from '@/app/_components/DotCursor';
import LenisProvider from '@/components/LenisProvider';
import MotionProvider from '@/components/MotionProvider';
import Schema from '@/components/seo/Schema';
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google';



const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

const DOMAIN_URL = "https://shubhammodi.me";

const SITE_CONFIG = {
  title: "Shubham Modi - Full-Stack Developer Portfolio | MERN Stack",
  description: "Portfolio of Shubham Modi, a full-stack developer specializing in the MERN stack (MongoDB, Express, React, Node.js), Next.js, and scaling web applications.currently studying at codinggita.",
  url: DOMAIN_URL,
  siteName: "Shubham Modi",
  keywords: [
    "Shubham Modi",
    "shubhammodi",
    "shubham modi",
    "codinggita",
    "Full-Stack Developer",
    "MERN Stack",
    "Next.js",
    "React",
    "Node.js",
    "MongoDB",
    "JavaScript",
    "India",
    "Freelance Developer",
    "Software Engineer",
    "Web Development",
    "UI/UX Design",
    "Frontend Developer",
    "Backend Developer",
    "React Developer India",
    "Next.js Expert",
    "Scalable Web Apps",
    "C++",
    "System Design"
  ],
  ogImage: "/shubham.jpg",
  logo: "/favicon.ico",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.siteName}`
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.siteName, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.siteName,
  // alternates: {
  //   canonical: SITE_CONFIG.url,
  // },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.siteName,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
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
  icons: {
    icon: SITE_CONFIG.logo,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://github-contributions-api.jogruber.de" />
      </head>
      <body className={`${inter.variable} ${syne.variable} ${oswald.variable} bg-background text-foreground antialiased overflow-x-hidden`} suppressHydrationWarning>
        <LenisProvider>
          <MotionProvider>
            <Schema />
            {/* Global Texture */}
            <div className="grain-overlay" />

            {/* Interactive Elements */}
            <DotCursor />
            <Navbar />

            {/* Main Content */}
            <main className="relative z-10 w-full">
              {children}
            </main>

            <Analytics />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />

          </MotionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
