import Category from "@/components/category";
import { getCategories } from "@/lib/dal";

export default async function ProductCategories() {
  const categories = await getCategories();
  return (
    <div className="overflow-x-hidden px-4 lg:px-6">
      <div className="flex flex-wrap md:w-max gap-2 items-center py-4">
        {categories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </div>
    </div>
  );
}
