import ProductDetails from "@/app/products/_sections/product-details";
import { getSingleProduct } from "@/lib/dal";
//import RecommendedProducts from "@/app/products/_sections/recommended-products";

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getSingleProduct(id);
  return (
    <div className="px-4 lg:px-6">
      <ProductDetails product={product} />
      {/*<RecommendedProducts />*/}
    </div>
  );
}
