'use client'

import { usePathname } from 'next/navigation';

export default function ConditionalNavbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide the User Navbar on any host-related pages
  if (pathname?.startsWith('/host')) {
    return null;
  }
  
  return (
    <>
      {children}
      <div className="h-20" aria-hidden="true" />
    </>
  );
}
