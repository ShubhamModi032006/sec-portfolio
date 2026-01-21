import type { Metadata } from 'next';
import Certificates from '@/components/Certificates';

export const metadata: Metadata = {
    title: 'Certifications | Shubham Modi',
    description: 'View verified credentials from HackerRank, AWS, and Microsoft.',
    alternates: {
        canonical: '/certificates',
    }
};

export default function CertificatesPage() {
    return (
        <div className="pt-20 min-h-screen">
            <Certificates />
        </div>
    );
}
