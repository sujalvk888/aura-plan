'use client'

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { loginUser } from './actions';
import { ArrowLeft } from 'lucide-react';

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const handleSubmit = async (formData: FormData) => {
    const result = await loginUser(formData, redirectUrl);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md p-8 rounded-3xl bg-surface border border-white/10 shadow-2xl">
        <Link href="/properties" className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 transition-colors text-sm">
          <ArrowLeft size={16} /> Back
        </Link>
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2 text-center">Welcome Back</h2>
        <p className="text-foreground-muted text-center mb-8 text-sm">Sign in to your account</p>
        
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
          
          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-foreground py-3.5 rounded-xl font-medium transition-colors mt-2 shadow-lg shadow-primary/20"
          >
            Sign In
          </button>
        </form>
        
        <p className="text-center text-foreground-muted text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link href={`/register${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} className="text-primary hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
