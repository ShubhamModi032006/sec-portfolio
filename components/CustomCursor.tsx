"use client"
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  // Use MotionValues for direct DOM updates (no React re-renders for movement)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics - Snappy response
  const springConfig = { damping: 20, stiffness: 400, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports mouse/touch
    const checkDevice = () => {
      // Check for touch support or small screen
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768; // md breakpoint
      const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      const mobile = hasTouch || isSmallScreen || isTouchDevice;
      setIsMobile(mobile);
      return mobile;
    };

    const isMobileDevice = checkDevice();
    const resizeHandler = () => checkDevice();
    window.addEventListener('resize', resizeHandler);

    const updateMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6); // offset by half width (12px / 2)
      cursorY.set(e.clientY - 6);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or parent is interactive
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
        target.closest('[role="button"]') !== null;
      
      // Hover effect should appear on text only (non-interactive elements)
      setIsHovered(!isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    // Only add event listeners if not mobile
    if (!isMobileDevice) {
      window.addEventListener('mousemove', updateMouse);
      window.addEventListener('mouseover', handleMouseOver);
      window.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [cursorX, cursorY]);

  // Don't render cursor on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 bg-neon-main rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovered ? 4 : 1,
      }}
      transition={{
        scale: { duration: 0.2 } // Separate transition for scale
      }}
    />
  );
}
