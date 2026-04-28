"use client";

import { Search } from "lucide-react";
import { useQueryState } from "nuqs";

export default function SearchBar() {
  const [q, setQ] = useQueryState("q", {
    shallow: false,
    history: "push",
  });

  return (
    <div className="mb-4 flex items-center gap-2 rounded-full border border-black/20 px-4 py-2">
      <Search size={18} />
      <input
        type="search"
        value={q || ""}
        onChange={(e) => setQ(e.target.value || null)}
        placeholder="Search products..."
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
}
