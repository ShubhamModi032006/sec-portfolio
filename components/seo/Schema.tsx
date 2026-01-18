import Script from 'next/script'

const Schema = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Shubham Modi',
        jobTitle: 'Full Stack Developer',
        url: 'https://shubhammodi.me',
        sameAs: [
            'https://www.linkedin.com/in/shubham-modi-cg',
            'https://github.com/shubhamiscodding',
            'https://www.instagram.com/shubham03.2006/',
            'https://x.com/shubham_modi_cg'
        ],
        knowsAbout: ['Next.js', 'React', 'C++'],
    }

    return (
        <Script
            id="person-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

export default Schema
