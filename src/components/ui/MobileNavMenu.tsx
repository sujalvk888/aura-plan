'use client';

import { useState } from 'react';
import { Menu, X, User, Heart } from 'lucide-react';
import Link from 'next/link';

export default function MobileNavMenu({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden flex items-center">
      <button 
        onClick={toggleMenu} 
        className="p-2 text-foreground-muted hover:text-foreground transition-colors ml-2"
        aria-label="Toggle mobile menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleMenu} />
          
          <div className="relative w-[280px] sm:w-[320px] bg-surface border-l border-white/10 h-full ml-auto shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <span className="font-heading font-semibold text-lg text-foreground">Menu</span>
              <button onClick={toggleMenu} className="p-2 text-foreground-muted hover:text-foreground">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6 overflow-y-auto">
              {/* Main Links */}
              <div className="flex flex-col gap-4">
                <Link href="/" onClick={toggleMenu} className="text-lg font-medium text-foreground/80 hover:text-foreground">
                  Home
                </Link>
                <Link href="/properties" onClick={toggleMenu} className="text-lg font-medium text-foreground/80 hover:text-foreground">
                  Properties
                </Link>
                <Link href="/#about" onClick={toggleMenu} className="text-lg font-medium text-foreground/80 hover:text-foreground">
                  About
                </Link>
              </div>

              <hr className="border-white/5" />

              {/* User Section */}
              {user ? (
                <div className="flex flex-col gap-4">
                  <Link href="/wishlist" onClick={toggleMenu} className="flex items-center gap-3 text-lg font-medium text-foreground/80 hover:text-foreground">
                    <Heart size={20} /> Wishlist
                  </Link>
                  <Link href="/profile" onClick={toggleMenu} className="flex items-center gap-3 text-lg font-medium text-foreground/80 hover:text-foreground">
                    {user.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.avatarUrl} alt="Avatar" className="w-5 h-5 rounded-full object-cover" />
                    ) : (
                      <User size={20} />
                    )}
                    Profile
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link href="/login" onClick={toggleMenu} className="text-lg font-medium text-foreground/80 hover:text-foreground">
                    Sign In
                  </Link>
                  <Link href="/register" onClick={toggleMenu} className="bg-primary text-center hover:bg-primary-hover text-foreground px-6 py-3 rounded-xl font-medium transition-colors">
                    Sign Up
                  </Link>
                </div>
              )}

              <hr className="border-white/5" />

              {/* Host Section */}
              <Link href="/host" onClick={toggleMenu} className="text-lg font-medium text-primary hover:text-primary-hover transition-colors">
                Switch to Host
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
