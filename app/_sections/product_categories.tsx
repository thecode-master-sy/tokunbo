import Category from "@/components/category";

const categories = [
  "Pots",
  "Blenders",
  "Kettles",
  "Frying pans",
  "Air fryer",
  "Knives",
  "Pot covers",
  "Gas cookers",
  "Children's toys",
];

export default function ProductCategories() {
  return (
    <div className="flex gap-2 items-center py-4 justify-center">
      {categories.map((category, index) => (
        <Category key={index}>{category}</Category>
      ))}
    </div>
  );
}
