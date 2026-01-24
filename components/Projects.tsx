"use client"
import { m, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, memo } from "react";
import { ArrowUpRight, Github, ExternalLink, Youtube, X, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "FinCtrl",
        category: "Web",
        image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1741248835/hudrwpm8ah1hnlfo0ahm.png",
        link: "https://fin-ctrl-frontend-1.onrender.com",
        github: "https://github.com/shubhamiscodding/Fin_Ctrl",
        description: "A comprehensive financial management system that helps you track expenses, manage budgets, and analyze spending patterns effectively.",
        technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind"],
        demoVideo: "https://res.cloudinary.com/dqhn4dq02/video/upload/v1740999850/p5ditex5ags07kvajspz.mp4",
    },
    {
        id: 2,
        title: "Fast-Typing Generator",
        category: "Web",
        image: "https://placehold.co/600x400/E9F0E6/333?text=Fast+Typing",
        link: "https://gemini-type.vercel.app/",
        github: "https://github.com/ShubhamModi032006/Gemini-type",
        description: "Generates text with a fast-typing effect using the Gemini API.",
        technologies: ["Gemini API", "Next.js"],
    },
    {
        id: 3,
        title: "Local File Uploader",
        category: "Web",
        image: "https://placehold.co/600x400/E9F0E6/333?text=Multer+Storage",
        link: "#",
        github: "#",
        description: "Backend project for local file storage using Node.js and Multer.",
        technologies: ["Node.js", "Multer", "React JSX", "Express", "MongoDB", "JWT"],
    },
    {
        id: 4,
        title: "Progcap Clone",
        category: "Web",
        image: "https://cdn.prod.website-files.com/6193782af8f15b5c5763d1de/619b51335bf284cd78d1b5e1_Progcap_Logo.svg",
        link: "https://progcap-clone.onrender.com",
        github: "https://github.com/shubhamiscodding/progcap-clone",
        description: "A pixel-perfect clone of the Progcap platform, showcasing advanced React implementation and responsive design techniques.",
        technologies: ["React", "CSS", "JavaScript"],
    },
    {
        id: 5,
        title: "Apollo Clone",
        category: "Web",
        image: "https://images.apollo247.in/images/pharmacy_logo.svg?tr=q-70,w-100,dpr-2,c-at_max",
        link: "https://apolloclone.onrender.com",
        github: "https://github.com/shubhamiscodding/apolloclone",
        description: "A faithful recreation of the Apollo healthcare platform interface.",
        technologies: ["HTML", "CSS"],
    },
    {
        id: 6,
        title: "Youtube Clone",
        category: "Web",
        image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-104-432560.png?f=webp&w=512",
        link: "https://youtube-frontend-ch16.onrender.com",
        github: "https://github.com/shubhamiscodding/spotify-with-react/tree/main/you-vite-react",
        description: "A feature-rich YouTube clone that implements core functionalities using React and external APIs.",
        technologies: ["React", "API Integration"],
    },
    {
        id: 7,
        title: "Finctrl Prototype",
        category: "Figma",
        image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1741248835/hudrwpm8ah1hnlfo0ahm.png",
        link: "https://www.figma.com/proto/DNBtQzukvRqvlJOR15WNiD/FINAL-PROJECT?node-id=165-316&t=IJSgkeDiJ1yPqsuJ-1",
        description: "A sleek Figma prototype for a financial management tool with a simple and intuitive UI.",
        technologies: ["Figma", "UI Design"],
    },
    {
        id: 8,
        title: "Smellwell",
        category: "Figma",
        image: "https://placehold.co/600x400/E9F0E6/333?text=SmellWell",
        link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?page-id=218%3A73&node-id=227-440&viewport=588%2C159%2C0.11&t=IH2rnykLPCUofh1R-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=227%3A440",
        description: "A fragrance brand landing page design, featuring advanced prototyping.",
        technologies: ["Figma", "Prototyping"],
    },
    {
        id: 9,
        title: "Cricknews",
        category: "Figma",
        image: "https://wallpapercave.com/wp/wp6916613.jpg",
        link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?node-id=90-400&t=uwCXGdlQ3AxLspQy-1",
        description: "A Figma prototype for a cricket news platform with interactive elements.",
        technologies: ["Figma", "Interaction"],
    },
    {
        id: 10,
        title: "Instagram Prototype",
        category: "Figma",
        image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1745691177/czc457xnddhzuvobj8xt.jpg",
        link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?node-id=43-87&t=uwCXGdlQ3AxLspQy-1",
        description: "A Figma recreation of Instagram's interface with prototyping features.",
        technologies: ["Figma", "Clone"],
    },
    {
        id: 11,
        title: "Social Media One-Page",
        category: "Figma",
        image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1740113499/hinsjwtehr2aoxyj0f0s.png",
        link: "https://www.figma.com/proto/1rN6JDvA6MVeTwyABaoaHO/EXAM-BUT-UNIQE-IDEA?page-id=0%3A1&node-id=2-2&p=f&viewport=500%2C484%2C0.63&t=YXlQOTdePAZgLyKv-1&scaling=min-zoom&content-scaling=fixed",
        description: "A unique one-page social media design created in Figma with a creative layout.",
        technologies: ["Figma", "Layout"],
    }
];

const ActionButton = ({ icon: Icon, label, href, onClick }: { icon: any, label: string, href?: string, onClick?: () => void }) => {
    if (href) {
        return (
            <Link
                href={href}
                target="_blank"
                aria-label={label}
                className="group/btn relative flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-black rounded-full overflow-hidden transition-all duration-300 w-10 h-10 hover:w-auto hover:px-4 backdrop-blur-md"
            >
                <div className="flex items-center gap-2 whitespace-nowrap">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="w-0 overflow-hidden group-hover/btn:w-auto transition-all duration-300 font-medium text-xs opacity-0 group-hover/btn:opacity-100">
                        {label}
                    </span>
                </div>
            </Link>
        );
    }

    return (
        <m.button
            onClick={onClick}
            aria-label={label}
            className="group/btn relative flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-black rounded-full overflow-hidden transition-all duration-300 w-10 h-10 hover:w-auto hover:px-4 backdrop-blur-md"
        >
            <div className="flex items-center gap-2 whitespace-nowrap">
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="w-0 overflow-hidden group-hover/btn:w-auto transition-all duration-300 font-medium text-xs opacity-0 group-hover/btn:opacity-100">
                    {label}
                </span>
            </div>
        </m.button>
    );
};

const ProjectCard = memo(function ProjectCard({ project, onVideoClick }: { project: typeof projects[0], onVideoClick: (url: string) => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const [rect, setRect] = useState<DOMRect | null>(null);

    function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
        if (!rect) return;
        const { left, top, width, height } = rect;
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        setIsHovered(false);
        setIsMuted(true);
        setRect(null);
    }

    function handleMouseEnter(e: React.MouseEvent) {
        setIsHovered(true);
        setRect(e.currentTarget.getBoundingClientRect());
    }

    // Handle Video Playback Speed
    useEffect(() => {
        if (videoRef.current && isHovered) {
            videoRef.current.playbackRate = 2.0;
        }
    }, [isHovered]);

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    return (
        <m.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                willChange: "transform"
            }}
            className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] bg-neutral-900 border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden group cursor-none"
        >
            <div
                style={{ transform: "translateZ(0px)" }}
                className="absolute inset-0 bg-neutral-800 transition-colors z-0 overflow-hidden"
            >
                {/* Background Image - static, darkens on hover */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-60 group-hover:opacity-40">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-fill object-center grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                        unoptimized
                    />
                </div>

                {/* Demo Video Preview Layer */}
                <AnimatePresence>
                    {project.demoVideo && isHovered && (
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 z-10"
                        >
                            <video
                                ref={videoRef}
                                src={project.demoVideo}
                                muted={isMuted}
                                autoPlay
                                loop
                                playsInline
                                className="w-full h-full object-cover grayscale-[0.2]"
                            />
                        </m.div>
                    )}
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent opacity-80 z-20" />
            </div>

            <div style={{ transform: "translateZ(50px)" }} className="relative z-30 h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start pointer-events-auto flex-wrap gap-2">
                    <span className="px-2 sm:px-3 py-1 rounded-full border border-white/10 text-[10px] sm:text-xs font-mono bg-black/40 backdrop-blur-md text-white/80">{project.category}</span>
                    <div className="flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-wrap">
                        {project.demoVideo && (
                            <>
                                <ActionButton
                                    icon={isMuted ? VolumeX : Volume2}
                                    label={isMuted ? "Unmute" : "Mute"}
                                    onClick={() => setIsMuted(!isMuted)}
                                />
                                <ActionButton icon={Youtube} label="Watch Full" onClick={() => onVideoClick(project.demoVideo!)} />
                            </>
                        )}
                        {project.github && project.github !== "#" && (
                            <ActionButton icon={Github} label="Code" href={project.github} />
                        )}
                        <ActionButton icon={ArrowUpRight} label="Visit" href={project.link} />
                    </div>
                </div>

                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase mb-2 sm:mb-4 text-white drop-shadow-lg">{project.title}</h3>
                    <p className="text-neutral-300 text-xs sm:text-sm md:text-base line-clamp-2 mb-2 sm:mb-4 max-w-md bg-black/50 p-2 rounded-lg backdrop-blur-sm border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        {project.technologies.map((tech, i) => (
                            <span key={i} className="text-[10px] sm:text-xs uppercase tracking-wider text-neon-main font-bold shadow-black drop-shadow-md">
                                #{tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </m.div>
    )
})

export default function Projects() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <section id="projects" className="py-16 sm:py-24 md:py-32 container mx-auto px-4 md:px-8 lg:px-12 z-10 relative">
            <div className="mb-10 sm:mb-12 md:mb-16">
                <m.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-[clamp(2.5rem,5.1vw,10rem)] leading-[0.8] font-display font-black uppercase mb-4 sm:mb-6 break-words w-full"
                >
                    Selected<span className="text-neon-main">.</span>Works
                </m.h2>
                <div className="h-1 w-16 sm:w-20 bg-neon-main mb-4 sm:mb-6" />
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-neon-main mb-4 opacity-80">
                    <span className="w-2 h-2 bg-neon-main animate-pulse" />
                   // SYSTEM_LOG: PROJECT_ARCHIVE_RETRIEVED [{projects.length}]
                </div>
                <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-xl font-light">
                    A collection of digital products, websites, and experiences built with modern technologies.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} onVideoClick={setSelectedVideo} />
                ))}
            </div>

            <AnimatePresence>
                {selectedVideo && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedVideo(null)}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-20"
                    >
                        <button aria-label="Close Video" className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors">
                            <X className="w-10 h-10" />
                        </button>
                        <m.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                        >
                            <video
                                src={selectedVideo}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                            />
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </section>
    )
}
