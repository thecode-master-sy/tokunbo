"use client";
import Image from "next/image";
import { Category as CategoryType } from "@/lib/product-types";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image-utility";

export default function Category({ category }: { category: CategoryType }) {
  return (
    <Link href={`/shop?category=${category.slug.current}`}>
      <div className="font-mono flex cursor-pointer gap-2 uppercase text-[12px] md:text-caps bg-category md:py-2 md:px-4 px-3 py-1  items-center rounded-full">
        <div className="w-6 h-6 md:w-10 md:h-10 flex justify-center items-center rounded-full bg-banner p-1">
          <Image
            src={urlFor(category.image).width(600).url()}
            width={25}
            height={35}
            className="rounded-full w-full"
            alt={category.image.alt}
          />
        </div>
        <span>{category.name}</span>
      </div>
    </Link>
  );
}
