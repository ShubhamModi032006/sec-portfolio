"use client"
import { ReactLenis } from '@studio-freight/react-lenis'

export default function LenisProvider({ children }: { children: any }) {
    return (
        <ReactLenis root options={{ lerp: 0.05, duration: 1.0, smoothWheel: true, wheelMultiplier: 0.8 }}>
            {children}
        </ReactLenis>
    )
}
