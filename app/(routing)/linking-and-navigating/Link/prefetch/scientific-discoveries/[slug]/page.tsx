import Link from 'next/link';
import { scientificDiscoveriesCategoryTopics } from '@/metadata/scientific-discoveries-category-topics';
import { notFound  } from 'next/navigation';

export async function generateStaticParams() {
  return Object.entries(scientificDiscoveriesCategoryTopics).flatMap(([category, data]) =>
    data.links.map((link) => ({
      category,
      topic: link.topic,
    }))
  );
}
export default async function Page({ params }: { params: Promise<{ slug: string }> } ) {
  const { slug } = await params;
  const pageData = scientificDiscoveriesCategoryTopics[slug];

  if (!pageData) {
    return notFound();
  }

  return (
    <section className='w-full max-w-[850px] mx-auto pt-[50px] flex flex-col gap-y-[40px]'>  
      <div>
        <h1 className='font-bold text-[2rem]'>{pageData.header}</h1>
        <hr className='border-b-[2px] border-[#222126]'/>
      </div>

      <nav>
        <ul className='list-disc pl-[20px] text-[1.3rem]'>
          {pageData.links.map(({ id, title, category, topic }) => (
            <li key={id}>
              <Link 
                className='hover:underline' 
                href={`/linking-and-navigating/Link/prefetch/scientific-discoveries/${category}/${topic}`}
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