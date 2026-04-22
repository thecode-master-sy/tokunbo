import Link from "next/link";

export default function ShopCategory() {
  return (
    <div className="py-4 flex justify-between">
      <div className="flex gap-2 flex-wrap">
        <Link
          href="/"
          className="uppercase inline-block text-caps font-mono rounded-full px-4 py-1 bg-banner"
        >
          all products
        </Link>
        <Link
          href="/"
          className="uppercase flex items-center  text-caps font-mono rounded-full px-4 py-1 bg-category"
        >
          Kitchen appliances
        </Link>
        <Link
          href="/"
          className="uppercase  flex items-center text-caps font-mono rounded-full px-4 py-1 bg-category"
        >
          Kitchen utensils
        </Link>
        <Link
          href="/"
          className="uppercase flex items-center  text-caps font-mono rounded-full px-4 py-1 bg-category"
        >
          other
        </Link>

        <Link
          href="/"
          className="uppercase flex items-center md:hidden  text-caps font-mono rounded-full px-4 py-1 bg-category"
        >
          Sort
        </Link>
      </div>

      <div className="hidden md:block">
        <Link
          href="/"
          className="uppercase flex items-center  text-caps font-mono rounded-full px-4 py-1 bg-category"
        >
          Sort
        </Link>
      </div>
    </div>
  );
}
