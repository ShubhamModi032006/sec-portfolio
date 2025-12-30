import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      <Hero />
      <div className="relative z-20 bg-background/50 backdrop-blur-3xl rounded-t-[50px] mt-[-50px] border-t border-white/10 shadow-2xl shadow-neon-main/5">
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  )
}
