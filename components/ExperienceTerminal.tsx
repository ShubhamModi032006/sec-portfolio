// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Terminal, Briefcase, GraduationCap, ChevronRight, Cpu } from "lucide-react";

// interface Item {
//     id: number;
//     year: string;
//     title: string;
//     company: string;
//     details: string[];
// }

// const workHistory: Item[] = [
//     {
//         id: 1,
//         year: "2024-Present",
//         title: "Freelance Full Stack Dev",
//         company: "Self-Employed",
//         details: ["Building SaaS tools", "Next.js & MERN Stack", "Performance Optimization"]
//     },
//     {
//         id: 2,
//         year: "2023",
//         title: "Web Development Intern",
//         company: "Tech Solutions Inc.",
//         details: ["Frontend implementation", "React Component Library", "Legacy Code Refactoring"]
//     }
// ];

// const educationHistory: Item[] = [
//     {
//         id: 3,
//         year: "2021-2025",
//         title: "B.Tech Computer Science",
//         company: "University of Technology",
//         details: ["CGPA: 9.0", "System Design Major", "Lead, Coding Club"]
//     },
//     {
//         id: 4,
//         year: "2019-2021",
//         title: "Higher Secondary (Science)",
//         company: "City High School",
//         details: ["Physics & Math Focus", "State Merit List", "Computer Science Project Lead"]
//     }
// ];

// export default function ExperienceTerminal() {
//     const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

//     const data = activeTab === 'work' ? workHistory : educationHistory;

//     return (
//         <section id="experience" className="py-24 container mx-auto px-4 flex flex-col items-start">
//             {/* Header */}
//             <div className="mb-16 w-full">
//                 <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-6 text-white">
//                     <span className="text-neon-main">#</span> History
//                 </h2>
//                 <div className="h-1 w-24 bg-neon-main shadow-[0_0_20px_rgba(var(--neon-main),0.5)] mb-6" />
//                 <p className="text-xl text-neutral-400 max-w-xl font-light">
//                     A chronological archive of my professional journey and educational milestones, visualized as a system log.
//                 </p>
//             </div>

//             <div className="w-full relative self-start">
//                 {/* Main Holographic Container */}
//                 <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-2xl shadow-black/50">

//                     {/* CRT Scanline Overlay */}
//                     <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-10" />

//                     {/* Top Bar / Tabs */}
//                     <div className="flex border-b border-white/10 bg-black/40">
//                         <button
//                             onClick={() => setActiveTab('work')}
//                             className={`flex-1 py-4 text-sm md:text-base font-mono font-bold uppercase tracking-wider transition-all relative group ${activeTab === 'work' ? 'text-neon-main bg-white/5' : 'text-neutral-500 hover:text-neutral-300'
//                                 }`}
//                         >
//                             <span className="flex items-center justify-center gap-2">
//                                 <Briefcase className="w-4 h-4" />
//                                 // WORK_HISTORY
//                             </span>
//                             {activeTab === 'work' && (
//                                 <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-main shadow-[0_0_10px_rgba(var(--neon-main),0.8)]" />
//                             )}
//                         </button>
//                         <button
//                             onClick={() => setActiveTab('education')}
//                             className={`flex-1 py-4 text-sm md:text-base font-mono font-bold uppercase tracking-wider transition-all relative group ${activeTab === 'education' ? 'text-neon-main bg-white/5' : 'text-neutral-500 hover:text-neutral-300'
//                                 }`}
//                         >
//                             <span className="flex items-center justify-center gap-2">
//                                 <GraduationCap className="w-4 h-4" />
//                                 // EDUCATION
//                             </span>
//                             {activeTab === 'education' && (
//                                 <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-main shadow-[0_0_10px_rgba(var(--neon-main),0.8)]" />
//                             )}
//                         </button>
//                     </div>

//                     {/* Content Area */}
//                     <div className="p-6 md:p-10 min-h-[300px] relative overflow-hidden">
//                         {/* Decorative Background Icon */}
//                         <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
//                             {activeTab === 'work' ? <Briefcase className="w-64 h-64" /> : <GraduationCap className="w-64 h-64" />}
//                         </div>

//                         <AnimatePresence mode="wait">
//                             <motion.div
//                                 key={activeTab}
//                                 initial={{ opacity: 0, x: 20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -20 }}
//                                 transition={{ duration: 0.2 }}
//                                 className="space-y-4"
//                             >
//                                 {data.map((item) => (
//                                     <div
//                                         key={item.id}
//                                         className="group relative p-4 rounded border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-default overflow-hidden"
//                                     >
//                                         {/* Hover Glow */}
//                                         <div className="absolute inset-0 bg-neon-main/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

//                                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
//                                             {/* Left: Date & Title */}
//                                             <div className="flex flex-col gap-1">
//                                                 <div className="flex items-center gap-3">
//                                                     <span className="text-neon-main font-mono text-xs md:text-sm bg-neon-main/10 px-2 py-0.5 rounded">
//                                                         {item.year}
//                                                     </span>
//                                                     <span className="h-px w-8 bg-white/10 hidden md:block" />
//                                                 </div>
//                                                 <h3 className="text-lg md:text-xl font-display font-bold text-white uppercase mt-1 group-hover:text-neon-main transition-colors">
//                                                     {item.title}
//                                                 </h3>
//                                                 <p className="text-neutral-500 text-sm font-sans flex items-center gap-2">
//                                                     @ {item.company}
//                                                 </p>
//                                             </div>

//                                             {/* Right: Details (Visible on desktop) */}
//                                             <div className="flex flex-col md:items-end gap-1">
//                                                 {item.details.map((detail, i) => (
//                                                     <div key={i} className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
//                                                         <ChevronRight className="w-3 h-3 text-neon-main opacity-0 group-hover:opacity-100 transition-opacity" />
//                                                         <span className="opacity-70 group-hover:opacity-100 transition-opacity">
//                                                             {detail}
//                                                         </span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </motion.div>
//                         </AnimatePresence>
//                     </div>

//                     {/* Footer Status Bar */}
//                     <div className="bg-black/80 border-t border-white/10 p-2 px-4 flex justify-between items-center text-[10px] uppercase font-mono text-neutral-600">
//                         <div className="flex items-center gap-2">
//                             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
//                             <span>System Online</span>
//                         </div>
//                         <div className="flex items-center gap-4">
//                             <span>Ln 42, Col 12</span>
//                             <span>UTF-8</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
