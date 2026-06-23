'use client'

import { useState, Suspense, useRef } from 'react';
import { upload } from '@vercel/blob/client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { registerUser } from './actions';
import { ArrowLeft, Upload, User } from 'lucide-react';

function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      if (fileToUpload) {
        const ext = fileToUpload.name.split('.').pop() || 'png';
        const filename = `avatars/${Date.now()}-user-${Math.random().toString(36).substring(2, 9)}.${ext}`;
        
        const newBlob = await upload(filename, fileToUpload, {
          access: 'public',
          handleUploadUrl: '/api/upload',
        });
        
        formData.set('avatarUrl', newBlob.url);
      }
      formData.delete('avatar');
      
      const result = await registerUser(formData, redirectUrl);
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      if (!(err instanceof Error && err.message.includes('NEXT_REDIRECT'))) {
        console.error('Upload failed:', err);
        setError('An error occurred during registration.');
      } else {
        throw err;
      }
    }
    setIsSubmitting(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setFileToUpload(file);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md p-8 rounded-3xl bg-surface border border-white/10 shadow-2xl">
        <Link href="/properties" className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 transition-colors text-sm">
          <ArrowLeft size={16} /> Back
        </Link>
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2 text-center">Create Account</h2>
        <p className="text-foreground-muted text-center mb-8 text-sm">Join AuraPlan to save your favorite properties</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div 
              className="w-24 h-24 rounded-full bg-background border border-white/10 mb-3 overflow-hidden flex items-center justify-center cursor-pointer group relative"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <User size={32} className="text-foreground-muted group-hover:text-primary transition-colors" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Upload size={20} className="text-white" />
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
            <span className="text-xs text-foreground-muted">Profile Image (Optional)</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input 
              type="text" 
              name="name" 
              required 
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required 
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              required 
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover text-foreground py-3.5 rounded-xl font-medium transition-colors mt-2 shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <p className="text-center text-foreground-muted text-sm mt-6">
          Already have an account?{' '}
          <Link href={`/login${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
