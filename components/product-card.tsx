import Image from "next/image";
import { Product } from "@/lib/product-types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="p-3 bg-category rounded-md">
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
        <span>{product.name}</span>
      </div>
    </div>
  );
}
