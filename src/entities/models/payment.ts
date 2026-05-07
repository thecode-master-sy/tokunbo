export type PaymentRequest = {
  email: string;
  amount: number;
  reference: string;
  currency?: string;
  callback_url?: string;
  metadata?: {
    orderNumber: string;
    [key: string]: unknown;
  };
};

export type PaymentResponse = {
  success: boolean;
  authorizationUrl?: string;
  reference?: string;
  message?: string;
};

export type PaymentVerificationResponse = {
  success: boolean;
  reference: string;
  amount: number;
  status: "success" | "failed" | "abandoned" | "pending";
  channel: "card" | "bank" | "ussd" | "qr" | "mobile_money" | "bank_transfer";
  paidAt: string;
  message?: string;
};

export type PaymentRefundResponse = {
  reference: string;
  success: boolean;
  amount: number;
  message?: string;
};
