'use server'

import { prisma } from "@/lib/db";
import { getHostSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";


export async function updateHostProfile(formData: FormData) {
  const host = await getHostSession();
  if (!host) {
    return { error: "Unauthorized" };
  }

  const name = formData.get('name') as string;
  const bio = formData.get('bio') as string;
  const avatarUrlParam = formData.get('avatarUrl') as string | null;

  if (!name || name.trim() === '') {
    return { error: "Name is required" };
  }

  let avatarUrl = host.avatarUrl;
  
  if (avatarUrlParam) {
    avatarUrl = avatarUrlParam;
  }

  await prisma.host.update({
    where: { id: host.id },
    data: { name, bio, avatarUrl }
  });

  revalidatePath('/host/dashboard/settings');
  return { success: true, message: "Profile updated successfully!" };
}
