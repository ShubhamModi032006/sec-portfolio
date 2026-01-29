"use client"
import { useEffect, useRef, useState } from "react"
import { frame, useSpring, motion, AnimatePresence } from "motion/react"

const spring = { stiffness: 400, damping: 50, restDelta: 0.001 }

export function DotCursor() {
    const [hoverText, setHoverText] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const lastTargetRef = useRef<HTMLElement | null>(null)

    // Position springs
    const x = useSpring(0, spring)
    const y = useSpring(0, spring)

    useEffect(() => {
        const onMove = (ev: PointerEvent) => {
            x.set(ev.clientX)
            y.set(ev.clientY)

            const target = ev.target as Element | null
            const el = target?.closest("[data-text]") as HTMLElement | null

            if (el === lastTargetRef.current) return
            lastTargetRef.current = el

            if (el) {
                const text = el.getAttribute("data-text") || ""
                setHoverText(text)
                setIsVisible(!!text)
            } else {
                setHoverText("")
                setIsVisible(false)
            }
        }

        const onLeaveWindow = () => {
            lastTargetRef.current = null
            setHoverText("")
            setIsVisible(false)
        }

        window.addEventListener("pointermove", onMove, { passive: true })
        window.addEventListener("pointerleave", onLeaveWindow)

        return () => {
            window.removeEventListener("pointermove", onMove)
            window.removeEventListener("pointerleave", onLeaveWindow)
        }
    }, [x, y])

    return (
        <motion.div
            style={{ x, y }}
            className="pointer-events-none fixed top-0 left-0 isolate z-[60] hidden md:flex w-fit -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
            <motion.div
                layout
                style={{
                    height: isVisible ? 30 : 20,
                    width: isVisible ? "auto" : 20,
                }}
                className="bg-neon-main backdrop-blur-[1px] overflow-hidden flex items-center justify-center rounded-full"
            >
                <motion.span
                    layout
                    initial={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0 }}
                    animate={{
                        opacity: isVisible ? 1 : 0,
                        width: isVisible ? "auto" : 0,
                        paddingLeft: isVisible ? 8 : 0,
                        paddingRight: isVisible ? 8 : 0,
                    }}
                    className="relative z-4 text-sm leading-none font-semibold whitespace-nowrap select-none text-black"
                >
                    {hoverText}
                </motion.span>
            </motion.div>
        </motion.div>
    )
}
