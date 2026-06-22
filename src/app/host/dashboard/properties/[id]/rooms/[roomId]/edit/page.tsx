import { getHostSession } from "@/lib/auth";
import { getPropertyById, getRoomById } from "@/lib/db";
import RoomBuilderWizard from "@/components/host/RoomBuilderWizard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

export default async function EditRoomPage({ params }: { params: Promise<{ id: string, roomId: string }> }) {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  const { id, roomId } = await params;
  const property = await getPropertyById(id);
  
  if (!property || property.hostId !== host.id) {
    redirect('/host/dashboard/properties');
  }

  const room = await getRoomById(roomId);
  if (!room || room.propertyId !== property.id) {
    redirect(`/host/dashboard/properties/${id}/rooms`);
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <Link href={`/host/dashboard/properties/${id}/rooms`} className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Rooms
      </Link>

      <div className="mb-10">
        <h1 className="text-4xl font-heading font-bold mb-2">Edit Room Details</h1>
        <p className="text-foreground-muted">Update surfaces and redefine dimensions for this interior view.</p>
      </div>

      {/* Initialize the builder with the existing room data */}
      <RoomBuilderWizard propertyId={property.id} roomId={room.id} initialRoom={room} />
    </div>
  );
}
