"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Copy, Check, ArrowUpRight, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

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

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
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
        <footer id="contact" className="py-20 container mx-auto px-4 flex flex-col min-h-screen justify-end">
            <div>
                <h2 className="text-[14vw] font-display font-black uppercase leading-[0.8] tracking-tighter text-center hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-br hover:from-white hover:to-neon-main transition-all duration-1000 ease-out cursor-default select-none">
                    Let's talk
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/20 pt-12 mt-20">
                <div className="flex flex-col gap-4 col-span-1 md:col-span-2">
                    <span className="uppercase text-xs tracking-widest text-neutral-500">Get in touch</span>
                    <button
                        onClick={handleCopy}
                        className="text-2xl md:text-3xl font-display font-bold flex items-center gap-4 hover:text-neon-main transition-colors text-left group break-all"
                    >
                        {email}
                        <div className="w-10 h-10 min-w-[40px] rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            <AnimatePresence mode='wait'>
                                {copied ?
                                    <motion.div
                                        key="check"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Check className="w-5 h-5 text-neon-main" />
                                    </motion.div>
                                    :
                                    <motion.div
                                        key="copy"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Copy className="w-5 h-5 text-neutral-500 group-hover:text-white" />
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </div>
                    </button>
                    <p className="text-neutral-400 max-w-sm mt-4">
                        I transform ideas into code and build engaging web applications. Open to work & collaboration.
                    </p>
                </div>

                <div className="flex flex-col gap-8 justify-between">
                    <div className="flex flex-col gap-4">
                        <span className="uppercase text-xs tracking-widest text-neutral-500">Socials</span>
                        <div className="flex flex-col gap-2">
                            {socials.map(social => (
                                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xl hover:text-neon-main transition-colors group">
                                    <span className="relative">
                                        {social.name}
                                        <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-neon-main group-hover:w-full transition-all duration-300" />
                                    </span>
                                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="uppercase text-xs tracking-widest text-neutral-500">Local Time</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-lg font-mono text-neutral-300">
                                {time}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between h-full gap-8">
                    <div className="flex flex-col gap-6">
                        <span className="uppercase text-xs tracking-widest text-neutral-500">Send a Message</span>
                        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-transparent border-b border-white/20 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neon-main transition-colors"
                            />
                            <textarea
                                rows={2}
                                placeholder="Description"
                                className="w-full bg-transparent border-b border-white/20 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neon-main transition-colors resize-none"
                            />
                            <button className="self-start mt-2 px-6 py-2 bg-white/5 hover:bg-neon-main hover:text-black border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 group">
                                Send
                                <Send className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                    <div className="text-neutral-600 text-sm mt-auto">
                        &copy; 2025 Shubham Modi.
                    </div>
                </div>
            </div>
        </footer>
    )
}
