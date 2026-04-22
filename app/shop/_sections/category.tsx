"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react";

const FILTER_OPTIONS: Record<string, string[]> = {
  "Kitchen Utensils": ["Yoga", "Running", "Gym"],
  "Kitchen Appliances": ["Breathable", "Waterproof", "Warmth"],
  Other: ["Children's Toys"],
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
  const [activeSort, setActiveSort] = useState("Featured");

  // Shared Sort Dropdown Component Logic

  return (
    <div className="py-4 border-b border-gray-200 px-4 md:px-0">
      {openFilter !== null && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50"
          onClick={() => setOpenFilter(null)}
        ></div>
      )}
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:flex items-center gap-2 relative z-50">
        <div className="flex flex-wrap items-center gap-2">
          {Object.keys(FILTER_OPTIONS).map((category) => (
            <div key={category} className="relative">
              <button
                onClick={() => {
                  setOpenFilter(openFilter === category ? null : category);
                  setIsSortOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 uppercase  text-caps font-mono border rounded-full transition-colors ${
                  openFilter === category
                    ? "border-blue-600 ring-1 ring-blue-600"
                    : "border-black/80"
                }`}
              >
                {category}
                {openFilter === category ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {openFilter === category && (
                <div className="absolute left-0 mt-1 w-64 bg-white border border-black z-50 shadow-lg p-4">
                  <div className="flex flex-col gap-3">
                    {FILTER_OPTIONS[category].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 cursor-pointer hover:text-gray-600"
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5 border-black rounded-none accent-black"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
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
            setActiveSort={setActiveSort}
            activeSort={activeSort}
          />
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="flex md:hidden gap-2">
        <button
          onClick={() => {
            setIsMobileMenuOpen(true);
            setIsSortOpen(false);
          }}
          className="flex-1 flex items-center justify-center gap-3 border border-black/80 py-2 px-4 text-caps font-mono uppercase rouded-full"
        >
          <SlidersHorizontal size={20} /> Filters
        </button>

        <SortDropdown
          isMobile={true}
          setIsSortOpen={setIsSortOpen}
          isSortOpen={isSortOpen}
          setActiveSort={setActiveSort}
          activeSort={activeSort}
        />
      </div>

      {/* --- MOBILE FILTERS OVERLAY --- */}
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
            {Object.keys(FILTER_OPTIONS).map((category) => (
              <div key={category} className="border-t border-black/20 py-5">
                <button className="flex items-center gap-2 border border-black/20 bg-gray-50 px-3 py-1 text-base">
                  {category} <ChevronDown size={16} />
                </button>
              </div>
            ))}
            <div className="border-t border-black/20" />
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
  setActiveSort,
  activeSort,
}: {
  isMobile: boolean;
  setIsSortOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSortOpen: boolean;
  setActiveSort: React.Dispatch<React.SetStateAction<string>>;
  activeSort: string;
}) => (
  <div className={`relative ${isMobile ? "flex-1" : ""}`}>
    <button
      onClick={() => setIsSortOpen(!isSortOpen)}
      className={`flex items-center justify-between gap-3 border border-black/80 uppercase font-mono text-caps rounded-full transition-colors px-4 py-2 text-sm ml-auto`}
    >
      <span>Sort By</span>
      {isSortOpen ? (
        <ChevronUp size={isMobile ? 20 : 16} />
      ) : (
        <ChevronDown size={isMobile ? 20 : 16} />
      )}
    </button>

    {isSortOpen && (
      <div
        className={`absolute right-0 mt-1 bg-white border border-black z-50 shadow-xl p-6
        ${isMobile ? "w-[200%]" : "w-72"}`}
      >
        <div className="flex flex-col gap-5">
          {SORT_OPTIONS.map((option, idx) => (
            <div key={option}>
              <label
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => {
                  setActiveSort(option);
                  setIsSortOpen(false);
                }}
              >
                <div
                  className={`w-5 h-5 border border-black flex-shrink-0 transition-colors ${activeSort === option ? "bg-black" : "bg-white"}`}
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
