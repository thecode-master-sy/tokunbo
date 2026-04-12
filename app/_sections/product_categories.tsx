import Category from "@/components/category";
import { Category as CategoryType } from "@/lib/product-types";

const categories: CategoryType[] = [
  {
    name: "Pots",
    imageUrl: "/images/category/pot.png",
  },
  {
    name: "Blenders",
    imageUrl: "/images/category/blender.jpg",
  },
  {
    name: "Kettles",
    imageUrl: "/images/category/kettle.jpg",
  },
  {
    name: "Gas cookers",
    imageUrl: "/images/category/gas-cooker.jpg",
  },
  {
    name: "Knives",
    imageUrl: "/images/category/knives.jpg",
  },
  {
    name: "Pot covers",
    imageUrl: "/images/category/pot-covers.jpg",
  },
  {
    name: "Air fryers",
    imageUrl: "/images/category/air-fryer.jpg",
  },
  {
    name: "Children's toy's",
    imageUrl: "/images/category/childrens-toys.jpg",
  },
  {
    name: "Frying pans",
    imageUrl: "/images/category/childrens-toys.jpg",
  },
];

export default function ProductCategories() {
  return (
    <div className="overflow-x-hidden px-4 lg:px-6">
      <div className="flex w-max gap-2 items-center py-4 justify-center">
        {categories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </div>
    </div>
  );
}
