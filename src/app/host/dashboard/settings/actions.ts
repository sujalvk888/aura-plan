'use server'

import { prisma } from "@/lib/db";
import { getHostSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { writeFile } from 'fs/promises';
import path from 'path';

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
    const bytes = await avatarFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-host-${avatarFile.name.replace(/\s+/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
    
    // Create dir if not exists
    await import('fs').then(fs => fs.promises.mkdir(uploadDir, { recursive: true }).catch(() => {}));
    
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    avatarUrl = `/uploads/avatars/${fileName}`;
  }

  await prisma.host.update({
    where: { id: host.id },
    data: { name, bio, avatarUrl }
  });

  revalidatePath('/host/dashboard/settings');
  return { success: true, message: "Profile updated successfully!" };
}
