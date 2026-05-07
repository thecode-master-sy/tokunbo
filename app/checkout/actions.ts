// features/checkout/actions.ts
"use server";
import { makePresenter } from "@/lib/utils";
import { CreateOrderInput } from "@/src/entities/models/order";
import initializePaymentController from "@/src/interface-adapters/controllers/payment/initialize-payment.controller";

const presenter = makePresenter();

export const initializePaymentAction = async (input: CreateOrderInput) => {
  const result = await initializePaymentController(input);
  return presenter.formatEither(result);
};