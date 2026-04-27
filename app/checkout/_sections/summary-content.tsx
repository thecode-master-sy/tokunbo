import { TagIcon, InfoIcon } from "./checkout-icons";
import { CartItem } from "@/stores/cart-store";

const fmt = (n: number) =>
  "₦" +
  n.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export function SummaryContent({
  cartItems,
  subtotal,
  tax,
  total,
  totalItems,
  discount,
  discountCode,
  discountMsg,
  showDiscountInput,
  setShowDiscountInput,
  setDiscountCode,
  setDiscountMsg,
  applyDiscount,
  addTip,
  setAddTip,
  tipAmount,
}: {
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  totalItems: number;
  discount: number;
  discountCode: string;
  discountMsg: { ok: boolean; text: string } | null;
  showDiscountInput: boolean;
  setShowDiscountInput: (v: boolean) => void;
  setDiscountCode: (v: string) => void;
  setDiscountMsg: (v: { ok: boolean; text: string } | null) => void;
  applyDiscount: () => void;
  addTip: boolean;
  setAddTip: (v: boolean) => void;
  tipAmount: number;
}) {
  return (
    <>
      <ul className="mb-5 flex flex-col gap-4 list-none">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-[10px] border border-[#d4d0ca] bg-[#f0ece6] object-cover"
              />
              <span className="absolute -right-2 -top-2 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#333] text-[11px] font-bold text-white">
                {item.quantity}
              </span>
            </div>
            <span className="flex-1 text-[13.5px] leading-5 text-[#333]">
              {item.name}
            </span>
            <span className="whitespace-nowrap text-[13.5px] font-semibold text-[#111]">
              {fmt(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="my-4 h-px bg-[#d4d0ca]" />

      {!showDiscountInput ? (
        <button
          onClick={() => setShowDiscountInput(true)}
          className="mb-4 flex items-center gap-2 bg-transparent p-0 text-sm font-medium text-[#111] underline underline-offset-2"
        >
          <TagIcon /> Add discount
        </button>
      ) : (
        <div className="mb-1">
          <div className="mb-1 flex gap-2.5">
            <input
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => {
                setDiscountCode(e.target.value);
                setDiscountMsg(null);
              }}
              className="flex-1 rounded-lg border border-[#c8c4be] bg-white px-4 py-[11px] text-sm text-[#111] outline-none"
            />
            <button className="rounded-lg border border-[#c0bcb4] bg-white px-[18px] py-[11px] text-sm font-medium text-[#444]">
              Apply
            </button>
          </div>
          {discountMsg && (
            <p
              className={`mt-1 text-xs ${discountMsg.ok ? "text-green-600" : "text-red-600"}`}
            >
              {discountMsg.text}
            </p>
          )}
        </div>
      )}

      <div className="my-4 h-px bg-[#d4d0ca]" />

      <div className="flex flex-col gap-[11px]">
        <div className="flex items-center justify-between text-sm text-[#555]">
          <span className="flex items-center gap-[5px]">
            Subtotal · {totalItems} items
          </span>
          <span>{fmt(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-[#555]">
          <span className="flex items-center gap-[5px]">
            Pickup in store <InfoIcon />
          </span>
          <span className="font-medium text-[#111]">FREE</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>−{fmt(discount)}</span>
          </div>
        )}

        {addTip && (
          <div className="flex items-center justify-between text-sm text-[#555]">
            <span>Tip</span>
            <span>{fmt(tipAmount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-[#555]">
          <span className="flex items-center gap-[5px]">
            Estimated taxes <InfoIcon />
          </span>
          <span>{fmt(tax)}</span>
        </div>
      </div>

      <div className="my-4 h-px bg-[#d4d0ca]" />

      <div className="flex items-baseline justify-between">
        <span className="text-[17px] font-bold text-[#111]">Total</span>
        <span className="text-xl font-bold text-[#111]">
          <small className="mr-[2px] text-xs font-normal text-[#888]">
            NGN{" "}
          </small>
          {fmt(total)}
        </span>
      </div>
    </>
  );
}
