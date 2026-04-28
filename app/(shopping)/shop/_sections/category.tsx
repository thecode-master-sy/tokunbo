"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react";
import { searchParams, useSearchParams } from "@/lib/nuqs/search-params";

const FILTER_OPTIONS: Record<string, { name: string; slug: string }[]> = {
  "Kitchen Utensils": [
    { name: "Pots", slug: "pots" },
    { name: "Pot covers", slug: "pot-covers" },
    { name: "Frying pans", slug: "frying-pans" },
    { name: "Knives", slug: "knives" },
    { name: "Kettles", slug: "kettles" },
  ],
  "Kitchen Appliances": [
    { name: "Air fryer", slug: "air-fryers" },
    { name: "Gas cookers", slug: "gas-cookers" },
    { name: "Blenders", slug: "blenders" },
  ],
  Other: [{ name: "Children's Toys", slug: "children-s-toy-s" }],
};

const SORT_OPTIONS = [
  "Featured",
  "Best Selling",
  "Alphabetical A To Z",
  "Alphabetical Z To A",
  "Price Low To High",
  "Price High To Low",
];

export default function ShopCategory() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [{ category, sort, page, query }, setParams] = useSearchParams();

  const updateCategory = (value: string, checked: boolean) => {
    const next = checked
      ? [...category, value]
      : category.filter((item) => item !== value);

    setParams({ category: next, page: 1 });
  };

  const updateSort = (value: string) => {
    setParams({ sort: value, page: 1 });
    setIsSortOpen(false);
  };

  const selectedCategories = Object.values(FILTER_OPTIONS)
    .flat()
    .filter((item) => category.includes(item.slug));

  const removeCategory = (value: string) => {
    setParams({
      category: category.filter((item) => item !== value),
      page: 1,
    });
  };

  const clearAllFilters = () => {
    setParams(null);
  };

  const hasFilters = category.length > 0 || query !== "";

  return (
    <div className="py-4 border-b border-gray-200">
      {openFilter !== null && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50"
          onClick={() => setOpenFilter(null)}
        />
      )}

      <div className="hidden md:flex items-center gap-2 relative z-50">
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(FILTER_OPTIONS).map(([group, options]) => (
            <div key={group} className="relative">
              <button
                onClick={() => {
                  setOpenFilter(openFilter === group ? null : group);
                  setIsSortOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 uppercase bg-category text-caps font-mono rounded-full transition-colors ${
                  openFilter === group
                    ? "border-blue-600 ring-1 ring-blue-600"
                    : ""
                }`}
              >
                {group}
                {openFilter === group ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {openFilter === group && (
                <div className="absolute left-0 mt-2 w-64 bg-white border-black z-50 shadow-lg p-4">
                  <div className="flex flex-col gap-3">
                    {options.map((option) => {
                      const checked = category.includes(option.slug);

                      return (
                        <label
                          key={option.slug}
                          className="flex items-center gap-3 cursor-pointer hover:text-gray-600"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) =>
                              updateCategory(option.slug, e.target.checked)
                            }
                            className="w-5 h-5 border-black rounded-none accent-black"
                          />
                          <span className="text-sm">{option.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="ml-auto">
          <SortDropdown
            isMobile={false}
            setIsSortOpen={setIsSortOpen}
            isSortOpen={isSortOpen}
            setActiveSort={() => {}}
            activeSort={sort}
            onSelectSort={updateSort}
          />
        </div>
      </div>

      {hasFilters && (
        <div className="flex flex-wrap items-center gap-3 my-4">
          {selectedCategories.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => removeCategory(item.slug)}
              className="flex items-center gap-2 bg-banner text-sm cursor-pointer px-3 py-1"
            >
              <span>{item.name}</span>
              <X size={16} />
            </button>
          ))}
        </div>
      )}

      {hasFilters && (
        <button
          type="button"
          onClick={clearAllFilters}
          className="underline text-sm cursor-pointer"
        >
          Clear all Filters
        </button>
      )}

      <div className="flex md:hidden gap-2">
        <button
          onClick={() => {
            setIsMobileMenuOpen(true);
            setIsSortOpen(false);
          }}
          className="flex items-center rounded-full justify-center gap-2 bg-category py-2 px-4 text-caps font-mono uppercase rouded-full"
        >
          <SlidersHorizontal size={20} /> Filters
        </button>

        <SortDropdown
          isMobile={true}
          setIsSortOpen={setIsSortOpen}
          isSortOpen={isSortOpen}
          setActiveSort={() => {}}
          activeSort={sort}
          onSelectSort={updateSort}
        />
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[100] overflow-y-auto p-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-4xl font-bold">Filters</h2>
              <p className="text-sm text-gray-500">(50 items)</p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 border border-gray-300"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col">
            {Object.entries(FILTER_OPTIONS).map(([group, options]) => (
              <div key={group} className="border-t border-black/20 py-5">
                <p className="mb-3 font-medium">{group}</p>
                <div className="flex flex-col gap-3">
                  {options.map((option) => {
                    const checked = category.includes(option.slug);

                    return (
                      <label
                        key={option.slug}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) =>
                            updateCategory(option.slug, e.target.checked)
                          }
                          className="w-5 h-5 border-black rounded-none accent-black"
                        />
                        <span className="text-sm">{option.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const SortDropdown = ({
  isMobile = false,
  setIsSortOpen,
  isSortOpen,
  activeSort,
  onSelectSort,
}: {
  isMobile: boolean;
  setIsSortOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSortOpen: boolean;
  setActiveSort: React.Dispatch<React.SetStateAction<string>>;
  activeSort: string;
  onSelectSort: (value: string) => void;
}) => (
  <div className={`relative ${isMobile ? "flex-1" : ""}`}>
    <button
      onClick={() => setIsSortOpen(!isSortOpen)}
      className="flex items-center justify-between gap-2 bg-category uppercase font-mono text-caps rounded-full transition-colors px-4 py-2 md:ml-auto"
    >
      <span>Sort By</span>
      {isSortOpen ? (
        <ChevronUp size={isMobile ? 20 : 16} />
      ) : (
        <ChevronDown size={isMobile ? 20 : 16} />
      )}
    </button>

    {isSortOpen && (
      <div className="absolute right-0 mt-1 bg-white z-50 shadow-xl p-6 w-72">
        <div className="flex flex-col gap-5">
          {SORT_OPTIONS.map((option, idx) => (
            <div key={option}>
              <label
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => onSelectSort(option)}
              >
                <div
                  className={`w-5 h-5 border border-black flex-shrink-0 transition-colors ${
                    activeSort === option ? "bg-black" : "bg-white"
                  }`}
                >
                  {activeSort === option && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white" />
                    </div>
                  )}
                </div>
                <span className="text-base font-medium whitespace-nowrap">
                  {option}
                </span>
              </label>
              {idx === 3 && <hr className="mt-5 border-black/20" />}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
