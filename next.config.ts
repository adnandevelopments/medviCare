import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      { source: "/treatments/hair-loss", destination: "/hairloss", permanent: true },
      { source: "/treatments/skin", destination: "/skincare", permanent: true },
      { source: "/treatments/weight-loss", destination: "/body-optimization", permanent: true },
      { source: "/treatments/longevity", destination: "/longevity", permanent: true },
      { source: "/treatments/sexual-health", destination: "/sexual-health", permanent: true },
      { source: "/treatments/mental-health", destination: "/mental-health", permanent: true },
      { source: "/treatments/quit-smoking", destination: "/zonnic", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
