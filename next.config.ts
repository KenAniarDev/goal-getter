import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const prod = process.env.NODE_ENV === "production";

const withPWA = withPWAInit({
  dest: "public",
  disable: !prod,
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  fallbacks: {
    document: "/offline",
  },
  workboxOptions: {
    disableDevLogs: true,
    skipWaiting: true, // Moved inside workboxOptions
    clientsClaim: true,
  },
});

const nextConfig: NextConfig = {};

export default withPWA(nextConfig);
