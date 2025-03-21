// app/components/UploadForm.tsx
'use client';

import { useState } from 'react';

export default function UploadForm() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image || !description) {
      setMessage('Please provide both image and description');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Upload successful!');
        setDescription('');
        setImage(null);
        window.location.reload(); // Refresh to show new content
      } else {
        setMessage('Upload failed');
      }
    } catch (error) {
      setMessage('Error uploading');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}