'use server'

import { prisma } from "@/lib/db";
import { getUserSession } from "@/lib/userAuth";
import { revalidatePath } from "next/cache";
import { put } from '@vercel/blob';

export async function updateProfile(formData: FormData) {
  const user = await getUserSession();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const name = formData.get('name') as string;
  const avatarFile = formData.get('avatar') as File | null;

  if (!name || name.trim() === '') {
    return { error: "Name is required" };
  }

  let avatarUrl = user.avatarUrl;
  
  if (avatarFile && avatarFile.size > 0) {
    const fileName = `${Date.now()}-${avatarFile.name.replace(/\s+/g, '-')}`;
    const blob = await put(`avatars/${fileName}`, avatarFile, { access: 'public' });
    avatarUrl = blob.url;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name, avatarUrl }
  });

  revalidatePath('/profile');
  return { success: true, message: "Profile updated successfully!" };
}
