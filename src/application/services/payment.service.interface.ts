import { Either } from "@/src/lib/fp";
import { ApplicationError } from "@/src/entities/errors";
import {
  PaymentRequest,
  PaymentResponse,
  PaymentVerificationResponse,
  PaymentRefundResponse,
} from "@/src/entities/models/payment";

export interface IPaymentService {
  initializeTransaction(
    request: PaymentRequest,
  ): Promise<Either<ApplicationError, PaymentResponse>>;
  verifyTransaction(
    reference: string,
  ): Promise<Either<ApplicationError, PaymentVerificationResponse>>;
  refund(
    paymentReference: string,
    amount?: number,
  ): Promise<Either<ApplicationError, PaymentRefundResponse>>;
}
