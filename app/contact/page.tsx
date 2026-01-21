import type { Metadata } from 'next';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
    title: 'Contact | Shubham Modi',
    description: 'Get in touch with Shubham Modi for freelance projects, job opportunities, or collaborations.',
    alternates: {
        canonical: '/contact',
    }
};

export default function ContactPage() {
    return (
        <div className="pt-20 min-h-screen">
            <Contact />
        </div>
    );
}
