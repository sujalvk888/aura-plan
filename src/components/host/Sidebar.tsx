import Link from 'next/link';
import { logout } from '@/app/host/actions';
import { LayoutDashboard, Building, PlusSquare, LogOut, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-white/5 bg-surface/50 backdrop-blur-md flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-white/5">
          <Link href="/host/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-foreground">
              A
            </div>
            <span className="text-xl font-heading font-semibold tracking-wide text-foreground">
              AuraPlan <span className="text-xs text-primary font-normal">HOST</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/host/dashboard" 
            className="flex items-center gap-3 px-4 py-3 text-foreground-muted hover:text-foreground hover:bg-white/5 rounded-xl transition-colors"
          >
            <LayoutDashboard size={20} />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link 
            href="/host/dashboard/properties" 
            className="flex items-center gap-3 px-4 py-3 text-foreground-muted hover:text-foreground hover:bg-white/5 rounded-xl transition-colors"
          >
            <Building size={20} />
            <span className="font-medium text-sm">My Properties</span>
          </Link>
          <Link 
            href="/host/dashboard/properties/new" 
            className="flex items-center gap-3 px-4 py-3 text-foreground-muted hover:text-foreground hover:bg-white/5 rounded-xl transition-colors"
          >
            <PlusSquare size={20} />
            <span className="font-medium text-sm">Add Property</span>
          </Link>
          
          <div className="pt-4 mt-4 border-t border-white/5">
            <Link 
              href="/host/dashboard/settings" 
              className="flex items-center gap-3 px-4 py-3 text-foreground-muted hover:text-foreground hover:bg-white/5 rounded-xl transition-colors"
            >
              <Settings size={20} />
              <span className="font-medium text-sm">Settings</span>
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

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-center h-16 z-[100] px-2 safe-area-pb">
        <Link href="/host/dashboard" className="flex flex-col items-center justify-center w-full h-full text-foreground-muted hover:text-foreground transition-colors">
          <LayoutDashboard size={20} />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link href="/host/dashboard/properties" className="flex flex-col items-center justify-center w-full h-full text-foreground-muted hover:text-foreground transition-colors">
          <Building size={20} />
          <span className="text-[10px] mt-1 font-medium">Properties</span>
        </Link>
        <Link href="/host/dashboard/properties/new" className="flex flex-col items-center justify-center w-full h-full text-foreground-muted hover:text-foreground transition-colors">
          <div className="bg-primary/20 text-primary p-2 rounded-full -mt-6 border-4 border-background">
            <PlusSquare size={20} />
          </div>
          <span className="text-[10px] mt-1 font-medium">Add</span>
        </Link>
        <Link href="/host/dashboard/settings" className="flex flex-col items-center justify-center w-full h-full text-foreground-muted hover:text-foreground transition-colors">
          <Settings size={20} />
          <span className="text-[10px] mt-1 font-medium">Settings</span>
        </Link>
      </nav>
    </>
  );
}
