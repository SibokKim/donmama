import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // This site has no server-side data or private API routes. Export portable
  // HTML/CSS/JS so it can run on a low-cost static host.
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;

