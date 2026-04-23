import Link from "next/link";
import Category from "@/app/shop/_sections/category";
import ProductDisplay from "@/app/shop/_sections/product-display";
import { getProducts, getTotalProductsCount } from "@/lib/dal";

export default async function Shop({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
    category?: string | string[];
    sort?: string;
  }>;
}) {
  const params = (await searchParams) ?? {};

  const page = Math.max(1, Number(params.page ?? "1") || 1);

  const categories = Array.isArray(params.category)
    ? params.category
    : params.category
      ? [params.category]
      : [];

  const [products, totalCount] = await Promise.all([
    getProducts({
      page,
      limit: 20,
      categories,
      sort: params.sort,
    }),
    getTotalProductsCount(),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / 20));

  return (
    <div className="pt-4 px-4 lg:px-6">
      <div className="uppercase gap-1 items-center font-mono py-4">
        <Link
          href="/"
          className="bg-category px-3 rounded-full py-1 text-[11px]"
        >
          Home
        </Link>{" "}
        <span>{"/"}</span>
        <span className="bg-category px-3 rounded-full py-1 text-[11px]">
          shop products
        </span>
      </div>

      <div>
        <h1 className="text-h2 -tracking-[0.034em]">Shop Products</h1>
      </div>

      <Category />

      <ProductDisplay
        products={products}
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
}
