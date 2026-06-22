'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/host/actions';
import { LayoutDashboard, Building, PlusSquare, LogOut, Settings, Menu, X } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on navigation on mobile
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-surface/90 backdrop-blur-md sticky top-0 z-40">
        <Link href="/host/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-foreground">
            A
          </div>
          <span className="text-xl font-heading font-semibold tracking-wide text-foreground">
            AuraPlan <span className="text-xs text-primary font-normal">HOST</span>
          </span>
        </Link>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-foreground-muted hover:text-foreground bg-white/5 rounded-full"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-surface/95 backdrop-blur-xl flex flex-col h-screen transform transition-transform duration-300 ease-in-out
        md:sticky md:top-0 md:translate-x-0 md:bg-surface/50
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Link href="/host/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-foreground">
              A
            </div>
            <span className="text-xl font-heading font-semibold tracking-wide text-foreground">
              AuraPlan <span className="text-xs text-primary font-normal">HOST</span>
            </span>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 text-foreground-muted hover:text-foreground bg-white/5 rounded-full"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link 
            href="/host/dashboard" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/host/dashboard' ? 'bg-primary/10 text-primary' : 'text-foreground-muted hover:text-foreground hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link 
            href="/host/dashboard/properties" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname.includes('/properties') && !pathname.includes('/new') ? 'bg-primary/10 text-primary' : 'text-foreground-muted hover:text-foreground hover:bg-white/5'}`}
          >
            <Building size={20} />
            <span className="font-medium text-sm">My Properties</span>
          </Link>
          <Link 
            href="/host/dashboard/properties/new" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname.includes('/new') ? 'bg-primary/10 text-primary' : 'text-foreground-muted hover:text-foreground hover:bg-white/5'}`}
          >
            <PlusSquare size={20} />
            <span className="font-medium text-sm">Add Property</span>
          </Link>
          
          <div className="pt-4 mt-4 border-t border-white/5">
            <Link 
              href="/host/dashboard/settings" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname.includes('/settings') ? 'bg-primary/10 text-primary' : 'text-foreground-muted hover:text-foreground hover:bg-white/5'}`}
            >
              <Settings size={20} />
              <span className="font-medium text-sm">Account Settings</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <form action={logout}>
            <button type="submit" className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors">
              <LogOut size={20} />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
