"use client";
import Image from "next/image";
import { Category as CategoryType } from "@/lib/product-types";

export default function Category({ category }: { category: CategoryType }) {
  return (
    <div className="font-mono flex gap-2 uppercase text-[11px] md:text-caps bg-category md:py-2 md:px-4 px-3 py-1  items-center rounded-full">
      <div className="w-6 h-6 md:w-10 md:h-10 flex justify-center items-center rounded-full bg-banner p-1">
        <Image
          src={category.imageUrl}
          width={25}
          height={35}
          className="rounded-full w-full"
          alt="pot voer"
        />
      </div>
      <span>{category.name}</span>
    </div>
  );
}
