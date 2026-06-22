import { cookies } from 'next/headers';
import { prisma } from './db';

const USER_SESSION_COOKIE = 'auraplan_user_session';

export async function setUserSession(email: string) {
  const cookieStore = await cookies();
  cookieStore.set(USER_SESSION_COOKIE, email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_SESSION_COOKIE);
}

export async function getUserSession() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get(USER_SESSION_COOKIE)?.value;
  
  if (!userEmail) return null;
  
  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  return user || null;
}

export async function requireUserAuth() {
  const user = await getUserSession();
  if (!user) {
    throw new Error('UNAUTHORIZED');
  }
  return user;
}
