import TributePostDetailPage from "@/components/tribute-post_components/TributePostDetailPage";
import type { Metadata } from "next";
import { titleMetadataCreator, descriptionMetadataCreator } from "@/app/utils/metadataCreator";
import fs from "fs/promises";
import path from "path";

const jsonFilePath = path.join(process.cwd(), "data", "posts.json");
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

interface Post {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let tribute: Post | undefined;
  if (process.env.NODE_ENV === "development") {
    const postsData = await fs.readFile(jsonFilePath, "utf-8");
    const posts: Post[] = JSON.parse(postsData || "[]");
    tribute = posts.find((p) => String(p.id) === id);
  } else {
    const response = await fetch(`${API_BASE_URL}/api?id=${id}`);
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      return { title: `Tribute #${id}` };
    }
    tribute = await response.json();
  }

  if (!tribute) {
    return {
      title: `Tribute #${id}`,
    };
  }

  const title = titleMetadataCreator(tribute.description);
  const description = descriptionMetadataCreator(tribute.description);

  return {
    title,
    description,
  };
}

export const revalidate = 60; // ISR: Revalidate every 60 seconds
export const dynamicParams = true; // Allow dynamic rendering for unknown IDs

export async function generateStaticParams() {
  let posts: Post[] = [];
  if (process.env.NODE_ENV === "development") {
    try {
      const postsData = await fs.readFile(jsonFilePath, "utf-8");
      posts = JSON.parse(postsData || "[]");
    } catch (error) {
      console.warn("Failed to read posts.json:", error);
      return [];
    }
  } else {
    try {
      const response = await fetch(`${API_BASE_URL}/api`);
      if (!response.ok) {
        const text = await response.text();
        console.error(`API fetch failed: ${response.status} ${response.statusText} - ${text}`);
        return [];
      }
      posts = await response.json();
    } catch (error) {
      console.warn("Failed to fetch posts from API:", error);
      return [];
    }
  }
  return posts.map((post) => ({
    id: String(post.id),
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await fetch(`${API_BASE_URL}/api?id=${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch post ${id}: ${response.statusText}`);
  }
  const post: Post = await response.json();
  return (
    <>
      <style>
        {`
          body {
            padding: 0px !important;
          }
        `}
      </style>
      <TributePostDetailPage post={post} />
    </>
  );
}