/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // domains: [process.env.NEXT_PUBLIC_SUPABASE_URL.split("/")[2]],
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.split("/")[2],
      },
    ],
  },
};

export default nextConfig;
