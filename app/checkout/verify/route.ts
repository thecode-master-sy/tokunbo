import { NextRequest, NextResponse } from "next/server";
import { matchEither } from "@/src/lib/fp";
import { ApplicationError } from "@/src/entities/errors";
import verifyPaymentController from "@/src/interface-adapters/controllers/payment/verify-payment.controller";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference");

  if (!reference) {
    return NextResponse.redirect(
      `${APP_URL}/checkout/failed?reason=missing_reference`,
    );
  }

  const result = await verifyPaymentController(reference);

  return matchEither(
    (error: ApplicationError) =>
      NextResponse.redirect(
        `${APP_URL}/checkout/failed?reason=${encodeURIComponent(error.message)}`,
      ),
    () =>
      NextResponse.redirect(
        `${APP_URL}/checkout/success?reference=${reference}`,
      ),
  )(result);
}
