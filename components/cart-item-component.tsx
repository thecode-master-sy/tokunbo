"use client";
import Image from "next/image";
import { useCart } from "@/providers/cart-provider";
import { Minus, Plus, X } from "lucide-react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartItemComponent({
  item: { id, name, price, image, quantity },
}: {
  item: CartItem;
}) {
  const increaseQty = useCart((state) => state.increaseQty);
  const decreaseQty = useCart((state) => state.decreaseQty);
  const removeItem = useCart((state) => state.removeItem);

  return (
    <div className="p-3 rounded-sm bg-category flex gap-4 items-center">
      {/* 1. Optimized Image Container */}
      <div className="relative w-[110px] aspect-square shrink-0 overflow-hidden rounded-sm">
        <Image
          src={image}
          alt={name}
          fill
          sizes="100px"
          className="object-cover transition-transform hover:scale-105"
        />
      </div>

      {/* 2. Content Section */}
      <div className="space-y-4 flex-1">
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">{name}</h3>
          <p className="opacity-80">₦{(price * quantity).toLocaleString()}</p>
        </div>

        <div className="flex gap-2">
          <div className="flex w-full items-center bg-banner rounded-sm gap-1">
            <button
              className="p-2 flex-1 flex items-center justify-center"
              onClick={() => decreaseQty(id)}
              disabled={quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </button>

            <span className="w-4 text-center">{quantity}</span>

            <button className="p-2 flex-1 flex items-center justify-center" onClick={() => increaseQty(id)}>
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            className="w-full bg-banner flex justify-center items-center py-1 rounded-sm"
            onClick={() => removeItem(id)}
          >
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
