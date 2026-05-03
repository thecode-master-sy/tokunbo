import { TagIcon, InfoIcon } from "./checkout-icons";
import { CartItem } from "@/stores/cart-store";
import { Input } from "@/components/ui/input";

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
      <ul className="mb-4 flex flex-col gap-4 list-none lg:h-60 lg:overflow-y-auto py-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-[10px] border border-white border-3 bg-[#f0ece6] object-cover"
              />
              <span className="absolute -right-2 -top-2 flex h-[22px] w-[22px] border-2 border-white items-center justify-center rounded-md bg-[#333] text-[11px] font-bold text-white">
                {item.quantity}
              </span>
            </div>
            <span className="flex-1 text-sm">{item.name}</span>
            <span className="whitespace-nowrap text-sm">
              {fmt(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="my-4 h-px bg-border" />

      <div>
        <div className="flex gap-2.5">
          <Input
            placeholder="Discount code"
            value={discountCode}
            onChange={(e) => {
              setDiscountCode(e.target.value);
              setDiscountMsg(null);
            }}
            className="w-full px-3 py-3.5 h-auto bg-white border text-sm"
          />
          <button className="rounded-lg border border-[#c0bcb4] bg-white px-[18px] py-[11px] text-sm font-medium text-[#444]">
            Apply
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-[5px]">
            Subtotal · {totalItems} items
          </span>
          <span>{fmt(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-[5px]">
            Pickup in store <InfoIcon />
          </span>
          <span>free</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>−{fmt(discount)}</span>
          </div>
        )}

        {addTip && (
          <div className="flex items-center justify-between text-sm">
            <span>Tip</span>
            <span>{fmt(tipAmount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-[5px]">
            Estimated taxes <InfoIcon />
          </span>
          <span>{fmt(tax)}</span>
        </div>
      </div>

      <div className="my-4 h-px bg-border" />

      <div className="flex items-baseline justify-between">
        <span className="text-[17px] font-bold ">Total</span>
        <span className="text-xl font-bold">
          <small className="mr-[2px] text-xs font-normal">NGN </small>
          {fmt(total)}
        </span>
      </div>
    </>
  );
}
