import Link from 'next/link';

const FOOD_CATEGORIES = [
    { id: 1, name: "Fruits", slug: "fruits" },
    { id: 2, name: "Vegetables", slug: "vegetables" },
    { id: 3, name: "Meat", slug: "meat" },
    { id: 4, name: "Dairy", slug: "dairy" },
    { id: 5, name: "Grains", slug: "grains" },
    { id: 6, name: "Exotic", slug: "exotic" },
] as const;

export default function Page() {
    return (
        <>
            <div> 
                <h1 className="font-bold text-[clamp(2rem,5vw,3rem)]">Dynamic Route Catch-all Segments</h1>
                <hr className="border-b-[2px] border-[#222126]" />
            </div>

            <div>
                <h1 className="font-bold text-[1.7rem]">Food Categories</h1>

                <nav aria-label="Food category navigation">
                    <ul className="list-disc pl-[20px] text-[1.3rem]">
                        {FOOD_CATEGORIES.map(({ id, name, slug }) => (
                            <li key={id}>
                                <Link
                                    className="underline"
                                    href={`/dynamic-routes/dynamic-route-catch-all-segments/${slug}`}
                                >
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