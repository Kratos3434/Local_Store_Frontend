import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/server/:path*",
        destination: "https://local-store-backend-black.vercel.app/dev/:path*", // backend API
      },
    ]
  },
};

export default nextConfig;
