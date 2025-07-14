import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    remotePatterns: [new URL("https://lh3.googleusercontent.com/**")],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
