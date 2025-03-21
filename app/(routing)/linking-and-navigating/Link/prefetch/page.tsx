import Link from 'next/link';

const SCIENTIFIC_DISCOVERIES = [
  { id: 1, title: "Physics & Space", slug: "physics-space" },
  { id: 2, title: "Biology & Medicine", slug: "biology-medicine" },
  { id: 3, title: "Chemistry", slug: "chemistry" },
  { id: 4, title: "Earth & Environmental Science", slug: "earth-environmental-science" },
  { id: 5, title: "Technology & Computing", slug: "technology-computing" },
] as const;

export default function Page() {
  return (
    <section className="w-full max-w-[850px] mx-auto pt-[50px] flex flex-col gap-y-[40px]">  
      <div> 
        <h1 className="font-bold text-[2rem]">Scientific Discovery</h1>
        <hr className="border-b-[2px] border-[#222126]" />
      </div>

      <nav>
        <ul className="list-disc pl-[20px] text-[1.3rem]">
          {SCIENTIFIC_DISCOVERIES.map(({ id, title, slug }) => (
            <li key={id}>
              <Link 
                className="hover:underline" 
                href={`/linking-and-navigating/Link/prefetch/scientific-discoveries/${slug}`}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}