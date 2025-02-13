/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Fix the typo: "porotocol" → "protocol"
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
