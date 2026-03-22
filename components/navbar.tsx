// components/Navbar.tsx
import { Search, User, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/new"
              className="text-caps font-mono uppercase tracking-wider text-gray-700 hover:text-gray-900 transition-colors"
            >
              New
            </Link>
            <Link
              href="/shop"
              className="text-caps font-mono uppercase tracking-wider text-gray-700 hover:text-gray-900 transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/community"
              className="text-caps font-mono uppercase tracking-wider text-gray-700 hover:text-gray-900 transition-colors"
            >
              Community
            </Link>
          </div>

   
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="text-2xl md:text-3xl font-bold text-gray-900"
            >
              <span className="font-mono tracking-tight">ECOSPOONS</span>
            </Link>
          </div>

          <div className="flex items-center gap-6 md:gap-8">
            <button
              aria-label="Search"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Search className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
            </button>

            <Link
              href="/account"
              aria-label="Account"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              <User className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
            </Link>

            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="text-gray-700 hover:text-gray-900 transition-colors relative"
            >
              <ShoppingCart
                className="h-5 w-5 md:h-6 md:w-6"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
