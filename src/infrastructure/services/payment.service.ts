import { IPaymentService } from "@/src/application/services/payment.service.interface";
import makePaystackService from "./paystack.service";

type PaymentProvider = "paystack";

const makePaymentService = (provider: PaymentProvider): IPaymentService => {
  return makePaystackService();
};

export default makePaymentService;
