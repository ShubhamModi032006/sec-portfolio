import type { Metadata } from 'next';
import About from '@/components/About';

export const metadata: Metadata = {
    title: 'About Shubham Modi | Bio & Tech Stack',
    description: "Learn about Shubham Modi's journey as a Full Stack Developer, his education in Computer Science, and his expertise in the MERN stack.",
    alternates: {
        canonical: '/about',
    }
};

export default function AboutPage() {
    return (
        <div className="pt-20 min-h-screen">
            <About />
        </div>
    );
}
