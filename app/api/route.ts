import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface Post {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

const uploadsDir = path.join(process.cwd(), "public", "uploads");
const jsonFilePath = path.join(process.cwd(), "data", "posts.json");

async function ensureDirectories() {
  // Only create directories locally; skip in production (Vercel)
  if (process.env.NODE_ENV === "development") {
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.mkdir(path.dirname(jsonFilePath), { recursive: true });
  }

  try {
    const data = await fs.readFile(jsonFilePath, "utf-8");
    if (!data || data.trim() === "") {
      if (process.env.NODE_ENV === "development") {
        await fs.writeFile(jsonFilePath, JSON.stringify([]));
      }
    } else {
      JSON.parse(data); // Validate JSON
    }
  } catch {
    if (process.env.NODE_ENV === "development") {
      await fs.writeFile(jsonFilePath, JSON.stringify([]));
    }
  }
}

export async function POST(request: NextRequest) {
  // Disable writes in production for now
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Post creation is disabled in production. Use a database for persistent storage." },
      { status: 403 }
    );
  }

  try {
    await ensureDirectories();

    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;

    if (!file || !name || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadsDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const postsData = await fs.readFile(jsonFilePath, "utf-8");
    const posts: Post[] = JSON.parse(postsData || "[]");

    const newPost: Post = {
      id: Date.now(),
      name,
      description,
      imageUrl: `/uploads/${fileName}`,
      createdAt: new Date().toISOString(),
    };

    posts.unshift(newPost);
    await fs.writeFile(jsonFilePath, JSON.stringify(posts, null, 2));

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureDirectories();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const postsData = await fs.readFile(jsonFilePath, "utf-8");
    const posts: Post[] = JSON.parse(postsData || "[]");

    if (id) {
      const post = posts.find((p) => String(p.id) === id);
      return NextResponse.json(post || { error: "Post not found" }, {
        status: post ? 200 : 404,
      });
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}