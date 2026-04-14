"use client";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center min-w-[120px] rounded-full  justify-between border border-gray-400  px-4 py-3">
      {/* Decrease Button */}
      <button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className="text-gray-600 hover:text-black transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus size={20} strokeWidth={1.5} />
      </button>

      {/* Number Display */}
      <span className=" text-black select-none">{quantity}</span>

      {/* Increase Button */}
      <button
        onClick={() => setQuantity(quantity + 1)}
        className="text-gray-600 hover:text-black transition-colors"
        aria-label="Increase quantity"
      >
        <Plus size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
}
