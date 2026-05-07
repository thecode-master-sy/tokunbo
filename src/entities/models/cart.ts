import { z } from "zod";

export const cartItemSchema = z.object({
  sanityProductId: z.string().min(1, "Product ID is required"),
  sanityVariantId: z.string().optional(),
  sanityProductName: z.string().min(1, "Product name is required"),
  sanityVariantName: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().positive("Unit price must be greater than 0"),
});

export type CartItem = z.infer<typeof cartItemSchema>;

export type VerifiedCart = {
  cartId: string;
  subtotal: number;
  discountAmount: number;
  total: number;
};
