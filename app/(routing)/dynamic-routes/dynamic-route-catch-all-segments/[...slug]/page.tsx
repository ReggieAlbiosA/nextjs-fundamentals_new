import Link from "next/link";
import { notFound } from "next/navigation";

// Sample data
const FOOD_CATEGORY_ITEMS: { [key: string]: string[] } = {
  fruits: ["apple", "banana", "orange", "strawberry", "kiwi"],
  vegetables: ["carrot", "broccoli", "spinach", "cauliflower", "lettuce"],
  meat: ["steak", "chicken", "beef", "pork", "lamb"],
  dairy: ["milk", "cheese", "yogurt", "ice cream", "buttermilk"],
  grains: ["bread", "rice", "pasta", "quinoa", "oats"],
  exotic: ["avocado", "eggplant", "tomato", "cucumber", "jalapeno"],
};

export async function generateStaticParams() {
  const categories = Object.keys(FOOD_CATEGORY_ITEMS);
  const paths = categories.flatMap((category) => [
    { slug: [category] }, // First layer: e.g., /shop/fruits
    ...FOOD_CATEGORY_ITEMS[category].map((item) => ({ slug: [category, item] })), // Second layer: e.g., /shop/fruits/apple
  ]);
  return paths;
}

// Utility to capitalize first letter
const capitalize = (str: string) =>
  str.replace(/^./, (char) => char.toUpperCase());

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params; // slug is an array due to [...slug]

  // Extract first and second layers
  const category = slug[0]; // e.g., "fruits"
  const item = slug[1]; // e.g., "apple" (undefined if not present)

  // Check if category is valid
  if (!FOOD_CATEGORY_ITEMS[category]) {
    return notFound();
  }

  // If item is provided, check if it's valid for the category
  if (item && !FOOD_CATEGORY_ITEMS[category].includes(item)) {
    return notFound();
  }

  // First layer: Display category items
  if (!item) {
    return (
      <>
        <div> 
            <h1 className="font-bold text-[clamp(2rem,5vw,3rem)]">Dynamic Route Catch-all Segments</h1>
            <hr className="border-b-[2px] border-[#222126]" />
        </div>

        <div>
          <h1 className="font-bold text-[1.7rem]">{(category.endsWith("s") ? category.slice(0, -1) : category).replace(/^./, (char) => char.toUpperCase())} Items</h1>

          <nav>
            <ul className="list-disc pl-[20px] text-[clamp(1rem, 3vw, 1.5rem)]">
              {FOOD_CATEGORY_ITEMS[category].map((item) => (
                <li key={item}>
                  <Link
                    className="underline text-[1.4rem]"
                    href={`/dynamic-routes/dynamic-route-catch-all-segments/${category}/${item}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center gap-y-[40px] p-4">
      <h1 className="font-bold text-[clamp(2rem, 5vw, 3rem)]">
        {capitalize(item)}
      </h1>
      <p className="text-[clamp(1rem, 3vw, 2rem)]">
        This is the page for {item} in the {category} category.
      </p>
      <Link
        className="underline text-blue-500"
        href={`/dynamic-routes/dynamic-route-catch-all-segments/${category}`}
      >
        Back to {category} list
      </Link>
    </section>
  );
}