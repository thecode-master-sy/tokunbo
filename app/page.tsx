import Image from "next/image";
import HeroSection from "@/app/_sections/hero";
import ProductCategories from "@/app/_sections/product_categories";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductCategories />
    </div>
  );
}
