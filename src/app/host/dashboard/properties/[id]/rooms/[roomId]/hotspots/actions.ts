'use server'

import { addHotspot, removeHotspot } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addHotspotAction(propertyId: string, roomId: string, position: {x:number, y:number, z:number}, targetRoomId: string, label: string) {
  const newHotspot = await addHotspot(roomId, {
    x: position.x,
    y: position.y,
    z: position.z,
    targetRoomId,
    label
  });
  
  if (newHotspot) {
    revalidatePath(`/host/dashboard/properties/${propertyId}/rooms/${roomId}/hotspots`);
    revalidatePath(`/properties/${propertyId}`); // Invalidate public page
  }
  
  return newHotspot;
}

export async function removeHotspotAction(propertyId: string, roomId: string, hotspotId: string) {
  const success = await removeHotspot(roomId, hotspotId);
  
  if (success) {
    revalidatePath(`/host/dashboard/properties/${propertyId}/rooms/${roomId}/hotspots`);
    revalidatePath(`/properties/${propertyId}`);
  }
  
  return success;
}
