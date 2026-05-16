import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/quantity-selector";
import { Product } from "@/lib/product-types";
import { urlFor } from "@/lib/sanity/image-utility";
import ProductDetailActions from "./product-detail-actions";
import ProductImageGallery from "./product-image-gallery";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div>
      <div className=" uppercase  gap-1 items-center font-mono md:hidden py-4">
        <Link
          href="/"
          className="bg-category px-3 rounded-full py-1 text-[11px]"
        >
          Home
        </Link>{" "}
        <span>{"/"}</span>
        <span className="bg-category px-3 rounded-full py-1 text-[11px]">
          {product.name}
        </span>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:sticky self-start md:top-20 w-full">
          {/*<div className="w-full">

            <div></div>
            <Image
              src={urlFor(product.images[0]).width(600).url()}
              className="w-full aspect-[1/1.1]  md:min-h-[calc(100vh_-_56px_-_28px)]"
              alt="product image"
              width={800}
              height={880}
              priority={true}
            />
          </div>*/}
          <ProductImageGallery product={product} />
        </div>
        <div className="w-full md:flex flex-col items-center  px-4 lg:px-20 md:px-12 md:py-12">
          <div className="space-y-6 md:max-w-[400px]">
            <div>
              <div className=" uppercase md:flex gap-1 items-center font-mono hidden ">
                <Link
                  href="/"
                  className="bg-category px-3 rounded-full py-1 text-[11px]"
                >
                  Home
                </Link>{" "}
                <span>{"/"}</span>
                <span className="bg-category px-3 rounded-full py-1 text-[11px]">
                  {product.name}
                </span>
              </div>
              <h1 className="text-h2 font-bold mt-2">{product.name}</h1>
            </div>

            <div className="flex items-center gap-1">
              {/* Star icons would go here */}
              <span className="text-xl">★★★★★</span>
            </div>

            <p className="text-gray-700 leading-relaxed md:max-w-[45ch]">
              {product.description}
            </p>

            {/* Spacer to demonstrate the scroll/sticky effect */}
            <div className="border-y border-border py-10">
              <h3 className="font-bold">Product Details & Features</h3>
              <ul className="list-disc ml-5 mt-4 space-y-2">
                {product.productDetails?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <ProductDetailActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
