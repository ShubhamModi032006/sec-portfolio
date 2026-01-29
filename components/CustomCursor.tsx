"use client"
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Use MotionValues for direct DOM updates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics - Tuned for "instant" feel but smooth rendering
  // Stiffness increased significantly to reduce lag
  const springConfig = { damping: 20, stiffness: 500, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      const mobile = hasTouch || isSmallScreen || isTouchDevice;
      setIsMobile(mobile);
    };

    // Initial check
    checkDevice();

    const resizeHandler = () => {
      checkDevice();
    };

    window.addEventListener('resize', resizeHandler);

    const updateMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('input') !== null ||
        target.closest('select') !== null ||
        target.closest('textarea') !== null ||
        target.getAttribute('role') === 'button' ||
        target.closest('[role="button"]') !== null ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    if (!isMobile) {
      window.addEventListener('mousemove', updateMouse, { passive: true });
      window.addEventListener('mouseover', handleMouseOver, { passive: true });
      window.addEventListener('mouseout', handleMouseOut, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [mouseX, mouseY, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference bg-neon-main rounded-full flex items-center justify-center will-change-transform"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovered ? 40 : 12, // Reduced size slightly for better precision feel
        height: isHovered ? 40 : 12,
        opacity: isHovered ? 0.8 : 1,
      }}
      transition={{
        type: "tween",
        ease: "backOut",
        duration: 0.2
      }}
    >
      {/* Center Dot (always keeps focus) */}
      <div className={`rounded-full absolute bg-neon-main transition-all duration-300 ${isHovered ? 'w-2 h-2' : 'w-1.5 h-1.5'}`} />
    </motion.div>
  );
}
