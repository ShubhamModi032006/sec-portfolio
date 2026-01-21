import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
            <h2 className="text-6xl sm:text-9xl font-display font-bold text-neon-main mb-4">404</h2>
            <p className="text-xl sm:text-2xl font-mono mb-8 text-neutral-400">Page Not Found</p>
            <Link
                href="/"
                className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-neon-main hover:text-black hover:border-neon-main transition-all duration-300 rounded-full font-mono text-sm uppercase tracking-widest"
            >
                Return Home
            </Link>
        </div>
    )
}
