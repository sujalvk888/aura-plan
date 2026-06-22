'use client'

import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

interface RoomCubeViewProps {
  dimensions: { width: number; length: number; height: number };
  surfaces: {
    front: string;
    back: string;
    left: string;
    right: string;
    ceiling: string;
    floor: string;
  };
}

function RoomCubeBox({ dimensions, surfaces }: RoomCubeViewProps) {
  const fallback = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg==';
  
  const safeSurface = (url: string) => {
    if (!url) return fallback;
    if (url.startsWith('http://') || url.startsWith('https://')) return fallback;
    return url;
  };

  const [frontTex, backTex, leftTex, rightTex, ceilingTex, floorTex] = useLoader(THREE.TextureLoader, [
    safeSurface(surfaces.front),
    safeSurface(surfaces.back),
    safeSurface(surfaces.left),
    safeSurface(surfaces.right),
    safeSurface(surfaces.ceiling),
    safeSurface(surfaces.floor),
  ]);

  // Outside cube uses FrontSide instead of BackSide
  const materials = [
    new THREE.MeshStandardMaterial({ map: rightTex }),
    new THREE.MeshStandardMaterial({ map: leftTex }),
    new THREE.MeshStandardMaterial({ map: ceilingTex }),
    new THREE.MeshStandardMaterial({ map: floorTex }),
    new THREE.MeshStandardMaterial({ map: frontTex }),
    new THREE.MeshStandardMaterial({ map: backTex }),
  ];

  return (
    <mesh>
      <boxGeometry args={[dimensions.width, dimensions.height, dimensions.length]} />
      {materials.map((mat, i) => (
        <primitive object={mat} attach={`material-${i}`} key={i} />
      ))}
    </mesh>
  );
}

export default function RoomCubeView(props: RoomCubeViewProps) {
  // Determine camera distance based on largest dimension
  const maxDim = Math.max(props.dimensions.width, props.dimensions.height, props.dimensions.length);
  const camZ = maxDim * 1.5 || 20;

  return (
    <div className="w-full h-full bg-background">
      <Canvas camera={{ position: [camZ, camZ * 0.8, camZ], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <RoomCubeBox {...props} />
        </Suspense>
        {/* Full controls allowed for outside inspection */}
        <OrbitControls enableDamping={true} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
