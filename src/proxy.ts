import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/host/dashboard');
  
  if (isDashboardRoute) {
    const sessionCookie = request.cookies.get('auraplan_host_session');
    
    if (!sessionCookie || !sessionCookie.value) {
      // Redirect to login if trying to access dashboard without session
      return NextResponse.redirect(new URL('/host/login', request.url));
    }
  }

  // Prevent logged-in users from accessing login/register pages
  const isAuthRoute = request.nextUrl.pathname === '/host/login' || request.nextUrl.pathname === '/host/register';
  if (isAuthRoute) {
    const sessionCookie = request.cookies.get('auraplan_host_session');
    if (sessionCookie && sessionCookie.value) {
      return NextResponse.redirect(new URL('/host/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/host/dashboard/:path*', '/host/login', '/host/register'],
};
