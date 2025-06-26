import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
