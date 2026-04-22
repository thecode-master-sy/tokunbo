import { Product } from "@/lib/product-types";
import ProductCard from "@/components/product-card";
import Pagination from "@/components/pagination";

type ProductDisplayProps = {
  products: Product[];
  currentPage: number;
  totalPages: number;
};

export default function ProductDisplay({
  products,
  currentPage,
  totalPages,
}: ProductDisplayProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
