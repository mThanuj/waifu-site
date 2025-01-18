import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import config from "@/lib/constants";

export default defineConfig({
  out: "./migrations",
  schema: "./database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: config.env.databaseUrl,
  },
});
