'use client'

import { useState } from 'react';
import RoomCubeView from './RoomCubeView';
import RoomInteriorView from './RoomInteriorView';
import { Box, Eye } from 'lucide-react';

interface RoomData {
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
}

export default function DualViewRoom({ roomData }: { roomData: RoomData }) {
  const [viewMode, setViewMode] = useState<'interior' | 'cube'>('interior');

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Top Toggle Bar */}
      <div className="absolute top-6 md:top-4 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-md border border-white/15 p-1.5 rounded-full flex gap-1 shadow-lg">
        <button
          type="button"
          onClick={() => setViewMode('interior')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            viewMode === 'interior' 
              ? 'bg-primary text-[#FFF8E7] shadow-sm' 
              : 'bg-transparent text-[#FFF8E7]/60 hover:text-[#FFF8E7] hover:bg-white/5'
          }`}
        >
          <Eye size={16} /> Interior View (Main)
        </button>
        <button
          type="button"
          onClick={() => setViewMode('cube')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            viewMode === 'cube' 
              ? 'bg-primary text-[#FFF8E7] shadow-sm' 
              : 'bg-transparent text-[#FFF8E7]/60 hover:text-[#FFF8E7] hover:bg-white/5'
          }`}
        >
          <Box size={16} /> Cube View (Validation)
        </button>
      </div>

      {/* 3D Canvas Container */}
      <div className="w-full h-full">
        {viewMode === 'interior' ? (
          <RoomInteriorView 
            dimensions={{ width: roomData.width, height: roomData.height, length: roomData.length }}
            viewingHeight={roomData.viewingHeight}
            surfaces={{ front: roomData.front, back: roomData.back, left: roomData.left, right: roomData.right, ceiling: roomData.ceiling, floor: roomData.floor }}
          />
        ) : (
          <RoomCubeView 
            dimensions={{ width: roomData.width, height: roomData.height, length: roomData.length }}
            surfaces={{ front: roomData.front, back: roomData.back, left: roomData.left, right: roomData.right, ceiling: roomData.ceiling, floor: roomData.floor }}
          />
        )}
      </div>

      {/* Overlay helpers */}
      {viewMode === 'interior' && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-block px-4 md:px-5 py-2 bg-black/75 border border-white/10 rounded-full text-[11px] md:text-[13px] text-[#FFF8E7] tracking-wider pointer-events-none text-center whitespace-normal leading-snug w-[90%] md:w-auto max-w-[400px]">
          Click and drag to look around 360°
        </div>
      )}
      {viewMode === 'cube' && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-block px-4 md:px-5 py-2 bg-black/75 border border-white/10 rounded-full text-[11px] md:text-[13px] text-[#FFF8E7] tracking-wider pointer-events-none text-center whitespace-normal leading-snug w-[90%] md:w-auto max-w-[400px]">
          Click and drag to rotate the cube • Scroll to zoom
        </div>
      )}
    </div>
  );
}
