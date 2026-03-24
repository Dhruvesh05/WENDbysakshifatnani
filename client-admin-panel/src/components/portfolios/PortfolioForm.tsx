"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Portfolio } from '../../types';
import { createPortfolio, updatePortfolio, getPortfolioById, uploadImage } from '../../lib/api';

const PortfolioForm: React.FC<{ portfolioId?: string }> = ({ portfolioId }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!portfolioId);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!portfolioId) return;
    getPortfolioById(portfolioId)
      .then((p: Portfolio) => {
        setTitle(p.title ?? '');
        setDescription(p.description ?? '');
        setImages(p.images ?? []);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to load portfolio.');
        setIsLoading(false);
      });
  }, [portfolioId]);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setIsUploading(true);
    setError('');
    try {
      const urls = await Promise.all(files.map(f => uploadImage(f)));
      setImages(prev => [...prev, ...urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) { setError('Title is required.'); return; }
    if (!description.trim()) { setError('Description is required.'); return; }
    setIsSubmitting(true);
    try {
      const data = { title: title.trim(), description: description.trim(), images };
      if (portfolioId) {
        await updatePortfolio(portfolioId, { id: portfolioId, ...data });
      } else {
        await createPortfolio(data);
      }
      router.push('/portfolios');
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
          Portfolio Title <span className="text-red-500">*</span>
        </label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Minimalist Apartment Collection" required
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}
          rows={4} placeholder="Describe this portfolio collection..." required
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 resize-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images <span className="text-gray-400 font-normal">({images.length} added)</span>
        </label>
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-3">
            {images.map((url, idx) => (
              <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(idx)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xl font-bold">
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif"
          multiple onChange={handleFilesChange} className="hidden" />
        <button type="button" disabled={isUploading} onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2 w-full rounded-lg border-2 border-dashed border-gray-300 px-4 py-4 text-sm text-gray-500 hover:border-gray-600 hover:text-gray-700 transition-colors disabled:opacity-50">
          {isUploading ? 'Uploading...' : 'Add Images (select multiple — JPG, PNG, WebP, max 10 MB each)'}
        </button>
      </div>
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <button type="submit" disabled={isSubmitting || isUploading}
          className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-60 transition-colors">
          {isSubmitting ? 'Saving...' : portfolioId ? 'Update Portfolio' : 'Create Portfolio'}
        </button>
        <button type="button" onClick={() => router.push('/portfolios')}
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PortfolioForm;