import type { NextConfig } from "next";

/**
 * Next.js Configuration for Vercel Deployment
 * 
 * This configuration is optimized for Vercel's serverless environment.
 * No custom server is needed - Next.js handles everything.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
