import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className=" max-w-[450px] w-full text-center">
        {/* Icon */}
        <div className="relative w-[88px] h-[88px] rounded-full bg-gradient-to-br from-[#fff4e6] to-[#fde4c0] flex items-center justify-center mx-auto mb-8">
          {/* Pulse ring */}
          <span className="absolute inset-[-6px] rounded-full border border-[#fde4c0] animate-ping opacity-60" />
          <svg
            viewBox="0 0 24 24"
            className="w-9 h-9 stroke-[#f08822]"
            fill="none"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-h2 font-medium -tracking-[0.03em]">
          Your Order Is On Its Way!
        </h1>

        {/* Subtext */}
        <p className="font-light">
          We have received your order and it is being processed. Thank you for
          shopping in our store!
        </p>

        {/* Email hint */}
        <div className="flex items-center justify-center gap-2 bg-[#fff8f0] border  border-[#fde4c0] rounded-md px-2 py-4 mt-4">
          <svg
            viewBox="0 0 24 24"
            className="w-[18px] h-[18px] stroke-[#f08822] shrink-0"
            fill="none"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 7 10 7 10-7" />
          </svg>
          <span className="text-[13px] text-[#b8621a]  text-left">
            Check your email for full order details and delivery updates.
          </span>
        </div>

        {/* Button */}
        <Button
          variant="secondary"
          size="lg"
          className="bg-hero rounded-full hover:bg-hero h-12 mt-4"
          asChild
        >
          <Link href="/" className="hover:bg-hero/90 w-full font-normal">
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
}
