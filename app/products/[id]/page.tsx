import ProductDetails from "@/app/products/_sections/product-details";
import RecommendedProducts from "@/app/products/_sections/recommended-products";

export default function Product() {
  return (
    <div className="px-4 lg:px-6">
      <ProductDetails />
      <RecommendedProducts />
    </div>
  );
}
