import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface CameraRigProps {
  mouseX?: number;
  mouseY?: number;
  scrollProgress?: number;
  mode?: 'hero' | 'gallery';
  reducedMotion?: boolean;
}

export function CameraRig({
  mouseX = 0,
  mouseY = 0,
  scrollProgress = 0,
  mode = 'hero',
  reducedMotion = false,
}: CameraRigProps) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    const parallaxStrength = reducedMotion ? 0 : mode === 'hero' ? 0.35 : 0.15;
    const scrollStrength = reducedMotion ? 0 : mode === 'hero' ? 2.5 : 8;

    if (mode === 'hero') {
      target.current.set(
        mouseX * parallaxStrength,
        mouseY * parallaxStrength * 0.5 + scrollProgress * 0.5,
        6 - scrollProgress * scrollStrength
      );
    } else {
      target.current.set(
        mouseX * parallaxStrength,
        mouseY * parallaxStrength * 0.3,
        -scrollProgress * scrollStrength
      );
    }

    camera.position.lerp(target.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
