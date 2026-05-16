"use client";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="py-4 flex items-center w-full justify-between border-y">
      <div>
        <span>Quanity</span>
      </div>
      <div className="flex items-center max-w-[150px] justify-between px-4 py-3 gap-4">
        {/* Decrease Button */}
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="text-gray-600 hover:text-black transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={16} strokeWidth={1.5} />
        </button>

        {/* Number Display */}
        <span className=" text-black select-none">{quantity}</span>

        {/* Increase Button */}
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="text-gray-600 hover:text-black transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={16} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
