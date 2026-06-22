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
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-surface/80 backdrop-blur-md border border-white/10 p-1 rounded-xl flex gap-1 shadow-lg">
        <button
          type="button"
          onClick={() => setViewMode('interior')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'interior' 
              ? 'bg-primary text-foreground shadow-sm' 
              : 'text-foreground-muted hover:text-foreground hover:bg-white/5'
          }`}
        >
          <Eye size={16} /> Interior View (Main)
        </button>
        <button
          type="button"
          onClick={() => setViewMode('cube')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'cube' 
              ? 'bg-primary text-foreground shadow-sm' 
              : 'text-foreground-muted hover:text-foreground hover:bg-white/5'
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
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg text-xs text-foreground/80 pointer-events-none">
          Click and drag to look around 360°
        </div>
      )}
      {viewMode === 'cube' && (
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg text-xs text-foreground/80 pointer-events-none">
          Click and drag to rotate the cube • Scroll to zoom
        </div>
      )}
    </div>
  );
}
