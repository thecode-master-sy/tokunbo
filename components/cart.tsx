"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Handbag, X } from "lucide-react";
import CartEmpty from "@/components/cart-empty";
import { useCart } from "@/providers/cart-provider";
import CartItemComponent from "@/components/cart-item-component";
import Link from "next/link";

export default function Cart() {
  const items = useCart((state) => state.items);
  const totalPrice = useCart((state) => state.totalPrice);
  const totalItemsFn = useCart((state) => state.totalItems);
  const totalItems = totalItemsFn();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex gap-2 items-center cursor-pointer">
          <Handbag className="w-5 h-5 cursor-pointer" />
          <span className="hidden md:inline-block">Cart</span>{" "}
          {totalItems > 0 && <span>({totalItems})</span>}
        </button>
      </SheetTrigger>
      <SheetContent
        className=" h-svh flex gap-4 bg-background z-60"
        showCloseButton={false}
      >
        <SheetHeader className="border-b h-15 flex justify-between items-center w-full flex-row">
          <SheetTitle className="text-h4 font-normal">Your Cart</SheetTitle>

          <div className="flex gap-7 items-center">
            <Link
              href="/cart"
              className="text-hero underline underline-offset-4 "
            >
              View cart
            </Link>
            <SheetClose asChild>
              <X className="w-5 h-5 cursor-pointer" />
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="h-[calc(100svh_-_60px_-_16px)]">
          {items.length == 0 ? (
            <CartEmpty />
          ) : (
            <>
              <div className="overflow-y-auto h-[calc(100svh_-_156px_-_16px)] py-4  px-4 space-y-4 border">
                {items.map((item) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>

              <SheetFooter className="h-24 flex items-center justify-center">
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
                <p className="text-gray-600 text-[12px]">
                  Shipping and taxes would be calculated at checkout
                </p>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
