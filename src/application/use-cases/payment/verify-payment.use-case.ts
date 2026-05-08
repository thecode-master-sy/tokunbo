import { Either, left, right, matchEither } from "@/src/lib/fp";
import { ApplicationError, makeError } from "@/src/entities/errors";
import { PaymentVerificationResponse } from "@/src/entities/models/payment";
import makePaymentService from "@/src/infrastructure/services/payment.service";
import makeOrderRepository from "@/src/infrastructure/repositories/order.repository";
import { Order } from "@/src/entities/models/order";

const verifyPaymentUseCase = async (reference: string) => {
  const paymentService = makePaymentService("paystack");
  const orderRepository = makeOrderRepository();

  return matchEither(
    (error: ApplicationError) => left(error),
    (verification: PaymentVerificationResponse) => {
      if (verification.status !== "success") {
        return left(
          makeError(
            "OperationError",
            `Payment was not successful. Status: ${verification.status}`,
          ),
        );
      }

      return orderRepository.updateOrder(reference, {
        status: "confirmed",
        paymentReference: verification.reference,
        paidAt: new Date(verification.paidAt),
      });
    },
  )(await paymentService.verifyTransaction(reference));
};

export default verifyPaymentUseCase;
