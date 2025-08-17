import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  distDir: './dist',
  images: {
    domains: ['raw.githubusercontent.com', 'github.com'],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
