/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
    // formats: ["image/avif", "image/webp","image/jpeg","image/png"],
  },
};

module.exports = nextConfig;
