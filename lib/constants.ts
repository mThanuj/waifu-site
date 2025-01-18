import "dotenv/config";

const requiredEnvVars = [
  "WAIFU_API_BASE_URL",
  "WAIFU_API_TOKEN",
  "DATABASE_URL",
];

for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
}

const config = {
  env: {
    waifuApi: {
      baseUrl: process.env.WAIFU_API_BASE_URL as string,
      token: process.env.WAIFU_API_TOKEN as string,
    },
    databaseUrl: process.env.DATABASE_URL as string,
  },
};

export default config;
