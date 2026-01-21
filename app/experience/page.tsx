import type { Metadata } from 'next';
// import ExperienceTerminal from '@/components/ExperienceTerminal';

export const metadata: Metadata = {
    title: 'Experience | Shubham Modi',
    description: 'Professional experience and work history of Shubham Modi, including roles as a Full Stack Developer.',
    alternates: {
        canonical: '/experience',
    }
};

export default function ExperiencePage() {
    return (
        <div className="pt-20 min-h-screen">
            {/* <ExperienceTerminal /> */}
        </div>
    );
}
