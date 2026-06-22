'use server'

import { getPropertyById, getRoomsByProperty, prisma } from '@/lib/db';
import { getUserSession } from '@/lib/userAuth';
import { revalidatePath } from 'next/cache';

export async function getPropertyDetails(id: string) {
  const property = await getPropertyById(id);
  
  if (!property) {
    return { property: null, rooms: [], isWishlisted: false, host: null };
  }

  const rooms = await getRoomsByProperty(id);
  const user = await getUserSession();
  
  const isWishlisted = user ? property.wishlists.some((w: { userId: string }) => w.userId === user.id) : false;

  return { 
    property, 
    rooms, 
    isWishlisted, 
    host: {
      name: property.host.name,
      bio: property.host.bio,
      avatarUrl: property.host.avatarUrl
    } 
  };
}

export async function toggleWishlist(propertyId: string) {
  const user = await getUserSession();
  if (!user) {
    return { error: 'Unauthorized', redirect: `/login?redirect=/properties/${propertyId}` };
  }

  const existing = await prisma.wishlist.findUnique({
    where: {
      userId_propertyId: {
        userId: user.id,
        propertyId
      }
    }
  });

  if (existing) {
    await prisma.wishlist.delete({ where: { id: existing.id } });
  } else {
    await prisma.wishlist.create({
      data: {
        userId: user.id,
        propertyId
      }
    });
  }

  revalidatePath(`/properties/${propertyId}`);
  revalidatePath(`/wishlist`);
  return { success: true, isWishlisted: !existing };
}
