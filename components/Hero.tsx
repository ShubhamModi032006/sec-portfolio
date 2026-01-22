"use client"
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Hero() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end start']
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"])

    return (
        <section ref={container} className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden px-4 md:px-8 lg:px-12 py-20">
            <motion.div style={{ y }} className="flex flex-col items-center justify-center z-10 relative">
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="text-[clamp(3.5rem,12vw,13rem)] leading-[0.8] font-display font-black uppercase tracking-tighter text-center text-white mix-blend-difference"
                    >
                        Full Stack
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                        className="text-[clamp(3.5rem,12vw,13rem)] leading-[0.8] font-display font-black uppercase tracking-tighter text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600"
                    >
                        Developer
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-8 text-neutral-400 font-sans tracking-widest text-sm uppercase"
                >
                    Creative Engineering
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0"
                style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-neon-main to-transparent opacity-50" />
            </div>
        </section>
    )
}
