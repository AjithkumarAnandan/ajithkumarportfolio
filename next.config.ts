import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/", // root path
        destination: "/en/dashboard", // default locale
        permanent: false,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint
  },
  typescript: {
    // ✅ Ignore build errors due to TypeScript
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [new URL("https://storage.googleapis.com/**")],
  },
  allowedDevOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
