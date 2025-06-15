import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://54.180.245.50/api/:path*',
      },
    ];
  },
};

export default nextConfig;
