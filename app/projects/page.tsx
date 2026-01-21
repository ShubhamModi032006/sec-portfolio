import type { Metadata } from 'next';
import Projects from '@/components/Projects';

export const metadata: Metadata = {
    title: 'Projects | Shubham Modi',
    description: 'Explore verified full-stack projects built with Next.js, MongoDB, and AWS.',
    alternates: {
        canonical: '/projects',
    }
};

export default function ProjectsPage() {
    return (
        <div className="pt-20 min-h-screen">
            <Projects />
        </div>
    );
}
