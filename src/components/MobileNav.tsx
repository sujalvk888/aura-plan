'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, User } from 'lucide-react';

interface MobileNavProps {
  user: any;
}

export default function MobileNav({ user }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <button onClick={() => setIsOpen(true)} className="p-2 text-foreground">
        <Menu size={24} />
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col p-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-foreground">
                A
              </div>
              <span className="text-xl font-heading font-semibold tracking-wide text-foreground">AuraPlan</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 text-foreground/80 hover:text-foreground">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6 text-lg">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-foreground/80 hover:text-foreground">
              Home
            </Link>
            <Link href="/properties" onClick={() => setIsOpen(false)} className="text-foreground/80 hover:text-foreground">
              Properties
            </Link>
            <Link href="/#about" onClick={() => setIsOpen(false)} className="text-foreground/80 hover:text-foreground">
              About
            </Link>
            <Link href="/host" onClick={() => setIsOpen(false)} className="text-foreground/80 hover:text-foreground border-y border-white/10 py-4 my-2">
              Switch to Host
            </Link>

            {user ? (
              <>
                <Link href="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-foreground/80 hover:text-foreground">
                  <Heart size={20} /> Wishlist
                </Link>
                <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl text-foreground">
                  {user.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <User size={20} />
                  )}
                  {user.name}
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-4 mt-4">
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-center py-3 rounded-full border border-white/20 text-foreground">
                  Sign In
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="text-center py-3 rounded-full bg-primary text-white font-medium">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
