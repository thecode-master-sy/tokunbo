"use client";

import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cart from "@/components/cart";
import MarqueeBanner from "@/components/marquee-banner";
import SearchBar from "@/components/search-bar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-background sticky top-0 z-60">
      <MarqueeBanner />

      <nav className="px-4 lg:px-6 relative">
        <div className="flex items-center gap-1 md:justify-between h-14">
          <Button
            className="md:hidden shrink-0"
            size="icon"
            variant="ghost"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden md:flex items-center gap-5">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop products</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {showSearch ? (
            <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />
          ) : (
            <div className="md:absolute left-1/2 top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              <Link href="/">
                <span className="tracking-[-0.03em] uppercase text-[16px] md:text-[18px] font-bold opacity-70">
                  <span>blossom</span> <span>tokunbo</span>
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-5 ml-auto md:ml-0">
            {!showSearch && (
              <button
                type="button"
                onClick={() => setShowSearch((prev) => !prev)}
                className="flex gap-2 items-center"
              >
                <Search className="w-5 h-5 cursor-pointer" />
                <span className="hidden md:inline-block">Search</span>
              </button>
            )}

            <Cart />
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-background p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <Link href="/">
                <span className="tracking-[-0.03em] uppercase text-[18px] font-bold opacity-70">
                  blossom tokunbo
                </span>
              </Link>
              <button
                className="text-gray-700 hover:text-gray-900"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
              >
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <Link href="/home" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/shop" onClick={() => setIsOpen(false)}>
                Shop
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
