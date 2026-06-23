import { getHostSession } from "@/lib/auth";
import { getRoomsByProperty, deleteRoom } from "@/lib/db";
import { Box, Plus, Settings, ArrowLeft, Image as ImageIcon, Trash2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Room } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function RoomsPage({ params }: { params: Promise<{ id: string }> }) {
  const host = await getHostSession();
  if (!host) redirect('/host/login');

  const { id } = await params;
  const rooms = await getRoomsByProperty(id);

  async function removeRoomAction(formData: FormData) {
    'use server'
    const roomId = formData.get('roomId') as string;
    await deleteRoom(roomId);
    revalidatePath(`/host/dashboard/properties/${id}/rooms`);
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <Link href={`/host/dashboard/properties/${id}/edit`} className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Property Details
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">Property Rooms</h1>
          <p className="text-foreground-muted">Manage the immersive 3D rooms for this property.</p>
        </div>
        <Link 
          href={`/host/dashboard/properties/${id}/rooms/new`}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-foreground px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-primary/20"
        >
          <PlusCircle size={18} /> Build New Room
        </Link>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-20 bg-surface border border-white/5 rounded-2xl">
          <Box className="mx-auto h-16 w-16 text-foreground-muted/30 mb-6" />
          <h3 className="text-2xl font-heading font-medium mb-3">No rooms built yet</h3>
          <p className="text-foreground-muted max-w-md mx-auto mb-8">
            Start creating virtual experiences by building your first room inside this property.
          </p>
          <Link 
            href={`/host/dashboard/properties/${id}/rooms/new`}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-foreground px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <PlusCircle size={18} /> Build First Room
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room: Room) => (
            <div key={room.id} className="bg-surface border border-white/5 rounded-2xl overflow-hidden group flex flex-col">
              <div className="h-40 bg-background/50 flex flex-col items-center justify-center relative overflow-hidden rounded-t-2xl">
                {room.front ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={room.front} alt="Room Front View" className="w-full h-full object-cover border-none outline-none shadow-none rounded-t-2xl" />
                ) : (
                  <>
                    <Box className="text-primary/50 mb-2" size={40} />
                    <span className="text-xs text-foreground-muted font-medium">3D Environment</span>
                  </>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-heading font-semibold text-foreground">{room.name}</h3>
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-[rgba(196,154,108,0.15)] text-[#C49A6C] rounded-full whitespace-nowrap">
                    Interior Ready
                  </span>
                </div>
                <p className="text-sm text-[#F8F6F0]/65 mb-4">
                  {room.width}ft x {room.length}ft x {room.height}ft
                </p>
                
                <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-row items-center gap-2">
                  <Link 
                    href={`/host/dashboard/properties/${id}/rooms/${room.id}/edit`}
                    className="text-xs font-medium text-[#F8F6F0] bg-transparent border border-white/20 hover:bg-white/5 transition-colors px-3 py-1.5 rounded-md"
                  >
                    Edit Details
                  </Link>
                  <Link 
                    href={`/host/dashboard/properties/${id}/rooms/${room.id}/hotspots`}
                    className="text-xs font-medium text-[#F8F6F0] bg-transparent border border-white/20 hover:bg-white/5 transition-colors px-3 py-1.5 rounded-md"
                  >
                    Manage Hotspots
                  </Link>
                  <form action={removeRoomAction} className="ml-auto flex items-center">
                    <input type="hidden" name="roomId" value={room.id} />
                    <button type="submit" className="p-1.5 text-[#E07A5F] hover:text-[#E07A5F]/80 hover:bg-[#E07A5F]/10 rounded-md transition-colors flex items-center justify-center">
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
