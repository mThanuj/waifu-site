import config from "@/lib/constants";
import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(config.env.databaseUrl);

export default db;
