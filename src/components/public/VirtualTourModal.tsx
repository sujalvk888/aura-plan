'use client'

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import RoomInteriorView from '@/components/3d/RoomInteriorView';

export interface RoomData {
  id: string;
  name: string;
  width: number;
  length: number;
  height: number;
  viewingHeight: number;
  front: string;
  back: string;
  left: string;
  right: string;
  ceiling: string;
  floor: string;
  hotspots?: Array<{
    id: string;
    x: number;
    y: number;
    z: number;
    targetRoomId: string;
    label: string;
  }>;
}

interface VirtualTourModalProps {
  rooms: RoomData[];
  onClose: () => void;
}

export default function VirtualTourModal({ rooms, onClose }: VirtualTourModalProps) {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  useEffect(() => {
    // Lock body scroll to remove the background "slide bar"
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  if (!rooms || rooms.length === 0) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-6">
        <button onClick={onClose} className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
          <X size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Tour Unavailable</h2>
          <p className="text-white/60">This property does not have any 3D rooms configured yet.</p>
        </div>
      </div>
    );
  }

  const currentRoom = rooms[currentRoomIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="absolute top-0 inset-x-0 p-6 z-50 flex justify-between items-start pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl pointer-events-auto">
          <h2 className="text-lg font-heading font-semibold text-white">{currentRoom.name}</h2>
          <p className="text-xs text-white/60">360° Virtual Experience</p>
        </div>
        
        <button 
          onClick={onClose} 
          className="p-3 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 rounded-full text-white transition-colors pointer-events-auto"
        >
          <X size={24} />
        </button>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 w-full h-full relative cursor-move">
        <RoomInteriorView 
          dimensions={{ width: currentRoom.width, height: currentRoom.height, length: currentRoom.length }}
          viewingHeight={currentRoom.viewingHeight}
          surfaces={{ front: currentRoom.front, back: currentRoom.back, left: currentRoom.left, right: currentRoom.right, ceiling: currentRoom.ceiling, floor: currentRoom.floor }}
          hotspots={currentRoom.hotspots}
          onHotspotClick={(targetRoomId) => {
            const targetIndex = rooms.findIndex(r => r.id === targetRoomId);
            if (targetIndex !== -1) setCurrentRoomIndex(targetIndex);
          }}
        />
        <div className="absolute bottom-24 inset-x-0 flex justify-center pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg text-xs text-white/70">
            Click and drag to look around 360°
          </div>
        </div>
      </div>

      {/* Bottom Navigation (if multiple rooms) */}
      {rooms.length > 1 && (
        <div className="absolute bottom-6 inset-x-0 flex justify-center z-10 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex gap-2 overflow-x-auto max-w-[90vw] pointer-events-auto shadow-2xl">
            {rooms.map((room, idx) => (
              <button
                key={room.id}
                onClick={() => setCurrentRoomIndex(idx)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  currentRoomIndex === idx 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
