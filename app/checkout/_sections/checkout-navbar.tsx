import Link from "next/link";
import { BagIcon } from "./checkout-icons";
import { Handbag } from "lucide-react";

export default function CheckoutNavBar() {
  return (
    <header className="flex justify-center items-center border-b ">
      <div className="py-5 px-3.5 w-full sm:max-w-[580px] lg:max-w-[1024px] lg:px-9 flex items-center justify-between">
        <div>
          <Link href="/">
            <span className="tracking-[-0.04em] text-[32px] font-bold">
              Tokunbo
            </span>
          </Link>
        </div>

        <Link href="/cart">
          <Handbag size={24} strokeWidth={1.5} />
        </Link>
      </div>
    </header>
  );
}
