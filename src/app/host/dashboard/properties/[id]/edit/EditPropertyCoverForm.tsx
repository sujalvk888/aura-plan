'use client'

import { useState } from 'react';
import { upload } from '@vercel/blob/client';
import { uploadCoverImage } from '../../actions';
import { Upload, Loader2 } from 'lucide-react';

export default function EditPropertyCoverForm({ propertyId }: { propertyId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileToUpload) return;
    
    setIsSubmitting(true);
    const formData = new FormData();
    
    try {
      const ext = fileToUpload.name.split('.').pop() || 'png';
      const filename = `properties/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;
      
      const newBlob = await upload(filename, fileToUpload, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      
      formData.set('coverImageUrl', newBlob.url);
      
      await uploadCoverImage(propertyId, formData);
    } catch (err) {
      if (!(err instanceof Error && err.message.includes('NEXT_REDIRECT'))) {
        console.error('Upload failed:', err);
      } else {
        throw err;
      }
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 space-y-4">
      <input 
        type="file" 
        accept="image/jpeg, image/png, image/webp"
        onChange={(e) => setFileToUpload(e.target.files?.[0] || null)}
        className="block w-full text-sm text-foreground-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" 
        required
      />
      <button 
        type="submit" 
        disabled={isSubmitting || !fileToUpload}
        className="bg-white/5 hover:bg-white/10 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Upload size={16} /> Upload New Cover</>}
      </button>
    </form>
  );
}
