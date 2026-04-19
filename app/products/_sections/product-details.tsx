import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/quantity-selector";

export default function ProductDetails() {
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
          bles-digital...
        </span>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:sticky self-start md:top-23 md:w-[40%] w-full">
          <div className="w-full">
            <Image
              src="/images/product-images/multi-color-stock-pot.jpeg"
              className="w-full aspect-[1/1.1] md:min-h-screen"
              alt="product image"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="md:w-1/2  w-full space-y-6 lg:px-20 md:px-12 md:py-12">
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
                bles-digital...
              </span>
            </div>
            <h1 className="text-h2 font-bold mt-2">BLES Digital Air Fryer</h1>
            <p className="text-h3 mt-4">₦5,000</p>
          </div>

          <div className="flex items-center gap-1">
            {/* Star icons would go here */}
            <span className="text-xl">★★★★★</span>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Our high-performance digital air fryer uses rapid heat circulation
            to deliver a perfect golden crunch with up to 85% less oil,
            featuring intuitive touch presets for everything from crispy wings
            to roasted vegetables.
          </p>

          {/* Spacer to demonstrate the scroll/sticky effect */}
          <div className="border-t border-gray-200 pt-10">
            <h3 className="font-bold">Product Details & Features</h3>
            <ul className="list-disc ml-5 mt-4 space-y-2">
              <li>Rapid Air Circulation</li>
              <li>One-Touch Digital Presets</li>
              <li>Non-Stick Easy Clean</li>
            </ul>
          </div>

          <div className="flex flex-col lg:flex-row gap-2">
            <QuantitySelector />
            <Button
              size={"lg"}
              className="w-full bg-hero text-foreground cursor-pointer rounded-full h-12 lg:max-w-[300px]"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
