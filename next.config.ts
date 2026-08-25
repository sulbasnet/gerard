import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // There is an unrelated pnpm-lock.yaml in D:\Downloads, which makes Next
  // infer the wrong workspace root. Pin it to this project.
  outputFileTracingRoot: __dirname,

  // Static pages and assets are cached at the edge; middleware and the contact
  // route are deployed through the OpenNext Cloudflare Worker configuration.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Explicitly allow the two quality levels used by the editorial images.
    // Next.js 16 requires this whenever an Image component sets `quality`.
    qualities: [75, 85],
  },
};

export default nextConfig;
