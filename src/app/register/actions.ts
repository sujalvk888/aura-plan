'use server'

import { prisma } from "@/lib/db";
import { setUserSession } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import { put } from '@vercel/blob';

export async function registerUser(formData: FormData, redirectUrl: string | null) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const avatarFile = formData.get('avatar') as File | null;

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "User already exists with this email" };
  }

  let avatarUrl = null;
  
  if (avatarFile && avatarFile.size > 0) {
    const fileName = `${Date.now()}-${avatarFile.name.replace(/\s+/g, '-')}`;
    const blob = await put(`avatars/${fileName}`, avatarFile, { access: 'public' });
    avatarUrl = blob.url;
  }

  const user = await prisma.user.create({
    data: { name, email, password, avatarUrl }
  });

  await setUserSession(user.email);
  redirect(redirectUrl || '/properties');
}
