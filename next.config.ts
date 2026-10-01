import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Local images served from /public are always allowed; nothing extra needed.
    // Uncomment and add external hostnames if you later use remote images:
    // remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
  },
};

export default nextConfig;
