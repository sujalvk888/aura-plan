'use server'

import { prisma } from "@/lib/db";
import { getHostSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { uploadImageToCloudinary } from '@/lib/cloudinary';

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
    const uploadedUrl = await uploadImageToCloudinary(avatarFile, 'aura-plan/hosts');
    if (uploadedUrl) {
      avatarUrl = uploadedUrl;
    }
  }

  await prisma.host.update({
    where: { id: host.id },
    data: { name, bio, avatarUrl }
  });

  revalidatePath('/host/dashboard/settings');
  return { success: true, message: "Profile updated successfully!" };
}
