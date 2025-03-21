import Link from 'next/link';
import { notFound } from 'next/navigation';

const FOOD_CATEGORY_ITEMS: { [key: string]: string[] }  = {
  fruits: ['apple', 'banana', 'orange', 'grape', 'kiwi'],
  vegetables: ['carrot', 'broccoli', 'spinach', 'cauliflower', 'lettuce'],
  meat: ['steak', 'chicken', 'beef', 'pork', 'lamb'],
  dairy: ['milk', 'cheese', 'yogurt', 'ice cream', 'buttermilk'],
  grains: ['bread', 'rice', 'pasta', 'quinoa', 'oats'],
  exotic: ['avocado', 'eggplant', 'tomato', 'cucumber', 'jalapeno'],
} as const;

export async function generateStaticParams() {
  return Object.keys(FOOD_CATEGORY_ITEMS).map((slug) => ({slug}));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!FOOD_CATEGORY_ITEMS[slug]) {
    return notFound();
  }

    return (
      <>
        <div> 
            <h1 className="font-bold text-[clamp(2rem,5vw,3rem)]">Dynamic Route Segment</h1>
            <hr className="border-b-[2px] border-[#222126]" />
        </div>

        <div>
          <h1 className="font-bold text-[1.7rem]">
            {(slug.endsWith("s") ? slug.slice(0, -1) : slug).replace(/^./, (char) => char.toUpperCase())} Items
          </h1>
          <nav>
            <ul className="list-disc pl-[20px] text-[1.3rem]">
              {FOOD_CATEGORY_ITEMS[slug].map((name, id) => (
                <li key={id}>
                  <Link className="underline" href={`/dynamic-routes/dynamic-route-segments/${slug}/${name}=error`}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </>
    );
  }
