'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, User, Building, LogIn, UserPlus } from 'lucide-react';

interface MobileMenuProps {
  user: {
    name: string;
    avatarUrl: string | null;
  } | null;
}

export default function MobileMenu({ user }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-foreground-muted hover:text-foreground transition-colors"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-foreground">
                A
              </div>
              <span className="text-xl font-heading font-semibold tracking-wide text-foreground">
                AuraPlan
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-foreground-muted hover:text-foreground bg-white/5 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col p-6 gap-6 overflow-y-auto">
            <div className="flex flex-col gap-4 text-lg font-medium">
              <Link href="/" onClick={() => setIsOpen(false)} className="py-2 text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/properties" onClick={() => setIsOpen(false)} className="py-2 text-foreground hover:text-primary transition-colors">
                Properties
              </Link>
              <Link href="/#about" onClick={() => setIsOpen(false)} className="py-2 text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/host" onClick={() => setIsOpen(false)} className="py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Building size={20} className="text-primary" /> Switch to Host
              </Link>
            </div>

            <div className="w-full h-px bg-white/5 my-2" />

            {user ? (
              <div className="flex flex-col gap-4">
                <Link href="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2 text-foreground hover:text-primary transition-colors">
                  <Heart size={20} /> Wishlist
                </Link>
                <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2 text-foreground hover:text-primary transition-colors">
                  {user.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.avatarUrl} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <User size={20} />
                  )}
                  {user.name} Profile
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-foreground px-6 py-4 rounded-xl font-medium transition-colors"
                >
                  <LogIn size={20} /> Sign In
                </Link>
                <Link 
                  href="/register" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-foreground px-6 py-4 rounded-xl font-medium transition-colors"
                >
                  <UserPlus size={20} /> Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
