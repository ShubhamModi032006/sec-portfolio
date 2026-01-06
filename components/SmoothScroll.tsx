"use client"
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle seamless anchor navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      // Check if clicked element is an anchor link with a hash
      if (link && link.hash && link.hash.startsWith('#') && link.origin === window.location.origin) {
        // Prevent default browser jump
        e.preventDefault();

        // Use Lenis for smooth scroll
        lenis.scrollTo(link.hash, {
          offset: 0,
          duration: 2.0, // Slower, smoother animation for navigation
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    }
  }, [])

  return null
}
