'use client';

import { useState, useRef } from 'react';
import { Camera, Save, Loader2, Check } from 'lucide-react';
import { updateHostProfile } from './actions';

interface HostSettingsFormProps {
  host: {
    id: string;
    email: string;
    name: string;
    bio: string | null;
    avatarUrl: string | null;
  };
}

export default function HostSettingsForm({ host }: HostSettingsFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(host.avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await updateHostProfile(formData);
      
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-surface border border-white/5 rounded-2xl p-8 max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Avatar Upload */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-foreground mb-1">Profile Picture</label>
          <div className="flex flex-row items-center gap-5">
            <div 
              onClick={handleImageClick}
              className="relative w-24 h-24 rounded-full bg-background border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-primary transition-colors flex-shrink-0"
            >
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-heading font-bold text-foreground-muted">{host.name.charAt(0)}</span>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#16110C] rounded-full flex items-center justify-center shadow-lg border border-[#FFF8E7]/30">
                <Camera size={14} className="text-[#FFF8E7]" />
              </div>
            </div>
            <div className="text-sm text-[#E8E4DF]">
              <p>Click the avatar to upload a new photo.</p>
              <p className="text-xs mt-1 opacity-80">Recommended size: 256x256px.</p>
            </div>
            <input 
              type="file" 
              name="avatar" 
              accept="image/*" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Info Fields */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Display Name</label>
            <input 
              type="text" 
              name="name" 
              defaultValue={host.name} 
              required 
              className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#F8F6F0] text-[16px] focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address (Read Only)</label>
            <input 
              type="email" 
              value={host.email} 
              disabled 
              className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#F8F6F0]/60 text-[16px] cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Host Bio</label>
            <textarea 
              name="bio" 
              defaultValue={host.bio || ''} 
              rows={4}
              placeholder="Tell clients about yourself and your properties..."
              className="w-full bg-[#16110C] border border-white/12 rounded-xl px-4 py-3 text-[#F8F6F0] text-[16px] focus:outline-none focus:border-primary transition-colors resize-none"
            ></textarea>
            <p className="text-xs text-foreground-muted mt-2">This bio will be shown on the property detail pages.</p>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm flex items-center gap-2">
            <Check size={16} /> Profile updated successfully!
          </div>
        )}

        <div className="pt-4 border-t border-white/5">
          <button 
            type="submit" 
            disabled={isPending}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-foreground px-6 py-3.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
          >
            {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isPending ? 'Saving Changes...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
