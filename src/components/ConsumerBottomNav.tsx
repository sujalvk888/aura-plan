'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Heart, User, LogIn } from 'lucide-react';

interface ConsumerBottomNavProps {
  user: any;
}

export default function ConsumerBottomNav({ user }: ConsumerBottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-center h-16 z-[100] px-2 safe-area-pb pb-2">
      <Link href="/" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${pathname === '/' ? 'text-primary' : 'text-foreground-muted hover:text-foreground'}`}>
        <Home size={22} className={pathname === '/' ? 'fill-primary/20' : ''} />
        <span className="text-[10px] mt-1 font-medium">Home</span>
      </Link>
      
      <Link href="/properties" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${pathname === '/properties' ? 'text-primary' : 'text-foreground-muted hover:text-foreground'}`}>
        <Compass size={22} className={pathname === '/properties' ? 'fill-primary/20' : ''} />
        <span className="text-[10px] mt-1 font-medium">Explore</span>
      </Link>
      
      {user ? (
        <>
          <Link href="/wishlist" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${pathname === '/wishlist' ? 'text-primary' : 'text-foreground-muted hover:text-foreground'}`}>
            <Heart size={22} className={pathname === '/wishlist' ? 'fill-primary text-primary' : ''} />
            <span className="text-[10px] mt-1 font-medium">Wishlist</span>
          </Link>
          <Link href="/profile" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${pathname === '/profile' ? 'text-primary' : 'text-foreground-muted hover:text-foreground'}`}>
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt="Avatar" className={`w-6 h-6 rounded-full object-cover ${pathname === '/profile' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`} />
            ) : (
              <User size={22} className={pathname === '/profile' ? 'fill-primary/20' : ''} />
            )}
            <span className="text-[10px] mt-1 font-medium">Profile</span>
          </Link>
        </>
      ) : (
        <Link href="/login" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${pathname === '/login' ? 'text-primary' : 'text-foreground-muted hover:text-foreground'}`}>
          <LogIn size={22} />
          <span className="text-[10px] mt-1 font-medium">Sign In</span>
        </Link>
      )}
    </nav>
  );
}
