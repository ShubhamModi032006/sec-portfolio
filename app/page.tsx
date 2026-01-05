import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
// import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      <Hero />
      <div className="relative z-20 bg-background/50 backdrop-blur-3xl rounded-t-[50px] mt-[-50px] border-t border-white/10 shadow-2xl shadow-neon-main/5">
        <About />
        {/* <Experience /> */}
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </div>
    </div>
  )
}
