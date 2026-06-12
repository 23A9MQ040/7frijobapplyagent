/** @type {import('next').NextConfig} */
const isProd = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages deployment
  output: 'export',
  // Set base path for GitHub Pages (repo name) only in production CI
  basePath: isProd ? '/7frijobapplyagent' : '',
  assetPrefix: isProd ? '/7frijobapplyagent/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
};

module.exports = nextConfig;
