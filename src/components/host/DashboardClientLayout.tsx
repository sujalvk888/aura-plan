'use client';

import Sidebar from './Sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building, PlusSquare, Settings } from 'lucide-react';

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/host/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/host/dashboard/properties', icon: Building, label: 'Properties' },
    { href: '/host/dashboard/properties/new', icon: PlusSquare, label: 'Add' },
    { href: '/host/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans relative pb-20 md:pb-0">
      
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full min-w-0 md:ml-64">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-surface/95 backdrop-blur-md border-t border-white/5 z-50 flex items-center justify-around px-2 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex flex-col items-center justify-center w-full h-full px-[2px] py-[6px] gap-0.5 transition-colors ${isActive ? 'text-primary' : 'text-foreground-muted hover:text-foreground'}`}
            >
              <Icon size={20} className={isActive ? 'animate-in zoom-in duration-300' : ''} />
              <span className="text-[10px] tracking-[-0.2px] font-medium whitespace-nowrap overflow-hidden text-center">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
