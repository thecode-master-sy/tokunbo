import { Either, left, right, matchEither } from "@/src/lib/fp";
import { ApplicationError, makeError } from "@/src/entities/errors";
import { CreateOrderInput, Order } from "@/src/entities/models/order";
import { PaymentResponse } from "@/src/entities/models/payment";
import makeCartService from "@/src/infrastructure/services/cart.service";
import makeOrderRepository from "@/src/infrastructure/repositories/order.repository";
import makePaymentService from "@/src/infrastructure/services/payment.service";
import { VerifiedCart } from "@/src/entities/models/cart";

const initializePaymentUseCase = async (
  input: CreateOrderInput,
): Promise<Either<ApplicationError, PaymentResponse>> => {
  const cartService = makeCartService();
  const orderRepository = makeOrderRepository();
  const paymentService = makePaymentService("paystack");

  const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const createOrderOrError = matchEither(
    (error: ApplicationError) => left(error),
    ({ cartId, subtotal, discountAmount, total }: VerifiedCart) =>
      orderRepository.createOrder({
        ...input,
        status: "pending",
        orderNumber,
        cartId,
        deliveryAddress: {
          city: input.city,
          state: input.state,
          address: input.address,
          country: input.country,
          firstName: input.customerFirstName,
          lastName: input.customerLastName,
          phone: input.phone,
        },
        subtotal: subtotal.toString(),
        discountAmount: discountAmount.toString(),
        total: total.toString(),
        paymentReference: orderNumber,
      }),
  )(await cartService.createVerifiedCart(input.items, input.discountAmount));

  // ─── 3. Initialize Paystack transaction ───────────────────────────────────

  return matchEither(
    (error: ApplicationError) => left(error),
    async ({ orderNumber, customerEmail, total }: Order) =>
      await paymentService.initializeTransaction({
        email: customerEmail,
        amount: Math.round(Number(total) * 100),
        reference: orderNumber,
        currency: "NGN",
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/verify?reference=${orderNumber}`,
        metadata: { orderNumber },
      }),
  )(await createOrderOrError);
};

export default initializePaymentUseCase;
