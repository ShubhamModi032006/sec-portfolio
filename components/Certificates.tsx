"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useRef, useEffect, memo } from "react";
import { ExternalLink, CheckCircle2, ChevronRight, Hash } from "lucide-react";
import Image from "next/image";

interface Certificate {
    id: number;
    title: string;
    issuer: string;
    date: string;
    image: string;
    link: string;
    id_code?: string;
    type?: string;
}

const certificates: Certificate[] = [
    // --- HIGH PRIORITY (Intermediate / Specialized) ---
    {
        id: 1,
        title: "Node.js (Intermediate)",
        issuer: "HackerRank",
        date: "2025",
        image: "/nodejs_intermediate_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/61af0bdbf806",
        id_code: "NODE_INT_01",
        type: "backend"
    },
    {
        id: 2,
        title: "Rest API (Intermediate)",
        issuer: "HackerRank",
        date: "2025",
        image: "/rest_api_intermediate_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/c45504a6100c",
        id_code: "REST_INT_02",
        type: "backend"
    },
    {
        id: 3,
        title: "JavaScript (Intermediate)",
        issuer: "HackerRank",
        date: "2025",
        image: "/javascript_intermediate_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/ed715b831fbf",
        id_code: "ED7158831FBF",
        type: "code"
    },
    {
        id: 4,
        title: "Problem Solving (Intermediate)",
        issuer: "HackerRank",
        date: "2025",
        image: "/problem_solving_intermediate_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/9f915b23d21b",
        id_code: "PS_INT_04",
        type: "algo"
    },
    {
        id: 5,
        title: "GitHub Copilot Fundamentals",
        issuer: "Microsoft / Simplilearn",
        date: "May 2025",
        image: "/github_page-0001.jpg",
        link: "https://simpli-web.app.link/e/j41OGmlBGZb",
        id_code: "8363721",
        type: "ai"
    },
    {
        id: 6,
        title: "Amazon DocumentDB",
        issuer: "AWS / Simplilearn",
        date: "May 2025",
        image: "/Amazon_documentDB_page-0001.jpg",
        link: "https://simpli-web.app.link/e/45TjJYuBGZb",
        id_code: "8365040",
        type: "cloud"
    },
    {
        id: 7,
        title: "Intro to Azure Services",
        issuer: "Simplilearn",
        date: "May 2025",
        image: "/Basic_Azure_services_page-0001.jpg",
        link: "#",
        id_code: "8381989",
        type: "cloud"
    },

    // --- MEDIUM PRIORITY (Basic Skills) ---
    {
        id: 8,
        title: "React (Basic)",
        issuer: "HackerRank",
        date: "2025",
        image: "/react_basic_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/be86f7642999",
        id_code: "REACT_bas_08",
        type: "frontend"
    },
    {
        id: 9,
        title: "SQL (Basic)",
        issuer: "HackerRank",
        date: "2025",
        image: "/sql_basic_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/6f817e93f1c3",
        id_code: "6F817E93F1C3",
        type: "database"
    },

    // --- BASE PRIORITY ---
    {
        id: 10,
        title: "Problem Solving (Basic)",
        issuer: "HackerRank",
        date: "May 2025",
        image: "/problem_solving_basic_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/66be564aa173",
        id_code: "66BE564AA173",
        type: "algo"
    },
    {
        id: 11,
        title: "CSS (Basic)",
        issuer: "HackerRank",
        date: "May 2025",
        image: "/css_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/907dd2eac522",
        id_code: "907DD2EAC522",
        type: "frontend"
    }
];

const CertificateItem = memo(function CertificateItem({ cert, isActive, onHover }: { cert: Certificate, isActive: boolean, onHover: (c: Certificate) => void }) {
    return (
        <div
            onMouseEnter={() => onHover(cert)}
            className={`
            relative h-[100px] p-4 lg:p-6 cursor-pointer border-b border-white/5 transition-all duration-300 group flex items-center
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

            <div className="flex justify-between items-center w-full relative z-10">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 text-xs font-mono mb-1">
                        <span className={`${isActive ? "text-neon-main" : "text-neutral-500 group-hover:text-neutral-400"}`}>
                            {cert.date}
                        </span>
                        <span className="text-neutral-700">|</span>
                        <span className="text-neutral-500 uppercase tracking-wider">{cert.issuer}</span>
                    </div>
                    <h3 className={`text-lg font-bold font-display uppercase transition-colors ${isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`}>
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
});

export default function Certificates() {
    const [hoveredCert, setHoveredCert] = useState<Certificate>(certificates[0]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress within the component's range
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Determine total scroll distance based on number of hidden items
    // Showing 5 items (approx 500px), Total 11 items.
    // We need to scroll roughly 55-60% of the list height to reach the end.
    // UseTransform maps 0-1 (container scroll) to Y translation of the list.
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    return (
        <section ref={containerRef} id="certifications" className="relative md:h-[300vh] bg-black">
            {/* Sticky Container for Desktop */}
            <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col justify-center">
                <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24 lg:pt-24 lg:pb-0">

                    {/* Header */}
                    <div className="flex flex-col items-start mb-6 sm:mb-8 md:mb-16 select-none relative z-10">
                        <h2 className="text-[clamp(2.2rem,6vw,10rem)] font-display font-bold uppercase leading-none text-white relative break-words w-full">
                            &<span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-700">Certifications</span>
                            <span className="block h-1 w-16 sm:w-20 md:w-24 bg-neon-main mt-2 sm:mt-3 md:mt-4 shadow-[0_0_20px_rgba(var(--neon-main),0.5)]" />
                        </h2>
                        <div className="mt-4 sm:mt-6 flex items-center gap-2 font-mono text-xs sm:text-sm text-neon-main">
                            <span className="w-2 h-2 bg-neon-main animate-pulse" />
                            // SYSTEM_LOG: CREDENTIALS_LOADED [{certificates.length}]
                        </div>
                    </div>

                    {/* Desktop: Master-Detail Layout (Visible only on LG+) */}
                    <div className="hidden lg:grid grid-cols-12 gap-6 lg:gap-10 border-t border-white/10 pt-6 lg:pt-10">
                        {/* Left Column: The List - Sticky Logic Controlled by Parent Scroll */}
                        <div className="col-span-12 lg:col-span-5 h-[400px] lg:h-[500px] overflow-hidden relative border-r border-white/5 pr-4">
                            {/* Gradient Masks for smooth fade in/out perception */}
                            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

                            <motion.div style={{ y }} className="flex flex-col">
                                {certificates.map((cert) => (
                                    <CertificateItem
                                        key={cert.id}
                                        cert={cert}
                                        isActive={hoveredCert.id === cert.id}
                                        onHover={setHoveredCert}
                                    />
                                ))}
                            </motion.div>
                        </div>

                        {/* Right Column: The Preview */}
                        <div className="col-span-12 lg:col-span-7 relative h-[350px] lg:h-[450px]">
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
                                        <Image
                                            src={hoveredCert.image}
                                            alt={hoveredCert.title}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 60vw"
                                            className="w-full h-full object-cover opacity-80"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 opacity-90" />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Verified Badge Overlay */}
                                <div className="absolute top-8 right-8 z-30 flex items-center gap-2 px-4 py-2 border border-neon-main/30 bg-black/60 backdrop-blur-md rounded-full">
                                    <CheckCircle2 className="w-4 h-4 text-neon-main" />
                                    <span className="text-xs font-mono font-bold text-neon-main tracking-widest uppercase">Verified</span>
                                </div>

                                {/* Info Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8 z-30 bg-gradient-to-t from-black/90 to-transparent">
                                    <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-neutral-400 mb-2">
                                        <Hash className="w-3 h-3" />
                                        <span>ID: {hoveredCert.id_code || `CERT_00${hoveredCert.id}`}</span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white uppercase mb-3 sm:mb-4 max-w-lg leading-tight drop-shadow-lg">
                                        {hoveredCert.title}
                                    </h2>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-12">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Issued On</span>
                                                <span className="text-xs sm:text-sm font-mono text-neutral-300 bg-white/5 px-2 py-1 rounded border border-white/5">{hoveredCert.date}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Issuer Authority</span>
                                                <span className="text-xs sm:text-sm font-mono text-neon-main decoration-neon-main/50 underline underline-offset-4">{hoveredCert.issuer}</span>
                                            </div>
                                        </div>

                                        {hoveredCert.link && hoveredCert.link !== "#" && (
                                            <a
                                                href={hoveredCert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`View ${hoveredCert.title} Certificate`}
                                                className="p-2 sm:p-3 bg-white text-black rounded-full hover:bg-neon-main transition-colors group/link flex-shrink-0"
                                            >
                                                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover/link:rotate-45 transition-transform duration-300" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile & Tablet: Vertical Grid - Up to LG */}
                    <div className="grid grid-cols-1 gap-4 lg:hidden">
                        {certificates.map((cert) => (
                            <div key={cert.id} className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden flex flex-col">
                                <div className="relative h-64 md:h-[500px] w-full">
                                    <Image
                                        src={cert.image}
                                        alt={cert.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                                    <div className="absolute bottom-2 left-4">
                                        <span className="bg-neon-main text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">Verified</span>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col gap-2">
                                    <h3 className="text-xl font-bold text-white leading-tight font-display uppercase">{cert.title}</h3>
                                    <div className="flex justify-between items-center text-xs text-neutral-500 font-mono">
                                        <span className="text-neon-main">{cert.issuer}</span>
                                        <span>{cert.date}</span>
                                    </div>
                                    {cert.link && cert.link !== "#" && (
                                        <a href={cert.link} target="_blank" aria-label={`View ${cert.title}`} className="mt-2 inline-flex items-center gap-2 text-sm text-white hover:text-neon-main transition-colors">
                                            View Credential <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
