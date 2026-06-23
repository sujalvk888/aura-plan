'use server'

import { prisma } from "@/lib/db";
import { getUserSession } from "@/lib/userAuth";
import { revalidatePath } from "next/cache";
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { redirect } from 'next/navigation';

export async function updateProfile(formData: FormData) {
  const user = await getUserSession();
  if (!user) {
    redirect('/login');
  }

  const name = formData.get('name') as string;
  const avatarFile = formData.get('avatar') as File | null;

  if (!name || name.trim() === '') {
    return { error: "Name is required" };
  }

  const updateData: { name: string; avatarUrl?: string } = { name };
  
  if (avatarFile && avatarFile.size > 0) {
    const avatarUrl = await uploadImageToCloudinary(avatarFile, 'aura-plan/avatars');
    if (avatarUrl) {
      updateData.avatarUrl = avatarUrl;
    }
  }

  await prisma.user.update({
    where: { id: user.id },
    data: updateData
  });

  revalidatePath('/profile');
  return { success: true, message: "Profile updated successfully!" };
}
