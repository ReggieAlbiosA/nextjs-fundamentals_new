'use client';

import React from 'react';
import { Calendar, Heart, Share2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface TributePost {
  id: string;
  name: string;
  description: string;
  imageUrl: string; // Changed from imagePath to match API
  createdAt: string; // Changed from dateCreated to match API
  author?: string; // Optional since your API doesn't provide it yet
}

interface TributePostDetailPageProps {
  post?: TributePost; // Changed from tributePost to match your page.tsx naming
}

const TributePostDetailPage: React.FC<TributePostDetailPageProps> = ({ post }) => {
  const router = useRouter();

  // Fallback data aligned with your API structure
  const fallbackPost: TributePost = {
    id: '1',
    name: 'Marie Curie',
    description:
      'Marie Skłodowska Curie was a Polish and naturalized-French physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize, the first person to win Nobel Prizes in two scientific fields, and the first woman to become a professor at the University of Paris.',
    imageUrl: '/uploads/placeholder.jpg', // Use a static placeholder in public/uploads
    createdAt: '2025-03-14T12:00:00.000Z', // ISO format to match API
    author: 'Science History Foundation', // Optional fallback
  };

  const postData = post || fallbackPost;

  const handleBack = () => {
    router.push('/tribute-post'); // Changed to explicit route for consistency
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation bar with back button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to Tributes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero section with image */}
        <div className="relative rounded-xl overflow-hidden shadow-xl mb-8 h-96">
          <Image
            src={postData.imageUrl}
            alt={postData.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = '/uploads/placeholder.jpg'; // Fallback image on error
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-2">{postData.name}</h1>
            <div className="flex items-center text-gray-200">
              <Calendar size={16} className="mr-2" />
              <span>{new Date(postData.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Content card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Author and actions bar */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Tribute by{' '}
                <span className="font-medium text-gray-700">
                  {postData.author || 'Anonymous'}
                </span>
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                <Heart size={18} className="mr-1" />
                <span className="text-sm">Appreciate</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-indigo-500 transition-colors">
                <Share2 size={18} className="mr-1" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>

          {/* Main description */}
          <div className="px-6 py-8">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {postData.description}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Posted on {new Date(postData.createdAt).toLocaleDateString()}
              </div>
              <div>
                <Link
                  href="/tribute-post/create-tributepost"
                  className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-md transition-shadow"
                >
                  Create Your Own Tribute
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TributePostDetailPage;