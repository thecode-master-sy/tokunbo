import HeroSection from "@/app/_sections/hero";
import ProductCategories from "@/app/_sections/product_categories";
import BestSellingProductsSection from "@/app/_sections/best-selling-products";
import NewestArrivals from "./_sections/new-arrivals";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductCategories />
      <BestSellingProductsSection />
      <NewestArrivals />
    </div>
  );
}
