import { Either, left, right, matchEither } from "@/src/lib/fp";
import { ApplicationError, makeError } from "@/src/entities/errors";
import { PaymentVerificationResponse } from "@/src/entities/models/payment";
import verifyPaymentUseCase from "@/src/application/use-cases/payment/verify-payment.use-case";
import makeRateLimiterService from "@/src/infrastructure/services/ratelimiter.service";
import { z } from "zod";

const verifyPaymentSchema = z.string().min(1, "Reference is required");

const verifyPaymentController = async (reference: string) => {
  const rateLimiterService = makeRateLimiterService();

  const rateLimitOrError = matchEither(
    (error: ApplicationError) => left(error),
    (b: string) => right(b),
  )(await rateLimiterService.rateLimitByIp(20, "60s"));

  return matchEither(
    (error: ApplicationError) => left(error),
    async () => {
      const isValid = verifyPaymentSchema.safeParse(reference);

      if (isValid.error)
        return left(
          makeError("InputParseError", "Invalid payment reference", {
            cause: isValid.error.issues,
          }),
        );

      return await verifyPaymentUseCase(isValid.data);
    },
  )(rateLimitOrError);
};

export default verifyPaymentController;
