import Link from "next/link";

export default function Shop() {
  return (
    <div className="pt-4 px-4 lg:px-6">
      <div className=" uppercase  gap-1 items-center font-mono py-4">
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

      <div className="py-4 flex justify-between">
        <div className="flex gap-2">
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
        </div>

        <div>
          <Link
            href="/"
            className="uppercase flex items-center  text-caps font-mono rounded-full px-4 py-1 bg-category"
          >
            Sort
          </Link>
        </div>
      </div>
    </div>
  );
}
