import ProductCard from "@/components/product-card";
import { Product } from "@/lib/product-types";
import Link from "next/link";

const newestArrivals: Product[] = [
  {
    name: "BLES Digital Air Fryer - Stainless Steel & Black",
    imageUrl: "/images/product-images/Bles-digital-air-fryer.jpeg",
    price: "₦5,000",
    category: "Air fryer",
  },
  {
    name: "Commercial Grade 3200ml Stainless Steel Blender",
    imageUrl: "/images/product-images/commercial-grade-blend.jpeg",
    price: "₦12,000",
    category: "Blender",
  },
  {
    name: "Universal Tempered Glass Pot Lids (Set of Multiple Sizes)",
    imageUrl: "/images/product-images/tempered-pot-lids.jpeg",
    price: "₦4,000",
    category: "Pot cover",
  },
  {
    name: "Vibrant Multi-Color Non-Stick Stockpot Set",
    imageUrl: "/images/product-images/multi-color-stock-pot.jpeg",
    price: "₦2,000",
    category: "Pot",
  },
];

export default function NewestArrivals() {
  return (
    <div className="px-4 pt-7">
      <div className="flex items-center justify-between">
        <h2 className="text-h3 -tracking-[0.01em]">Newest arrivals</h2>
        <Link href="/best-sellers" className="underline text-70">
          See newest arrivals
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {newestArrivals.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
