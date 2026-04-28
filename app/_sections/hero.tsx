"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPaginatedLink } from "@/lib/nuqs/search-params";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  function pageURL(query: string) {
    return getPaginatedLink("/shop", {
      query,
    });
  }

  const handleSearch = () => {
    const urlToPush = pageURL(query);

    router.push(urlToPush);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative bg-hero">
      <div className="bg-hero px-4 pt-20 pb-15 space-y-4">
        <h1 className="text-h2 text-center -tracking-[0.05em] font-light">
          <span>Your</span>{" "}
          <span className="font-tenor-sans font-semibold opacity-100">
            Quality
          </span>{" "}
          <span>Fairly Used Products.</span>
        </h1>

        <div className="max-w-[450px] mx-auto">
          <div className="relative">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="what are you looking for?"
              className="bg-white rounded-full h-11 px-4 pr-14"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleSearch}
              className="absolute top-1/2 right-4 -translate-y-1/2"
            >
              <Search />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
