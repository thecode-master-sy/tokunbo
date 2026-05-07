import {
  pgTable,
  pgEnum,
  uuid,
  text,
  timestamp,
  jsonb,
  numeric,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { DeliveryAddress } from "@/src/entities/models/order";
import carts from "./cart";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
]);

const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderNumber: text("order_number").notNull(),
    cartId: uuid("cart_id")
      .notNull()
      .unique()
      .references(() => carts.id, { onDelete: "restrict" }),
    customerEmail: text("customer_email").notNull(),
    customerFirstName: text("customer_first_name").notNull(),
    customerLastName: text("customer_last_name").notNull(),
    phone: text("phone").notNull(),
    status: orderStatusEnum("status").notNull().default("pending"),
    deliveryAddress: jsonb("delivery_address")
      .$type<DeliveryAddress>()
      .notNull(),
    subtotal: numeric("subtotal", { precision: 12, scale: 2 }).notNull(),
    discountAmount: numeric("discount_amount", { precision: 12, scale: 2 })
      .notNull()
      .default("0"),
    total: numeric("total", { precision: 12, scale: 2 }).notNull(),
    paymentReference: text("payment_reference").notNull(),
    paystackTransactionId: text("paystack_transaction_id"),
    paidAt: timestamp("paid_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("orders_order_number_idx").on(t.orderNumber),
    index("orders_email_idx").on(t.customerEmail),
    index("orders_payment_ref_idx").on(t.paymentReference),
    index("orders_status_idx").on(t.status),
    uniqueIndex("orders_cart_id_idx").on(t.cartId),
  ],
).enableRLS();

export default orders;
