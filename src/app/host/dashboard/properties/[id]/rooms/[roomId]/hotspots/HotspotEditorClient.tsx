'use client'

import { useState } from 'react';
import RoomInteriorView from '@/components/3d/RoomInteriorView';
import { addHotspotAction, removeHotspotAction } from './actions';
import { Save, X, Navigation, Trash2 } from 'lucide-react';

interface HotspotEditorClientProps {
  propertyId: string;
  roomId: string;
  room: any;
  otherRooms: any[];
}

export default function HotspotEditorClient({ propertyId, roomId, room, otherRooms }: HotspotEditorClientProps) {
  // State for the modal that pops up when placing a new hotspot
  const [pendingHotspot, setPendingHotspot] = useState<{x:number, y:number, z:number} | null>(null);
  
  // Form state
  const [selectedTargetRoom, setSelectedTargetRoom] = useState(otherRooms.length > 0 ? otherRooms[0].id : '');
  const [label, setLabel] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Triggered by double clicking the walls in RoomInteriorView
  const handleSurfaceDoubleClick = (point: {x:number, y:number, z:number}) => {
    if (otherRooms.length === 0) {
      alert("You need to create other rooms first before you can place hotspots.");
      return;
    }
    setPendingHotspot(point);
    // Auto-generate a label based on the selected room
    const target = otherRooms.find(r => r.id === selectedTargetRoom);
    if (target) setLabel(`To ${target.name}`);
  };

  const handleSaveHotspot = async () => {
    if (!pendingHotspot || !selectedTargetRoom) return;
    
    setIsSaving(true);
    await addHotspotAction(propertyId, roomId, pendingHotspot, selectedTargetRoom, label);
    setIsSaving(false);
    setPendingHotspot(null);
  };

  const handleDeleteHotspot = async (hotspotId: string) => {
    if (confirm("Are you sure you want to delete this hotspot?")) {
      await removeHotspotAction(propertyId, roomId, hotspotId);
    }
  };

  return (
    <>
      <RoomInteriorView 
        dimensions={{ width: room.width, height: room.height, length: room.length }}
        viewingHeight={room.viewingHeight}
        surfaces={{ front: room.front, back: room.back, left: room.left, right: room.right, ceiling: room.ceiling, floor: room.floor }}
        hotspots={room.hotspots}
        onSurfaceDoubleClick={handleSurfaceDoubleClick}
      />
      
      {/* Existing Hotspots List overlay */}
      <div className="absolute top-6 right-6 w-72 max-h-[80vh] overflow-y-auto bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 pointer-events-auto">
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
          <Navigation size={16} className="text-primary" /> Active Hotspots
        </h3>
        
        {!room.hotspots || room.hotspots.length === 0 ? (
          <p className="text-white/50 text-xs">No hotspots placed yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {room.hotspots.map((h: any) => {
              const targetName = otherRooms.find(r => r.id === h.targetRoomId)?.name || 'Unknown Room';
              return (
                <div key={h.id} className="bg-white/5 border border-white/5 rounded-lg p-3 flex justify-between items-center group">
                  <div>
                    <p className="text-white text-sm font-medium">{h.label}</p>
                    <p className="text-white/50 text-xs">→ {targetName}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteHotspot(h.id)}
                    className="p-1.5 bg-red-500/10 text-red-400 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* New Hotspot Creation Modal */}
      {pendingHotspot && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
          <div className="bg-surface border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-semibold text-white">Place Hotspot</h2>
              <button onClick={() => setPendingHotspot(null)} className="text-white/50 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-white/70 mb-1.5">Destination Room</label>
                <select 
                  value={selectedTargetRoom} 
                  onChange={(e) => {
                    setSelectedTargetRoom(e.target.value);
                    const target = otherRooms.find(r => r.id === e.target.value);
                    if (target) setLabel(`To ${target.name}`);
                  }}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-primary"
                >
                  {otherRooms.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-white/70 mb-1.5">Display Label</label>
                <input 
                  type="text" 
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. Walk to Kitchen"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-primary"
                />
              </div>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                <p className="text-xs text-primary/80 font-mono">
                  Coordinates: X: {pendingHotspot.x.toFixed(2)}, Y: {pendingHotspot.y.toFixed(2)}, Z: {pendingHotspot.z.toFixed(2)}
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleSaveHotspot}
              disabled={isSaving}
              className="w-full bg-primary hover:bg-primary-hover text-black py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : <><Save size={18} /> Save Hotspot</>}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
