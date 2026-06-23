import Link from 'next/link';
import { getUserSession } from '@/lib/userAuth';
import { User, Heart } from 'lucide-react';
import MobileNavMenu from './ui/MobileNavMenu';

export default async function Navbar() {
  const user = await getUserSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-foreground">
            A
          </div>
          <Link href="/" className="text-xl font-heading font-semibold tracking-wide text-foreground">
            AuraPlan
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/properties" className="text-foreground/80 hover:text-foreground transition-colors">
            Properties
          </Link>
          <Link href="/#about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/host" className="hidden md:flex text-sm font-medium text-foreground hover:bg-white/5 px-4 py-2 rounded-full transition-colors border border-transparent hover:border-white/10 whitespace-nowrap">
            Switch to Host
          </Link>
          
          {user ? (
            <>
              <Link href="/wishlist" className="hidden md:flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors">
                <Heart size={18} /> <span className="text-sm font-medium">Wishlist</span>
              </Link>
              <Link href="/profile" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                {user.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatarUrl} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <User size={16} />
                )}
                {user.name.split(' ')[0]}
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:block text-foreground/80 hover:text-foreground text-sm font-medium transition-colors">
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="hidden md:block bg-primary hover:bg-primary-hover text-foreground px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
              >
                Sign Up
              </Link>
            </>
          )}

          <MobileNavMenu user={user} />
        </div>
      </div>
    </nav>
  );
}
