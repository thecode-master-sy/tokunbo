import { Either, left, right } from "@/src/lib/fp";
import { ApplicationError, makeError } from "@/src/entities/errors";
import { ICartRepository } from "@/src/application/repositories/cart.repository.interface";
import { CartItem } from "@/src/entities/models/cart";
import db from "@/db";
import { cartTable, cartItemTable } from "@/db/schema";

const makeCartRepository = (): ICartRepository => {
  const createCart = async (
    items: CartItem[],
  ): Promise<Either<ApplicationError, string>> => {
    try {
      // Create cart + cartItems atomically in a single transaction
      const cartId = await db.transaction(async (tx) => {
        const [cart] = await tx
          .insert(cartTable)
          .values({})
          .returning({ id: cartTable.id });

        await tx.insert(cartItemTable).values(
          items.map((item) => ({
            cartId: cart.id,
            sanityProductId: item.sanityProductId,
            sanityVariantId: item.sanityVariantId ?? null,
            sanityProductName: item.sanityProductName,
            sanityVariantName: item.sanityVariantName ?? null,
            imageUrl: item.imageUrl ?? null,
            quantity: item.quantity,
            unitPrice: item.unitPrice.toString(),
            totalPrice: (item.unitPrice * item.quantity).toString(),
          })),
        );

        return cart.id;
      });

      return right(cartId);
    } catch (error) {
      return left(
        makeError("OperationError", "Failed to create cart", {
          cause: error,
        }),
      );
    }
  };

  return { createCart };
};

export default makeCartRepository;
