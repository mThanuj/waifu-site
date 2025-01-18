import "dotenv/config";

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
