import { scientificDiscoveriesCategoryTopics } from '@/metadata/scientific-discoveries-category-topics';
import Image from 'next/image';

export async function generateStaticParams() {
  return Object.keys(scientificDiscoveriesCategoryTopics).map((slug) => ({
    slug,
    topics: scientificDiscoveriesCategoryTopics[slug].links[0].topic
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string; topics: string }> }) {
  const { slug, topics } = await params;

  const imagePath = `/${slug}/${topics}.jpg`;
  const topic = scientificDiscoveriesCategoryTopics[slug]?.links.find(
    (link) => link.topic === topics
  );


  return (
    <section className='w-full max-w-[850px] mx-auto pt-[50px] flex justify-start flex-col gap-y-[40px]'>
      <div>
        <h1 className='font-bold text-[2rem]'>{topic?.title}</h1>
        <hr className='border-b-[2px] border-[#222126]'/>
      </div>

      <div className=''>
        <Image 
          src={imagePath} 
          alt={topics}
          className='float-left mr-[20px]' 
          width={200} 
          height={200} 
          style={{ height: '300px', width: '300px' }} 
        />
        {topic?.description}
      </div>

    </section>
  );
}