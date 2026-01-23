import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
  },
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'images.apollo247.in' },
      { protocol: 'https', hostname: 'cdn.iconscout.com' },
      { protocol: 'https', hostname: 'wallpapercave.com' },
      { protocol: 'https', hostname: 'cdns.iconmonstr.com' },
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*).(jpg|jpeg|png|svg|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).(woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
