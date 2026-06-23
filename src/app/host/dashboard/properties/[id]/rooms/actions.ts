'use server'

import { redirect } from 'next/navigation';
import { createRoom } from '@/lib/db';
import { getHostSession } from '@/lib/auth';


export async function addRoom(propertyId: string, formData: FormData) {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  const name = formData.get('name') as string;
  const width = parseFloat(formData.get('width') as string);
  const length = parseFloat(formData.get('length') as string);
  const height = parseFloat(formData.get('height') as string);
  
  const viewHeightFt = parseFloat(formData.get('viewHeightFt') as string) || 5;
  const viewHeightIn = parseFloat(formData.get('viewHeightIn') as string) || 11;
  const viewingHeight = viewHeightFt + (viewHeightIn / 12);

  const front = formData.get('frontImageUrl') as string;
  const back = formData.get('backImageUrl') as string;
  const left = formData.get('leftImageUrl') as string;
  const right = formData.get('rightImageUrl') as string;
  const ceiling = formData.get('ceilingImageUrl') as string;
  const floor = formData.get('floorImageUrl') as string;

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

  const updates: import('@prisma/client').Prisma.RoomUpdateInput = {
    name, width, length, height, viewingHeight
  };

  const frontUrl = formData.get('frontImageUrl') as string | null;
  if (frontUrl) updates.front = frontUrl;

  const backUrl = formData.get('backImageUrl') as string | null;
  if (backUrl) updates.back = backUrl;

  const leftUrl = formData.get('leftImageUrl') as string | null;
  if (leftUrl) updates.left = leftUrl;

  const rightUrl = formData.get('rightImageUrl') as string | null;
  if (rightUrl) updates.right = rightUrl;

  const ceilingUrl = formData.get('ceilingImageUrl') as string | null;
  if (ceilingUrl) updates.ceiling = ceilingUrl;

  const floorUrl = formData.get('floorImageUrl') as string | null;
  if (floorUrl) updates.floor = floorUrl;

  const { updateRoom } = await import('@/lib/db');
  await updateRoom(roomId, updates);

  redirect(`/host/dashboard/properties/${propertyId}/rooms`);
}
