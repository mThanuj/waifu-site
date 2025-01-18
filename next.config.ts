import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    DATABASE_URL:
      "postgresql://neondb_owner:az9hVY6NiZjb@ep-nameless-lab-a1xlo099.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
    WAIFU_API_BASE_URL: "https://waifu.it/api/v4",
    WAIFU_API_TOKEN:
      "MTIzMzcwMjgxNzc1MjE1NDEyMg--.MTczNzE2ODUzNQ--.cfcf77c9a5e",
  },
};

export default nextConfig;
