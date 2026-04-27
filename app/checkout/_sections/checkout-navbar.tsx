import Link from "next/link";
import { BagIcon } from "./checkout-icons";

export default function CheckoutNavBar() {
  return (
    <div className="flex items-center h-14 py-7 border-b border-[#ddd8d0] px-4 lg:px-20 justify-between relative">
      <div className="md:absolute left-1/2 top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <Link href="/">
          <span className="tracking-[-0.03em] uppercase text-[18px] font-bold opacity-70">
            tokunbo
          </span>
        </Link>
      </div>

      <div className="ml-auto">
        <BagIcon />
      </div>
    </div>
  );
}
