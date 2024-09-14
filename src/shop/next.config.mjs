/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.labofdev.ru',
        port: '',
        pathname: '/test-bucket/**',
      },
    ],
  },
};

export default nextConfig;
