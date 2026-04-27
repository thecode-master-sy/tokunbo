import { Product } from "@/lib/product-types";
import ProductCard from "@/components/product-card";
import PaginationComponent from "@/app/(shopping)/shop/_sections/pagination";
import { PaginationSearchParams } from "@/lib/nuqs/search-params";

type ProductDisplayProps = {
  products: Product[];
  currentPage: number;
  totalPages: number;
  pagination: Promise<PaginationSearchParams>;
};

export default function ProductDisplay({
  products,
  totalPages,
  pagination,
}: ProductDisplayProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <PaginationComponent numPages={totalPages} pagination={pagination} />
    </div>
  );
}
