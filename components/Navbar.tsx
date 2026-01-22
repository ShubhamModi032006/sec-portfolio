"use client"
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Download, Menu as MenuIcon } from 'lucide-react';

export default function Navbar() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const resumeUrl = "https://drive.google.com/file/d/1Y3xLQZPY8RYeQ_CNiWjOWVmiCN2_i7Mu/preview";
  const downloadUrl = "https://drive.google.com/u/0/uc?id=1Y3xLQZPY8RYeQ_CNiWjOWVmiCN2_i7Mu&export=download";

  const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-3 sm:p-4 md:p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tighter pointer-events-auto z-50 text-white drop-shadow-md">
          Shubham<span className="text-neon-main drop-shadow-none">.</span>
        </div>

        {/* Desktop Nav */}
        <div className="pointer-events-auto hidden md:flex items-center gap-1 px-2 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 transition-all hover:bg-black/70">
          {['About', 'Skills', 'Projects', 'Certifications', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-6 py-2 rounded-full text-xs font-medium uppercase tracking-widest text-neutral-200 hover:text-white hover:bg-white/10 transition-all font-sans"
            >
              {item}
            </Link>
          ))}
          <button
            onClick={() => setIsResumeOpen(true)}
            className="px-6 py-2 rounded-full bg-neon-main text-black text-xs font-bold uppercase tracking-widest hover:bg-neon-main/80 transition-all flex items-center gap-2"
          >
            <FileText className="w-3 h-3" />
            Resume
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="pointer-events-auto md:hidden">
          <button
            onClick={toggleMobileNav}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest"
          >
            {isMobileNavOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-neutral-950 flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col gap-6 text-center">
              {['About', 'Skills', 'Projects', 'Certifications', 'Contact'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMobileNavOpen(false)}
                    className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tighter hover:text-neon-main transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <button
                  onClick={() => { setIsMobileNavOpen(false); setIsResumeOpen(true); }}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-neon-main text-black text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-neon-main/80 transition-all flex items-center gap-2 mx-auto"
                >
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                  View Resume
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 md:p-10"
            onClick={() => setIsResumeOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-5xl h-[90vh] sm:h-[85vh] bg-neutral-900 rounded-xl sm:rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="h-12 sm:h-14 border-b border-white/10 flex items-center justify-between px-4 sm:px-6 bg-neutral-900/50 backdrop-blur-md">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-neon-main" />
                  Resume Preview
                </h3>
                <div className="flex items-center gap-2 sm:gap-4">
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Iframe Content */}
              <div className="flex-1 bg-neutral-800 relative w-full h-full">
                <iframe
                  src={resumeUrl}
                  className="w-full h-full border-none"
                  title="Resume Preview"
                  allow="autoplay"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
