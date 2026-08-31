import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        // Spotify's album-art CDN, used by the currently-playing widget.
      },
    ],
  },
};

export default nextConfig;
