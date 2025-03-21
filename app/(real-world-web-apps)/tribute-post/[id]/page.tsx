import TributePostDetailPage from "@/components/tribute-post_components/TributePostDetailPage";
import type { Metadata } from "next";
import { titleMetadataCreator, descriptionMetadataCreator } from "@/app/utils/metadataCreator";
import fs from "fs/promises";
import path from "path";

const jsonFilePath = path.join(process.cwd(), "data", "posts.json");
// Default to Vercel URL in production, localhost in dev
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://nextjs-fundamentals-ecru.vercel.app");

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
  try {
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
  } catch (error) {
    console.warn("Failed to fetch metadata:", error);
    return { title: `Tribute #${id}` };
  }

  if (!tribute) return { title: `Tribute #${id}` };

  return {
    title: titleMetadataCreator(tribute.description),
    description: descriptionMetadataCreator(tribute.description),
  };
}

export const revalidate = 60; // ISR: Revalidate every 60 seconds
export const dynamicParams = true; // Allow dynamic rendering for unknown IDs

export async function generateStaticParams() {
  let posts: Post[] = [];
  try {
    // Always use posts.json during build to avoid fetch failures
    const postsData = await fs.readFile(jsonFilePath, "utf-8");
    posts = JSON.parse(postsData || "[]");
  } catch (error) {
    console.warn("Failed to read posts.json during build:", error);
    // Fallback to hardcoded IDs if posts.json is unavailable
    return [
      { id: "1742070085423" }, // Charles Darwin
      { id: "1742069898679" }, // Albert Einstein
      { id: "1742050221362" }, // Nikola Tesla
      { id: "1742050091474" }, // J. Robert Oppenheimer
    ];
  }
  return posts.map((post) => ({
    id: String(post.id),
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await fetch(`${API_BASE_URL}/api?id=${id}`, {
    cache: "no-store", // Fresh data at runtime
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch post ${id}: ${response.statusText}`);
  }
  const post: Post = await response.json();
  return (
    <>
      <style>{`body { padding: 0px !important; }`}</style>
      <TributePostDetailPage post={post} />
    </>
  );
}