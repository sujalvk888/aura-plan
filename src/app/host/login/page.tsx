'use client'

import { useState } from 'react';
import Link from 'next/link';
import { login } from '@/app/host/actions';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-6 bg-background relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors text-sm font-medium">
        <ArrowLeft size={16} /> Back to Main Site
      </Link>
      
      <div className="w-full max-w-md p-8 rounded-3xl bg-surface border border-white/10 shadow-2xl">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2 text-center">Welcome Back</h2>
        <p className="text-foreground-muted text-center mb-8 text-sm">Sign in to your Host Workspace</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}
        
        <form action={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required 
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="name@company.com"
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
          
          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-foreground py-3.5 rounded-xl font-medium transition-colors mt-2 shadow-lg shadow-primary/20"
          >
            Sign In
          </button>
        </form>
        
        <p className="text-center text-foreground-muted text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/host/register" className="text-primary hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
