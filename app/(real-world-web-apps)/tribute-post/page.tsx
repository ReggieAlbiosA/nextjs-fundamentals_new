import CreatePostButton from "@/components/tribute-post_components/CreateTributePostButton";
import Link from "next/link";
import Image from "next/image";

// Define the Post interface based on your API response structure
interface Post {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://nextjs-fundamentals-ecru.vercel.app/api", {
    cache: "no-store", // Ensure fresh data
  });
  return res.json(); // Type inference will align with Post[]
}

export default async function Page() {
  const posts = await getPosts();
  return (
    <>
      <style>
        {`
          body {
            padding: 0px !important;
            background-color: white !important;
          }
        `}
      </style>

      <section>
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="text-center max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Decorative element */}
            <div className="flex justify-center mb-4">
              <div className="h-1 w-24 bg-yellow-300 rounded"></div>
            </div>

            {/* Main title */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Tribute Posts
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-2xl mx-auto text-xl text-indigo-100">
              Honoring remarkable individuals who have made lasting impacts on our world
            </p>
          </div>
        </header>

        <div className="p-8 bg w-full max-w-[1200px] mx-auto flex flex-col gap-y-[40px]">
          <CreatePostButton className="ml-auto" />

          <ul className="grid gap-y-[50px] md:grid-cols-2 lg:grid-cols-3 place-items-center">
            {posts.map((post: Post) => (
              <li
                key={post.id}
                className="max-w-[300px] shadow-lg rounded hover:scale-[1.02] transition-all duration-300"
              >
                <Link href={`/tribute-post/${post.id}`} className="bg-white w-full overflow-hidden">
                  {/* Image section */}
                  <div className="h-[200px] w-full overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.name}
                      className="w-full h-full object-cover rounded-tl rounded-tr"
                      width={300}
                      height={300}
                    />
                  </div>

                  {/* Content section */}
                  <div className="p-6">
                    {/* Name */}
                    <h2 className="text-[clamp(.9rem,1.5vw,1.1rem)] whitespace-nowrap font-bold text-gray-800 mb-2">
                      {post.name}
                    </h2>

                    {/* Description with overflow handling */}
                    <div className="mb-4">
                      <p className="text-gray-600 text-[clamp(.5rem,1.5vw,0.9rem)] line-clamp-3 overflow-hidden">
                        {post.description}
                      </p>

                      {/* Elegant fade effect for text overflow */}
                      <div className="relative">
                        <div className="absolute bottom-0 right-0 bg-gradient-to-l from-white to-transparent h-6 w-16"></div>
                      </div>
                    </div>

                    {/* Date created */}
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-500 italic">
                        Created on {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}