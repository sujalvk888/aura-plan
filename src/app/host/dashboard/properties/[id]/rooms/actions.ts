'use server'

import { redirect } from 'next/navigation';
import { createRoom } from '@/lib/db';
import { getHostSession } from '@/lib/auth';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

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
    uploadImageToCloudinary(frontFile, 'aura-plan/rooms').then(url => url || ''),
    uploadImageToCloudinary(backFile, 'aura-plan/rooms').then(url => url || ''),
    uploadImageToCloudinary(leftFile, 'aura-plan/rooms').then(url => url || ''),
    uploadImageToCloudinary(rightFile, 'aura-plan/rooms').then(url => url || ''),
    uploadImageToCloudinary(ceilingFile, 'aura-plan/rooms').then(url => url || ''),
    uploadImageToCloudinary(floorFile, 'aura-plan/rooms').then(url => url || ''),
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

  if (frontFile && frontFile.size > 0) updates.front = (await uploadImageToCloudinary(frontFile, 'aura-plan/rooms')) || '';
  if (backFile && backFile.size > 0) updates.back = (await uploadImageToCloudinary(backFile, 'aura-plan/rooms')) || '';
  if (leftFile && leftFile.size > 0) updates.left = (await uploadImageToCloudinary(leftFile, 'aura-plan/rooms')) || '';
  if (rightFile && rightFile.size > 0) updates.right = (await uploadImageToCloudinary(rightFile, 'aura-plan/rooms')) || '';
  if (ceilingFile && ceilingFile.size > 0) updates.ceiling = (await uploadImageToCloudinary(ceilingFile, 'aura-plan/rooms')) || '';
  if (floorFile && floorFile.size > 0) updates.floor = (await uploadImageToCloudinary(floorFile, 'aura-plan/rooms')) || '';

  const { updateRoom } = await import('@/lib/db');
  await updateRoom(roomId, updates);

  redirect(`/host/dashboard/properties/${propertyId}/rooms`);
}
