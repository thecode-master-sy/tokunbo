"use client";
import Image from "next/image";
import { Product } from "@/lib/product-types";
import { Handbag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/providers/cart-provider";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);

  return (
    <div className="p-3 bg-category rounded-md space-y-4 h-full relative">
      <button
        onClick={() =>
          addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageUrl,
          })
        }
        className="absolute z- top-4 right-4 text-caps bg-category cursor-pointer w-8 h-8 flex justify-center items-center rounded-full"
      >
        <Handbag className="w-4 h-4 cursor-pointer" />
      </button>
      <Link href={`/products/${product.id}`}>
        <div className="w-full aspect-[1/1.1]">
          <Image
            src={product.imageUrl}
            alt="bles digital air fryer"
            width={200}
            height={200}
            className="w-full h-full rounded-md"
          />
        </div>

        <div>
          <p className="font-bold">{`₦${product.price}`}</p>
          <p>{product.name}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <div className="uppercase text-[12px] font-mono bg-banner w-max px-3 py-1 rounded-full">
            <span>{product.category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
