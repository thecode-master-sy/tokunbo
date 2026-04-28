"use client";

import { useEffect, useTransition } from "react";
import { Search, Loader2 } from "lucide-react";
import { useSearchParams } from "@/lib/nuqs/search-params";
import { debounce } from "nuqs";

export default function SearchBar({
  showSearch,
  setShowSearch,
}: {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();
  const [{ query }, setParams] = useSearchParams({ startTransition });

  useEffect(() => {
    if (query.length > 0 && !showSearch) {
      setShowSearch(true);
    }
  }, [query, showSearch, setShowSearch]);

  return (
    <div className="flex items-center bg-white gap-2 rounded-full border w-full max-w-[500px] px-4 py-2">
      <input
        value={query}
        onChange={(e) =>
          startTransition(async () => {
            await setParams(
              { query: e.target.value },
              {
                limitUrlUpdates: e.target.value ? debounce(250) : undefined,
              },
            );
          })
        }
        placeholder="Search products..."
        className="w-full bg-transparent outline-none"
        autoFocus
        onBlur={() => setShowSearch(false)}
      />

      {isPending ? (
        <Loader2 className="animate-spin opacity-80" />
      ) : (
        <Search size={18} />
      )}
    </div>
  );
}
