'use server'

import { prisma } from "@/lib/db";
import { getUserSession } from "@/lib/userAuth";
import { revalidatePath } from "next/cache";
import { writeFile } from 'fs/promises';
import path from 'path';

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
    const bytes = await avatarFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${avatarFile.name.replace(/\s+/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
    
    // Create dir if not exists
    await import('fs').then(fs => fs.promises.mkdir(uploadDir, { recursive: true }).catch(() => {}));
    
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    avatarUrl = `/uploads/avatars/${fileName}`;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name, avatarUrl }
  });

  revalidatePath('/profile');
  return { success: true, message: "Profile updated successfully!" };
}
