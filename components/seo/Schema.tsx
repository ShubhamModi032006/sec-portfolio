import Script from 'next/script'

const Schema = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': 'https://shubhammodi.me/#website',
                url: 'https://shubhammodi.me',
                name: 'Shubham Modi',
                description: 'Portfolio of Shubham Modi, a Full Stack Developer specializing in the MERN stack.',
                publisher: {
                    '@id': 'https://shubhammodi.me/#person'
                },
                potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://shubhammodi.me/?q={search_term_string}',
                    'query-input': 'required name=search_term_string'
                }
            },
            {
                '@type': 'Person',
                '@id': 'https://shubhammodi.me/#person',
                name: 'Shubham Modi',
                jobTitle: 'Full Stack Developer',
                url: 'https://shubhammodi.me',
                image: 'https://shubhammodi.me/shubham.jpg',
                sameAs: [
                    'https://www.linkedin.com/in/shubham-modi-cg',
                    'https://github.com/shubhamiscodding',
                    'https://www.instagram.com/shubham03.2006/',
                    'https://x.com/shubham_modi_cg',
                    'https://leetcode.com/u/ShubhamModi032006/'
                ],
                knowsAbout: [
                    'Full Stack Development',
                    'MERN Stack',
                    'Next.js',
                    'React',
                    'Node.js',
                    'MongoDB',
                    'System Design',
                    'C++',
                    'Figma'
                ],
                alumniOf: {
                    '@type': 'CollegeOrUniversity',
                    name: 'University of Technology'
                },
                email: 'shubham.modi.cg@gmail.com'
            }
        ]
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
