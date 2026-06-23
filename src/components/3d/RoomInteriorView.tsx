'use client'

import { Canvas, useLoader, ThreeEvent } from '@react-three/fiber';
import { Suspense, useMemo, useState, useEffect, useRef } from 'react';
import FirstPersonController from './FirstPersonController';
import MobileJoystick from '@/components/ui/MobileJoystick';
import { MousePointer2 } from 'lucide-react';
import * as THREE from 'three';

export interface RoomInteriorViewProps {
  dimensions: { width: number; length: number; height: number };
  viewingHeight: number;
  surfaces: {
    front: string;
    back: string;
    left: string;
    right: string;
    ceiling: string;
    floor: string;
  };
  hotspots?: Array<{ id: string; x: number; y: number; z: number; label: string; targetRoomId: string }>;
  onSurfaceDoubleClick?: (point: {x:number,y:number,z:number}) => void;
  onHotspotClick?: (targetRoomId: string) => void;
}

// A small gray texture as a reliable fallback (1x1 pixel PNG, base64)
const FALLBACK_DATA_URI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg==';

function RoomInteriorBox({ dimensions, viewingHeight, surfaces, hotspots, onSurfaceDoubleClick, onHotspotClick }: RoomInteriorViewProps) {
  // Only use local paths or data URIs. External URLs will cause CORS errors in Three.js.
  const safeSurface = (url: string) => {
    if (!url) return FALLBACK_DATA_URI;
    // If it's an external URL, only allow Cloudinary to prevent CORS errors
    if (url.startsWith('http://') || url.startsWith('https://')) {
      if (!url.includes('cloudinary.com')) return FALLBACK_DATA_URI;
    }
    return url;
  };

  const urls = useMemo(() => [
    safeSurface(surfaces.front),
    safeSurface(surfaces.back),
    safeSurface(surfaces.left),
    safeSurface(surfaces.right),
    safeSurface(surfaces.ceiling),
    safeSurface(surfaces.floor),
  ], [surfaces]);

  const [frontTex, backTex, leftTex, rightTex, ceilingTex, floorTex] = useLoader(THREE.TextureLoader, urls);

  const materials = useMemo(() => [
    new THREE.MeshBasicMaterial({ map: rightTex, side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: leftTex, side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: ceilingTex, side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: floorTex, side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: frontTex, side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: backTex, side: THREE.BackSide }),
  ], [frontTex, backTex, leftTex, rightTex, ceilingTex, floorTex]);

  // Shift the box so the camera at (0,0,0) sits at the correct viewing height
  const boxYOffset = -(dimensions.height / 2) + viewingHeight;

  const handleDoubleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (onSurfaceDoubleClick) {
      onSurfaceDoubleClick(e.point);
    }
  };

  return (
    <mesh position={[0, -boxYOffset, 0]} onDoubleClick={handleDoubleClick}>
      <boxGeometry args={[dimensions.width, dimensions.height, dimensions.length]} />
      {materials.map((mat, i) => (
        <primitive object={mat} attach={`material-${i}`} key={i} />
      ))}
      
      {/* Render Hotspots */}
      {hotspots?.map(hotspot => (
        <mesh 
          key={hotspot.id} 
          position={[hotspot.x, hotspot.y + boxYOffset, hotspot.z]}
          onClick={(e) => {
            e.stopPropagation();
            if (onHotspotClick) onHotspotClick(hotspot.targetRoomId);
          }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#00ffcc" transparent opacity={0.8} />
        </mesh>
      ))}
    </mesh>
  );
}


export default function RoomInteriorView(props: RoomInteriorViewProps) {
  const [isLocked, setIsLocked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const joystickRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect touch device (mobile/tablet) after mount to avoid SSR hydration mismatches
    // and use setTimeout to avoid React's synchronous cascading render warning
    const timer = setTimeout(() => {
      if (window.matchMedia("(pointer: coarse)").matches) {
        setIsTouchDevice(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="room-interior-container" className="w-full h-full bg-black relative touch-none">
      <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
        <Suspense fallback={null}>
          <RoomInteriorBox {...props} />
        </Suspense>
        
        <FirstPersonController 
          bounds={{ width: props.dimensions.width, length: props.dimensions.length }}
          onLockChange={setIsLocked}
          isTouchDevice={isTouchDevice}
          joystickRef={joystickRef}
        />
      </Canvas>

      {/* Mobile Joystick Overlay */}
      {isTouchDevice && (
        <MobileJoystick onChange={(v) => { joystickRef.current = v; }} />
      )}

      {/* Overlay UI for First Person Mode (Desktop Only) */}
      {!isTouchDevice && !isLocked && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none transition-opacity duration-300">
          <div className="bg-[#16110C]/80 border border-white/20 p-8 rounded-3xl text-center shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-[16px] flex flex-col items-center max-w-sm">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6 animate-pulse">
              <MousePointer2 size={32} />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-3">Click to Explore</h3>
            <p className="text-foreground-muted mb-8 leading-relaxed">
              Click anywhere to lock your cursor. Use <kbd className="bg-[#0D0A08] border border-[#FFF8E7] px-2 py-1 rounded-[4px] text-[#FFF8E7] font-mono font-bold mx-1">W</kbd><kbd className="bg-[#0D0A08] border border-[#FFF8E7] px-2 py-1 rounded-[4px] text-[#FFF8E7] font-mono font-bold mx-1">A</kbd><kbd className="bg-[#0D0A08] border border-[#FFF8E7] px-2 py-1 rounded-[4px] text-[#FFF8E7] font-mono font-bold mx-1">S</kbd><kbd className="bg-[#0D0A08] border border-[#FFF8E7] px-2 py-1 rounded-[4px] text-[#FFF8E7] font-mono font-bold mx-1">D</kbd> keys to walk around and your mouse to look.
            </p>
            <p className="text-xs text-foreground-muted/50">
              Press ESC to pause and release cursor
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
