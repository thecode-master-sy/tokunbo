"use client";
import Image from "next/image";
import { Category as CategoryType } from "@/lib/product-types";

export default function Category({ category }: { category: CategoryType }) {
  return (
    <div className="font-mono flex gap-2 uppercase text-caps bg-category py-2 px-4  items-center rounded-full">
      <div className="w-10 h-10 flex justify-center items-center rounded-full bg-banner">
        <Image
          src={category.imageUrl}
          width={25}
          height={35}
          className="rounded-full"
          alt="pot voer"
        />
      </div>
      <span>{category.name}</span>
    </div>
  );
}
