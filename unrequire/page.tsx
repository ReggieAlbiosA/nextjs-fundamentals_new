// app/page.tsx
import UploadForm from '@/unrequire/UploadForm';
import DeleteButton from '@/unrequire/DeleteButton';

async function getPosts() {
  const res = await fetch(`http://localhost:3000/api/upload`, {
    cache: 'no-store' // Ensure fresh data
  });
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Community Blog</h1>
      
      {/* Upload Form */}
      <div className="mb-8">
        <UploadForm />
      </div>

      {/* Posts Display */}
      <div className="grid gap-6">
        {posts.map((post: any) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <div className="absolute top-2 right-2">
              <DeleteButton postId={post.id} />
            </div>
            <img
              src={post.imageUrl}
              alt={post.description}
              className="max-w-full h-auto mb-4 rounded"
            />
            <p className="mb-2">{post.description}</p>
            <p className="text-sm text-gray-500">
              Posted on: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}