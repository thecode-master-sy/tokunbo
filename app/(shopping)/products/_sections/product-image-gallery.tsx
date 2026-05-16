"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/lib/product-types";
import { urlFor } from "@/lib/sanity/image-utility";

export default function ProductImageGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.images?.[0]);

  if (!product.images || product.images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full flex flex-col md:flex-row gap-4 px-4">
      {/* Thumbnail selector */}
      <div className="hidden md:flex flex-col gap-3 py-2">
        {product.images.map((image, index) => {
          const isActive = image === selectedImage;

          return (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`w-16 h-16 bg-white border-2 rounded-sm overflow-hidden transition ${
                isActive ? "border-hero" : "border-gray-200 hover:border-hero"
              }`}
            >
              <Image
                src={urlFor(image).width(120).height(120).url()}
                alt={`${product.name} image ${index + 1}`}
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* Main product image */}
      <div className="w-full">
        <Image
          src={urlFor(selectedImage).width(900).url()}
          className="w-full aspect-[1/1.1] md:min-h-[calc(100vh_-_56px_-_28px)]"
          alt={product.name}
          width={900}
          height={990}
          priority
        />
      </div>

      <div className="flex md:hidden gap-3">
        {product.images.map((image, index) => {
          const isActive = image === selectedImage;

          return (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`w-16 h-16 bg-white border-2 rounded-sm overflow-hidden transition ${
                isActive ? "border-hero" : "border-gray-200 hover:border-hero"
              }`}
            >
              <Image
                src={urlFor(image).width(120).height(120).url()}
                alt={`${product.name} image ${index + 1}`}
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
