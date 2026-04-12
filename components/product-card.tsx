import Image from "next/image";
import { Product } from "@/lib/product-types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="p-3 bg-category rounded-md space-y-4">
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
        <p className="font-bold">{product.price}</p>
        <p>{product.name}</p>
      </div>
    </div>
  );
}
