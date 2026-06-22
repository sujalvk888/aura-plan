'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

interface FirstPersonControllerProps {
  bounds: { width: number; length: number };
  onLockChange: (isLocked: boolean) => void;
  isTouchDevice?: boolean;
  joystickRef?: React.MutableRefObject<{x: number, y: number}>;
}

export default function FirstPersonController({ bounds, onLockChange, isTouchDevice, joystickRef }: FirstPersonControllerProps) {
  const { gl, camera } = useThree();
  
  // Catch and silence noisy browser security errors globally
  useEffect(() => {
    if (isTouchDevice) return; // Not needed on mobile
    const handler = (e: PromiseRejectionEvent) => {
      if (e.reason && (e.reason.name === 'SecurityError' || e.reason.name === 'WrongDocumentError')) {
        e.preventDefault();
      }
    };
    window.addEventListener('unhandledrejection', handler);
    return () => window.removeEventListener('unhandledrejection', handler);
  }, [isTouchDevice]);

  // Track keys
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const speed = 7.0; // Walking speed

  // Keyboard Event Listeners
  useEffect(() => {
    if (isTouchDevice) return; // Disable keyboard on mobile

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW': setMovement(m => ({ ...m, forward: true })); break;
        case 'ArrowDown':
        case 'KeyS': setMovement(m => ({ ...m, backward: true })); break;
        case 'ArrowLeft':
        case 'KeyA': setMovement(m => ({ ...m, left: true })); break;
        case 'ArrowRight':
        case 'KeyD': setMovement(m => ({ ...m, right: true })); break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW': setMovement(m => ({ ...m, forward: false })); break;
        case 'ArrowDown':
        case 'KeyS': setMovement(m => ({ ...m, backward: false })); break;
        case 'ArrowLeft':
        case 'KeyA': setMovement(m => ({ ...m, left: false })); break;
        case 'ArrowRight':
        case 'KeyD': setMovement(m => ({ ...m, right: false })); break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isTouchDevice]);

  // Mobile Touch Look Listeners
  const touchEuler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  
  useEffect(() => {
    if (!isTouchDevice) return;

    const el = gl.domElement;
    let activeTouchId: number | null = null;
    let lastX = 0;
    let lastY = 0;
    const touchSensitivity = 0.004;

    const onTouchStart = (e: TouchEvent) => {
      // Don't prevent default here to allow other elements to be clicked
      if (activeTouchId !== null) return;
      const touch = e.changedTouches[0];
      activeTouchId = touch.identifier;
      lastX = touch.clientX;
      lastY = touch.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // prevent scrolling
      if (activeTouchId === null) return;
      
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === activeTouchId) {
          const dx = touch.clientX - lastX;
          const dy = touch.clientY - lastY;
          lastX = touch.clientX;
          lastY = touch.clientY;

          touchEuler.current.setFromQuaternion(camera.quaternion);
          touchEuler.current.y -= dx * touchSensitivity;
          touchEuler.current.x -= dy * touchSensitivity;
          // Clamp pitch to avoid flipping
          touchEuler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, touchEuler.current.x));
          camera.quaternion.setFromEuler(touchEuler.current);
          break;
        }
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (activeTouchId === null) return;
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === activeTouchId) {
          activeTouchId = null;
          break;
        }
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [gl, isTouchDevice, camera]);

  useFrame((state, delta) => {
    // Desktop: only move if pointer is locked
    if (!isTouchDevice && document.pointerLockElement !== gl.domElement) {
       return;
    }

    velocity.current.x = 0;
    velocity.current.z = 0;

    let zDir = Number(movement.forward) - Number(movement.backward);
    let xDir = Number(movement.right) - Number(movement.left);
    
    // Add joystick input if touch
    if (isTouchDevice && joystickRef?.current) {
      zDir -= joystickRef.current.y; // Y is up/down (forward/back)
      xDir += joystickRef.current.x; // X is left/right
    }
    
    direction.current.set(xDir, 0, -zDir);
    if (direction.current.lengthSq() > 0) {
      direction.current.normalize();
    }

    const currentSpeed = speed * delta;
    if (Math.abs(zDir) > 0) velocity.current.z = direction.current.z * currentSpeed;
    if (Math.abs(xDir) > 0) velocity.current.x = direction.current.x * currentSpeed;

    state.camera.translateX(velocity.current.x);
    state.camera.translateZ(velocity.current.z);

    state.camera.position.y = 0;

    const padding = 0.8;
    const maxX = Math.max(0, (bounds.width / 2) - padding);
    const maxZ = Math.max(0, (bounds.length / 2) - padding);

    if (state.camera.position.x > maxX) state.camera.position.x = maxX;
    if (state.camera.position.x < -maxX) state.camera.position.x = -maxX;
    if (state.camera.position.z > maxZ) state.camera.position.z = maxZ;
    if (state.camera.position.z < -maxZ) state.camera.position.z = -maxZ;
  });

  if (isTouchDevice) return null;

  return (
    <PointerLockControls 
      selector="#room-interior-container"
      onLock={() => onLockChange(true)} 
      onUnlock={() => onLockChange(false)} 
    />
  );
}
