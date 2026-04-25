import ProductCard from "@/components/product-card";
import { Product } from "@/lib/product-types";
import Link from "next/link";

export default function RecommendedProducts({
  recommendedProducts,
}: {
  recommendedProducts: Product[];
}) {
  return (
    <div className="px-4 pt-20">
      <div className="flex items-center justify-between">
        <h2 className="text-h3 -tracking-[0.01em]">Recommended Products</h2>
        <Link href="/best-sellers" className="text-underline text-70">
          <span className="hidden md:inline-block"> See more</span>
          <span className="md:hidden">See more</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {recommendedProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
