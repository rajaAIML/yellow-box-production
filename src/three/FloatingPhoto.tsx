import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface FloatingPhotoProps {
  image: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  floatSpeed?: number;
  floatOffset?: number;
  scrollProgress?: number;
  reducedMotion?: boolean;
}

function PhotoPlane({
  image,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  floatSpeed = 1,
  floatOffset = 0,
  scrollProgress = 0,
  reducedMotion = false,
}: FloatingPhotoProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(image);

  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
    }
  }, [texture]);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    const t = state.clock.elapsedTime * floatSpeed + floatOffset;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.08;
    meshRef.current.position.z = position[2] + scrollProgress * 2;
    meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.5) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1.2, 0.85]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.95}
        roughness={0.4}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function FloatingPhoto(props: FloatingPhotoProps) {
  return <PhotoPlane {...props} />;
}
