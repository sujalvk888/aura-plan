import { PrismaClient, Prisma } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getHostByEmail(email: string) {
  return prisma.host.findUnique({ where: { email } });
}

export async function createHost(data: { email: string; name: string; password: string }) {
  return prisma.host.create({ data });
}

export async function getPropertiesByHost(hostId: string) {
  return prisma.property.findMany({
    where: { hostId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getAllProperties(query?: string, type?: string) {
  const where: Prisma.PropertyWhereInput = { isPublished: true };

  if (query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { city: { contains: query, mode: 'insensitive' } },
      { country: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
    ];
  }

  if (type && type !== 'All') {
    where.type = type;
  }

  return prisma.property.findMany({
    where,
    include: { rooms: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createProperty(data: Prisma.PropertyUncheckedCreateInput) {
  return prisma.property.create({ data });
}

export async function updateProperty(id: string, hostId: string, data: Prisma.PropertyUpdateInput) {
  const prop = await prisma.property.findFirst({ where: { id, hostId } });
  if (!prop) throw new Error("Property not found or unauthorized");
  return prisma.property.update({ where: { id }, data });
}

export async function deleteProperty(id: string, hostId: string) {
  const prop = await prisma.property.findFirst({ where: { id, hostId } });
  if (!prop) throw new Error("Property not found or unauthorized");
  return prisma.property.delete({ where: { id } });
}

export async function getPropertyById(id: string) {
  return prisma.property.findUnique({
    where: { id },
    include: { 
      host: true,
      wishlists: true,
      rooms: { include: { hotspots: true } } 
    },
  });
}

export async function getRoomsByProperty(propertyId: string) {
  return prisma.room.findMany({
    where: { propertyId },
  });
}

export async function getRoomById(id: string) {
  return prisma.room.findUnique({
    where: { id },
    include: { hotspots: true },
  });
}

export async function createRoom(data: Prisma.RoomUncheckedCreateInput) {
  return prisma.room.create({ data });
}

export async function updateRoom(id: string, data: Prisma.RoomUpdateInput) {
  return prisma.room.update({ where: { id }, data });
}

export async function deleteRoom(id: string) {
  return prisma.room.delete({ where: { id } });
}

export async function addHotspot(roomId: string, data: Prisma.HotspotUncheckedCreateWithoutRoomInput) {
  return prisma.hotspot.create({
    data: {
      roomId,
      ...data,
    }
  });
}

export async function removeHotspot(roomId: string, id: string) {
  return prisma.hotspot.delete({
    where: { id, roomId }
  });
}
