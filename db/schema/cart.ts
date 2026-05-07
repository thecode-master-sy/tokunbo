import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";

const carts = pgTable("carts", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}).enableRLS();

export default carts;
