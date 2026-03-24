"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project, PROJECT_CATEGORIES } from '../../types';
import { createProject, updateProject, getProjectById, uploadImages } from '../../lib/api';

const ProjectForm: React.FC<{ projectId?: string }> = ({ projectId }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!projectId);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!projectId) return;
    getProjectById(projectId)
      .then((project: Project) => {
        setTitle(project.title ?? '');
        setDescription(project.description ?? '');
        setLocation(project.location ?? '');
        setCategory(project.category ?? '');
        setImages(project.images ?? []);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to load project.');
        setIsLoading(false);
      });
  }, [projectId]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setIsUploading(true);
    setError('');
    try {
      const uploaded = await uploadImages(files);
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) { setError('Title is required.'); return; }
    if (!description.trim()) { setError('Description is required.'); return; }
    setIsSubmitting(true);
    try {
      const data = {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        category,
        images,
      };
      if (projectId) {
        await updateProject({ id: projectId, ...data });
      } else {
        await createProject(data);
      }
      router.push('/projects');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center py-20 text-gray-400 text-sm">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Project Title <span className="text-red-500">*</span>
        </label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Modern Living Room Redesign" required
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900" />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 bg-white">
          <option value="">Select a category</option>
          {PROJECT_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Mumbai, Maharashtra"
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}
          rows={4} placeholder="Describe this project — style, materials, client brief..." required
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 resize-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Images <span className="text-gray-400 font-normal">({images.length} added)</span>
        </label>
        {images.length > 0 && (
          <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((url, index) => (
              <div key={`${url}-${index}`} className="relative w-full overflow-hidden rounded-lg bg-gray-100 aspect-video group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(index)}
                  className="absolute inset-0 flex items-center justify-center bg-black/45 text-white text-xl font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif"
          multiple onChange={handleFileChange} className="hidden" />
        <button type="button" disabled={isUploading} onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2 w-full rounded-lg border-2 border-dashed border-gray-300 px-4 py-4 text-sm text-gray-500 hover:border-gray-600 hover:text-gray-700 transition-colors disabled:opacity-50">
          {isUploading ? 'Uploading...' : 'Upload Images (JPG, PNG, WebP - max 10 MB each)'}
        </button>
      </div>
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <button type="submit" disabled={isSubmitting || isUploading}
          className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-60 transition-colors">
          {isSubmitting ? 'Saving...' : projectId ? 'Update Project' : 'Create Project'}
        </button>
        <button type="button" onClick={() => router.push('/projects')}
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;