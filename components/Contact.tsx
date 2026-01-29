"use client"
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Copy, Check, ArrowUpRight, Send } from 'lucide-react';


export default function Contact() {
    const [copied, setCopied] = useState(false);
    const [time, setTime] = useState("");
    const email = "shubham.modi.cg@gmail.com";

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Kolkata',
                hour12: true
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleCopy = async () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        const confetti = (await import('canvas-confetti')).default;
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        setTimeout(() => setCopied(false), 2000);
    }

    const socials = [
        { name: 'GitHub', url: 'https://github.com/ShubhamModi032006' },
        { name: 'LeetCode', url: 'https://leetcode.com/u/ShubhamModi032006/' },
        { name: 'Twitter / X', url: 'https://x.com/shubham_modi_cg' },
        { name: 'Instagram', url: 'https://www.instagram.com/shubham03.2006/' }
    ];

    return (
        <footer id="contact" className="py-12 sm:py-16 md:py-20 container mx-auto px-4 sm:px-6 md:px-4 flex flex-col min-h-screen justify-end">
            <div className="px-2">
                <h2 className="text-[16vw] sm:text-[14vw] md:text-[12vw] font-display font-black uppercase leading-[0.8] tracking-tighter text-center transition-all duration-1000 ease-out cursor-default select-none">
                    Let's talk
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 border-t border-white/20 pt-8 sm:pt-10 md:pt-12 mt-12 sm:mt-16 md:mt-20">
                <div className="flex flex-col gap-3 sm:gap-4 col-span-1 md:col-span-2">
                    <span className="uppercase text-[10px] sm:text-xs tracking-widest text-neutral-400">Get in touch</span>
                    <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-neon-main mt-1 opacity-80">
                        <span className="w-1.5 h-1.5 bg-neon-main animate-pulse rounded-full" />
                         // SYSTEM_LOG: COMMUNICATION_UPLINK_ESTABLISHED
                    </div>
                    <button
                        onClick={handleCopy}
                        aria-label="Copy Email Address"
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-bold flex flex-wrap items-center gap-2 sm:gap-4 hover:text-neon-main transition-colors text-left group break-all"
                    >
                        <span className="break-all">{email}</span>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 min-w-[32px] sm:min-w-[40px] rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors flex-shrink-0">
                            <AnimatePresence mode='wait'>
                                {copied ?
                                    <motion.div
                                        key="check"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-neon-main" />
                                    </motion.div>
                                    :
                                    <motion.div
                                        key="copy"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 group-hover:text-white" />
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </div>
                    </button>
                    <p className="text-sm sm:text-base text-neutral-400 max-w-sm mt-2 sm:mt-4">
                        I transform ideas into code and build engaging web applications. Open to work & collaboration.
                    </p>
                </div>

                <div className="flex flex-col gap-6 sm:gap-8 justify-between">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <span className="uppercase text-[10px] sm:text-xs tracking-widest text-neutral-400">Socials</span>
                        <div className="flex flex-col gap-1.5 sm:gap-2">
                            {socials.map(social => (
                                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${social.name}`} className="flex items-center gap-2 text-base sm:text-lg md:text-xl hover:text-neon-main transition-colors group">
                                    <span className="relative">
                                        {social.name}
                                        <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-neon-main group-hover:w-full transition-all duration-300" />
                                    </span>
                                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="uppercase text-[10px] sm:text-xs tracking-widest text-neutral-400">Local Time</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-sm sm:text-base md:text-lg font-mono text-neutral-300">
                                {time}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between h-full gap-6 sm:gap-8">
                    <div className="flex flex-col gap-4 sm:gap-6">
                        <span className="uppercase text-[10px] sm:text-xs tracking-widest text-neutral-400">Send a Message</span>
                        <form className="flex flex-col gap-3 sm:gap-4" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-transparent border-b border-white/20 py-2 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neon-main transition-colors"
                            />
                            <textarea
                                rows={2}
                                placeholder="Description"
                                className="w-full bg-transparent border-b border-white/20 py-2 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neon-main transition-colors resize-none"
                            />
                            <button aria-label="Send Message" className="self-start mt-1 sm:mt-2 px-4 sm:px-6 py-1.5 sm:py-2 bg-white/5 hover:bg-neon-main hover:text-black border border-white/10 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 group">
                                Send
                                <Send className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                    <div className="text-neutral-400 text-xs sm:text-sm mt-auto">
                        &copy; 2025 Shubham Modi.
                    </div>
                </div>
            </div>
        </footer>
    )
}
