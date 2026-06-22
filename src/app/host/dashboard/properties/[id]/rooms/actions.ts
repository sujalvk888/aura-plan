'use server'

import { redirect } from 'next/navigation';
import { createRoom } from '@/lib/db';
import { getHostSession } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

async function saveFileLocally(file: File | null): Promise<string> {
  if (!file || file.size === 0) return '';
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Create a unique filename
  const ext = file.name.split('.').pop() || 'png';
  const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;
  
  // Ensure the directory exists
  const uploadDir = path.join(process.cwd(), 'public/uploads/rooms');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, buffer);
  
  // Return the public URL path
  return `/uploads/rooms/${filename}`;
}

export async function addRoom(propertyId: string, formData: FormData) {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  const name = formData.get('name') as string;
  const width = parseFloat(formData.get('width') as string);
  const length = parseFloat(formData.get('length') as string);
  const height = parseFloat(formData.get('height') as string);
  
  // Handle feet/inches for viewing height
  const viewHeightFt = parseFloat(formData.get('viewHeightFt') as string) || 5;
  const viewHeightIn = parseFloat(formData.get('viewHeightIn') as string) || 11;
  const viewingHeight = viewHeightFt + (viewHeightIn / 12); // Convert to decimal feet

  // Handle files
  const frontFile = formData.get('frontImage') as File;
  const backFile = formData.get('backImage') as File;
  const leftFile = formData.get('leftImage') as File;
  const rightFile = formData.get('rightImage') as File;
  const ceilingFile = formData.get('ceilingImage') as File;
  const floorFile = formData.get('floorImage') as File;

  const [front, back, left, right, ceiling, floor] = await Promise.all([
    saveFileLocally(frontFile),
    saveFileLocally(backFile),
    saveFileLocally(leftFile),
    saveFileLocally(rightFile),
    saveFileLocally(ceilingFile),
    saveFileLocally(floorFile),
  ]);

  await createRoom({
    propertyId,
    name,
    width,
    length,
    height,
    viewingHeight,
    front,
    back,
    left,
    right,
    ceiling,
    floor
  });

  redirect(`/host/dashboard/properties/${propertyId}/rooms`);
}

export async function editRoom(propertyId: string, roomId: string, formData: FormData) {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  const name = formData.get('name') as string;
  const width = parseFloat(formData.get('width') as string);
  const length = parseFloat(formData.get('length') as string);
  const height = parseFloat(formData.get('height') as string);
  
  const viewHeightFt = parseFloat(formData.get('viewHeightFt') as string) || 5;
  const viewHeightIn = parseFloat(formData.get('viewHeightIn') as string) || 11;
  const viewingHeight = viewHeightFt + (viewHeightIn / 12);

  const frontFile = formData.get('frontImage') as File;
  const backFile = formData.get('backImage') as File;
  const leftFile = formData.get('leftImage') as File;
  const rightFile = formData.get('rightImage') as File;
  const ceilingFile = formData.get('ceilingImage') as File;
  const floorFile = formData.get('floorImage') as File;

  const updates: import('@prisma/client').Prisma.RoomUpdateInput = {
    name, width, length, height, viewingHeight
  };

  if (frontFile && frontFile.size > 0) updates.front = await saveFileLocally(frontFile);
  if (backFile && backFile.size > 0) updates.back = await saveFileLocally(backFile);
  if (leftFile && leftFile.size > 0) updates.left = await saveFileLocally(leftFile);
  if (rightFile && rightFile.size > 0) updates.right = await saveFileLocally(rightFile);
  if (ceilingFile && ceilingFile.size > 0) updates.ceiling = await saveFileLocally(ceilingFile);
  if (floorFile && floorFile.size > 0) updates.floor = await saveFileLocally(floorFile);

  const { updateRoom } = await import('@/lib/db');
  await updateRoom(roomId, updates);

  redirect(`/host/dashboard/properties/${propertyId}/rooms`);
}
