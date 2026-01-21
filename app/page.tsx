import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
// import Experience from '@/components/Experience';
// import ExperienceTerminal from '@/components/ExperienceTerminal';

// Dynamic imports for components below the fold
const Skills = dynamic(() => import('@/components/Skills'));
const Projects = dynamic(() => import('@/components/Projects'));
const Certificates = dynamic(() => import('@/components/Certificates'));
const Contact = dynamic(() => import('@/components/Contact'));
// const ExperienceTerminal = dynamic(() => import('@/components/ExperienceTerminal'));

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      <Hero />
      <div className="relative z-20 bg-background/50 backdrop-blur-3xl rounded-t-[30px] sm:rounded-t-[40px] md:rounded-t-[50px] mt-[-30px] sm:mt-[-40px] md:mt-[-50px] border-t border-white/10 shadow-2xl shadow-neon-main/5">
        <About />
        {/* <ExperienceTerminal /> */}
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </div>
    </div>
  )
}
