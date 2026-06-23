'use client'

import { useState } from 'react';
import { upload } from '@vercel/blob/client';
import { addProperty } from '../actions';
import { Loader2 } from 'lucide-react';

export default function NewPropertyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      if (fileToUpload) {
        const ext = fileToUpload.name.split('.').pop() || 'png';
        const filename = `properties/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;
        
        const newBlob = await upload(filename, fileToUpload, {
          access: 'public',
          handleUploadUrl: '/api/upload',
        });
        
        formData.set('coverImageUrl', newBlob.url);
      }
      formData.delete('coverImage');
      
      await addProperty(formData);
    } catch (err) {
      if (!(err instanceof Error && err.message.includes('NEXT_REDIRECT'))) {
        console.error('Upload failed:', err);
        setIsSubmitting(false);
      } else {
        throw err;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Cover Image Section */}
      <div className="bg-surface border border-white/5 rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-heading font-semibold mb-6">Cover Image</h2>
        <div className="flex gap-6 items-start">
          <div className="flex-1 space-y-4">
            <input 
              type="file" 
              name="coverImage" 
              accept="image/*" 
              required 
              onChange={(e) => setFileToUpload(e.target.files?.[0] || null)}
              className="block w-full text-sm text-foreground-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" 
            />
            <p className="text-xs text-foreground-muted">Upload a high-quality thumbnail for this property.</p>
          </div>
        </div>
      </div>

      {/* Basic Information Form */}
      <div className="bg-surface border border-white/5 rounded-2xl p-8">
        <h2 className="text-xl font-heading font-semibold mb-6">Basic Information</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Property Name</label>
              <input type="text" name="name" required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. Modern Villa" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Property Type</label>
              <select name="type" required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea name="description" rows={4} required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Describe the property..."></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Address</label>
              <input type="text" name="address" required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Street Address" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">City</label>
              <input type="text" name="city" required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="City" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">State / Region</label>
              <input type="text" name="state" required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="State" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Country</label>
              <input type="text" name="country" required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Country" />
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 mt-8 flex justify-end">
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-foreground px-8 py-3.5 rounded-xl font-medium transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : 'Next: Add 3D Rooms'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
