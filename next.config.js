/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "qltchobyicciqtaijftp.supabase.co"],
  },
  optimizeFonts: true,
  compress: true,
  swcMinify: true,
};

module.exports = nextConfig;
