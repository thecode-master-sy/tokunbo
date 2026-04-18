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

export default function Cart() {
  const items = useCart((state) => state.items);
  const totalPrice = useCart((state) => state.totalPrice);
  const totalItems = useCart((state) => state.totalItems);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex gap-2 items-center cursor-pointer">
          <Handbag className="w-5 h-5 cursor-pointer" />
          {totalItems() > 0 ? (
            <span>{`Cart (${totalItems()})`}</span>
          ) : (
            <span>Cart</span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className=" h-svh flex gap-4" showCloseButton={false}>
        <SheetHeader className="border-b h-15 flex justify-between items-center w-full flex-row">
          <SheetTitle className="text-h4 font-normal">Your Cart</SheetTitle>

          <SheetClose asChild>
            <X className="w-5 h-5 cursor-pointer" />
          </SheetClose>
        </SheetHeader>
        <div className="h-[calc(100svh_-_60px_-_16px)]">
          {items.length == 0 ? (
            <CartEmpty />
          ) : (
            <>
              <div className="overflow-y-auto h-[calc(100svh_-_132px_-_16px)] py-4  px-4 space-y-4 border">
                {items.map((item) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>

              <SheetFooter className="h-18 flex items-center justify-center">
                <Button
                  size="lg"
                  type="submit"
                  className="w-full h-12 bg-hero text-black rounded-full cursor-pointer"
                >
                  {` Checkout - ₦${totalPrice().toLocaleString()}`}
                </Button>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
