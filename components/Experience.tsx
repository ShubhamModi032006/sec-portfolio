// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import { Plus, Minus } from "lucide-react";

// interface ExperienceItem {
//     id: number;
//     role: string;
//     company: string;
//     period: string;
//     description: string[];
//     skills: string[];
// }

// const experiences: ExperienceItem[] = [
//     {
//         id: 1,
//         role: "Full Stack Developer",
//         company: "Freelance",
//         period: "2024 - Present",
//         description: [
//             "Developed high-performance web applications for diverse clients using Next.js and MERN stack.",
//             "Implemented comprehensive SEO strategies and optimized page load times by 40%.",
//             "Collaborated with UI/UX designers to translate Figma designs into pixel-perfect responsive code."
//         ],
//         skills: ["Next.js", "React", "Node.js", "Tailwind CSS"]
//     },
//     {
//         id: 2,
//         role: "Frontend Developer Intern",
//         company: "Tech Solutions Inc.",
//         period: "2023 - 2024",
//         description: [
//             "Assisted in the migration of a legacy system to a modern React-based architecture.",
//             "Built reusable component libraries used across 3 different internal products.",
//             "Participated in code reviews and agile sprint planning meetings."
//         ],
//         skills: ["React", "Redux", "Material UI", "Git"]
//     },
//     // Add more experience here
// ];

// const ExperienceRow = ({ item, isOpen, onClick }: { item: ExperienceItem, isOpen: boolean, onClick: () => void }) => {
//     return (
//         <motion.div
//             initial={false}
//             className="border-b border-white/10 last:border-none group"
//         >
//             <button
//                 onClick={onClick}
//                 className="w-full py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left group-hover:bg-white/5 transition-colors px-4 md:px-0 relative"
//             >
//                 {/* Hover Indicator */}
//                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-main scale-y-0 group-hover:scale-y-100 transition-transform origin-center duration-300" />

//                 <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 flex-1 pl-4 md:pl-0">
//                     <span className="text-sm font-mono text-neon-main md:w-32 flex-shrink-0">{item.period}</span>
//                     <h3 className="text-2xl md:text-4xl font-display font-bold text-white group-hover:text-neon-main transition-colors uppercase">
//                         {item.role} <span className="text-neutral-500 text-lg md:text-2xl normal-case font-sans font-light">@ {item.company}</span>
//                     </h3>
//                 </div>

//                 <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 group-hover:border-neon-main group-hover:bg-neon-main group-hover:text-black transition-all ml-4 md:ml-0">
//                     {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
//                 </div>
//             </button>

//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                         className="overflow-hidden"
//                     >
//                         <div className="pb-8 pl-4 md:pl-40 pr-4 md:pr-12 text-neutral-300">
//                             <ul className="list-disc space-y-2 mb-6 ml-4 text-sm md:text-base marker:text-neon-main">
//                                 {item.description.map((desc, i) => (
//                                     <li key={i}>{desc}</li>
//                                 ))}
//                             </ul>
//                             <div className="flex flex-wrap gap-2">
//                                 {item.skills.map((skill, i) => (
//                                     <span key={i} className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-neutral-400 bg-white/5">
//                                         {skill}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </motion.div>
//     )
// }

// export default function Experience() {
//     const [openId, setOpenId] = useState<number | null>(1); // Default open first one

//     return (
//         <section id="experience" className="py-24 container mx-auto px-4">
//             <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
//                 <div>
//                     <motion.h2
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         className="text-5xl md:text-7xl font-display font-bold uppercase leading-none"
//                     >
//                         Work<br />
//                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">History</span>
//                     </motion.h2>
//                 </div>
//                 <div className="h-[1px] flex-1 bg-white/10 mx-8 hidden md:block mb-8" />
//                 <p className="text-neutral-400 max-w-sm text-sm md:text-base">
//                     A timeline of my professional journey and the value I've delivered to companies and clients.
//                 </p>
//             </div>

//             <div className="border-t border-white/10">
//                 {experiences.map((exp) => (
//                     <ExperienceRow
//                         key={exp.id}
//                         item={exp}
//                         isOpen={openId === exp.id}
//                         onClick={() => setOpenId(openId === exp.id ? null : exp.id)}
//                     />
//                 ))}
//             </div>
//         </section>
//     )
// }
