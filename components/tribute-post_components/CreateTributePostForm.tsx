'use client';

import React, { useState, ChangeEvent, useEffect } from 'react';
import { Upload, X, CheckCircle, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

interface FormData {
  name: string;
  description: string;
  image: File | null;
}

const CreateTributeForm: React.FC = () => {
  const [formData_Info, setFormData_Info] = useState<FormData>({
    name: '',
    description: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [uploadImageSuccess, setUploadImageSuccess] = useState<boolean>(false);
  const [uploadFormMessage, setUploadFormMessage] = useState<string | null>(null);
  const [fillErrorMessage, setFillErrorMessage] = useState<{ [key: string]: string }>({
    image: '',
    name: '',
    description: '',
  });

  // Clear error messages when corresponding fields are filled
  useEffect(() => {
    setFillErrorMessage((prev) => ({
      ...prev,
      image: formData_Info.image !== null ? '' : prev.image,
      name: formData_Info.name.trim() !== '' ? '' : prev.name,
      description: formData_Info.description.trim() !== '' ? '' : prev.description,
    }));
  }, [formData_Info.image, formData_Info.name, formData_Info.description]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setUploadFormMessage(null);
  
    let hasErrors = false;
    const newErrors = { ...fillErrorMessage };
  
    if (formData_Info.image === null) {
      newErrors.image = 'Please upload an image';
      hasErrors = true;
    }
    if (formData_Info.name.trim() === '') {
      newErrors.name = 'Please enter a name';
      hasErrors = true;
    }
    if (formData_Info.description.trim() === '') {
      newErrors.description = 'Please enter a description';
      hasErrors = true;
    }
  
    setFillErrorMessage(newErrors);
    if (hasErrors) return;
  
    const formData = new FormData();
    formData.append('image', formData_Info.image as File);
    formData.append('name', formData_Info.name);
    formData.append('description', formData_Info.description);
  
    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json(); // Parse the JSON response
  
      if (response.ok && result.success) {
        setUploadFormMessage('Upload successful!');
        setFormData_Info({
          name: '',
          description: '',
          image: null,
        });
        setImagePreview(null);
        window.location.href = '/tribute-post';
      } else {
        setUploadFormMessage(result.error || 'Upload failed');
      }
    } catch (error) {
      setUploadFormMessage('Error uploading');
      console.error(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData_Info({
      ...formData_Info,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    setImageUploadError(null);
    setUploadImageSuccess(false);

    if (!file) {
      setImagePreview(null);
      setFormData_Info({ ...formData_Info, image: null });
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setImageUploadError('Invalid file type. Please upload a JPEG, JPG, or PNG file.');
      e.target.value = '';
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setImageUploadError('File size exceeds the maximum limit of 10MB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setFormData_Info({ ...formData_Info, image: file });
    setUploadImageSuccess(true);
  };

  const removeImage = (): void => {
    setImagePreview(null);
    setFormData_Info({ ...formData_Info, image: null });
    setUploadImageSuccess(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Create a Tribute Post</h1>
          <p className="text-gray-600">Honor someone special with a beautiful tribute</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
                {!imagePreview ? (
                  <div className="border-2 relative h-[200px] border-dashed border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors duration-150">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      id="image-upload"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer absolute top-0 left-0 flex flex-col items-center justify-center h-full w-full"
                    >
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">Click to upload JPG, JPEG or PNG (max. 10MB)</p>
                      <div className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-md font-medium hover:bg-indigo-100 transition-colors">
                        Select Image
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden">
                    <Image src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-[500px] object-cover" 
                      width={400} 
                      height={300}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                    >
                      <X size={20} className="text-gray-700" />
                    </button>
                  </div>
                )}

                {imageUploadError && (
                  <div className="mt-2 flex items-center text-red-600">
                    <AlertTriangle size={16} className="mr-1" />
                    <span className="text-sm">{imageUploadError}</span>
                  </div>
                )}

                {fillErrorMessage.image && (
                  <div className="mt-2 flex items-center text-red-600">
                    <AlertTriangle size={16} className="mr-1" />
                    <span className="text-sm">{fillErrorMessage.image}</span>
                  </div>
                )}

                {uploadImageSuccess && (
                  <div className="mt-2 flex items-center text-green-600">
                    <CheckCircle size={16} className="mr-1" />
                    <span className="text-sm">Image uploaded successfully</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Person&apoe;s Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData_Info.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter the person's name"
                />
                {fillErrorMessage.name && (
                  <div className="mt-2 flex items-center text-red-600">
                    <AlertTriangle size={16} className="mr-1" />
                    <span className="text-sm">{fillErrorMessage.name}</span>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData_Info.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Write about the person and why they're special..."
                ></textarea>
                {fillErrorMessage.description && (
                  <div className="mt-2 flex items-center text-red-600">
                    <AlertTriangle size={16} className="mr-1" />
                    <span className="text-sm">{fillErrorMessage.description}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150"
                >
                  Create Tribute
                </button>
              </div>
              {uploadFormMessage && <p className="mt-2">{uploadFormMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTributeForm;