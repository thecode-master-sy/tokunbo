import { Either } from "@/src/lib/fp";
import { ApplicationError } from "@/src/entities/errors";
import { CartItem, VerifiedCart } from "@/src/entities/models/cart";

export interface ICartService {
  // Fetches each product from Sanity, validates price + stock,
  // then creates a cart + cartItems in the DB.
  // Returns the cartId and computed totals to be used for order creation.
  createVerifiedCart(
    items: CartItem[],
    discountAmount?: number,
  ): Promise<Either<ApplicationError, VerifiedCart>>;
}
