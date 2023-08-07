/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storage.googleapis.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
