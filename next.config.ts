import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // 90 is for screenshots (see components/Media.tsx); every quality used must be listed.
  images: { qualities: [75, 90] },
};

export default nextConfig;
