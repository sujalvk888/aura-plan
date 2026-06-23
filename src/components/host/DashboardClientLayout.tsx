'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans relative">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-md border-b border-white/5 z-40 flex items-center px-4">
        <button onClick={toggleSidebar} className="p-2 text-foreground-muted hover:text-foreground">
          <Menu size={24} />
        </button>
        <span className="ml-4 font-heading font-semibold tracking-wide text-foreground">
          AuraPlan <span className="text-xs text-primary font-normal">HOST</span>
        </span>
      </div>

      {/* Sidebar Container */}
      <div 
        className={`fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:flex`}
      >
        <Sidebar onMobileClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 w-full pt-16 md:pt-0 min-w-0">
        {children}
      </main>
    </div>
  );
}
