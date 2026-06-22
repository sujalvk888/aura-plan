'use server'

import { prisma } from "@/lib/db";
import { setUserSession } from "@/lib/userAuth";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData, redirectUrl: string | null) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  
  // Basic plain-text password check (In production, use bcrypt)
  if (!user || user.password !== password) {
    return { error: "Invalid email or password" };
  }

  await setUserSession(user.email);
  redirect(redirectUrl || '/properties');
}
