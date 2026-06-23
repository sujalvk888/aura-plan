'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/host/actions';
import { LayoutDashboard, Building, PlusSquare, LogOut, Settings, X } from 'lucide-react';

interface SidebarProps {
  onMobileClose?: () => void;
}

export default function Sidebar({ onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/5 bg-surface/95 backdrop-blur-md flex flex-col h-screen sticky top-0 shadow-2xl md:shadow-none">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <Link href="/host/dashboard" onClick={onMobileClose} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-[#FFF8E7]">
            A
          </div>
          <span className="text-xl font-heading font-semibold tracking-wide text-foreground">
            AuraPlan <span className="text-xs text-[#E8C39E] font-normal">HOST</span>
          </span>
        </Link>
        {onMobileClose && (
          <button onClick={onMobileClose} className="md:hidden p-2 text-foreground-muted hover:text-foreground">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        <Link 
          href="/host/dashboard" 
          onClick={onMobileClose}
          className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/host/dashboard' ? 'bg-[rgba(180,130,80,0.15)] text-[#FFF8E7]' : 'text-foreground-muted hover:text-foreground hover:bg-white/5'}`}
        >
          {pathname === '/host/dashboard' && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-[3px] bg-primary rounded-r-full" />}
          <LayoutDashboard size={20} />
          <span className="font-medium text-sm">Dashboard</span>
        </Link>
        <Link 
          href="/host/dashboard/properties" 
          onClick={onMobileClose}
          className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/host/dashboard/properties' ? 'bg-[rgba(180,130,80,0.15)] text-[#FFF8E7]' : 'text-foreground-muted hover:text-foreground hover:bg-white/5'}`}
        >
          {pathname === '/host/dashboard/properties' && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-[3px] bg-primary rounded-r-full" />}
          <Building size={20} />
          <span className="font-medium text-sm">My Properties</span>
        </Link>
        <Link 
          href="/host/dashboard/properties/new" 
          onClick={onMobileClose}
          className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/host/dashboard/properties/new' ? 'bg-[rgba(180,130,80,0.15)] text-[#FFF8E7]' : 'text-foreground-muted hover:text-foreground hover:bg-white/5'}`}
        >
          {pathname === '/host/dashboard/properties/new' && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-[3px] bg-primary rounded-r-full" />}
          <PlusSquare size={20} />
          <span className="font-medium text-sm">Add Property</span>
        </Link>
        
        <div className="pt-4 mt-4 border-t border-white/5">
          <Link 
            href="/host/dashboard/settings" 
            onClick={onMobileClose}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/host/dashboard/settings' ? 'bg-[rgba(180,130,80,0.15)] text-[#FFF8E7]' : 'text-foreground-muted hover:text-foreground hover:bg-white/5'}`}
          >
            {pathname === '/host/dashboard/settings' && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-[3px] bg-primary rounded-r-full" />}
            <Settings size={20} />
            <span className="font-medium text-sm">Account Settings</span>
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-white/5">
        <form action={logout}>
          <button type="submit" className="flex w-full items-center gap-3 px-4 py-3 text-[#E07A5F] hover:text-[#E07A5F]/80 hover:bg-[#E07A5F]/10 rounded-xl transition-colors">
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
