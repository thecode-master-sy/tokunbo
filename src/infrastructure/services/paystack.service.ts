// src/lib/payment/providers/paystack.provider.ts
import { left, right } from "@/src/lib/fp";
import { IPaymentService } from "@/src/application/services/payment.service.interface";
import { makeError, ApplicationError } from "@/src/entities/errors";
import {
  PaymentRequest,
  PaymentResponse,
  PaymentVerificationResponse,
  PaymentRefundResponse,
} from "@/src/entities/models/payment";
import env from "@/env";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

const makePaystackService = (): IPaymentService => {
  const headers = {
    Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const initializeTransaction = async (request: PaymentRequest) => {
    try {
      const response = await fetch(
        `${PAYSTACK_BASE_URL}/transaction/initialize`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            email: request.email,
            amount: request.amount,
            reference: request.reference,
            currency: request.currency ?? "NGN",
            callback_url: request.callback_url,
            metadata: request.metadata,
          }),
        },
      );

      const data = await response.json();

      if (!data.status) {
        return left(
          makeError("OperationError", "Failed to initialize transaction", {
            cause: data,
          }),
        );
      }

      return right<PaymentResponse>({
        success: true,
        authorizationUrl: data.data.authorization_url,
        reference: data.data.reference,
        message: "Payment initialized sucessfully",
      });
    } catch (error) {
      return left(
        makeError("BadGateway", "Failed to reach Paystack", {
          cause: error,
        }),
      );
    }
  };

  const verifyTransaction = async (reference: string) => {
    try {
      const response = await fetch(
        `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
        { method: "GET", headers },
      );

      const data = await response.json();

      if (!data.status) {
        return left(
          makeError("OperationError", "Failed to verify transaction", {
            cause: data,
          }),
        );
      }

      return right<PaymentVerificationResponse>({
        success: true,
        reference: data.data.reference,
        amount: data.data.amount,
        status: data.data.status,
        channel: data.data.channel,
        paidAt: data.data.paid_at,
      });
    } catch (error) {
      return left(
        makeError("BadGateway", "Failed to reach Paystack", {
          cause: error,
        }),
      );
    }
  };

  const refund = async (paymentReference: string, amount?: number) => {
    try {
      const body: Record<string, unknown> = {
        transaction: paymentReference,
      };

      if (amount !== undefined) {
        body.amount = amount;
      }

      const response = await fetch(`${PAYSTACK_BASE_URL}/refund`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!data.status) {
        return left(
          makeError("OperationError", "Failed to process refund", {
            cause: data,
          }),
        );
      }

      return right<PaymentRefundResponse>({
        reference: data.data.transaction.reference,
        success: true,
        amount: data.data.amount,
        message: data.message,
      });
    } catch (error) {
      return left(
        makeError("BadGateway", "Failed to reach Paystack", {
          cause: error,
        }),
      );
    }
  };

  return {
    initializeTransaction,
    verifyTransaction,
    refund,
  };
};

export default makePaystackService;
