import type { Metadata } from 'next';
import Skills from '@/components/Skills';

export const metadata: Metadata = {
    title: 'Skills & Tech Stack | Shubham Modi',
    description: 'Technical skills and technology stack of Shubham Modi, including MERN Stack, Next.js, and Cloud Computing.',
    alternates: {
        canonical: '/skills',
    }
};

export default function SkillsPage() {
    return (
        <div className="pt-20 min-h-screen">
            <Skills />
        </div>
    );
}
