import { env } from "@/data/env/server";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

export const db = drizzle({
  schema,
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
  },
});
