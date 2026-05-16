"use client";

import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/quantity-selector";
import { useCart } from "@/providers/cart-provider";
import { Product } from "@/lib/product-types";
import { urlFor } from "@/lib/sanity/image-utility";
import { useMemo, useState } from "react";

export default function ProductDetailActions({
  product,
}: {
  product: Product;
}) {
  const addItem = useCart((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);

  const sizes = useMemo(() => {
    return Array.from(
      new Set(product.variants?.map((variant) => variant.size)),
    );
  }, [product.variants]);

  const knobTypes = useMemo(() => {
    return Array.from(
      new Set(product.variants?.map((variant) => variant.knobType)),
    );
  }, [product.variants]);

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedKnobType, setSelectedKnobType] = useState(knobTypes[0]);

  const selectedVariant = product.variants?.find(
    (variant) =>
      variant.size === selectedSize && variant.knobType === selectedKnobType,
  );

  const selectedPrice = selectedVariant?.price ?? product.price;
  const isOutOfStock = !selectedVariant || selectedVariant.stock < 1;

  return (
    <div className="flex flex-col border-b">
      <div className="grid gap-2 py-7">
        {/* Size selector */}
        {sizes.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-medium">Size</p>

              <div className="flex">
                {selectedSize && (
                  <p className="text-sm text-gray-500">{selectedSize}</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => {
                const isActive = selectedSize === size;

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-16 rounded-full border px-4 py-1 text-sm transition ${
                      isActive
                        ? " bg-banner"
                        : "border-gray-300 bg-category hover:border-hero"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <Button
          variant="link"
          className="cursor-pointer text-underline text-hero ml-auto"
        >
          Size guide
        </Button>
      </div>

      {/* Knob selector */}
      {knobTypes.length > 0 && (
        <div className="space-y-3 border-t py-7">
          <div className="flex items-center justify-between">
            <p className="font-medium">Knob type</p>
            {selectedKnobType && (
              <p className="text-sm capitalize text-gray-500">
                {selectedKnobType}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {knobTypes.map((knobType) => {
              const isActive = selectedKnobType === knobType;

              return (
                <button
                  key={knobType}
                  type="button"
                  onClick={() => setSelectedKnobType(knobType)}
                  className={`rounded-xl border px-4 py-3 text-sm capitalize transition ${
                    isActive
                      ? "border-gray-300 bg-banner"
                      : "border-gray-300 bg-category text-black hover:border-black"
                  }`}
                >
                  {knobType} knob
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Price from selected variant */}
      <div className="border-t border-gray-200 py-7">
        <p className="text-sm text-gray-500">Price</p>
        <p className="mt-1 text-2xl font-semibold">₦{selectedPrice}</p>

        {selectedVariant && (
          <p className="mt-1 text-sm text-gray-500">
            {selectedVariant.stock} left in stock
          </p>
        )}
      </div>

      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      <Button
        disabled={isOutOfStock}
        onClick={() => {
          if (!selectedVariant) return;

          addItem({
            id: product._id,
            name: product.name,
            price: selectedPrice,
            image: urlFor(product.images[0]).width(600).url(),
            quantity,
          });
        }}
        size="lg"
        className="w-full bg-hero text-foreground cursor-pointer rounded-full h-12 uppercase font-medium -tracking-[0.01em] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isOutOfStock ? "Out of stock" : "Add to cart"}
      </Button>
    </div>
  );
}
