import { z } from "zod";
import { cartItemSchema, CartItem } from "@/src/entities/models/cart";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type DeliveryAddress = {
  city: string;
  state: string;
  address: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  cartId: string;
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  phone: string;
  status: OrderStatus;
  paymentReference: string;
  subtotal: string;
  total: string;
  deliveryAddress: DeliveryAddress;
  discountAmount: string;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type NewOrder = Omit<Order, "id" | "createdAt" | "updatedAt" | "paidAt">;

export const createOrderSchema = z.object({
  customerEmail: z
    .email({
      message: "Please provide a vaild email address",
    })
    .max(255),
  customerFirstName: z.string().min(1, "First name is required"),
  customerLastName: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  items: z.array(cartItemSchema).min(1, "Order must have at least one item"),
  discountAmount: z.number().min(0, "Discount cannot be negative").default(0),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
