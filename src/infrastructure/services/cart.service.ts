import { Either, left, right, matchEither } from "@/src/lib/fp";
import { ApplicationError, makeError } from "@/src/entities/errors";
import { ICartService } from "@/src/application/services/cart.service.interface";
import makeCartRepository from "@/src/infrastructure/repositories/cart.repository";
import { CartItem, VerifiedCart } from "@/src/entities/models/cart";
import { client } from "@/lib/sanity/client";

interface SanityVariant {
  _key: string;
  name: string;
  price: number;
  stock: number;
  image?: { url: string };
}

interface SanityProduct {
  _id: string;
  price: number;
  name: string;
  stock: number;
  variants?: SanityVariant[];
  image?: { url: string };
}

interface CartWithItems {
  cartId: string;
  verifiedCartItems: CartItem[];
}

const makeCartService = (): ICartService => {
  const cartRepository = makeCartRepository();

  const fetchSanityProducts = async (
    productIds: string[],
  ): Promise<Either<ApplicationError, SanityProduct[]>> => {
    try {
      const products = await client.fetch<SanityProduct[]>(
        `*[_type == "product" && _id in $ids]{
          _id,
          name,
          price,
          "stock": stock,
          "image": image.asset->url,
          variants[]{
            _key,
            name,
            price,
            stock,
            "image": image.asset->url
          }
        }`,
        { ids: productIds },
      );

      return right(products);
    } catch (error) {
      return left(
        makeError("OperationError", "Failed to fetch products from Sanity", {
          cause: error,
        }),
      );
    }
  };

  const verifyCartItems = (
    items: CartItem[],
    sanityProducts: SanityProduct[],
  ): Either<ApplicationError, CartItem[]> => {
    const verifiedItems: CartItem[] = [];

    for (const item of items) {
      const product = sanityProducts.find(
        (p) => p._id === item.sanityProductId,
      );

      if (!product) {
        return left(
          makeError(
            "NotFoundError",
            `Product "${item.sanityProductName}" is out of stock`,
          ),
        );
      }

      let sanityPrice = product.price;
      let sanityStock = product.stock;
      let sanityImage = product.image?.url ?? item.imageUrl;
      let variantTitle: string | undefined;

      if (item.sanityVariantId) {
        const variant = product.variants?.find(
          (v) => v._key === item.sanityVariantId,
        );

        if (!variant) {
          return left(
            makeError(
              "NotFoundError",
              `Variant for "${item.sanityProductName}" is no longer available`,
            ),
          );
        }

        sanityPrice = variant.price;
        sanityStock = variant.stock;
        sanityImage = variant.image?.url ?? sanityImage;
        variantTitle = variant.name;
      }

      if (sanityPrice !== item.unitPrice) {
        return left(
          makeError(
            "InputParseError",
            `Price for "${item.sanityProductName}" has changed. Please review your cart`,
          ),
        );
      }

      if (sanityStock < item.quantity) {
        return left(
          makeError(
            "InputParseError",
            `Not enough stock for "${item.sanityProductName}". Only ${sanityStock} left`,
          ),
        );
      }

      verifiedItems.push({
        sanityProductId: item.sanityProductId,
        sanityVariantId: item.sanityVariantId,
        sanityProductName: product.name,
        sanityVariantName: variantTitle,
        imageUrl: sanityImage,
        quantity: item.quantity,
        unitPrice: sanityPrice,
      });
    }

    return right(verifiedItems);
  };

  const createVerifiedCart = async (
    items: CartItem[],
    discountAmount: number = 0,
  ): Promise<Either<ApplicationError, VerifiedCart>> => {
    const productIds = items.map((i) => i.sanityProductId);

    const verifiedCartItemsOrError = matchEither(
      (error: ApplicationError) => left(error),
      (sanityProducts: SanityProduct[]) =>
        verifyCartItems(items, sanityProducts),
    )(await fetchSanityProducts(productIds));

    const createCartOrError = matchEither(
      (error: ApplicationError) => left(error),
      async (verifiedItems: CartItem[]) =>
        matchEither(
          (error: ApplicationError) => left(error),
          (cartId: string) =>
            right<CartWithItems>({
              cartId,
              verifiedCartItems: verifiedItems,
            }),
        )(await cartRepository.createCart(verifiedItems)),
    )(verifiedCartItemsOrError);

    return matchEither(
      (error: ApplicationError) => left(error),
      ({ cartId, verifiedCartItems }: CartWithItems) => {
        const subtotal = verifiedCartItems.reduce(
          (sum, item) =>
            sum + Number((item.unitPrice * item.quantity).toString()),
          0,
        );

        const total = subtotal - discountAmount;

        if (total <= 0) {
          return left(
            makeError("InputParseError", "Order total must be greater than 0"),
          );
        }

        return right<VerifiedCart>({
          cartId,
          subtotal,
          discountAmount,
          total,
        });
      },
    )(await createCartOrError);
  };

  return { createVerifiedCart };
};

export default makeCartService;
