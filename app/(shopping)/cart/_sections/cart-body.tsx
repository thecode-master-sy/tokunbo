"use client";
import { useCart } from "@/providers/cart-provider";
import CartEmpty from "@/components/cart-empty";
import CartItemComponent from "@/components/cart-item-component";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CartBody() {
  const items = useCart((state) => state.items);
  const totalPrice = useCart((state) => state.totalPrice);
  return (
    <div className="py-10 w-full relative grid md:grid-cols-[1.1fr_1fr] md:justify-between gap-y-4 gap-x-16 px-4">
      <div className="w-full ">
        {items.length == 0 ? (
          <div>
            <h3>Your Cart is empty.</h3>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemComponent key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 sticky top-0">
        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* Order Notes Section */}
          <div className="space-y-2">
            <label
              htmlFor="order-notes"
              className="block text-sm tracking-wide"
            >
              ORDER NOTES
            </label>
            <textarea
              id="order-notes"
              className="w-full h-32 border-b border-gray-300 focus:outline-none focus:border-black resize-none"
            />
          </div>

          {/* Checkout Section */}
          <div className="space-y-3">
            <Button
              size="lg"
              type="submit"
              className="w-full h-12 bg-hero text-black hover:bg-amber-600 rounded-full cursor-pointer uppercase font-medium"
            >
              <Link
                href="/checkout"
                className="w-full h-full inline-flex items-center justify-center"
              >
                <span>{` Checkout - ₦${totalPrice().toLocaleString()}`}</span>
              </Link>
            </Button>

            <div className="text-center text-xs text-gray-500">
              Shipping & taxes calculated at checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
