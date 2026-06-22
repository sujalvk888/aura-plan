'use server'

import { prisma } from "@/lib/db";
import { getHostSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { put } from '@vercel/blob';

export async function updateHostProfile(formData: FormData) {
  const host = await getHostSession();
  if (!host) {
    return { error: "Unauthorized" };
  }

  const name = formData.get('name') as string;
  const bio = formData.get('bio') as string;
  const avatarFile = formData.get('avatar') as File | null;

  if (!name || name.trim() === '') {
    return { error: "Name is required" };
  }

  let avatarUrl = host.avatarUrl;
  
  if (avatarFile && avatarFile.size > 0) {
    const fileName = `${Date.now()}-host-${avatarFile.name.replace(/\s+/g, '-')}`;
    const blob = await put(`avatars/${fileName}`, avatarFile, { access: 'public' });
    avatarUrl = blob.url;
  }

  await prisma.host.update({
    where: { id: host.id },
    data: { name, bio, avatarUrl }
  });

  revalidatePath('/host/dashboard/settings');
  return { success: true, message: "Profile updated successfully!" };
}
