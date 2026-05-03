"use client";
import { useCart } from "@/providers/cart-provider";

export default function CartHeroSection() {
  const totalItemsFn = useCart((state) => state.totalItems);
  const totalItems = totalItemsFn();
  return (
    <div className="relative bg-hero">
      <div className="bg-hero px-4 pt-20 pb-15 space-y-4">
        <h1 className="text-h2 text-center -tracking-[0.05em] font-light">
          Your Cart Items ({totalItems})
        </h1>
      </div>
    </div>
  );
}
