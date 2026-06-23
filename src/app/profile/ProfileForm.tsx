'use client'

import { useState, useRef } from 'react';
import { User, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { updateProfile } from './actions';

interface ProfileFormProps {
  user: {
    name: string;
    email: string;
    avatarUrl: string | null;
  }
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(user.avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    const result = await updateProfile(formData);
    
    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess(result.message || "Profile updated successfully!");
    }
    
    setLoading(false);
  };

  return (
    <div className="bg-surface border border-white/5 rounded-3xl p-8 shadow-2xl">
      <form action={handleSubmit} className="space-y-8">
        
        {/* Avatar Upload */}
        <div className="flex flex-col items-center justify-center">
          <div 
            className="w-32 h-32 rounded-full bg-background border-4 border-white/5 mb-4 overflow-hidden flex items-center justify-center cursor-pointer group relative"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="text-foreground-muted group-hover:text-primary transition-colors" />
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
              <Upload size={24} className="text-white mb-1" />
              <span className="text-xs text-white font-medium">Change</span>
            </div>
          </div>
          <input 
            type="file" 
            name="avatar" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/jpeg, image/png, image/webp"
            onChange={handleImageChange}
          />
          <p className="text-sm text-foreground-muted">Click the image to change your avatar</p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm text-center">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-xl text-sm text-center flex items-center justify-center gap-2">
            <CheckCircle2 size={18} /> {success}
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-5 max-w-md mx-auto">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input 
              type="email" 
              disabled
              value={user.email}
              className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-3 text-foreground-muted cursor-not-allowed"
            />
            <p className="text-xs text-foreground-muted mt-2">Email cannot be changed.</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input 
              type="text" 
              name="name" 
              defaultValue={user.name}
              required 
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-foreground py-3.5 rounded-xl font-medium transition-colors mt-6 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
