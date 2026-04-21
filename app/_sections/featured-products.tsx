import ProductCard from "@/components/product-card";
import { Product } from "@/lib/product-types";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/dal";

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <div className="px-4 pt-7">
      <div className="flex items-center justify-between">
        <h2 className="text-h3 -tracking-[0.01em]">Featured products</h2>
        <Link href="/best-sellers" className="underline opacity-80 ">
          <span className="hidden md:inline">See more featured products</span>
          <span className="md:hidden underline">See more</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {featuredProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
