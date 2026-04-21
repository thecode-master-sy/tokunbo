import ProductCard from "@/components/product-card";
import { getBestSellingProducts } from "@/lib/dal";
import Link from "next/link";

export default async function BestSellingProductsSection() {
  const bestSellingProducts = await getBestSellingProducts();

  return (
    <div className="px-4 pt-7">
      <div className="flex items-center justify-between">
        <h2 className="text-h3 -tracking-[0.01em]">Best selling products</h2>
        <Link href="/best-sellers" className="underline opacity-80 ">
          <span className="hidden md:inline">See more best sellers</span>
          <span className="md:hidden underline">See more</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {bestSellingProducts?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
