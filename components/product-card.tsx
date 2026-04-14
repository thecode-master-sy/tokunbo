import Image from "next/image";
import { Product } from "@/lib/product-types";
import { Handbag } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="p-3 bg-category rounded-md space-y-4 h-full">
        <div className="w-full aspect-[1/1.1] relative">
          <Image
            src={product.imageUrl}
            alt="bles digital air fryer"
            width={200}
            height={200}
            className="w-full h-full rounded-md"
          />
          <button className="absolute top-2 right-2 text-caps bg-category cursor-pointer w-8 h-8 flex justify-center items-center rounded-full">
            <Handbag className="w-4 h-4 cursor-pointer" />
          </button>
        </div>

        <div>
          <p className="font-bold">{product.price}</p>
          <p>{product.name}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <div className="uppercase text-[12px] font-mono bg-banner w-max px-3 py-1 rounded-full">
            <span>{product.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
