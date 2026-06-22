import { cookies } from 'next/headers';
import { getHostByEmail } from './db';

const SESSION_COOKIE = 'auraplan_host_session';

export async function setHostSession(email: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });
}

export async function clearHostSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getHostSession() {
  const cookieStore = await cookies();
  const hostEmail = cookieStore.get(SESSION_COOKIE)?.value;
  
  if (!hostEmail) return null;
  
  const host = await getHostByEmail(hostEmail);
  return host || null;
}

export async function requireAuth() {
  const host = await getHostSession();
  if (!host) {
    throw new Error('UNAUTHORIZED');
  }
  return host;
}
