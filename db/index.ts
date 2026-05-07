import { drizzle, PostgresJsTransaction } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import env from "@/env";
import * as schema from "@/db/schema";
import { ExtractTablesWithRelations } from "drizzle-orm";

export const client = postgres(env.DATABASE_URL);

const db = drizzle(client, {
  schema,
  logger: true,
});

export type db = typeof db;

export type Transaction = PostgresJsTransaction<
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;
export default db;
