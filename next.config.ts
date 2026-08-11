import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Watch model photos are served from Shopify's product-media CDN
    // (confirmed URLs, see lib/content.ts).
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
