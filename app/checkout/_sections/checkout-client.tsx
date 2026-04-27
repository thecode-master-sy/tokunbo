"use client";

import { useState } from "react";
import { FloatInput } from "@/app/checkout/_sections/float-input";
import { SectionHead } from "@/app/checkout/_sections/section-head";
import { MiniCard } from "@/app/checkout/_sections/mini-card";
import { SummaryContent } from "@/app/checkout/_sections/summary-content";
import {
  ChevronRight,
  ChevronDown,
  InfoIcon,
  LockIcon,
  ClockIcon,
  TagIcon,
  PinIcon,
  BagIcon,
} from "@/app/checkout/_sections/checkout-icons";
import { useCart } from "@/providers/cart-provider";

interface DeliveryLocation {
  id: number;
  storeName: string;
  address: string;
  readyTime: string;
  fee: number;
}

const LOCATIONS: DeliveryLocation[] = [
  {
    id: 1,
    storeName: "Yoghurt and Granola",
    address:
      "#ABUJA PICKUP - 14 Musa Danjuma street by Zardock Heights School, 69 Road Gwarinpa., #LAGOS MAINLAND PICKUP- No. 4 Bunmi Joseph street, Gbagada Phase 2, Kosofe, #LAGOS ISLAND PICKUP - 4 Muritala Eletu Way, Osapa London, Lekki LA, Nigeria",
    readyTime: "Usually ready in 1 hour",
    fee: 0,
  },
  {
    id: 2,
    storeName: "Yoghurt and Granola – VI",
    address:
      "#LAGOS ISLAND PICKUP - 22 Akin Adesola Street, Victoria Island, Lagos, Nigeria",
    readyTime: "Usually ready in 2 hours",
    fee: 0,
  },
];

const TAX_RATE = 0.002;
const TIP_AMOUNT = 500;

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const fmt = (n: number) =>
  "₦" +
  n.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function CheckoutClient() {
  const [email, setEmail] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [locationId, setLocationId] = useState(1);
  const [showAllLocs, setShowAllLocs] = useState(false);
  const [payMethod, setPayMethod] = useState<"paystack" | "nomba">("paystack");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
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
  const visibleLocs = showAllLocs ? LOCATIONS : [LOCATIONS[0]];
  const hiddenCount = LOCATIONS.length - 1;

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

  return (
    <div className="min-h-screen bg-background text-[#111]">
      <div className="hidden border-b border-[#ddd8d0] bg-[#eeeae4] max-[1028px]:block">
        <button
          onClick={() => setSummaryOpen((v) => !v)}
          className="flex w-full items-center justify-between px-5 py-3.5 text-sm font-medium"
        >
          <span className="flex items-center gap-2 text-blue-600">
            <BagIcon />
            Order summary
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
          <span className="text-[15px] font-bold text-[#111]">
            {fmt(total)}
          </span>
        </button>

        {summaryOpen && (
          <div className="border-t border-[#ddd8d0] px-5 pb-1 pt-5">
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

      <div className="mx-auto grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_500px]">
        <main className="w-full px-11 py-11 lg:justify-self-end  max-w-[600px] mx-auto">
          <section className="mb-9">
            <SectionHead title="Contact" />
            <FloatInput
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
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
            <SectionHead
              title="Delivery"
              right={
                <span className="flex items-center gap-1.5 text-[13px] font-medium text-blue-600">
                  <PinIcon /> Nigeria
                </span>
              }
            />
            <p className="mb-3.5 text-[13.5px] text-[#666]">
              There are {LOCATIONS.length} locations with your item
            </p>

            <div className="flex flex-col gap-2.5">
              {visibleLocs.map((loc) => (
                <label
                  key={loc.id}
                  className={`flex items-start gap-3 rounded-[10px] border bg-white px-4 py-3.5 cursor-pointer ${
                    locationId === loc.id ? "border-[#111]" : "border-[#d4d0ca]"
                  }`}
                >
                  <input
                    type="radio"
                    name="loc"
                    checked={locationId === loc.id}
                    onChange={() => setLocationId(loc.id)}
                    className="mt-[3px] shrink-0 accent-[#111]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex gap-2">
                      <span className="text-sm font-semibold">
                        {loc.storeName}
                      </span>
                      <span className="ml-auto text-sm font-semibold">
                        {loc.fee === 0 ? "FREE" : fmt(loc.fee)}
                      </span>
                    </div>
                    <p className="mb-1.5 text-[13px] leading-5 text-[#666]">
                      {loc.address}
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-[#888]">
                      <ClockIcon /> {loc.readyTime}
                    </p>
                  </div>
                </label>
              ))}

              {!showAllLocs && hiddenCount > 0 && (
                <button
                  onClick={() => setShowAllLocs(true)}
                  className="flex items-center justify-between rounded-[10px] border border-[#d4d0ca] bg-white px-4 py-3.5 text-sm font-medium text-blue-600"
                >
                  {hiddenCount} more location{hiddenCount > 1 ? "s" : ""}{" "}
                  <ChevronRight />
                </button>
              )}
            </div>
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
            <SectionHead title="Billing address" />

            <div className="relative mb-3">
              <span className="pointer-events-none absolute left-4 top-2 z-10 text-[10.5px] text-[#888]">
                Country/Region
              </span>
              <select
                defaultValue="Nigeria"
                className="w-full appearance-none rounded-lg border border-[#d4d0ca] bg-white px-4 pb-2 pt-5 text-[15px] text-[#111] outline-none"
              >
                <option>Nigeria</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#666]">
                <ChevronDown />
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-3">
              <FloatInput
                id="fname"
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
              <FloatInput
                id="lname"
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>

            <FloatInput
              id="addr"
              label="Shipping Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="street-address"
              className="mb-3"
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 mt-3">
              <FloatInput
                id="city"
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoComplete="address-level2"
              />

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-2 z-10 text-[10.5px] text-[#888]">
                  State
                </span>
                <select
                  value={stateVal}
                  onChange={(e) => setStateVal(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-[#d4d0ca] bg-white px-4 pb-2 pt-5 text-[15px] text-[#111] outline-none"
                >
                  <option value="" />
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#666]">
                  <ChevronDown />
                </span>
              </div>
            </div>

            <div className="relative mt-3">
              <FloatInput
                id="phone"
                label="Phone (required)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                autoComplete="tel"
              />
              <div className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1.5 text-[18px]">
                <InfoIcon />
                <span>🇳🇬</span>
                <ChevronDown />
              </div>
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
            onClick={() => {}}
            disabled={paying}
            className="mb-6 flex w-full items-center justify-center rounded-[10px] bg-hero p-[17px] text-[16px] font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
          >
            {paying ? (
              <span className="h-[22px] w-[22px] animate-spin rounded-full border-[2.5px] border-white/30 border-t-white" />
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
        </main>

        <aside className="hidden border-l border-[#ddd8d0] bg-[#eeeae4] border px-11 py-[44px] lg:block">
          <div className="sticky top-8">
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
