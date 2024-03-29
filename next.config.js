/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'blog-lazysky.vercel.app',
      's3.us-west-2.amazonaws.com',
      'cdn.buymeacoffee.com',
    ],
  },
}

module.exports = nextConfig
