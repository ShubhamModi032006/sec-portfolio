"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, CheckCircle2, ChevronRight, Hash } from "lucide-react";

interface Certificate {
    id: number;
    title: string;
    issuer: string;
    date: string;
    image: string;
    link: string;
    // Keeping existing fields to avoid breaking if used elsewhere or if needed for flavor
    rarity?: string;
    level?: string;
    xp?: string;
}

const certificates: Certificate[] = [
    {
        id: 1,
        title: "Meta Backend Developer",
        issuer: "Coursera",
        date: "2024",
        image: "https://placehold.co/600x400/1a1a1a/white?text=Meta+Backend",
        link: "#",
        rarity: "legendary",
        level: "LVL 50",
        xp: "5000 XP"
    },
    {
        id: 2,
        title: "AWS Certified Cloud",
        issuer: "Amazon Web Services",
        date: "2023",
        image: "https://placehold.co/600x400/1a1a1a/gold?text=AWS",
        link: "#",
        rarity: "epic",
        level: "LVL 45",
        xp: "4500 XP"
    },
    {
        id: 3,
        title: "React Advanced Guide",
        issuer: "Meta",
        date: "2024",
        image: "https://placehold.co/600x400/1a1a1a/61DAFB?text=React+Advanced",
        link: "#",
        rarity: "rare",
        level: "LVL 30",
        xp: "3000 XP"
    },
    {
        id: 4,
        title: "Full Stack Development",
        issuer: "Udemy",
        date: "2023",
        image: "https://placehold.co/600x400/1a1a1a/A020F0?text=Full+Stack",
        link: "#",
        rarity: "common",
        level: "LVL 20",
        xp: "2000 XP"
    },
    {
        id: 5,
        title: "Google UX Design",
        issuer: "Google",
        date: "2023",
        image: "https://placehold.co/600x400/1a1a1a/4285F4?text=Google+UX",
        link: "#",
        rarity: "epic",
        level: "LVL 40",
        xp: "4000 XP"
    }
];

export default function Certificates() {
    const [hoveredCert, setHoveredCert] = useState<Certificate>(certificates[0]);

    return (
        <section id="certificates" className="py-24 md:py-32 container mx-auto px-4 relative">
            {/* Header */}
            <div className="flex flex-col items-start mb-16 select-none relative z-10">
                <h2 className="text-5xl md:text-7xl font-display font-bold uppercase leading-none text-white relative">
                    Licenses & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-700">Certifications</span>
                    <span className="block h-1 w-24 bg-neon-main mt-4 shadow-[0_0_20px_rgba(var(--neon-main),0.5)]" />
                </h2>
                <div className="mt-6 flex items-center gap-2 font-mono text-sm text-neon-main">
                    <span className="w-2 h-2 bg-neon-main animate-pulse" />
                    // SYSTEM_LOG: CREDENTIALS_LOADED [{certificates.length}]
                </div>
            </div>

            {/* Desktop: Master-Detail Layout */}
            <div className="hidden md:grid grid-cols-12 gap-10 border-t border-white/10 pt-10">
                {/* Left Column: The List */}
                <div className="col-span-12 lg:col-span-5 flex flex-col">
                    {certificates.map((cert) => {
                        const isActive = hoveredCert.id === cert.id;
                        return (
                            <div
                                key={cert.id}
                                onMouseEnter={() => setHoveredCert(cert)}
                                className={`
                                    relative p-6 cursor-pointer border-b border-white/5 transition-all duration-300 group
                                    ${isActive ? "bg-neon-main/5" : "hover:bg-white/5"}
                                `}
                            >
                                {/* Active Indicator Bar */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-bar"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-neon-main"
                                    />
                                )}

                                <div className="flex justify-between items-center relative z-10">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-3 text-xs font-mono mb-1">
                                            <span className={`${isActive ? "text-neon-main" : "text-neutral-500 group-hover:text-neutral-400"}`}>
                                                {cert.date}
                                            </span>
                                            <span className="text-neutral-700">|</span>
                                            <span className="text-neutral-500 uppercase tracking-wider">{cert.issuer}</span>
                                        </div>
                                        <h3 className={`text-xl font-bold font-display uppercase transition-colors ${isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`}>
                                            {cert.title}
                                        </h3>
                                    </div>

                                    {/* Arrow Icon */}
                                    <ChevronRight
                                        className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-neon-main translate-x-0 opacity-100" : "text-neutral-600 -translate-x-4 opacity-0"}`}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right Column: The Preview */}
                <div className="col-span-12 lg:col-span-7 relative h-[500px] sticky top-24">
                    <div className="w-full h-full relative border border-white/10 bg-black/40 backdrop-blur-md rounded-xl overflow-hidden group">
                        {/* CRT Scanline Overlay */}
                        <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />

                        {/* Corner Decorations */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-neon-main/50 z-30" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-neon-main/50 z-30" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-neon-main/50 z-30" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-neon-main/50 z-30" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={hoveredCert.id}
                                initial={{ opacity: 0, scale: 1.02, filter: "brightness(1.5)" }}
                                animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
                                exit={{ opacity: 0, scale: 0.98, filter: "brightness(0.5)" }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 z-0"
                            >
                                <img
                                    src={hoveredCert.image}
                                    alt={hoveredCert.title}
                                    className="w-full h-full object-cover opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 opacity-90" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Verified Badge Overlay */}
                        <div className="absolute top-8 right-8 z-30 flex items-center gap-2 px-4 py-2 border border-neon-main/30 bg-black/60 backdrop-blur-md rounded-full">
                            <CheckCircle2 className="w-4 h-4 text-neon-main" />
                            <span className="text-xs font-mono font-bold text-neon-main tracking-widest uppercase">Verified</span>
                        </div>

                        {/* Info Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-8 z-30">
                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                                <Hash className="w-3 h-3" />
                                <span>ID: CERT_00{hoveredCert.id}</span>
                            </div>
                            <h2 className="text-4xl font-display font-bold text-white uppercase mb-2">
                                {hoveredCert.title}
                            </h2>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Date</span>
                                        <span className="text-sm font-mono text-neutral-300">{hoveredCert.date}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Issuer</span>
                                        <span className="text-sm font-mono text-neon-main">{hoveredCert.issuer}</span>
                                    </div>
                                </div>

                                <a
                                    href={hoveredCert.link}
                                    className="p-3 bg-white text-black rounded-full hover:bg-neon-main transition-colors"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile: Vertical Stack (Standard Cards) */}
            <div className="flex md:hidden flex-col gap-6">
                {certificates.map((cert) => (
                    <div key={cert.id} className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
                        <div className="relative h-48">
                            <img src={cert.image} alt={cert.title} className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 bg-black/50" />
                            <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm border border-neon-main/30 rounded text-xs font-mono text-neon-main flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> VERIFIED
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex gap-2 text-xs font-mono text-neutral-500 mb-2">
                                <span>{cert.date}</span>
                                <span>•</span>
                                <span>{cert.issuer}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase mb-4">{cert.title}</h3>
                            <a href={cert.link} className="inline-flex items-center gap-2 text-sm text-white hover:text-neon-main transition-colors">
                                View Certificate <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
