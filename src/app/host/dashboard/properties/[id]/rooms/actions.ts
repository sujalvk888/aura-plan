'use server'

import { redirect } from 'next/navigation';
import { createRoom } from '@/lib/db';
import { getHostSession } from '@/lib/auth';
import { put } from '@vercel/blob';

async function saveFileToBlob(file: File | null): Promise<string> {
  if (!file || file.size === 0) return '';
  
  const ext = file.name.split('.').pop() || 'png';
  const filename = `rooms/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;
  
  const blob = await put(filename, file, { access: 'public' });
  return blob.url;
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
    saveFileToBlob(frontFile),
    saveFileToBlob(backFile),
    saveFileToBlob(leftFile),
    saveFileToBlob(rightFile),
    saveFileToBlob(ceilingFile),
    saveFileToBlob(floorFile),
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

  if (frontFile && frontFile.size > 0) updates.front = await saveFileToBlob(frontFile);
  if (backFile && backFile.size > 0) updates.back = await saveFileToBlob(backFile);
  if (leftFile && leftFile.size > 0) updates.left = await saveFileToBlob(leftFile);
  if (rightFile && rightFile.size > 0) updates.right = await saveFileToBlob(rightFile);
  if (ceilingFile && ceilingFile.size > 0) updates.ceiling = await saveFileToBlob(ceilingFile);
  if (floorFile && floorFile.size > 0) updates.floor = await saveFileToBlob(floorFile);

  const { updateRoom } = await import('@/lib/db');
  await updateRoom(roomId, updates);

  redirect(`/host/dashboard/properties/${propertyId}/rooms`);
}
