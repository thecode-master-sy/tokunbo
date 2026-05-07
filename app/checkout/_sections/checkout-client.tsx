"use client";

import { useState } from "react";
import { FloatInput } from "@/app/checkout/_sections/float-input";
import { SectionHead } from "@/app/checkout/_sections/section-head";
import { MiniCard } from "@/app/checkout/_sections/mini-card";
import { SummaryContent } from "@/app/checkout/_sections/summary-content";
import { ChevronDown, LockIcon } from "@/app/checkout/_sections/checkout-icons";
import { useCart } from "@/providers/cart-provider";
import { Input } from "@/components/ui/input";
import DeliveryForm from "./delivery-form";
import { initializePaymentAction } from "../actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { showErrorToast } from "@/components/showError";

const TAX_RATE = 0.002;
const TIP_AMOUNT = 500;

const fmt = (n: number) =>
  "₦" +
  n.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export type CheckoutForm = {
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  address: string;
  phone: string;
  city: string;
  state: string;
};

const defaultFormValue = {
  customerEmail: "",
  customerFirstName: "",
  customerLastName: "",
  address: "",
  phone: "",
  city: "",
  state: "",
};

export default function CheckoutClient() {
  const [checkoutForm, setCheckoutForm] =
    useState<CheckoutForm>(defaultFormValue);
  const [marketing, setMarketing] = useState(false);
  const [payMethod, setPayMethod] = useState<"paystack" | "nomba">("paystack");
  const [addTip, setAddTip] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountMsg, setDiscountMsg] = useState<{
    ok: boolean;
    text: string;
  } | null>(null);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [paying, setPaying] = useState(false);
  const CART_ITEMS = useCart((state) => state.items);
  const subtotal = useCart((state) => state.totalPrice());
  const tax = Math.round(subtotal * TAX_RATE);
  const tipAmt = addTip ? TIP_AMOUNT : 0;
  const total = subtotal + tax + tipAmt - discount;
  const totalItemsFn = useCart((state) => state.totalItems);
  const totalItems = totalItemsFn();

  const applyDiscount = () => {
    if (!discountCode.trim()) {
      setDiscountMsg({ ok: false, text: "Please enter a code." });
      return;
    }
    if (discountCode.toUpperCase() === "BERRY10") {
      const d = Math.round(subtotal * 0.1);
      setDiscount(d);
      setDiscountMsg({ ok: true, text: `Code applied — you saved ${fmt(d)}` });
    } else {
      setDiscount(0);
      setDiscountMsg({ ok: false, text: "Invalid discount code." });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPaying(true);

    const input = {
      ...checkoutForm,
      items: CART_ITEMS.map((item) => ({
        sanityProductId: item.id,
        sanityProductName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        imageUrl: item.image,
      })),
      country: "Nigeria",
      discountAmount: discount,
    };

    console.log(input);

    const response = await initializePaymentAction(input);

    if (response.error) {
      setPaying(false);
      console.log(response.errorType);
      showErrorToast({ errorDetail: response.message });
    }

    if (response.data) {
      setPaying(false);
      if (response.data.authorizationUrl) {
        window.location.href = response.data.authorizationUrl;
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="lg:hidden">
        <button
          onClick={() => setSummaryOpen((v) => !v)}
          className=" w-full flex   bg-category border-b justify-center"
        >
          <span className="flex w-full items-center justify-between  min-h-[4.5rem] sm:max-w-[580px] px-3.5 py-2">
            <span className="flex items-center gap-2">
              <span className="text-[#414042]">Order summary</span>
              <span
                className={
                  summaryOpen
                    ? "rotate-180 transition-transform"
                    : "transition-transform"
                }
              >
                <ChevronDown />
              </span>
            </span>

            <span className="text-[18px] font-bold">{fmt(total)}</span>
          </span>
        </button>

        {summaryOpen && (
          <div className="border-t border-[#ddd8d0] bg-category px-3.5 pt-2 pb-4">
            <SummaryContent
              cartItems={CART_ITEMS}
              subtotal={subtotal}
              tax={tax}
              total={total}
              totalItems={totalItems}
              discount={discount}
              discountCode={discountCode}
              discountMsg={discountMsg}
              showDiscountInput={showDiscountInput}
              setShowDiscountInput={setShowDiscountInput}
              setDiscountCode={setDiscountCode}
              setDiscountMsg={setDiscountMsg}
              applyDiscount={applyDiscount}
              addTip={addTip}
              setAddTip={setAddTip}
              tipAmount={TIP_AMOUNT}
            />
          </div>
        )}
      </div>

      <div className="mx-auto grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(min-content,calc(50%+5rem))_1fr]">
        <main className="flex lg:justify-end justify-center">
          <form
            className="w-full px-3.5 py-11 lg:px-9 sm:max-w-[580px]"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <section className="mb-9">
              <div className="space-y-4">
                <h3 className="text-[20px] font-medium">Contact</h3>

                <Input
                  value={checkoutForm.customerEmail}
                  placeholder="Email"
                  className="w-full px-3 py-3.5 h-auto bg-white border text-sm"
                  onChange={(e) =>
                    setCheckoutForm((prev) => ({
                      ...prev,
                      customerEmail: e.target.value,
                    }))
                  }
                />
              </div>
              <label className="mt-4 flex items-center gap-2 text-sm text-[#444]">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="h-4 w-4 shrink-0 accent-[#111]"
                />
                <span>Email me with news and offers</span>
              </label>
            </section>

            <section className="mb-9">
              <DeliveryForm
                formValues={checkoutForm}
                setFormValues={setCheckoutForm}
              />
            </section>

            <section className="mb-9">
              <SectionHead title="Payment" />
              <p className="mb-3.5 flex items-center gap-1.5 text-[13.5px] text-[#666]">
                <LockIcon /> All transactions are secure and encrypted.
              </p>

              <div className="overflow-hidden rounded-[10px] border border-[#d4d0ca] bg-white">
                <label
                  className={`flex items-center gap-3 px-4 py-3.5 border-b border-[#e8e4de] cursor-pointer ${payMethod === "paystack" ? "bg-[#eef2ff]" : ""}`}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={payMethod === "paystack"}
                    onChange={() => setPayMethod("paystack")}
                    className="shrink-0 accent-blue-600"
                  />
                  <span className="flex-1 text-sm font-medium">Paystack</span>
                  <div className="flex items-center gap-1.5">
                    <MiniCard label="MC" textColor="#fff" bg="#EB001B" />
                    <MiniCard label="VISA" textColor="#fff" bg="#00579F" />
                    <MiniCard label="MTN" textColor="#000" bg="#FFC107" />
                    <span className="rounded bg-[#f0ece6] px-1.5 py-[2px] text-[12px] font-semibold text-[#666]">
                      +5
                    </span>
                  </div>
                </label>

                {payMethod === "paystack" && (
                  <div className="border-b border-[#e8e4de] bg-[#f8f7f5] px-4 py-3 text-center text-[13.5px] text-[#555]">
                    You&apos;ll be redirected to Paystack to complete your
                    purchase.
                  </div>
                )}
              </div>
            </section>

            <section className="mb-9">
              <SectionHead title="Add tip" />
              <label className="flex items-center gap-3 rounded-[10px] border border-[#d4d0ca] bg-white px-4 py-3.5 text-sm text-[#333]">
                <input
                  type="checkbox"
                  checked={addTip}
                  onChange={(e) => setAddTip(e.target.checked)}
                  className="h-[17px] w-[17px] shrink-0 accent-[#111]"
                />
                <span>Show your support for the team at Blessing Tokunbo</span>
              </label>
            </section>

            <button
              disabled={paying}
              type="submit"
              className="mb-6 flex w-full items-center justify-center rounded-[10px] bg-hero p-[17px] text-[16px] font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
            >
              {paying ? (
                <>
                  <Loader2 size={18} className=" animate-spin mr-2" />{" "}
                  Processing...
                </>
              ) : (
                "Pay now"
              )}
            </button>

            <div className="flex flex-wrap gap-5">
              {["Refund policy", "Shipping", "Terms of service"].map((link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase().replace(" ", "-")}`}
                  className="text-[13px] text-blue-600 no-underline"
                >
                  {link}
                </a>
              ))}
            </div>
          </form>
        </main>

        <aside className="hidden border-l border-[#ddd8d0] bg-[#eeeae4]  lg:block">
          <div className="sticky top-8 px-9 py-11 max-w-[420px]">
            <SummaryContent
              cartItems={CART_ITEMS}
              subtotal={subtotal}
              tax={tax}
              total={total}
              totalItems={totalItems}
              discount={discount}
              discountCode={discountCode}
              discountMsg={discountMsg}
              showDiscountInput={showDiscountInput}
              setShowDiscountInput={setShowDiscountInput}
              setDiscountCode={setDiscountCode}
              setDiscountMsg={setDiscountMsg}
              applyDiscount={applyDiscount}
              addTip={addTip}
              setAddTip={setAddTip}
              tipAmount={TIP_AMOUNT}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
