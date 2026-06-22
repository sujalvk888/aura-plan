import { getHostSession } from "@/lib/auth";
import { getPropertyById, getRoomById, getRoomsByProperty } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HotspotEditorClient from "@/app/host/dashboard/properties/[id]/rooms/[roomId]/hotspots/HotspotEditorClient";
import { Room } from "@prisma/client";

export default async function HotspotsPage({ params }: { params: Promise<{ id: string, roomId: string }> }) {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  const { id, roomId } = await params;
  
  const property = await getPropertyById(id);
  const room = await getRoomById(roomId);
  const allRooms = await getRoomsByProperty(id);
  
  if (!property || !room) {
    return <div className="p-10">Room not found.</div>;
  }
  
  // Filter out the current room so they can't link to themselves
  const otherRooms = allRooms.filter((r: Room) => r.id !== roomId);

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      {/* Header bar */}
      <div className="bg-surface border-b border-white/5 p-4 flex items-center justify-between z-10 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href={`/host/dashboard/properties/${id}/rooms`} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-foreground transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-lg font-heading font-semibold">Hotspot Editor: {room.name}</h1>
            <p className="text-xs text-foreground-muted">Double-click on the walls to place a teleport hotspot.</p>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 relative bg-black overflow-hidden">
        <HotspotEditorClient 
          propertyId={id}
          roomId={roomId}
          room={room} 
          otherRooms={otherRooms} 
        />
      </div>
    </div>
  );
}
