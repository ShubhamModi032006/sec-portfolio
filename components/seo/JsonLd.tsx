import React from 'react';

const JsonLd = () => {
    const jsonLdData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Shubham Modi',
        url: 'https://shubhammodi.netlify.app',
        jobTitle: 'Full Stack Developer',
        sameAs: [
            'https://www.linkedin.com/in/shubham-modi-cg',
            'https://github.com/ShubhamModi032006',
            'https://www.instagram.com/shubham03.2006/',
            'https://x.com/shubham_modi_cg',
        ],
        knowsAbout: ['Next.js', 'React', 'MongoDB', 'C++', 'System Design'],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
    );
};

export default JsonLd;
