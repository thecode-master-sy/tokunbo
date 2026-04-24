"use client";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/quantity-selector";
import { useCart } from "@/providers/cart-provider";
import { Product } from "@/lib/product-types";
import { urlFor } from "@/lib/sanity/image-utility";
import { useState } from "react";

export default function ProductDetailActions({
  product,
}: {
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((state) => state.addItem);
  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <Button
        onClick={() =>
          addItem({
            id: product._id,
            name: product.name,
            price: product.price,
            image: urlFor(product.images[0]).width(600).url(),
            quantity,
          })
        }
        size={"lg"}
        className="w-full bg-hero text-foreground cursor-pointer rounded-full h-12 lg:max-w-[300px]"
      >
        Add to cart
      </Button>
    </div>
  );
}
