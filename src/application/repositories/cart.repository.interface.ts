import { Either } from "@/src/lib/fp";
import { ApplicationError } from "@/src/entities/errors";
import { CartItem } from "@/src/entities/models/cart";

export interface ICartRepository {
  // Creates a cart record and inserts all cartItems in one transaction.
  // Returns the new cartId.
  createCart(items: CartItem[]): Promise<Either<ApplicationError, string>>;
}
