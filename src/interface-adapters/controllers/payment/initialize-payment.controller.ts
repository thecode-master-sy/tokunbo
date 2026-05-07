import { left, matchEither, right } from "@/src/lib/fp";
import { ApplicationError, makeError } from "@/src/entities/errors";
import {
  CreateOrderInput,
  createOrderSchema,
} from "@/src/entities/models/order";
import initializePaymentUseCase from "@/src/application/use-cases/payment/initialize-payment.use-case";
import makeRateLimiterService from "@/src/infrastructure/services/ratelimiter.service";

const initializePaymentController = async (
  input: CreateOrderInput,
): Promise<Awaited<ReturnType<typeof initializePaymentUseCase>>> => {
  const rateLimiterService = makeRateLimiterService();

  const tooManyRequests = matchEither(
    (error: ApplicationError) => left(error),
    (b: string) => right(b),
  )(await rateLimiterService.rateLimitByIp(10, "60s"));

  return matchEither(
    (error: ApplicationError) => left(error),
    async () => {
      const isValid = createOrderSchema.safeParse(input);

      if (isValid.error) {
        console.log(isValid.error.issues);
        return left(
          makeError("InputParseError", "Invalid checkout data", {
            cause: isValid.error.issues,
          }),
        );
      }

      return await initializePaymentUseCase(isValid.data);
    },
  )(tooManyRequests);
};

export default initializePaymentController;
