import TributePostDetailPage from "@/components/tribute-post_components/TributePostDetailPage";
import type { Metadata } from "next";
import { titleMetadataCreator, descriptionMetadataCreator } from "@/app/utils/metadataCreator";
import fs from "fs/promises";
import path from "path";

const jsonFilePath = path.join(process.cwd(), "data", "posts.json");
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

// Validate API base URL in production
if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL must be defined in production");
}

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

// Utility function for fetch with timeout and retry
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 2, timeout = 5000): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
      }
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (i === retries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
  throw new Error("Unreachable code"); // TypeScript safety
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let tribute: Post | undefined;
  if (process.env.NODE_ENV === "development") {
    try {
      const postsData = await fs.readFile(jsonFilePath, "utf-8");
      const posts: Post[] = JSON.parse(postsData || "[]");
      tribute = posts.find((p) => String(p.id) === id);
    } catch (error) {
      console.warn("Failed to read posts.json:", error);
    }
  } else {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/api?id=${id}`, {
        next: { revalidate: 60 }, // Cache with ISR
      });
      tribute = await response.json();
    } catch (error) {
      console.error(`Failed to fetch metadata for post ${id}:`, error);
    }
  }

  if (!tribute) {
    return { title: `Tribute #${id}` };
  }

  return {
    title: titleMetadataCreator(tribute.description),
    description: descriptionMetadataCreator(tribute.description),
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
      const response = await fetchWithRetry(`${API_BASE_URL}/api?limit=100`, {
        next: { revalidate: 60 }, // Cache with ISR
      });
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

  let post: Post;
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/api?id=${id}`, {
      next: { revalidate: 60 }, // Leverage ISR caching
    });
    post = await response.json();
  } catch (error) {
    console.error(`Failed to fetch post ${id}:`, error);
    return (
      <div className="error-container">
        <h1>Error</h1>
        <p>Could not load the tribute post. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <TributePostDetailPage post={post} />
      <style jsx>{`
        .page-container {
          padding: 0;
        }
        .error-container {
          text-align: center;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}