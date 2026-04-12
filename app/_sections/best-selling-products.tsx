import ProductCard from "@/components/product-card";
import { Product } from "@/lib/product-types";

const bestSellingProducts: Product[] = [
  {
    name: "BLES Digital Air Fryer - Stainless Steel & Black",
    imageUrl: "/images/product-images/Bles-digital-air-fryer.jpeg",
    price: 5000,
  },
  {
    name: "Commercial Grade 3200ml Stainless Steel Blender",
    imageUrl: "/images/product-images/commercial-grade-blend.jpeg",
    price: 12000,
  },
  {
    name: "Universal Tempered Glass Pot Lids (Set of Multiple Sizes)",
    imageUrl: "/images/product-images/tempered-pot-lids.jpeg",
    price: 4000,
  },
  {
    name: "Vibrant Multi-Color Non-Stick Stockpot Set",
    imageUrl: "/images/product-images/multi-color-stock-pot.jpeg",
    price: 2000,
  },
];

export default function BestSellingProductsSection() {
  return (
    <div className="px-4 pt-7">
      <h2 className="text-h3 -tracking-[0.01em]">Best selling products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {bestSellingProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
