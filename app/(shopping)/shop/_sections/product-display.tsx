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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
