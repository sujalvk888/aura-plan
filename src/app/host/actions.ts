'use server'

import { redirect } from 'next/navigation';
import { getHostByEmail, createHost } from '@/lib/db';
import { setHostSession, clearHostSession } from '@/lib/auth';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }
  
  const host = await getHostByEmail(email);
  
  if (!host || host.password !== password) {
    // In a real app, compare hashed passwords using bcrypt/argon2
    return { error: 'Invalid email or password.' };
  }
  
  await setHostSession(host.email);
  redirect('/host/dashboard');
}

export async function register(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!name || !email || !password) {
    return { error: 'All fields are required.' };
  }
  
  const existingHost = await getHostByEmail(email);
  if (existingHost) {
    return { error: 'An account with this email already exists.' };
  }
  
  const newHost = await createHost({
    name,
    email,
    password // Mock only
  });
  
  await setHostSession(newHost.email);
  redirect('/host/dashboard');
}

export async function logout() {
  await clearHostSession();
  redirect('/host/login');
}
