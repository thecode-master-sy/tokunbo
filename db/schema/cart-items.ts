import {
  pgTable,
  uuid,
  text,
  numeric,
  integer,
  index,
} from "drizzle-orm/pg-core";
import carts from "./cart";

const cartItems = pgTable(
  "cart_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    cartId: uuid("cart_id")
      .notNull()
      .references(() => carts.id, { onDelete: "cascade" }),
    sanityProductId: text("sanity_product_id").notNull(),
    sanityVariantId: text("sanity_variant_id"), // null if no variant selected
    sanityProductName: text("sanity_product_name").notNull(),
    sanityVariantName: text("sanity_variant_name"), // e.g. "Red / XL"
    imageUrl: text("image_url"),
    quantity: integer("quantity").notNull(),
    unitPrice: numeric("unit_price", { precision: 12, scale: 2 }).notNull(),
    totalPrice: numeric("total_price", { precision: 12, scale: 2 }).notNull(),
  },
  (t) => [index("cart_items_cart_idx").on(t.cartId)],
).enableRLS();

export default cartItems;
