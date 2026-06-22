'use client'

import { usePathname } from 'next/navigation';

export default function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide the Footer on any host-related pages
  if (pathname?.startsWith('/host')) {
    return null;
  }
  
  return <>{children}</>;
}
