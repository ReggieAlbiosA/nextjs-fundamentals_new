'use client'

import React from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';



const CreatePostButton: React.FC<{ className?: string }> = ({ className }) => {
    
const router = useRouter();

  return (
     <div className={`${className} w-max`}>
        <button 
          className="group relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => router.push('/tribute-post/create-tributepost')}
        >
          {/* Icon */}
          <span className="flex items-center justify-center bg-white text-indigo-600 rounded-full h-5 w-5 group-hover:scale-110 transition-transform duration-300">
            <Plus size={14} />
          </span>
          
          {/* Text */}
          <span className="font-semibold text-md">Create Tribute</span>
          
          {/* Shine effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -left-full group-hover:left-full transition-all duration-1000"></span>
        </button>
      </div>
  );
};

export default CreatePostButton;
