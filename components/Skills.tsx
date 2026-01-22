"use client"
import Image from 'next/image';
import { motion } from 'motion/react';

const marqueeItems = ["REACT", "NEXT.JS", "MONGODB", "C++", "SYSTEM DESIGN", "REACT", "NEXT.JS", "MONGODB", "C++", "SYSTEM DESIGN"];

const SkillCard = ({ title, skills, className = "" }: { title: string, skills: string[], className?: string }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(204, 255, 0, 0.1)" }}
    className={`bg-[#1a1a1a] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 hover:border-neon-main/30 transition-colors ${className}`}
  >
    <div className="w-10 sm:w-12 h-1 bg-neon-main/50 rounded-full" />
    <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wider">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, i) => (
        <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg text-xs sm:text-sm font-medium text-neutral-400 border border-white/5 hover:text-white hover:bg-white/10 transition-colors cursor-default">
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
)

const MernCard = ({ title, sub, icon }: { title: string, sub: string, icon: string }) => (
  <motion.div
    whileHover={{ y: -5, borderColor: "rgba(204, 255, 0, 0.5)" }}
    className="bg-[#1a1a1a] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between aspect-square group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-20 sm:p-32 bg-neon-main/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-neon-main/10 transition-colors" />

    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-neon-main group-hover:text-black group-hover:border-neon-main transition-all duration-300 relative z-10">
      <Image
        src={`https://cdn.simpleicons.org/${icon}/white`}
        width={28}
        height={28}
        className="w-6 h-6 sm:w-7 sm:h-7 opacity-70 group-hover:brightness-0 group-hover:opacity-100 transition-all"
        alt={title}
        unoptimized
      />
    </div>
    <div className="relative z-10">
      <h4 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-1 sm:mb-2 group-hover:text-neon-main transition-colors">{title}</h4>
      <p className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase tracking-widest">{sub}</p>
    </div>
  </motion.div>
)

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Part A: Kinetic Marquee */}
      <div className="flex -rotate-1 py-6 sm:py-8 md:py-10 mb-12 sm:mb-16 md:mb-20 relative z-10 border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-20 pointer-events-none" />
        <motion.div
          className="flex gap-6 sm:gap-8 md:gap-12 pr-6 sm:pr-8 md:pr-12 whitespace-nowrap"
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {marqueeItems.map((item, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-8 md:gap-12 select-none">
              <span
                className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-950"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
              >
                {item}
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl text-neon-main">●</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Part B: Detailed Tech Ecosystem */}
      <div className="container mx-auto px-4 sm:px-6 md:px-4 relative z-20">
        <div className="mb-10 sm:mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(2.5rem,6.2vw,10rem)] leading-[0.8] font-display font-black uppercase mb-4 sm:mb-6 break-words w-full"
          >
            Tech<span className="text-neon-main">.</span>Stack
          </motion.h2>
          <div className="h-1 w-16 sm:w-20 bg-neon-main mb-4 sm:mb-6" />
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-neon-main mb-4 opacity-80">
            <span className="w-2 h-2 bg-neon-main animate-pulse" />
                   // SYSTEM_LOG: SKILL_MATRIX_LOADED [OPTIMIZED]
          </div>
          <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-xl font-light">
            My weapon of choice is the <span className="text-white font-medium">MERN Stack</span>, but I leverage a wide ecosystem of modern tools to build scalable, high-performance applications.
          </p>
        </div>

        {/* MERN Core Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <MernCard title="MongoDB" sub="Database" icon="mongodb" />
          <MernCard title="Express" sub="Backend" icon="express" />
          <MernCard title="React" sub="Frontend" icon="react" />
          <MernCard title="Node.js" sub="Runtime" icon="nodedotjs" />
        </div>

        {/* Detailed Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <SkillCard
            title="Frontend Engineering"
            skills={["React (JSX)", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "Next.js", "HTML5 & CSS3", "Figma"]}
          />
          <SkillCard
            title="Backend & Arch"
            skills={["Node.js", "Express.js", "MongoDB", "REST API", "JWT Auth", "RBAC"]}
          />
          <SkillCard
            title="Tools & Deploy"
            skills={["Git & GitHub", "Postman", "Vercel", "Netlify", "Render"]}
          />
        </div>
      </div>
    </section>
  )
}
