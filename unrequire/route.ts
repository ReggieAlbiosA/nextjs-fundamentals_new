// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
const jsonFilePath = path.join(process.cwd(), 'data', 'posts.json');

// Ensure directories exist
async function ensureDirectories() {
  await fs.mkdir(uploadsDir, { recursive: true });
  await fs.mkdir(path.dirname(jsonFilePath), { recursive: true });
  
  try {
    const data = await fs.readFile(jsonFilePath, 'utf-8');
    // If file exists but is empty or invalid, initialize it
    if (!data || data.trim() === '') {
      await fs.writeFile(jsonFilePath, JSON.stringify([]));
    } else {
      JSON.parse(data); // Validate JSON
    }
  } catch (error) {
    // If file doesn't exist or JSON is invalid, create new empty array
    await fs.writeFile(jsonFilePath, JSON.stringify([]));
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDirectories();
    
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const description = formData.get('description') as string;

    if (!file || !description) {
      return NextResponse.json({ error: 'Missing image or description' }, { status: 400 });
    }

    // Generate unique filename
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadsDir, fileName);
    
    // Save the file
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // Read existing posts
    const postsData = await fs.readFile(jsonFilePath, 'utf-8');
    const posts = JSON.parse(postsData || '[]');

    // Add new post
    const newPost = {
      id: Date.now(),
      description,
      imageUrl: `/uploads/${fileName}`,
      createdAt: new Date().toISOString()
    };
    
    posts.unshift(newPost);
    await fs.writeFile(jsonFilePath, JSON.stringify(posts, null, 2));

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ensureDirectories();
    const postsData = await fs.readFile(jsonFilePath, 'utf-8');
    const posts = JSON.parse(postsData || '[]');
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json([]);
  }
}

export async function DELETE(request: NextRequest) {
    try {
      await ensureDirectories();
      
      // Get the list of IDs to delete from the request body
      const { ids } = await request.json();
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return NextResponse.json({ error: 'Invalid or missing IDs' }, { status: 400 });
      }
  
      // Read current posts
      let posts = [];
      try {
        const postsData = await fs.readFile(jsonFilePath, 'utf-8');
        posts = JSON.parse(postsData || '[]');
      } catch (error) {
        posts = [];
      }
  
      // Filter out posts with matching IDs and get deleted image paths
      const deletedImagePaths = posts
        .filter((post: any) => ids.includes(post.id))
        .map((post: any) => path.join(process.cwd(), 'public', post.imageUrl));
      const updatedPosts = posts.filter((post: any) => !ids.includes(post.id));
  
      // Write updated posts back to file
      await fs.writeFile(jsonFilePath, JSON.stringify(updatedPosts, null, 2));
  
      // Delete associated image files
      await Promise.all(
        deletedImagePaths.map((filePath: string) =>
            fs.unlink(filePath).catch((err) => console.error(`Failed to delete file ${filePath}:`, err))
          )
      );
  
      return NextResponse.json({ success: true, deletedIds: ids });
    } catch (error) {
      console.error('Delete error:', error);
      return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
  }