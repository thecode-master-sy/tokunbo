"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CartEmpty() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4">
        <p className="text-center">Your cart is empty.</p>
      </div>

      {/* Middle Section: This acts as a spacer to push content to the bottom */}
      <div className="flex-1" />

      {/* Bottom Section: New Arrivals & Button */}
      <div className="mt-auto">
        <div className="p-4">
          <h3 className="text-h4">Explore our new arrivals</h3>
        </div>

        {/* Optimized Image Container */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src="/images/product-images/newest.jpeg"
            alt="newest arrival"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
            priority // Loads this image faster
          />
          <span className="px-4 uppercase py-1 bg-category rounded-full absolute top-4 left-4 font-mono text-[11px]">
            New arrival
          </span>
        </div>

        <div className="px-4 py-6">
          <Button
            size="lg"
            className="rounded-full bg-hero w-full text-black cursor-pointer h-12 font-normal"
          >
            Continue shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
