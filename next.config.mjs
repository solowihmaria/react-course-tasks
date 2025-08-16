/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export',
  distDir: './dist',
  images: {
    domains: ['raw.githubusercontent.com', 'github.com'],
  },
};

export default nextConfig;
