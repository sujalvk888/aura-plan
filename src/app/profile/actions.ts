'use server'

import { prisma } from "@/lib/db";
import { getUserSession } from "@/lib/userAuth";
import { revalidatePath } from "next/cache";


export async function updateProfile(formData: FormData) {
  const user = await getUserSession();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const name = formData.get('name') as string;
  const avatarUrlParam = formData.get('avatarUrl') as string | null;

  if (!name || name.trim() === '') {
    return { error: "Name is required" };
  }

  let avatarUrl = user.avatarUrl;
  
  if (avatarUrlParam) {
    avatarUrl = avatarUrlParam;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name, avatarUrl }
  });

  revalidatePath('/profile');
  return { success: true, message: "Profile updated successfully!" };
}
